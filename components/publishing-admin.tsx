'use client'

import { useState } from 'react'

/**
 * Redrawn admin surface for /builds/publishing-admin.
 * Sanitized reconstruction of an internal editorial CMS "Create an Article"
 * panel. No real content, no backend, no storage. Structure only.
 */

const SECTIONS = [
  'Article Details',
  'Media',
  'Authors/Contribs',
  'Tags',
  'URL Path',
  'Publish status',
] as const

type Section = (typeof SECTIONS)[number]

const fieldClass =
  'w-full rounded-md border border-border bg-background px-3 py-2 text-small leading-small text-muted-foreground'

const rowClass =
  'flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-small leading-small text-muted-foreground'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-small leading-small font-medium text-foreground">
      {children}
    </span>
  )
}

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-medium font-bold leading-medium text-foreground">
      {children}
    </h3>
  )
}

export function PublishingAdmin() {
  const [section, setSection] = useState<Section>('Article Details')
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [stacks, setStacks] = useState<string[]>(['Hero', 'Default Text Stack'])
  const [autoUrl, setAutoUrl] = useState(true)
  const [published, setPublished] = useState(false)
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  function moveStack(index: number, delta: number) {
    const next = [...stacks]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setStacks(next)
  }

  return (
    <div className="w-full overflow-hidden rounded-md border border-border bg-muted">
      <div className="border-b border-border px-4 py-3">
        <p className="text-small leading-small font-bold text-foreground">
          Create an Article
        </p>
      </div>

      <div className="flex flex-col gap-0 sm:flex-row">
        <nav
          aria-label="Article sections"
          className="flex shrink-0 flex-row gap-1 overflow-x-auto border-b border-border p-3 sm:w-[190px] sm:flex-col sm:border-b-0 sm:border-r"
        >
          {SECTIONS.map((item) => {
            const active = item === section
            return (
              <button
                key={item}
                type="button"
                onClick={() => setSection(item)}
                aria-current={active ? 'true' : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-left text-small leading-small transition-colors ${
                  active
                    ? 'bg-background font-bold text-foreground'
                    : 'text-muted-foreground hover:bg-background/60'
                }`}
              >
                {item}
              </button>
            )
          })}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-6 p-5">
          {section === 'Article Details' && (
            <>
              <PanelHeading>Hero</PanelHeading>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <Label>Eyebrow (optional)</Label>
                  <div className={fieldClass}>&nbsp;</div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <Label>Display Date</Label>
                  <div className={fieldClass}>&nbsp;</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Headline</Label>
                <div className={fieldClass}>&nbsp;</div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Subhed</Label>
                <div className={`${fieldClass} h-20`}>&nbsp;</div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  aria-expanded={advancedOpen}
                  className="self-start text-small leading-small font-bold text-link"
                >
                  {advancedOpen ? '▾' : '▸'} Advanced Hero options
                </button>
                {advancedOpen && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-1 rounded-md border border-border bg-background p-4 text-small leading-small text-muted-foreground sm:grid-cols-2">
                    <span>Upload video</span>
                    <span>Column width</span>
                    <span>Background color</span>
                    <span>Horizontal position</span>
                    <span>Color or gradient overlay</span>
                    <span>Vertical position</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <PanelHeading>Stacks Manager</PanelHeading>
                <p className="text-small leading-small text-muted-foreground">
                  Every block on the page, in order. Editors compose here.
                </p>
                <ul className="flex flex-col gap-2">
                  {stacks.map((stack, index) => (
                    <li key={`${stack}-${index}`} className={rowClass}>
                      <span className="truncate text-foreground">{stack}</span>
                      <span className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => moveStack(index, -1)}
                          disabled={index === 0}
                          aria-label={`Move ${stack} up`}
                          className="rounded border border-border px-2 py-0.5 disabled:opacity-40"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveStack(index, 1)}
                          disabled={index === stacks.length - 1}
                          aria-label={`Move ${stack} down`}
                          className="rounded border border-border px-2 py-0.5 disabled:opacity-40"
                        >
                          ↓
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setStacks([...stacks, 'Pull Quote'])}
                  className="self-start rounded-md border border-border bg-background px-3 py-2 text-small leading-small font-bold text-foreground"
                >
                  + Add New Stack
                </button>
                <p className="text-small leading-small text-muted-foreground">
                  Anything added here is built from sanctioned design-system
                  variables, so it cannot drift.
                </p>
              </div>
            </>
          )}

          {section === 'Media' && (
            <>
              <PanelHeading>Images</PanelHeading>
              <p className="text-small leading-small text-muted-foreground">
                JPG, PNG, GIF
              </p>
              <div className={rowClass}>Upload 16x9 image</div>
              <div className={rowClass}>Upload 1x1 image</div>
              <PanelHeading>Video</PanelHeading>
              <div className={rowClass}>Add video for feed display</div>
              <p className="text-small leading-small text-muted-foreground">
                Aspect ratios are named rather than free-form. The feed decides
                the crop, so the author never has to.
              </p>
            </>
          )}

          {section === 'Authors/Contribs' && (
            <>
              <PanelHeading>Authors and Contributors</PanelHeading>
              <div className={rowClass}>Add Author</div>
              <div className={rowClass}>Add Contributor</div>
              <div className={rowClass}>Add custom credit</div>
              <p className="text-small leading-small text-muted-foreground">
                Three credit types, not one author field. Bylines, contributor
                credit, and everything the first two do not cover.
              </p>
            </>
          )}

          {section === 'Tags' && (
            <>
              <PanelHeading>Tags</PanelHeading>
              <div className={rowClass}>Add Tag</div>
              <p className="text-small leading-small text-muted-foreground">
                Tags come from a governed taxonomy. Free-text tagging is how a
                corpus stops being searchable.
              </p>
            </>
          )}

          {section === 'URL Path' && (
            <>
              <PanelHeading>URL Path</PanelHeading>
              <label className="flex items-center gap-3 text-small leading-small text-foreground">
                <input
                  type="checkbox"
                  checked={autoUrl}
                  onChange={() => setAutoUrl(!autoUrl)}
                  className="size-4 accent-[var(--color-brand-cyan-strong)]"
                />
                Automatic URL
              </label>
              <div className="flex items-center gap-3">
                <div className={`${fieldClass} font-mono`}>
                  /article/test-zone
                </div>
                <button
                  type="button"
                  disabled={autoUrl}
                  className="shrink-0 rounded-md border border-border bg-background px-3 py-2 text-small leading-small font-bold text-foreground disabled:opacity-40"
                >
                  EDIT
                </button>
              </div>
              <p className="text-small leading-small text-muted-foreground">
                Safe default on, escape hatch one click away. Same argument as
                the design-system constraint, applied to slugs.
              </p>
            </>
          )}

          {section === 'Publish status' && (
            <>
              <PanelHeading>Publish Status</PanelHeading>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 text-small leading-small text-foreground">
                  <input
                    type="radio"
                    name="publish-state"
                    checked={!published}
                    onChange={() => setPublished(false)}
                    className="size-4 accent-[var(--color-brand-cyan-strong)]"
                  />
                  Not Published
                </label>
                <label className="flex items-center gap-3 text-small leading-small text-foreground">
                  <input
                    type="radio"
                    name="publish-state"
                    checked={published}
                    onChange={() => setPublished(true)}
                    className="size-4 accent-[var(--color-brand-cyan-strong)]"
                  />
                  Published
                </label>
                <div className="flex flex-col gap-3 pl-7">
                  {[
                    'Hide from Search',
                    'Hide from Feeds',
                    'Hide from News Home Page',
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 text-small leading-small ${
                        published
                          ? 'text-foreground'
                          : 'text-muted-foreground opacity-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={!published}
                        checked={Boolean(hidden[option]) && published}
                        onChange={() =>
                          setHidden({ ...hidden, [option]: !hidden[option] })
                        }
                        className="size-4 accent-[var(--color-brand-cyan-strong)]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-small leading-small text-muted-foreground">
                Published is not one thing. A live article can be hidden from
                search, from feeds, or from the home page, independently. Try
                switching to Published.
              </p>
            </>
          )}

          <div className="flex justify-end border-t border-border pt-4">
            <button
              type="button"
              className="rounded-md bg-primary px-6 py-2 text-small leading-small font-bold text-primary-foreground"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
