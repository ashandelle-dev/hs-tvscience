# tvsci-module — Reference

Detailed reference. SKILL.md links here; read this when you need specifics.

## Design tokens

Source: `tailwind.config.js`. These are the only color classes allowed for new modules.

### Color scale (`tvs-*`)

| Token class | Hex | Use for |
|---|---|---|
| `text-tvs-green` / `bg-tvs-green` | `#23E596` | Primary brand accent, CTAs on dark, highlight words |
| `text-tvs-green-accessible` / `bg-tvs-green-accessible` | `#198960` | Primary accent on white (meets AA) |
| `bg-tvs-green-dark` | `#0F2D29` | Dark hero / footer background |
| `bg-tvs-green-light` | `#91F2CB` | Secondary accent, borders, dividers |
| `bg-tvs-green-pastel` | `#F3FFF6` | Light section backgrounds |
| `text-tvs-black` / `bg-tvs-black` | `#1F252B` | Primary body text, dark UI |
| `text-tvs-grey` / `text-tvs-grey-accessible` | `#46515B` | Body copy, muted UI |
| `border-tvs-grey-light` / `bg-tvs-grey-light` | `#D9E2EB` | Borders, dividers, chart tracks |
| `bg-tvs-grey-pastel` | `#F9FAFC` | Page/section backgrounds |
| `bg-tvs-yellow` | `#FFCD40` | Callout/warning accent |
| `bg-tvs-yellow-light` | `#FFE6A0` | Soft callout backgrounds |
| `bg-tvs-white` / `text-tvs-white` | `#FFFFFF` | Surfaces, text on dark |

Figma variable → token mapping (common cases):

| Figma variable name pattern | Tailwind class |
|---|---|
| `color/brand/green`, `accent/primary` | `bg-tvs-green` / `text-tvs-green` |
| `color/text/default`, `neutral/900` | `text-tvs-black` |
| `color/text/muted`, `neutral/600` | `text-tvs-grey` |
| `color/surface/dark`, `neutral/950` | `bg-tvs-green-dark` |
| `color/surface/default` | `bg-tvs-white` |
| `color/surface/subtle` | `bg-tvs-grey-pastel` |
| `color/border/default` | `border-tvs-grey-light` |

If Figma returns a hex that maps to a `tvs-*` token, convert. If a raw hex has no token equivalent, do **not** stop to ask — pick the best of three paths:

1. **Hardcode** the hex inline with a brief comment naming the Figma variable (one-off accents).
2. **Extend** `tailwind.config.js` under `colors.tvs.*` using the Figma variable name, kebab-cased (reused across modules or named system-wide in Figma, e.g. `oranges/light` → `tvs-orange-light`).
3. **Editable field** inside the `style` group or per-item repeater (when editors should vary it per placement, e.g. chip/badge accents).

### Typography

| Font family | Tailwind class | When |
|---|---|---|
| IBM Plex Sans | `font-plex` | Default for all modules (applied on the root element). |
| IBM Plex Mono | `font-plex-mono` | Eyebrows, tracking-widest UI labels (matches existing templates). |
| Rubik | `font-rubik` | Only if Figma explicitly specifies it. |
| Bricolage Grotesque | `font-bricolage-grotesque` | Only if Figma explicitly specifies it. |

Type scale: do not hardcode. Use the `heading.module` field pattern so editors control `header_tag`, `heading_size`, `heading_size_mobile`, and `font_weight`. For body copy, match existing templates: `text-lg leading-relaxed` for main paragraphs, `text-base` or `text-[14px]` for secondary text, `text-[14px] font-plex-mono tracking-widest uppercase` for eyebrows.

### Layout

