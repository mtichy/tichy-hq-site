'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useProgress, useTexture } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import {
  sampleOrbitalDrawings,
  type OrbitalElevation,
  type OrbitalLayoutShape,
  type OrbitalSettings,
} from '@/lib/labs/orbital-settings'
import { elevationOpacity, elevationWorldLayout } from '@/lib/elevation'
import type { OrbitalDrawing } from '@/lib/labs/orbital-drawings'

/**
 * World-space Z for a focused plane (camera sits at z ≈ 11).
 * Must sit nearer the camera than the cloud shell so depth sorting
 * never puts other cards in front.
 */
const FOCUS_Z = 8.4
/**
 * Target fill of the camera frustum. High enough to feel present;
 * leaves a little room so orbit doesn't clip edges.
 */
const CLOUD_VIEW_MARGIN = 0.9
/** Nudge cloud up slightly — geometric center reads low for flat layouts (Disk). */
const CLOUD_OPTICAL_Y_LIFT = 0.1
const CAMERA_Z = 11
const CAMERA_FOV = 40

type LayoutItem = {
  drawing: OrbitalDrawing
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

/** Mesh uniform scale so plane world-height ≈ viewportFraction of visible height. */
function focusScaleForViewportHeight(
  planeHeight: number,
  camera: THREE.PerspectiveCamera,
  planeZ: number,
  viewportFraction: number,
) {
  const distance = Math.abs(camera.position.z - planeZ)
  const vFov = THREE.MathUtils.degToRad(camera.fov)
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance
  return (visibleHeight * viewportFraction) / planeHeight
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Approx standard normal via Box–Muller. */
function randomGaussian(rand: () => number) {
  const u = Math.max(1e-9, rand())
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function layoutCloud(
  drawings: readonly OrbitalDrawing[],
  shape: OrbitalLayoutShape,
  cardSize: number,
  seed: number,
): LayoutItem[] {
  const rand = mulberry32(seed)
  const n = drawings.length

  return drawings.map((drawing, i) => {
    let x = 0
    let y = 0
    let z = 0
    let rotX = (rand() - 0.5) * 0.12
    let rotY = (rand() - 0.5) * 0.28
    let rotZ = (rand() - 0.5) * 0.06

    if (shape === 'disk') {
      const t = (i + 0.5) / n
      const radius = Math.sqrt(t) * (1 + rand() * 0.15)
      const theta = Math.PI * (3 - Math.sqrt(5)) * i
      x = Math.cos(theta) * radius
      z = Math.sin(theta) * radius
      y = (rand() - 0.5) * 0.22
    } else if (shape === 'gaussian') {
      x = randomGaussian(rand) * 0.85
      y = randomGaussian(rand) * 0.55
      z = randomGaussian(rand) * 0.85
    } else if (shape === 'grid') {
      // Near-square lattice in XY, shallow Z layers — rectilinear archive wall
      const cols = Math.max(1, Math.ceil(Math.sqrt(n * 1.35)))
      const rows = Math.max(1, Math.ceil(n / cols))
      const col = i % cols
      const row = Math.floor(i / cols)
      const cell = 2.2 / Math.max(cols - 1, 1)
      const rowPitch = 2.0 / Math.max(rows - 1, 1)
      x = (col - (cols - 1) / 2) * cell + (rand() - 0.5) * cell * 0.12
      y = ((rows - 1) / 2 - row) * rowPitch + (rand() - 0.5) * rowPitch * 0.1
      z = (rand() - 0.5) * 0.55
      rotX = (rand() - 0.5) * 0.04
      rotY = (rand() - 0.5) * 0.08
      rotZ = (rand() - 0.5) * 0.03
    } else {
      // Fibonacci sphere — absolute size normalized later by fitLayoutToViewport
      const t = i / Math.max(n - 1, 1)
      const yUnit = 1 - 2 * t
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yUnit * yUnit))
      const theta = Math.PI * (3 - Math.sqrt(5)) * i
      const r = 1 + rand() * 0.55
      x = Math.cos(theta) * radiusAtY * r
      z = Math.sin(theta) * radiusAtY * r
      y = yUnit * r * 0.78 + (rand() - 0.5) * 0.08
    }

    const baseH =
      (n > 80 ? 0.22 + rand() * 0.1 : 0.55 + rand() * 0.2) * cardSize
    return {
      drawing,
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: baseH,
    }
  })
}

/**
 * Center on the mean card position (visual mass), then uniformly scale so the
 * padded AABB fills `margin` of the frustum. Applies a slight upward optical
 * lift so flat layouts (Disk) don't sit low in the frame.
 */
function fitLayoutToViewport(
  items: LayoutItem[],
  camera: THREE.PerspectiveCamera,
  aspect: number,
  margin: number,
): LayoutItem[] {
  if (items.length === 0) return items

  let cx = 0
  let cy = 0
  let cz = 0
  for (const item of items) {
    cx += item.position[0]
    cy += item.position[1]
    cz += item.position[2]
  }
  const inv = 1 / items.length
  cx *= inv
  cy *= inv
  cz *= inv

  let maxX = 0
  let maxY = 0
  for (const item of items) {
    const imgAspect = item.drawing.width / item.drawing.height
    const h = item.scale
    const w = h * imgAspect
    maxX = Math.max(maxX, Math.abs(item.position[0] - cx) + w / 2)
    maxY = Math.max(maxY, Math.abs(item.position[1] - cy) + h / 2)
  }

  // Stable fit distance (origin plane) — nearer-card fitting undersized the cloud
  const dist = Math.max(1.5, Math.abs(camera.position.z))
  const vFov = THREE.MathUtils.degToRad(camera.fov)
  const visibleH = 2 * Math.tan(vFov / 2) * dist * margin
  const visibleW = visibleH * aspect
  const scale = Math.min(
    visibleW / (2 * Math.max(maxX, 1e-6)),
    visibleH / (2 * Math.max(maxY, 1e-6)),
  )

  if (!Number.isFinite(scale) || scale <= 0) return items

  const yLift = maxY * scale * CLOUD_OPTICAL_Y_LIFT

  return items.map((item) => ({
    ...item,
    position: [
      (item.position[0] - cx) * scale,
      (item.position[1] - cy) * scale + yLift,
      (item.position[2] - cz) * scale,
    ],
    scale: item.scale * scale,
  }))
}

function usePageClearColor() {
  const [color, setColor] = useState('#dbe2d8')

  useEffect(() => {
    const read = () => {
      const lab = document.querySelector('.orbital-lab-page')
      if (lab) {
        const bg = getComputedStyle(lab).backgroundColor
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          setColor(bg)
          return
        }
      }
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim()
      if (raw) setColor(raw)
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => obs.disconnect()
  }, [])

  return color
}

function useTabVisible() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return visible
}

