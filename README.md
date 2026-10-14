# Cyrbyte Security

A normal, scrolling cybersecurity website with two decorative video sections and five dedicated service articles. All sections and article content are present in the initial HTML. No timers, video progress or JavaScript are required to access the content or follow article links.

Videos loop independently inside the hero and defense sections. The tunnel video loads when it enters the viewport. Playback pauses off-screen and respects reduced-motion preferences. Posters remain visible when media cannot play.

Service cards open static pages in `services/`. These contain assessment scope, deliverables, preparation, next steps and links to related services. Navigation uses ordinary links and anchor targets. The enquiry brief prepares an email draft for the visitor to review and send through their email app; it does not send automatically.

No installation or build step is required. Serve `index.html`, `styles.css`, `script.js`, `services/` and `assets/` from the project root. The existing GitHub repository and Vercel project host this site. `vercel.json` enables clean URLs.