- **Page container**: `class="tvsci-container"` (= `max-w-[1072px] mx-auto px-4`).
- **Hero container**: `class="tvsci-container"` inside a `<section class="py-16 md:py-28">`.
- **Default section padding**: `py-16 md:py-16`.
- **Rounded corners**: `rounded-lg` for cards, `rounded-xl` for large surfaces/CTA blocks.
- **Grid/flex gaps**: prefer `gap-8 md:gap-12` for 2-col layouts.

### Design-system component classes (defined in `src/css/_content.css` and `src/css/_btn.css`)

Prefer these named classes over inlined Tailwind utility bundles. They are the canonical building blocks:

| Class | What it is | When to use |
|---|---|---|
| `.tvsci-container` | `max-w-[1072px] mx-auto px-4` | The standard content container. One per section. |
| `.tvsci-eyebrow` | `font-plex-mono tracking-widest uppercase text-[14px] text-tvs-green-accessible` | Small uppercase label above a heading. Override text color with a `tvs-*` utility when needed (e.g. on dark backgrounds: `.tvsci-eyebrow text-tvs-green`). |
| `.tvsci-lead` | `font-plex text-lg leading-relaxed text-tvs-black` + auto-zeros the bottom margin of the last `<p>` (and any last direct child), so richtext output doesn't stack extra whitespace below the block | Primary body paragraph under a heading. Always wrap `richtext` output in `.tvsci-lead` so spacing behaves. Override color with a `tvs-*` utility for dark sections. |
| `.heading-xxl` / `.heading-xl` / `.heading-l` / `.heading-m` / `.heading-s` / `.heading-xs` | Fluid clamp-based display scale | **Only for static headings.** For editor-controlled headings always use the heading field group instead. |
| `.hs-button` | Primary CTA — filled green, uppercase, tracking-widest, hover scale | Every primary CTA. |
| `.hs-button.hs-button--secondary` (or `.hs-button--outline`) | Outlined ghost variant, transparent → fills dark-green on hover | Secondary CTA alongside `.hs-button`. |
| `.tvsci-multicol` | 12-col CSS grid (`grid-template-columns: repeat(12, minmax(0, 1fr))`). Gutter is driven by `--multicol-gap` (default 32px), applied as **padding** on each `.tvsci-col` — **not** as grid `gap` — so the gutter is always the visual space between adjacent visible columns regardless of track count. Pair with `.tvsci-multicol--valign-{top,center,bottom,stretch}` for row-level alignment. | Any multi-column layout. Always nest `.tvsci-col` children. |
| `.tvsci-col` | Grid item whose span + visibility are driven by CSS custom properties per breakpoint (`--span-xl`, `--span-lg`, `--span-md`, `--span-sm`, `--display-xl`…). Cascade: xl → lg → md → sm (unset vars fall back to the larger breakpoint). Modifiers: `.tvsci-col--valign-{top,center,bottom,stretch}`, `.tvsci-col--text-{left,center,right}`. | Each column inside `.tvsci-multicol`. Set `--display-*: none` to hide at a breakpoint. Set `--col-heading-size` / `--col-heading-size-mobile` on a col to override heading font-size (desktop + <768px). |

> **Why padding-based gutters?** Applying `gap: 107px` on a `repeat(12, 1fr)` grid adds 11 inter-track gaps (= 1177px), which exceeds any typical 1040px container and forces the grid to overflow. Padding on `.tvsci-col` moves the gutter inside each column instead, so the grid stays exactly 100% of its parent at any gap size.
>
> **Flush edges**: `:first-child` strips `padding-left` and `:last-child` strips `padding-right`, so outer columns sit flush with the container edges — the gutter shows only between visible columns.
>
> **Full-width columns**: any `.tvsci-col` whose span is 12 at a given breakpoint gets zero horizontal padding at that breakpoint (implemented via `[style*="--span-sm: 12"]` attribute selectors). This keeps stacked mobile columns from inheriting leftover half-gutters when the row wraps.
>
> **Sum spans to 12**: at every breakpoint, the sum of visible column spans should equal 12 (or less + explicit alignment). If you pick `5 + 6 = 11`, a whole empty 12th track (~1/12 of the container) stays reserved on the right because grid tracks don't auto-collapse. Use `5 + 7`, `4 + 8`, `6 + 6`, `3 + 9`, etc.

