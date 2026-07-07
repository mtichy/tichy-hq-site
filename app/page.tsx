import { LinkButton } from '@/components/link-button'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <main className="flex flex-col items-center gap-10">
        <div className="flex flex-wrap items-center justify-center gap-10">
          <LinkButton href="#">Hyperlinked text</LinkButton>
          {/* forced-hover preview to mirror the Figma Hover state */}
          <LinkButton href="#" className="underline">
            Hyperlinked text
          </LinkButton>
        </div>
        <p className="text-small text-muted-foreground">
          Default state (left) and hover state (right)
        </p>
      </main>
    </div>
  )
}
