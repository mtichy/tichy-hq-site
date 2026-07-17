export function BuildsContent() {
  return (
    <div className="w-full max-w-[600px]">
      {/* Overview */}
      <section>
                <p>Text</p>
                <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          After building and managing confidential products at McKinsey & Company for 12 years I will be using this space to share new projects and experiments moving forward.</p>

<p className="mt-4 text-regular leading-regular text-foreground text-pretty">For starters I will share a quick look at the design process and AI-powered tech stack that I used to build and deploy this site.</p>  
        </p>
      </section>

      {/* Projects */}
      <section className="mt-16">
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Projects
        </h2>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            Project title
          </h3>
          <h4 className="mt-2 text-regular font-bold leading-regular text-foreground">
            Role (Year)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>Placeholder bullet describing the build.</li>
            <li>Placeholder bullet describing the build.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