### Heading font-size gotcha — `!important` required

`src/css/styles.css` ships with `h2 { font-size: 24px !important }` (and responsive bumps at tablet/desktop). Any editor-controlled heading size wired through a CSS custom property **must** use `!important` on the `font-size` declaration or the base rule wins the cascade and the custom size silently disappears. The `.tvsci-col-heading` class in `_content.css` demonstrates the pattern:

```css
.tvsci-col .tvsci-col-heading {
    font-size: var(--col-heading-size, inherit) !important;
    line-height: 1.1;
    white-space: pre-line;
}
```

Apply the same `!important` rule to any new per-module heading class (`.hero-heading`, `.section-heading`, etc.) that relies on an inline CSS var for sizing.

### `<br>` support in text fields

Heading / eyebrow text fields are `type: "text"` so HubL auto-escapes their value. If editors need explicit line breaks (e.g. a two-word brand heading split onto two lines), use this filter chain to safely re-enable `<br>` while keeping the rest of the string escaped:

```hubl
{{ field.value|escape|replace("&lt;br&gt;", "<br>")|replace("&lt;br/&gt;", "<br>")|replace("&lt;br /&gt;", "<br>")|safe }}
```

This lets editors type `Guaranteed<br>Outcomes` in the field and get a real break without opening up HTML injection. `\n` also works automatically when the rendering element has `white-space: pre-line`. Never just slap `|safe` on a text field — that's an XSS hole.

#### Multicol sizing quick reference

Inside the `STYLE` tab, expose one choice per breakpoint per column with these options:

- `auto` — equal split across visible columns (HubL computes `12 // column_count|int`).
- `1`–`12` — explicit grid span.
- `none` — hidden at that breakpoint (renders `--display-*: none`).
- `inherit` — leave the CSS var unset so it cascades from the next-larger breakpoint. Omit from `xl` (it is the base). Do **not** include on `sm` — always resolve to an explicit span or `none`, because smaller is where layouts actually break.

HubL → CSS var wiring (copy this pattern):

```hubl
{% set span_xl = '' %}{% set display_xl = '' %}
{% if col.column_size_xl == 'none' %}{% set display_xl = 'none' %}{% set span_xl = 12 %}
{% elif col.column_size_xl == 'auto' %}{% set span_xl = equal_span %}
{% else %}{% set span_xl = col.column_size_xl %}{% endif %}
```

Emit the resolved vars on the column element: `style="--span-xl: 6; --display-md: none; …"`. Do **not** emit empty vars (`--span-lg: ;`) — guard each with `{% if span_lg %}`. Reference implementation: `src/modules/multi-col.module/module.html`.

## Field patterns

### Heading field group (required for every heading)

Copy verbatim from `src/modules/heading.module/fields.json`. For a new module, inline the same shape but rename the group (e.g. `hero_heading` instead of top-level):

```json
{
  "name": "hero_heading",
  "label": "Hero heading",
  "type": "group",
  "children": [
    { "name": "value", "label": "Heading content", "type": "text", "default": "…" },
    {
      "name": "header_tag", "label": "Heading level", "type": "choice", "required": true,
      "choices": [["h1","H1"],["h2","H2"],["h3","H3"],["h4","H4"],["h5","H5"],["h6","H6"],["p","P"]],
      "default": "h1"
    },
    { "name": "heading_size", "label": "Heading Size", "type": "number", "suffix": "px", "default": 64, "inline_help_text": "Set to 0 to use the default size" },
    { "name": "heading_size_mobile", "label": "Heading Size Mobile", "type": "number", "suffix": "px", "default": 40, "inline_help_text": "Set to 0 to use the default size" },
    {
      "name": "font_weight", "label": "Font Weight", "type": "choice",
      "choices": [["normal","Normal"],["semibold","Semibold"],["bold","Bold"]],
      "default": "semibold"
    }
  ]
}
```

