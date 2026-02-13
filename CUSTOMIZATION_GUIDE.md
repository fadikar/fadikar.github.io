# Quick Customization Guide

## Essential Updates

### 1. Personal Information (All Pages)

Update these in every HTML file's navbar and content:

**Contact Information** (`index.html` sidebar):
```html
<a href="mailto:your-email@anl.gov">your-email@anl.gov</a>
Building XXX, Room XXXX
City, State ZIP
```

**Social Media Links** (`index.html`):
```html
<a href="https://github.com/YOUR-USERNAME">GitHub</a>
<a href="https://linkedin.com/in/YOUR-PROFILE">LinkedIn</a>
<a href="https://scholar.google.com/citations?user=YOUR-ID">Google Scholar</a>
<a href="https://orcid.org/YOUR-ORCID">ORCID</a>
```

### 2. Bio Section (`index.html`)

Replace the placeholder bio text in the "About Me" card:
```html
<div class="card-body">
    <h2 class="card-title mb-4">About Me</h2>
    <p class="lead">
        YOUR INTRODUCTION HERE
    </p>
    <p>
        YOUR RESEARCH FOCUS
    </p>
    <p>
        YOUR BACKGROUND
    </p>
</div>
```

### 3. Recent Papers (`index.html`)

For each paper card, update:
- Card image: `src="images/papers/paperX.jpg"`
- Title: `<h5 class="card-title">Your Paper Title</h5>`
- Authors: `<strong>Authors:</strong> Fadikar, A., et al.`
- Journal: `<em>Journal Name</em>, Year`
- Description: Brief 2-3 sentence summary
- Links: PDF link and paper detail page link

### 4. Research Projects (`research.html`)

Update each project card:
```html
<h4 class="card-title">Your Project Title</h4>
<p class="card-text">Project description...</p>
<span class="badge bg-primary">Keyword1</span>
<span class="badge bg-primary">Keyword2</span>
<i class="bi bi-journal-text me-1"></i> X Publications
```

### 5. Software Packages (`software.html`)

For each software card:
```html
<h4 class="card-title">PackageName</h4>
<p class="card-text">Package description...</p>
<span class="badge bg-secondary">Language</span>
<a href="GITHUB-LINK">GitHub</a>
<a href="DOCS-LINK">Documentation</a>
```

### 6. CV Content (`cv.html`)

Update all sections:
- Education (degrees, institutions, dates)
- Professional Experience (positions, responsibilities)
- Publications (full citations with DOI links)
- Honors & Awards
- Professional Service
- Teaching & Mentoring
- Technical Skills

Add a link to your PDF CV:
```html
<a href="path/to/your-cv.pdf" class="btn btn-primary">
    <i class="bi bi-download me-2"></i>Download PDF
</a>
```

### 7. Paper Detail Pages

Create a new HTML file for each paper in `papers/` folder:

1. Copy `papers/paper1.html` as a template
2. Update all content:
   - Title, authors, affiliations
   - Publication info (journal, volume, pages, year)
   - Links (PDF, DOI, code, data)
   - Abstract
   - Key contributions
   - BibTeX citation

## Advanced Customizations

### Change Color Scheme

Edit `css/custom.css`:
```css
:root {
    --argonne-blue: #YOUR-COLOR;
    --argonne-teal: #YOUR-ACCENT;
}
```

### Add Google Analytics

Add before `</head>` in all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Add Favicon

Add in `<head>` section of all HTML files:
```html
<link rel="icon" type="image/png" href="images/favicon.png">
```

### Add Meta Tags for SEO

Add in `<head>` section:
```html
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords, here">
<meta name="author" content="Your Name">
```

## Testing Checklist

Before deploying:
- [ ] All personal information updated
- [ ] All placeholder images replaced
- [ ] All links work correctly
- [ ] Test on mobile device (or use browser dev tools)
- [ ] Check all pages load properly
- [ ] Verify social media links open in new tabs
- [ ] Test navbar on mobile (hamburger menu)
- [ ] Proofread all content
- [ ] Check for any "Lorem ipsum" or placeholder text
- [ ] Verify PDF/DOI links work

## Deployment to GitHub Pages

1. Commit all changes:
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

3. Wait a few minutes and visit: `https://YOUR-USERNAME.github.io`

## Maintenance

### Adding a New Paper
1. Add paper image to `images/papers/`
2. Create detail page in `papers/` (copy template)
3. Add paper card to `index.html` recent papers section
4. Add to publications list in `cv.html`

### Adding a New Research Project
1. Add project image to `images/research/`
2. Add project card to `research.html`

### Adding a New Software Package
1. Add software card to `software.html`
2. Update GitHub links and documentation

## Support

For Bootstrap 5 documentation: https://getbootstrap.com/docs/5.3/
For Bootstrap Icons: https://icons.getbootstrap.com/