type DrawingPlaneProps = {
  item: LayoutItem
  index: number
  focusedId: string | null
  onSelect: (id: string | null) => void
  entered: boolean
  focusSize: number
  elevation: OrbitalElevation
  shadowMap: THREE.CanvasTexture
}

function isDarkTheme() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

/**
 * Soft = Figma rest elevation on every non-focused card.
 * Focus = rest elevation only on background cards while something is focused.
 * Focused card is always flat (zero elevation).
 */
function targetElevationOpacity(
  elevation: OrbitalElevation,
  isFocused: boolean,
  isDimmed: boolean,
) {
  if (elevation === 'off' || isFocused) return 0
  if (elevation === 'focus' && !isDimmed) return 0
  return elevationOpacity('rest', isDarkTheme())
}

/** Soft rectangular falloff matching CSS box-shadow blur (shared across cards). */
function createElevationShadowMap() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  ctx.clearRect(0, 0, size, size)
  // Blur a filled rect so edges feather like box-shadow; solid core sits under the card.
  ctx.filter = 'blur(18px)'
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'
  const inset = 56
  ctx.fillRect(inset, inset, size - inset * 2, size - inset * 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.NoColorSpace
  texture.needsUpdate = true
  return texture
}

function DrawingPlane({
  item,
  index,
  focusedId,
  onSelect,
  entered,
  focusSize,
  elevation,
  shadowMap,
}: DrawingPlaneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  const shadowMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const shadowMeshRef = useRef<THREE.Mesh>(null)
  const { camera, gl } = useThree()
  const texture = useTexture(item.drawing.src, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    tex.needsUpdate = true
  })
  const aspect = item.drawing.width / item.drawing.height
  const height = item.scale
  const width = height * aspect
  const isFocused = focusedId === item.drawing.id
  const isDimmed = focusedId !== null && !isFocused
  const wantsShadow = elevation !== 'off'
  const shadowLayout = elevationWorldLayout('rest', height)
  const shadowW = width * (1 + shadowLayout.pad)
  const shadowH = height * (1 + shadowLayout.pad)

  // Seed + keep rest pose in sync when fit/layout updates (size, shape, etc.).
  // GSAP owns transforms during focus/dim — don't fight those tweens.
  useEffect(() => {
    const group = groupRef.current
    if (!group || isFocused || isDimmed) return
    gsap.killTweensOf(group.position)
    gsap.killTweensOf(group.rotation)
    group.position.set(...item.position)
    group.rotation.set(...item.rotation)
  }, [item.position, item.rotation, isFocused, isDimmed])

  // Keep shadow offset/size in sync with elevation token + plane size
  useEffect(() => {
    const mesh = shadowMeshRef.current
    if (!mesh) return
    mesh.position.set(shadowLayout.offsetX, shadowLayout.offsetY, -0.02)
    mesh.scale.set(1, 1, 1)
  }, [shadowLayout.offsetX, shadowLayout.offsetY])

  // Entrance
  useEffect(() => {
    const group = groupRef.current
    const mat = matRef.current
    const shadowMat = shadowMatRef.current
    if (!group || !mat || !entered) return

    group.scale.set(0.001, 0.001, 0.001)
    mat.opacity = 0
    if (shadowMat) shadowMat.opacity = 0
    gsap.to(group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.7,
      delay: Math.min(index * 0.006, 1.8),
      ease: 'power3.out',
    })
    gsap.to(mat, {
      opacity: 1,
      duration: 0.55,
      delay: Math.min(index * 0.006, 1.8),
      ease: 'power2.out',
    })
    if (shadowMat) {
      gsap.to(shadowMat, {
        opacity: targetElevationOpacity(elevation, false, false),
        duration: 0.55,
        delay: Math.min(index * 0.006, 1.8),
        ease: 'power2.out',
      })
    }
  }, [entered, index, elevation])

  // Focus / dim / elevation
  useEffect(() => {
    const group = groupRef.current
    const mat = matRef.current
    const shadowMat = shadowMatRef.current
    if (!group || !mat) return

    const [ox, oy, oz] = item.position
    const [rx, ry, rz] = item.rotation

    const tweens: gsap.core.Tween[] = []
    const shadowOpacity = targetElevationOpacity(elevation, isFocused, isDimmed)

    if (isFocused) {
      const perspective =
        camera instanceof THREE.PerspectiveCamera ? camera : null
      const focusScale = perspective
        ? focusScaleForViewportHeight(height, perspective, FOCUS_Z, focusSize)
        : 3.2

      mat.opacity = 1
      mat.depthTest = false
      mat.depthWrite = false
      group.renderOrder = 999

      tweens.push(
        gsap.to(group.position, {
          x: 0,
          y: 0,
          z: FOCUS_Z,
          duration: 0.85,
          ease: 'power3.inOut',
        }),
        gsap.to(group.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.85,
          ease: 'power3.inOut',
        }),
        gsap.to(group.scale, {
          x: focusScale,
          y: focusScale,
          z: focusScale,
          duration: 0.85,
          ease: 'power3.inOut',
        }),
        gsap.to(mat, { opacity: 1, duration: 0.2, overwrite: true }),
      )
    } else if (isDimmed) {
      mat.depthTest = true
      mat.depthWrite = false
      group.renderOrder = 0
      tweens.push(
        gsap.to(group.position, {
          x: ox * 1.08,
          y: oy * 1.08,
          z: oz * 1.08,
          duration: 0.7,
          ease: 'power2.out',
        }),
        gsap.to(mat, { opacity: 0.22, duration: 0.5 }),
        gsap.to(group.scale, { x: 0.92, y: 0.92, z: 0.92, duration: 0.5 }),
      )
    } else {
      mat.depthTest = true
      mat.depthWrite = false
      group.renderOrder = 0
      tweens.push(
        gsap.to(group.position, {
          x: ox,
          y: oy,
          z: oz,
          duration: 0.75,
          ease: 'power3.out',
        }),
        gsap.to(group.rotation, {
          x: rx,
          y: ry,
          z: rz,
          duration: 0.75,
          ease: 'power3.out',
        }),
        gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.6 }),
        gsap.to(mat, { opacity: 1, duration: 0.5 }),
      )
    }

    if (shadowMat) {
      tweens.push(
        gsap.to(shadowMat, {
          opacity: shadowOpacity,
          duration: 0.45,
          overwrite: true,
        }),
      )
    }

    return () => {
      tweens.forEach((t) => t.kill())
    }
  }, [
    isFocused,
    isDimmed,
    item.position,
    item.rotation,
    camera,
    height,
    focusSize,
    elevation,
  ])

  return (
    <group ref={groupRef}>
      {wantsShadow ? (
        <mesh
          ref={shadowMeshRef}
          position={[shadowLayout.offsetX, shadowLayout.offsetY, -0.02]}
          renderOrder={-1}
        >
          <planeGeometry args={[shadowW, shadowH]} />
          <meshBasicMaterial
            ref={shadowMatRef}
            map={shadowMap}
            color="#000000"
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ) : null}
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect(isFocused ? null : item.drawing.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

type OrbitState = {
  pointerDown: boolean
  dragging: boolean
  yaw: number
  pitch: number
  velocityYaw: number
  velocityPitch: number
}

type CloudProps = {
  focusedId: string | null
  onSelect: (id: string | null) => void
  onGrabbingChange?: (grabbing: boolean) => void
  settings: OrbitalSettings
}

const DRAG_THRESHOLD_PX = 6
const PITCH_LIMIT = Math.PI * 0.42

function ImageCloud({
  focusedId,
  onSelect,
  onGrabbingChange,
  settings,
}: CloudProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera, size, gl } = useThree()
  const [entered, setEntered] = useState(false)
  const shadowMap = useMemo(() => createElevationShadowMap(), [])
  useEffect(() => {
    return () => {
      shadowMap.dispose()
    }
  }, [shadowMap])
  const focusedRef = useRef(focusedId)
  useEffect(() => {
    focusedRef.current = focusedId
  }, [focusedId])
  const settingsRef = useRef(settings)
  useEffect(() => {
    settingsRef.current = settings
  }, [settings])
  const orbit = useRef<OrbitState>({
    pointerDown: false,
    dragging: false,
    yaw: 0,
    pitch: 0,
    velocityYaw: 0,
    velocityPitch: 0,
  })
  const dragStart = useRef({ x: 0, y: 0 })
  const lastPointer = useRef({ x: 0, y: 0 })

  const drawings = useMemo(
    () => sampleOrbitalDrawings(settings.density, settings.seed),
    [settings.density, settings.seed],
  )

  const layout = useMemo(() => {
    const raw = layoutCloud(
      drawings,
      settings.shape,
      settings.cardSize,
      settings.seed,
    )
    if (!(camera instanceof THREE.PerspectiveCamera)) return raw
    // Avoid fitting against a 0×0 first paint — locks the cloud off-center
    if (size.width < 64 || size.height < 64) return raw
    const aspect = size.width / Math.max(size.height, 1)
    return fitLayoutToViewport(raw, camera, aspect, CLOUD_VIEW_MARGIN)
  }, [
    camera,
    size.width,
    size.height,
    drawings,
    settings.shape,
    settings.cardSize,
    settings.seed,
  ])

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [drawings, settings.shape, settings.cardSize, settings.seed])

  useEffect(() => {
    const el = gl.domElement

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || focusedRef.current) return
      const o = orbit.current
      o.pointerDown = true
      o.dragging = false
      o.velocityYaw = 0
      o.velocityPitch = 0
      dragStart.current = { x: e.clientX, y: e.clientY }
      lastPointer.current = { x: e.clientX, y: e.clientY }
      onGrabbingChange?.(true)
      el.setPointerCapture(e.pointerId)
    }

    const onMove = (e: PointerEvent) => {
      const o = orbit.current
      if (!o.pointerDown || focusedRef.current) return

      const totalDx = e.clientX - dragStart.current.x
      const totalDy = e.clientY - dragStart.current.y
      if (!o.dragging && Math.hypot(totalDx, totalDy) < DRAG_THRESHOLD_PX) {
        return
      }
      o.dragging = true

      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      lastPointer.current = { x: e.clientX, y: e.clientY }

      const sensitivity = settingsRef.current.orbitSensitivity
      const dYaw = dx * sensitivity
      const dPitch = dy * sensitivity
      o.yaw += dYaw
      o.pitch = THREE.MathUtils.clamp(
        o.pitch + dPitch,
        -PITCH_LIMIT,
        PITCH_LIMIT,
      )
      o.velocityYaw = dYaw
      o.velocityPitch = dPitch
    }

    const onUp = (e: PointerEvent) => {
      const o = orbit.current
      o.pointerDown = false
      onGrabbingChange?.(false)
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        // already released
      }
      requestAnimationFrame(() => {
        o.dragging = false
      })
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [gl, onGrabbingChange])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return
    const o = orbit.current

    if (focusedId) {
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, 0.1)
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, 0, 0.1)
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, 0, 0.1)
      o.velocityYaw = 0
      o.velocityPitch = 0
      return
    }

    if (!o.dragging && !o.pointerDown) {
      o.yaw += o.velocityYaw
      o.pitch = THREE.MathUtils.clamp(
        o.pitch + o.velocityPitch,
        -PITCH_LIMIT,
        PITCH_LIMIT,
      )
      const damp = Math.pow(settingsRef.current.inertia, delta * 60)
      o.velocityYaw *= damp
      o.velocityPitch *= damp
      if (Math.abs(o.velocityYaw) < 1e-5) o.velocityYaw = 0
      if (Math.abs(o.velocityPitch) < 1e-5) o.velocityPitch = 0
    }

    group.rotation.order = 'YXZ'
    group.rotation.y = o.yaw
    group.rotation.x = o.pitch
    group.rotation.z = 0
  })

  return (
    <group ref={groupRef}>
      {layout.map((item, index) => (
        <DrawingPlane
          key={`${item.drawing.id}-${settings.seed}`}
          item={item}
          index={index}
          focusedId={focusedId}
          onSelect={(id) => {
            if (orbit.current.dragging) return
            onSelect(id)
          }}
          entered={entered}
          focusSize={settings.focusSize}
          elevation={settings.elevation}
          shadowMap={shadowMap}
        />
      ))}
    </group>
  )
}

