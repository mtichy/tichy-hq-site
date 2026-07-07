import { Hyperlink } from '@/components/hyperlink'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <main className="flex max-w-xl flex-col gap-10">
        <div className="flex flex-wrap items-center gap-10 text-regular leading-regular">
          <Hyperlink href="#">Hyperlinked text</Hyperlink>
          {/* forced-hover preview to mirror the Figma Hover state */}
          <Hyperlink href="#" className="underline">
            Hyperlinked text
          </Hyperlink>
        </div>
        <p className="text-regular leading-regular text-foreground">
          Inline hypertext flows naturally within a sentence, like this{' '}
          <Hyperlink href="#">hyperlinked text</Hyperlink> that keeps the lime
          highlight tight around the words even when the link wraps across more
          than one line of body copy.
        </p>
      </main>
    </div>
  )
}
