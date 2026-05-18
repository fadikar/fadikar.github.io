# Personal Academic Website

A clean, professional academic website built with **Jekyll** and Bootstrap 5, deployed via GitHub Pages.

## Local development

```bash
bundle install                   # one-time
bundle exec jekyll serve         # http://localhost:4000
```

Requires Ruby 3.x. On macOS, install with `brew install ruby` (system Ruby 2.6 is too old for Jekyll 4).

## Architecture (current)

The site uses Jekyll layouts and includes so the navbar, sidebar, and footer aren't duplicated across pages:

- `_layouts/default.html` and `_layouts/with-sidebar.html` — the two page shells.
- `_includes/{head,navbar,sidebar,footer,scripts}.html` — shared partials, edited once.
- Each `.html` file has front matter (`layout`, `title`, `nav_active`, optional `scripts`) and only its page-specific content.
- Bumping `css_version` in `_config.yml` invalidates the cached CSS across the whole site.

The legacy guides below describe the pre-Jekyll template state and remain as historical context.

## Structure

```
/
├── _config.yml         # Jekyll config
├── _layouts/           # default + with-sidebar shells
├── _includes/          # head, navbar, sidebar, footer, scripts partials
├── index.html          # Landing page with bio and recent papers
├── cv.html             # Curriculum Vitae
├── research.html       # Research projects
├── software.html       # Software and tools
├── papers/             # Individual paper detail pages
├── trips/              # Outdoor trip pages
├── data/               # JSON for data-driven pages (talks, trips, links)
├── css/custom.css      # Custom styles
├── images/             # Photos and figures
└── README.md
```

## Getting Started

### 1. Add Your Images

Place your images in the appropriate folders:

- **Profile photo**: `images/headshot.jpg` (recommended size: 400x400px, square aspect ratio)
- **Paper images**: `images/papers/paper1.jpg`, `paper2.jpg`, etc. (recommended: 800x400px, 2:1 aspect ratio)
- **Research project images**: `images/research/project1.jpg`, etc. (recommended: 800x500px)

### 2. Customize Content

#### Landing Page (`index.html`)
- Update the bio section with your background and research interests
- Modify the contact information and social media links
- Edit the recent papers section with your actual publications

#### Research Page (`research.html`)
- Replace placeholder research projects with your actual projects
- Update project descriptions, badges, and publication counts

#### Software Page (`software.html`)
- Add your software packages and tools
- Update GitHub links, documentation links, and descriptions

#### CV Page (`cv.html`)
- Fill in your education, professional experience, publications
- Update honors, awards, and professional service
- Customize the skills section

#### Paper Detail Pages (`papers/paper1.html`)
- Use the template to create individual pages for each paper
- Update title, authors, affiliations, abstract, and key contributions
- Add links to PDF, DOI, code repositories, and data

### 3. Update Personal Information

Search and replace the following placeholders across all files:

- `Arindam Fadikar` → Your name
- `fadikar@anl.gov` → Your email
- `https://github.com/yourusername` → Your GitHub profile
- `https://linkedin.com/in/yourprofile` → Your LinkedIn
- `https://scholar.google.com/citations?user=yourID` → Your Google Scholar
- `https://orcid.org/your-orcid` → Your ORCID
- Building/office information
- University names and institutions

### 4. Customize Colors (Optional)

The site uses Argonne National Laboratory colors by default. To change the color scheme, edit `css/custom.css`:

```css
:root {
    --argonne-blue: #003D79;        /* Primary color */
    --argonne-dark-blue: #002855;   /* Dark variant */
    --argonne-teal: #00A19C;        /* Accent color */
    --argonne-green: #009A44;       /* Secondary accent */
}
```

## Local Development

To preview the site locally:

1. Simply open `index.html` in your web browser, or
2. Use a local server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000

   # Then visit http://localhost:8000
   ```

## GitHub Pages Deployment

The site is already configured for GitHub Pages:

1. Push your changes to the `main` branch
2. Go to repository Settings → Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/` (root) folder
5. Your site will be available at `https://fadikar.github.io`

## Customization Tips

- **Fonts**: The site uses system fonts by default. To use custom fonts, add Google Fonts or other font services to the `<head>` section
- **Navbar**: Modify the navigation links in the navbar section of each HTML file
- **Footer**: Update copyright year and text in the footer section
- **Metadata**: Add appropriate meta tags for SEO in each page's `<head>` section

## Features

- Fully responsive design (mobile, tablet, desktop)
- No JavaScript frameworks required
- Minimal JavaScript (only Bootstrap's built-in functionality)
- Clean, academic aesthetic
- Argonne National Laboratory color scheme
- Print-friendly styles for CV page
- Fast loading and accessible

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This template is free to use and modify for personal academic websites.