function ClickAway({ onClear }: { onClear: () => void }) {
  return (
    <mesh
      position={[0, 0, -8]}
      onClick={(e) => {
        e.stopPropagation()
        onClear()
      }}
      visible={false}
    >
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial />
    </mesh>
  )
}

function TextureLoadingHint() {
  const { active, progress } = useProgress()
  if (!active && progress >= 100) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/70 text-regular text-muted-foreground">
      Loading drawings… {Math.round(progress)}%
    </div>
  )
}

export function OrbitalDrawingsCanvas({
  settings,
}: {
  settings: OrbitalSettings
}) {
  const clearColor = usePageClearColor()
  const tabVisible = useTabVisible()
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const dragGuard = useRef(false)

  const onSelect = useCallback((id: string | null) => {
    setFocusedId(id)
  }, [])

  const onGrabbingChange = useCallback((grabbing: boolean) => {
    setIsGrabbing(grabbing)
    if (grabbing) dragGuard.current = true
    else {
      requestAnimationFrame(() => {
        dragGuard.current = false
      })
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocusedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <div
      className={
        isGrabbing
          ? 'absolute inset-0 h-full w-full touch-none cursor-grabbing'
          : 'absolute inset-0 h-full w-full touch-none cursor-grab'
      }
      role="img"
      aria-label="Interactive 3D orbital interface of drawings. Drag to orbit. Click a drawing to focus it; press Escape to restore."
    >
      <TextureLoadingHint />
      <Canvas
        camera={{
          position: [0, 0, CAMERA_Z],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 80,
        }}
        dpr={[1, 1.5]}
        frameloop={tabVisible ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[clearColor]} />
        <ClickAway
          onClear={() => {
            if (dragGuard.current) return
            setFocusedId(null)
          }}
        />
        <Suspense fallback={null}>
          <ImageCloud
            focusedId={focusedId}
            onSelect={onSelect}
            onGrabbingChange={onGrabbingChange}
            settings={settings}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
