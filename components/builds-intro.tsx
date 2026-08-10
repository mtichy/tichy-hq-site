/** Intro copy for the /builds index (right column beside the sidebar). */
export function BuildsIntro() {
  return (
    <div className="flex w-full max-w-[65ch] flex-col gap-4">
      <p className="text-regular font-bold leading-regular text-pretty text-foreground">
        After building and managing confidential products at McKinsey &amp;
        Company for 12 years I will be using this space to share new projects
        and experiments moving forward.
      </p>
      <p className="text-regular leading-regular text-pretty text-foreground">
        For starters, I&apos;ve included a behind-the-scenes look at the process
        behind my build of this site from design system to deployment as well as
        a snapshot of a global employee recognition platform that I designed,
        built, and managed that McKinsey has written about publicly multiple
        times. <span className="font-bold">More to come...</span>
      </p>
    </div>
  )
}
