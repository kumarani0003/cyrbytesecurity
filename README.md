# Cyrbyte Security

Static cybersecurity website for security.cyrbyte.com, deployed through the existing Vercel project cyrbytesecurity and GitHub repository kumarani0003/cyrbytesecurity.

The landing sequence uses local MP4 assets without player controls. It ends on contact. Selecting content through navigation keeps that screen in place while background videos remain animated. Service details, the engagement process, FAQs and the email brief are interactive.

The brief prepares an email to info@cyrbyte.com for the visitor to review and send; it does not send automatically. No dependency installation or build step is required. Serve index.html, styles.css, script.js and assets/ from the project root. Reduced-motion preferences use a static presentation; media failures have fallbacks.

Verified in the deployed desktop browser: stable navigation, service details and selection, video playback, enquiry draft creation and invalidation, FAQs, menu and corrected hero/contact layouts. Scripted interaction checks and asset checks also pass. Mobile visual testing is not completed.

The custom domain still requires the security CNAME at its DNS provider; deployment itself is ready on Vercel.
