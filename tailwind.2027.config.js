/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/index-2027.js",
        "./src/js/2027/**/*.js",
        "./src/layouts/2027/**/*.html",
        "./src/partials/2027/**/*.html",
        "./src/templates/2027/**/*.html",
        "./src/modules/2027/**/*.{html,js}",
    ],
    theme: {
        fontFamily: {
            sans: ["'Pin Sans'", "system-ui", "-apple-system", "'Segoe UI'", "Helvetica", "Arial", "sans-serif"],
        },

        // Replaces (not extends) Tailwind's palette: only design-system colors exist.
        colors: {
            transparent: "transparent",
            current: "currentColor",
            // Pinterest red, used only for form errors / required marks.
            alert: "#E60023",
            black: "#000000",
            white: "#FFFFFF",
            grey: {
                "050": "#F6F6F3",
                100: "#E5E5E0",
                200: "#91918C",
                250: "#74746C",
                350: "#494943",
            },
            tvgreen: {
                DEFAULT: "#23E596",
                "050": "#DEFBEF",
                200: "#91F2CB",
                400: "#1DA973",
                600: "#19845D", // primary button + link color (accessible)
                800: "#0D422F",
            },
        },

        // Type scale (replaces Tailwind's). [size, { lineHeight, letterSpacing }]
        fontSize: {
            display: ["120px", { lineHeight: "0.8", letterSpacing: "-0.01em" }], // hero H1
            "display-md": ["88px", { lineHeight: "0.8", letterSpacing: "-0.01em" }],
            "display-sm": ["64px", { lineHeight: "0.95", letterSpacing: "-0.01em" }], // CTA heading
            "heading-hero": ["56px", { lineHeight: "1.05" }], // product / solutions page H1
            "heading-xl": ["48px", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
            "heading-lg": ["44px", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
            "heading-md": ["36px", { lineHeight: "1", letterSpacing: "-0.03em" }], // section heading (Resources)
            "heading-feature": ["40px", { lineHeight: "1.11" }], // product / solutions section headings
            "heading-sm": ["32px", { lineHeight: "1", letterSpacing: "-0.03em" }],
            "quote-lg": ["36px", { lineHeight: "1.16" }], // testimonial band
            quote: ["32px", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
            subhead: ["28px", { lineHeight: "1.1", letterSpacing: "-0.5px" }],
            "card-title": ["24px", { lineHeight: "1", letterSpacing: "-0.03em" }],
            title: ["22px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
            "eyebrow-lg": ["20px", { lineHeight: "1.11", letterSpacing: "-0.04em" }], // offer banner eyebrow
            "body-lg": ["20px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
            body: ["18px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
            "body-relaxed": ["18px", { lineHeight: "1.38" }], // product / solutions body + eyebrow
            meta: ["18px", { lineHeight: "1", letterSpacing: "-0.03em" }], // card eyebrow / "Read More →"
            nav: ["16px", { lineHeight: "1.4" }],
            "body-sm": ["15px", { lineHeight: "1.2" }],
            button: ["14px", { lineHeight: "1.4", letterSpacing: "-0.005em" }],
            caption: ["14px", { lineHeight: "1.2" }],
            "badge-lg": ["18px", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
            badge: ["14px", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
            "badge-sm": ["12px", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
            label: ["12px", { lineHeight: "1.2" }],
            fine: ["8px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        },

        // Line heights (replaces Tailwind's) — for overriding a type token's default.
        lineHeight: {
            none: "1",
            heading: "0.9",
            compact: "1.15",
            body: "1.2",
            ui: "1.4",
        },

        extend: {
            fontWeight: {
                heavy: "900",
            },
            letterSpacing: {
                snug: "-0.04em", // offer banner heading
            },
            borderRadius: {
                button: "14px",
                20: "20px",
                32: "32px",
                44: "44px",
                pill: "999px",
            },
            borderWidth: {
                // Named stroke-* so they don't clash with Tailwind's side utilities (border-s / border-l)
                "stroke-s": "1.5px", // Stroke/S
                "stroke-l": "4px", // Stroke/L
            },
            boxShadow: {
                floating: "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
            },
            inset: {
                "frame-bleed": "-2.25%", // scrolling image bleeds off the frame's left edge
                "hero-lottie-x": "-9.5%", // hero Lottie shifted left of its card
                "hero-lottie-y": "-17%", // hero Lottie shifted above its card
            },
            spacing: {
                30: "7.5rem",
                header: "122px",
                "header-sm": "88px",
            },
            width: {
                "diagram-top": "72.24%", // Brain Trust connector art above the columns (924.66 / 1280)
                "diagram-bottom": "73.02%", // Brain Trust connector art below the columns (934.67 / 1280)
                logo: "155px",
                "logo-sm": "132px",
                // Hero image grid: 1576px at the 1468px design width (overflows ~54px per side),
                // scales proportionally below that, caps at 1576px on larger screens.
                hero: "min(107.35vw, 1576px)",
                "hero-media": "819px", // product hero dashboard (bleeds past the right edge)
                "hero-photo": "744px", // solutions hero photo (flush right)
                "frame-img": "93.25%", // scrolling image inside a dark frame
                "nav-posts": "408px", // Resources dropdown "Latest" column: post titles wrap to ~2 lines
            },
            maxWidth: {
                feature: "1342px", // product / solutions media rows and panels
                diagram: "1280px", // Patents "Brain Trust" diagram row
                site: "1248px", // header/footer/hero container
                banner: "1226px", // offer banner box
                wide: "1210px", // logo wall box, feature panel row
                media: "1192px", // product animation frame
                content: "1040px", // two-column sections, resource cards
                logos: "848px", // logo wall: four 212px cells per row
                copy: "609px",
                "hero-copy": "505px", // media hero heading
                "hero-body": "469px", // media hero body copy
                "feature-copy": "440px", // media split text (narrow)
                "feature-copy-wide": "499px", // media split text (wide)
            },
            maxHeight: {
                "hero-contained": "32rem", // media hero "contained" image: keeps tall portrait art from stretching the band
            },
            minHeight: {
                "media-card": "40rem", // media split "card" height (image cropped top/bottom)
            },
            // Two-column layouts (left column includes its gutter).
            gridTemplateColumns: {
                hero: "420fr 688fr 420fr", // hero image grid: side | center | side (24px gaps)
                split: "450px 609px", // Guaranteed Outcomes, Measure
                panel: "506px 612px", // feature panel: image panel | text (with gap-16)
                tabs: "437px 514px", // Activate / Measure / Optimize
                quote: "478px 518px", // testimonial: image column | quote
                media: "minmax(0, 1fr) 743px", // media split: text | image
                "media-reverse": "743px minmax(0, 1fr)", // media split: image | text
                "media-panel": "665px minmax(0, 1fr)", // media split inside a Grey 050 panel
                band: "250px minmax(0, 1fr)", // testimonial band: round photo | quote
                offer: "minmax(0, 544px) 336px", // offer banner: copy | image
                timeline: "8rem 1rem minmax(0, 1fr) minmax(0, 1fr)", // customer timeline: logo | rail | story | image
                story: "20rem minmax(0, 1fr)", // case study: sticky summary | story
                "media-card": "minmax(0, 1fr) 560px", // media split "card": copy | cropped image
                "media-card-reverse": "560px minmax(0, 1fr)",
            },
            aspectRatio: {
                card: "328 / 171", // resource card image
                "hero-media": "819 / 595", // product hero dashboard crop
                "hero-photo": "744 / 697", // solutions hero photo
                "media-frame": "665 / 577", // dark image in a rounded frame
            },
        },
    },
    plugins: [],
};
