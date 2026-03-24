# Partners HubDB Template

This is a 2-level HubDB listing template for partners.

## Structure

```
partners/
├── partners.html                    # Main template (handles routing)
└── partials/
    ├── partners-root.html          # Level 0: /partners (listing page)
    └── partners-single.html        # Level 1: /partners/{partner} (single partner)
```

## Setup Instructions

### 1. Create HubDB Table

Create a HubDB table in HubSpot with the following columns:

**Required Columns:**
- `name` (Text) - Partner name
- `hs_path` (Text) - URL slug for the partner

**Recommended Columns for partners-single.html:**
- `logo` (Image) - Partner logo
- `partner_type` (Text) - Type of partnership (e.g., "Technology Partner", "Agency Partner")
- `website` (URL) - Partner website URL
- `industry` (Text) - Partner's industry
- `location` (Text) - Partner's location
- `overview` (Rich Text) - About the partner
- `services` (Rich Text) - Services & solutions offered
- `benefits` (Rich Text) - Partnership benefits
- `tags` (Text) - Pipe-separated tags (e.g., "Integration|Analytics|Reporting")
- `contact_link` (URL) - Contact form or email link
- `cta_title` (Text) - Call-to-action title
- `cta_link` (URL) - Call-to-action link
- `cta_button_text` (Text) - CTA button text (defaults to "Get Started")

### 2. Update Template Configuration

In `partials/partners-single.html`, update line 9:
```hubl
{% set partner = hubdb_table_rows(YOUR_PARTNERS_TABLE_ID)|first %}
```
Replace `YOUR_PARTNERS_TABLE_ID` with your actual HubDB table ID.

### 3. Configure Dynamic Pages

1. Go to Settings → Website → Pages → Dynamic Pages
2. Create a new dynamic page configuration
3. Select the `partners.html` template
4. Link it to your HubDB table
5. Set the URL structure to `/partners/{hs_path}`

## Template Features

### Level Switching (Editor Preview)

In the HubSpot editor, use the "Preview Level" dropdown to switch between:
- **Level 0** - Partners listing page (`/partners`)
- **Level 1** - Individual partner page (`/partners/{partner}`)

### Level 0: Partners Root (`partners-root.html`)

This is a blank drag-and-drop area where you can:
- Add a hero section
- Create a partner grid/list using HubDB queries
- Add filters and search functionality
- Include any other content modules

### Level 1: Partners Single (`partners-single.html`)

Pre-styled individual partner page with:
- Hero section with breadcrumb navigation
- Sidebar with:
  - Partner logo
  - Partner information (type, website, industry, location)
  - Contact CTA buttons
- Main content area with:
  - About section
  - Services & solutions
  - Partnership benefits
  - Category tags
  - Bottom CTA card
- Fully responsive design
- Uses theme CSS variables for consistent styling

## Styling

The single partner page uses CSS variables from your theme:
- `--heading` - Heading color
- `--body_color` - Body text color
- `--primary` / `--primary_rgb` - Primary brand color
- `--secondary` - Secondary brand color
- `--tertiary` - Tertiary color
- `--link_color` / `--link_hover_color` - Link colors
- `--white` - White color
- `--borders` - Border color
- `--border_radius` - Border radius
- `--light` - Light background color

## Customization

### Adding New Fields

To add new fields to the single partner page:

1. Add the column to your HubDB table
2. Edit `partials/partners-single.html`
3. Add a new section following the existing patterns

Example:
```hubl
{% if partner.new_field %}
<section class="content-section">
  <h2>New Section</h2>
  <div>{{ partner.new_field }}</div>
</section>
{% endif %}
```

### Customizing Styles

All styles are contained within `<style>` tags in `partners-single.html`. Modify the CSS as needed to match your design requirements.

### Customizing the Listing Page

The `partners-root.html` file is intentionally minimal - it's a blank drag-and-drop area. You can build the listing page using:

- Custom modules
- Rich text content
- HubDB queries to display partners
- Blog listing modules (adapted for HubDB)
- Any other HubSpot modules

## Example HubDB Query for Listing Page

To display all partners on the root page, add this in a custom module:

```hubl
{% set partners = hubdb_table_rows(YOUR_TABLE_ID) %}

<div class="partners-grid">
  {% for partner in partners %}
    <div class="partner-card">
      {% if partner.logo %}
        <img src="{{ partner.logo.url }}" alt="{{ partner.name }}">
      {% endif %}
      <h3>{{ partner.name }}</h3>
      <a href="/partners/{{ partner.hs_path }}">Learn More</a>
    </div>
  {% endfor %}
</div>
```

## Notes

- The template follows the same pattern as the Property Radar plays template you referenced
- Level 0 (root) is intentionally left as a blank DND area for maximum flexibility
- The single partner page is fully styled and ready to use
- All conditional rendering ensures the page works even with missing data
- Editor preview mode allows you to see what the live pages will look like