Render with the same HubL as `heading.module/module.html`:

```hubl
<{{ module.hero_heading.header_tag }}
  class="font-{{ module.hero_heading.font_weight }} !leading-[1.08] !m-0"
  {% if module.hero_heading.heading_size %}style="font-size: {{ module.hero_heading.heading_size }}px;"{% endif %}>
  {{ module.hero_heading.value }}
</{{ module.hero_heading.header_tag }}>
```

Add a scoped `@media (max-width: 768px)` block for the mobile size (see `heading.module/module.html`).

### Richtext vs text

- `text`: single value with no formatting. Use for eyebrows, button labels, short labels.
- `text` with `allow_new_line: true`: multi-line plain text, no HTML.
- `richtext`: body paragraphs where editors need bold/links/lists. Always render with `{{ module.x }}` (HubSpot returns sanitized HTML); never with `|escape`.

### Link field (CTA)

```json
{
  "name": "cta", "label": "Button", "type": "group",
  "children": [
    {
      "name": "link", "label": "Link", "type": "link",
      "supported_types": ["EXTERNAL","CONTENT","FILE","EMAIL_ADDRESS","BLOG","CALL_TO_ACTION"],
      "default": { "url": { "type": "EXTERNAL", "href": "/contact" }, "open_in_new_tab": false, "no_follow": false }
    },
    { "name": "text", "label": "Button text", "type": "text", "default": "Request a demo" }
  ]
}
```

Render with the email-aware `href` pattern from `cta-section.module/module.html`.

### Image field

```json
{
  "name": "hero_image", "label": "Hero image", "type": "image", "responsive": true, "resizable": true,
  "default": { "size_type": "auto", "src": "", "alt": "", "loading": "lazy", "width": 0, "height": 0 }
}
```

Render mirroring `heading.module/module.html` (respect `size_type` = `auto` | `auto_custom_max` | `exact`, emit `loading` conditionally, always output `alt`).

### Repeater (list of cards/rows)

Two knobs control a repeater:

- `occurrence.default` (integer) — how many items HubSpot seeds when the module is first placed. **Required for pre-seeded defaults to render**. If omitted, the group's `default` array is ignored and the module renders zero items.
- `default` (array, sibling of `children` / `occurrence`) — the initial data for each seeded item. Length should match `occurrence.default`. Each object must include values for **every** child field, shaped exactly like that child's `default` (e.g. image fields need the full `{ size_type, src, alt, loading, width, height }` object, not just a string).

```json
{
  "name": "cards",
  "label": "Cards",
  "type": "group",
  "occurrence": { "min": 1, "max": 12, "default": 3, "sorting_label_field": "cards.title" },
  "children": [
    { "name": "title", "type": "text", "default": "Card title" },
    { "name": "body_copy", "type": "richtext", "default": "<p>Card copy.</p>" },
    {
      "name": "image", "type": "image",
      "default": { "size_type": "auto", "src": "", "alt": "", "loading": "lazy", "width": 0, "height": 0 }
    }
  ],
  "default": [
    {
      "title": "First card",
      "body_copy": "<p>First card copy.</p>",
      "image": { "size_type": "auto", "src": "", "alt": "", "loading": "lazy", "width": 0, "height": 0 }
    }
  ]
}
```

Loop with `{% for card in module.cards %} … {{ card.title }} … {% endfor %}`. See `carousel-cards.module/module.html`.

**Debugging a repeater that renders nothing**:

1. Is `occurrence.default` set to a positive integer?
2. Does the group-level `default` array contain that many objects?
3. Does each object contain every child field with the correct shape?
4. Is the loop variable name right? `{% for x in module.<group_name> %}` (not `module.<group_name>.children`).

