# October 2026 reskin: go-live notes

Went live 2026-11-04. Portal 8975772, theme `tvScientific 2022 Atlas Pro/cli-build`.

## What changed on the site

- 44 rebuilt pages were published from Content Staging and replaced their live versions. Their page IDs changed when they were published.
- About 176 old pages stay on their old templates. They now get the new header and footer, Pin Sans and the new colours.
- Blog, Reports and Webinars use the 2027 post and listing templates.
- News uses the 2027 post template but keeps its custom listing, `templates/new-listing.html`, restyled in place.
- HubSpot system pages use their 2027 templates.

## How the CSS fits together

| Bundle | Config | Output | Loaded by |
|---|---|---|---|
| Old pages | `tailwind.config.js` | `css/styles.css` | `layouts/base.html` |
| New pages | `tailwind.2027.config.js` | `css/2027/site.css` | `layouts/2027/base.html` |
| Header and footer on old pages | `tailwind.2027-legacy.config.js` | `css/2027/legacy.css` | `layouts/base.html` |

- `tailwind.config.js` reads its brand colours and fonts from `tailwind.2027.config.js`. Change a colour there and both systems follow.
- `css/2027/legacy.css` also holds page-level fixes for old pages: buttons, legal page text, the News hero and `/meet-tvscientific`.
- Legal page text is scoped by page ID, so a new legal page needs its ID added to that list.
- `tailwind.legacy-safelist.json` keeps old colour classes that are stored in page content, such as `!bg-[#1c4633]` in section settings. Removing it turns those sections white.
- The old theme's `main.css` sets `img { margin: auto }` on every image. Rows with an icon need their own margin reset on old pages.

## Working on the theme

- Run `npm start` and `hs cms watch dist "tvScientific 2022 Atlas Pro/cli-build" --account=tvsci`. Saves go straight to the live theme.
- Restart `npm start` after changing `webpack.config.js`. The watcher does not reload it, and `legacy.css` only builds with the current config.
- Check that a page has no unpublished edits before pushing it live with the API, because pushing publishes the whole draft.

## Blog templates

| Blog | Post template | Listing template |
|---|---|---|
| Blog | `2027/blog-post.html` | `2027/blog-listing.html` |
| News | `2027/blog-post.html` | `new-listing.html` |
| Reports | `2027/report-post.html` | `2027/blog-listing.html` |
| Webinars | `2027/webinar-post.html` | `2027/blog-listing.html` |

Events, Case Studies, Engineering, Newsletters and Sandbox are unchanged.

## Modules

- The editor shows 25 modules from `modules/2027`, plus the `Email - *` modules, which stay visible for marketing emails.
- Old modules are hidden with `is_available_for_new_content: false`, not deleted. Pages already using them keep working.
- Modules outside `cli-build`, in `tvScientific 2022 Atlas Pro/modules`, were hidden directly in HubSpot, so those changes are not in this repo.
- 2027 modules need the 2027 stylesheet, so use them on 2027 templates only.

## Share images

Old pages that had a featured image now use `2027-reskin/tvscientific-opengraph-2027.png`. Pages without one get it from a fallback in `layouts/base.html`.

Four pages with unpublished edits were skipped and still have their old image: `/proof`, `/go-promo-digiday`, `/holiday-ads-2025` and `/webinar/meet-tvscientific`.

## Still open

- Submit a test form on the live site and confirm it reaches HubSpot. This has not been checked.
- `/tvscientific-platform/buying` redirects to `/tvscientific-platform/ctv-media-buying`, which is a 404. The redirect needs a new target.
- Two News cards link to articles that return 404: "CTV Viewership Growth Means New Opportunities for Advertising" and "tvScientific Announces Partnership With MetricWorks".
- Six landing pages on other themes do not get the new header and footer: `/ebook/*`, `/thank-you-ctv-playbook`, `/ty-unlock-ctv-playbook-offer` and `/thank-you-holiday-playbook`.
- Page templates are still labelled "2027 Page (staging)" and "2027 Landing Page (staging)" in HubSpot.

## Rolling back

- Theme files: revert the commit and let the watcher upload the result.
- Published pages: use the version history on each page in HubSpot.
