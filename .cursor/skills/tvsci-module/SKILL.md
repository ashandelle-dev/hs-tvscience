---
name: tvsci-module
description: >-
  Builds editable HubSpot drag-and-drop modules for the tvScientific theme from
  Figma designs. Use when the user shares a Figma node/URL and wants a new
  HubSpot module, when converting a template section into an editable module,
  or when the user mentions tvsci module, HubSpot module, Figma to HubSpot, or
  src/modules/*.module. Enforces the tvScientific 2025 design system: tvs-*
  color tokens, font-plex, max-w-[1072px] container, and the heading.module
  field pattern for every heading.
---

# tvsci-module — Figma → HubSpot module scaffolder

This skill scaffolds a new HubSpot module under `src/modules/<name>.module/` from a Figma node. The result must be drag-and-drop ready in HubSpot (LANDING_PAGE + SITE_PAGE) and editable for copy, images, repeaters, and style.

Canonical references in this codebase:

- Design patterns: `src/templates/consumer-guide.html`, `src/templates/state-of-performance-tv.html`
- Design tokens: `tailwind.config.js` (the `tvs` color scale)
- Heading field pattern: `src/modules/heading.module/` — copy its fields into every module that has a heading
- Style group pattern: `src/modules/cta-section.module/fields.json`

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Parse the Figma URL (fileKey + nodeId)
- [ ] 2. Pull design context + variables + screenshot from Figma
- [ ] 3. Propose the module name and confirm with the user
- [ ] 4. Decompose the design into fields (content vs. style vs. repeater)
- [ ] 5. Scaffold src/modules/<name>.module/ (module.html, fields.json, meta.json, module.css, module.js)
- [ ] 6. Write markup using tvs-* tokens + font-plex + max-w-[1072px]
- [ ] 7. Wire every content field into the markup
- [ ] 8. Verify with ReadLints and cross-check against the Figma screenshot
```

### 1. Parse the Figma URL

From `figma.com/design/:fileKey/:fileName?node-id=1-2`:

- `fileKey` = path segment after `/design/`
- `nodeId` = the `node-id` query param with `-` replaced by `:` (e.g. `359-398` → `359:398`)
- If the URL is `/branch/:branchKey/:fileName`, use `branchKey` as `fileKey`

### 2. Pull design context

Call the Figma MCP tools in this order. Do not skip the screenshot.

```
CallMcpTool(server=user-figma, toolName=get_design_context,
  arguments={ nodeId, fileKey, clientLanguages: "html,css,javascript", clientFrameworks: "tailwindcss,hubl" })

CallMcpTool(server=user-figma, toolName=get_variable_defs,
  arguments={ nodeId, fileKey, clientLanguages: "html,css", clientFrameworks: "tailwindcss" })
```

Treat the returned code as a reference only. Adapt it to HubL + Tailwind using the rules below. Map Figma variables → `tvs-*` tokens (see `reference.md`); never paste raw hex if a token exists for that value.

### 3. Name the module

- Folder: `src/modules/<kebab-case-name>.module/`
- Label in `meta.json`: Title Case, human-readable (shown in the HubSpot editor sidebar)
- Prefer descriptive function over brand ("pinterest-simplification-hero" → `simplification-hero.module`). Confirm with the user if ambiguous.

### Reserved field names (HubSpot will reject the upload)

Never use these as the `name` of any field in `fields.json` — at the top level OR inside a `group`/repeater's `children`. Upload fails with `field name cannot be '<name>'`:

- `body`, `label`, `type`, `name`, `id`, `class`, `style`, `children`, `default`, `parent`, `module`

Rename conventions to use instead:

| Reserved | Use |
|---|---|
| `body` | `body_copy` (richtext) or `subheading` |
| `label` | `text` (for a chip/item display string) or `eyebrow` (for section labels) |
| `title` | `heading` (when it's the main heading) — fine to use `title` for card titles inside a repeater, but prefer `heading_value` for consistency |

The `label` at the top level of a field object (the editor-facing display label) is fine — it's only the `name` key that's restricted.

### 4. Decompose into fields

Walk the Figma frame top-down and categorize each element:

| Element type in Figma | Field type in `fields.json` | Notes |
|---|---|---|
| Heading / title | inline **heading field group** | Copy from `src/modules/heading.module/fields.json`. Gives H1–H6/P + size + mobile size + weight + alignment + color. |
| Body paragraph | `richtext` | Allow inline links/bold. Default content from Figma. |
| Eyebrow / label | `text` (single line) | `allow_new_line: false`. |
| CTA / button | `group` with `link` (url) + `text` (button label) | See `cta-section.module/fields.json` for the pattern. |
| Image (content) | `image` | Include `src`, `alt`, width/height defaults. |
| Icon from Figma components | `image` with SVG default | Upload the asset separately if needed. |
| List/grid of similar cards | `group` with `"occurrence": { "min": 1, "max": N }` (repeater) | See `carousel-cards.module/fields.json`. |
| Multi-column layout (2+ columns side by side) | `columns` repeater + `.tvsci-multicol` / `.tvsci-col` grid classes | See `multi-col.module/` for the reference implementation. Expose per-breakpoint column width (`column_size_xl/lg/md/sm`) with `none` + `auto` + `1`–`12` + `inherit` choices. Details in `reference.md`. Don't hand-roll `grid-cols-*` utilities for an editor-configurable layout. |
| Background color | `color` inside `style` group (STYLE tab) | |
| Background image/texture | `image` inside `style` group | |
| Text color override | `color` inside `style` group | |
| Section padding | `spacing` inside `style` group | |

Default editability baseline for every new module:

1. A **single** top-level `style` group with `"tab": "STYLE"` that includes `background_color`, `background_image`, `text_color`, and `padding`. Put any other STYLE-tab controls (parallax, mobile breakpoints, animation toggles, etc.) in **nested** child `group` fields inside `style` — never multiple sibling groups that each set `"tab": "STYLE"`, or HubSpot shows duplicate Style tabs.
2. Every heading uses the heading field group (H1–H6/P + size + mobile size + weight).
3. Every paragraph uses `richtext`.
4. Every image is an `image` field: set `"show_loading": true` so editors can control lazy-loading, default `"loading": "lazy"` in the field `default` object, and use `"size_type": "exact"` with non-zero `width` / `height` (adjust per asset). Keep `"responsive": true` and `"resizable": true` unless the design is a fixed-size icon.
5. Every CTA is a `group` with `link` + button text.
6. Repeat any card/row/list item as a repeater group.

### 5. Scaffold the folder

Create five files. Copy from `templates/` in this skill and fill in the design-specific parts.

```
src/modules/<name>.module/
├── meta.json       # from templates/meta.json, update label + icon
├── fields.json     # from templates/fields.json, extend per section 4
├── module.html     # from templates/module.html
├── module.css      # empty unless Tailwind can't express the effect
└── module.js       # empty unless the design has interactive behavior
```

Read the skeletons: [`templates/module.html`](templates/module.html), [`templates/fields.json`](templates/fields.json), [`templates/meta.json`](templates/meta.json).

### 6. Markup rules (strict)

- **Font**: root element of the module is `class="font-plex"`. Use `font-plex-mono` only for eyebrows/UI labels.
- **Container**: use `class="tvsci-container"` (compiled from `max-w-[1072px] mx-auto px-4`). Only use `max-w-7xl` or other arbitrary widths if Figma specifies one.
- **Eyebrow**: use `class="tvsci-eyebrow"` (compiled from `font-plex-mono tracking-widest uppercase text-[14px] text-tvs-green-accessible`). Override the color with a `tvs-*` text utility when the design calls for it.
- **Body copy / lead**: use `class="tvsci-lead"` (compiled from `font-plex text-lg leading-relaxed text-tvs-black`). Override color as needed.
- **Heading scale** (for static headings that don't use the heading field group): `.heading-xxl`, `.heading-xl`, `.heading-l`, `.heading-m`, `.heading-s`, `.heading-xs`. Always prefer the heading field group for editor-controlled headings.
- **Buttons**: use `class="hs-button"` for the primary CTA. For secondary/ghost, add the modifier: `class="hs-button hs-button--secondary"`.
- **Colors**: prefer `tvs-*` Tailwind classes (`bg-tvs-green`, `text-tvs-black`, `border-tvs-grey-light`, etc.). If Figma returns a hex that maps to a token, convert. If it does not map, pick the most appropriate option below — do not stop to ask:
  1. **Hardcode the hex** inline (preferred for one-off brand colors that don't belong in the palette, e.g. partner accents). Leave a brief HTML comment noting the Figma variable name.
  2. **Extend `tailwind.config.js`** under `colors.tvs.*` (preferred when the same hex appears in multiple modules, or when the Figma file has a named variable that looks system-wide — e.g. `oranges/light`, `blues/dark`). Use the Figma variable name, kebab-cased, as the token name (`oranges/light` → `tvs-orange-light`).
  3. **Expose the color as an editable field** inside the `style` group (preferred when editors will legitimately want to change it per placement, e.g. chip/badge accents that vary by campaign).
- **Section spacing**: `py-16 md:py-16` for most sections; `py-16 md:py-28` for hero sections. Match the template you're closest to.
- **Editor-configurable style**: wire the `style` group into inline `style="..."` on the outermost section element, overriding Tailwind defaults. **Always use `.css` on color fields, not `.color`** — `.css` returns the full `rgba(...)` value with the editor-chosen `opacity` baked in, while `.color` only returns the bare hex and silently drops opacity changes. Pattern:

  ```hubl
  {% set bg_color   = module.style.background_color.css %}
  {% set bg_image   = module.style.background_image.src %}
  {% set text_color = module.style.text_color.css %}
  <section class="font-plex py-16 md:py-16"
    style="
      {% if bg_color %}background-color: {{ bg_color }};{% endif %}
      {% if bg_image %}background-image: url('{{ bg_image }}'); background-size: cover; background-position: center;{% endif %}
      {% if text_color %}color: {{ text_color }};{% endif %}
      {{ module.style.padding.css }}
    ">
    …
  </section>
  ```

- **Heading rendering**: follow `src/modules/heading.module/module.html` exactly — honor `header_tag`, `heading_size`, `heading_size_mobile`, `font_weight`, `styles.alignment`.
- **Image rendering**: mirror the `sizeAttrs`/`loadingAttr` pattern used across existing modules (e.g. `heading.module`). Always output `alt` from the field.
- **Links**: support `EMAIL_ADDRESS` type like `cta-section.module`:

  ```hubl
  {% set href = module.cta.link.url.href %}
  {% if module.cta.link.url.type is equalto "EMAIL_ADDRESS" %}{% set href = "mailto:" + href %}{% endif %}
  ```

- **HubSpot CMS quirks**: do not use `require_css`/`require_js` unless the module genuinely loads external assets. Scope any custom CSS inside `{% require_css %}{% scope_css %}…{% end_scope_css %}{% end_require_css %}` so it only loads with the module (see `heading.module/module.html`).

### 7. Wire fields into markup

Every text node in the design must resolve to a `{{ module.<field> }}` output. No hardcoded copy. Defaults in `fields.json` supply the initial Figma copy, so the preview looks right before an editor touches it.

### 8. Verify

- Run `ReadLints` on the new module files.
- Open the module HTML side-by-side with the Figma screenshot and confirm structure matches.
- Confirm `meta.json` has `content_types: ["LANDING_PAGE", "SITE_PAGE"]`, `host_template_types: ["PAGE"]`, `is_available_for_new_content: true` — required for drag-and-drop availability.

## Sections: composing existing modules instead of building new ones

Before you scaffold a new module, ask: **does this design just rearrange modules we already have?** If yes, build a **section** in `src/sections/<name>.html` that drops existing modules into a `dnd_section`. Sections are page-level layouts the editor can drag in once and have all sub-modules pre-wired with default content.

### When to build a section vs. a new module

| Build a **section** when… | Build a **new module** when… |
|---|---|
| Design is N copies of the same module with different content (logo strip, feature row, testimonial grid) | Design has unique markup/behavior not covered by any existing module |
| Design is a heading + an existing module + a CTA stitched together | Design needs custom JS (parallax, sliders, scroll effects) |
| Editor needs to swap content per-instance but layout is fixed | Editor needs to control layout/structure per-instance |
| You'd otherwise duplicate `multi-col.module` or `heading.module` markup | The Figma frame introduces a new visual pattern the system doesn't have |

A good heuristic: if your first instinct is "I'll just copy `heading.module` markup into a new module," stop — use a section that drops in `heading.module` instead.

### Section file anatomy

```
src/sections/<name>.html
```

Header comment block tells HubSpot it's a section template:

```hubl
<!--
 templateType: section
 label: Human-Readable Section Label
 isAvailableForNewContent: true
-->
```

Body uses `dnd_section` → `dnd_column` → `dnd_row` → `dnd_module`. Each `dnd_module` references an existing module by its **published HubSpot path**, not its repo path.

### Module path format

The `path=` argument on `dnd_module` is the path inside the published HubSpot theme, **not** the local `src/modules/...` path. For this repo:

```
"/tvScientific 2022 Atlas Pro/cli-build/modules/<module-name>"
```

(no `.module` suffix, no leading `src/`). Examples:

- `src/modules/heading.module/` → `"/tvScientific 2022 Atlas Pro/cli-build/modules/heading"`
- `src/modules/multi-col.module/` → `"/tvScientific 2022 Atlas Pro/cli-build/modules/multi-col"`
- `src/modules/cta-section.module/` → `"/tvScientific 2022 Atlas Pro/cli-build/modules/cta-section"`

### Passing field defaults into a `dnd_module`

Every field in the target module's `fields.json` can be set as a keyword argument on `dnd_module`. Top-level fields are flat keys; `group` fields are nested objects; repeaters (`occurrence`) are arrays of objects.

Example — `heading.module` with custom color, alignment, and bottom padding:

```hubl
{% dnd_module
  path="/tvScientific 2022 Atlas Pro/cli-build/modules/heading",
  offset=0,
  width=12,
  value="Consumer brands of all sizes rely on tvScientific",
  header_tag="h2",
  heading_size=48,
  heading_size_mobile=32,
  font_weight="semibold",
  image={ "src": "" },
  styles={
    "alignment": {
      "horizontal_align": "center"
    },
    "text_color": {
      "color":   "#009061",
      "opacity": 100
    },
    "padding": {
      "padding": {
        "top":    { "value": 0,  "units": "px" },
        "bottom": { "value": 64, "units": "px" }
      }
    }
  }
%}{% end_dnd_module %}
```

### Field-shape gotchas (these silently fall back to defaults if wrong)

- **`alignment` field type**: pass the value flat under the field name. The shape is `{ "horizontal_align": "center" }`, **not** `{ "alignment": { "horizontal_align": "center" } }`. Values are lowercase (`"left"`, `"center"`, `"right"`) — uppercase fails the template's `replace` chain in `heading.module/module.html`.
- **`color` field**: `{ "color": "#hex", "opacity": 100 }`. Don't omit `opacity` — some modules read it.
- **`spacing` (padding/margin) field**: doubly-nested under `padding` or `margin`: `{ "padding": { "top": { "value": 64, "units": "px" }, "bottom": {...} } }`.
- **`image` field**: even when you don't want an image (e.g. `heading.module` has an optional inline icon), explicitly pass `{ "src": "" }` to suppress the default check icon.
- **`link` field**: `{ "url": { "type": "EXTERNAL", "href": "https://..." }, "open_in_new_tab": false, "no_follow": false }`. `type` can be `EXTERNAL`, `EMAIL_ADDRESS`, `CONTENT`, etc.
- **Repeater (`columns`, etc.)**: array of full objects matching the repeater's `children` schema. Every key the children define must be present, even if empty (`""` for text, `0` for number, `{ "src": "" }` for image), or HubSpot fills with the field default and you'll see check icons / placeholder copy where you didn't expect.
- **HTML inside richtext defaults (e.g. `column_content`)**: HubSpot's HubL dict-literal parser **does not honor `\"` backslash escapes**. If you write `"column_content": "<p class=\"foo\">…</p>"` the upload fails with `syntax error … encountered 'foo', expected }`. Use **single quotes** for the outer string so the HTML's `class="…"` and `href="…"` attributes stay as bare double quotes:
  ```hubl
  "column_content": '<p class="measure-attr__body">…</p><a href="/contact" class="measure-attr__link">LEARN MORE</a>'
  ```
  If your HTML contains literal apostrophes, use HTML entities (`&#39;` or `&rsquo;`) instead of escaping. Hoisting any inline `style="…"` blocks into a `<style>` block at the top of the section file (and referencing classes here) keeps the column_content readable and avoids inline-style soup.

### Section-level styling

`dnd_section` accepts `background_color`, `background_image`, `padding`, `vertical_alignment`, etc. directly:

```hubl
{% dnd_section
    background_color="#f9fafc",
    padding={
      "default": { "top": "80px", "bottom": "80px" }
    }
%}
  …
{% end_dnd_section %}
```

### Reference example

`src/sections/logo-strip.html` is a complete worked example: pastel-grey `dnd_section` background, one `heading.module` row (centered, brand-green), and two `multi-col.module` rows (4 logos + 3 logos) — all from existing modules, no new module required.

### Section workflow

```
- [ ] 1. Confirm every visual block in the design maps to an existing module
- [ ] 2. Create src/sections/<name>.html with the templateType header comment
- [ ] 3. Wrap in dnd_section with background + padding
- [ ] 4. One dnd_row per visual row; one dnd_module per block
- [ ] 5. Pass field defaults on each dnd_module (mind the field-shape gotchas above)
- [ ] 6. Verify with ReadLints; check the editor sidebar for the section label
- [ ] 7. Flag any Figma asset URLs (figma.com/api/mcp/asset/...) — they expire in ~7 days, must be swapped for hubfs URLs before publish
```

## Anti-patterns

- Do not create a new template section instead of a module when the user asks for a module. (And conversely, do not scaffold a new module when the design just rearranges existing ones — see "Sections: composing existing modules" above.)
- Do not duplicate `heading.module` or `multi-col.module` markup inside a new module. Drop the existing module into a section instead.
- Do not reference modules in `dnd_module` by their repo path (`src/modules/foo.module`). Use the published HubSpot path (`/tvScientific 2022 Atlas Pro/cli-build/modules/foo`).
- Do not hardcode hex colors that already have a `tvs-*` token equivalent (use the token).
- Do not stop the workflow to ask about an out-of-palette color — pick one of the three options in the Colors rule above and proceed.
- Do not emit `<h1>…</h1>` literals — always route headings through the heading field group so editors can change level and size.
- Do not omit the `style` group. Every module is themeable.
- Do not declare more than one top-level field group with `"tab": "STYLE"`. Merge extra style controls as nested groups under the canonical `style` group (see `src/modules/parallax-image-grid.module/fields.json`).
- Do not use Windows-style paths in templates or refs. Always forward slashes.
- **Do not add HubL comment blocks (`{# … #}`) or banner/section comments inside `src/sections/*.html`.** The only comment allowed is the `<!-- templateType … -->` header HubSpot requires. No `{# ---------- Row 1 ---------- #}` dividers, no "Source: Figma node …" blocks, no "Notes:" blocks. If context is needed, put it in the module's field `inline_help_text`, the section's `label`, or a commit message — not in the section file.

## Additional resources

- [`reference.md`](reference.md) — token map (tvs color palette, type scale, spacing, IDs), Figma→Tailwind conversion table, richtext vs text decision tree, repeater pattern, link field schema.
- Working examples in-repo: `src/modules/heading.module/`, `src/modules/cta-section.module/`, `src/modules/carousel-cards.module/`, `src/modules/texture-section-overlap.module/`.