### Style group (required on every module)

There must be **only one** top-level field with `"tab": "STYLE"` — the `style` group below. Parallax, mobile layout, and other non-content controls that editors expect on Style belong as **nested** child `group` fields inside `style` (omit `tab` on those children). Multiple sibling groups each with `"tab": "STYLE"` produce duplicate Style tabs in HubSpot. Example: `src/modules/parallax-image-grid.module/fields.json`.

```json
{
  "name": "style", "label": "Style", "type": "group", "tab": "STYLE",
  "children": [
    { "name": "background_color", "label": "Background color", "type": "color", "default": { "color": null, "opacity": 100 } },
    {
      "name": "background_image", "label": "Background image", "type": "image",
      "responsive": true, "resizable": true, "show_loading": true,
      "default": { "size_type": "exact", "src": "", "alt": "", "loading": "lazy", "width": 1920, "height": 1080 }
    },
    { "name": "text_color", "label": "Text color", "type": "color", "default": { "color": null, "opacity": 100 } },
    {
      "name": "padding", "label": "Padding", "type": "spacing",
      "default": { "padding": { "top": { "value": 64, "units": "px" }, "bottom": { "value": 64, "units": "px" } } }
    }
  ]
}
```

### Image fields (`type: image`)

For content and background images, prefer:

- `"show_loading": true` — exposes the loading behavior control in the editor.
- `"default": { "size_type": "exact", "loading": "lazy", "width": <px>, "height": <px>, "src": "", "alt": "" }` — exact sizing drives HubSpot’s resized `src`; tune defaults to the design (placeholders like 800×600 for cards, 1920×1080 for full-width backgrounds are fine).
- `"responsive": true` and `"resizable": true` unless the asset is a fixed icon (`resizable: false` is common for small glyphs).

Above-the-fold / LCP heroes may use `"loading": "eager"` or `"disabled"` with `inline_help_text` explaining why.

## HubL cheat sheet

| Need | HubL |
|---|---|
| Conditional class | `class="… {% if module.flag %}is-active{% endif %}"` |
| Default fallback | `{{ module.x or "Fallback" }}` |
| Email-aware link href | `{% if module.cta.link.url.type is equalto "EMAIL_ADDRESS" %}{% set href = "mailto:" + module.cta.link.url.href %}{% endif %}` |
| Loop index (1-based) | `{% for item in module.items %}{{ loop.index }}{% endfor %}` |
| Scoped CSS | `{% require_css %}<style>{% scope_css %} … {% end_scope_css %}</style>{% end_require_css %}` |
| Escape URL | `{{ url|escape_url }}` |
| Escape attr | `{{ value|escape_attr }}` |

## meta.json requirements (drag-and-drop)

```json
{
  "global": false,
  "content_types": ["LANDING_PAGE", "SITE_PAGE"],
  "host_template_types": ["PAGE"],
  "label": "<Human-readable label>",
  "icon": "https://www.kalungi.com/hubfs/Atlas/Module%20Logos/callout-module.svg",
  "is_available_for_new_content": true
}
```

Pick an `icon` URL that roughly matches the module's content (callout, feature, hero, etc.) from the Kalungi Atlas icon set used across existing modules. When unsure, reuse an icon from a similar existing module in the project.

## Do not

- Do not use `require_css`/`require_js` for assets that live in the theme bundle (already loaded by `layouts/base.html`).
- Do not use `@apply` inside `module.css` — HubSpot's CSS pipeline doesn't run Tailwind on module CSS.
- Do not use the `id` field in `fields.json`; HubSpot generates UUIDs on upload. If you do include one, make it a new UUID, not copied from another module.
- Do not nest `group` fields arbitrarily deep in content/repeaters unless the design needs it (e.g. repeater containing a link group). Nested `group` fields under the top-level `style` group (parallax, breakpoints, etc.) are expected.
