# Developer Portfolio

A modern, interactive portfolio website for a Software Programmer & AI Researcher.

## Features

- **Interactive Hero** with particle animation
- **Clickable Stats** with proof links
- **"How I Think"** problem-solving methodology section
- **Project Case Studies** with architecture, benchmarks, and trade-offs
- **AI Playground** - Interactive demo section
- **Research** with reproducibility info
- **Hiring Funnel** contact form
- **Dark/Light mode** toggle
- **Fully responsive** design

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui components
- GSAP for animations

## Deploy to GitHub Pages

### Option 1: Using gh-pages npm package (Recommended)

1. **Update the homepage in package.json:**
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 2: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Push the `dist` folder to the `gh-pages` branch:**
   ```bash
   npx gh-pages -d dist
   ```

### Option 3: Using GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

### Update your information

Edit the following files to customize:

- `src/sections/Hero.tsx` - Update name and tagline
- `src/sections/About.tsx` - Update bio and stats
- `src/sections/Projects.tsx` - Update project details
- `src/sections/Research.tsx` - Update research papers
- `src/sections/Resume.tsx` - Update experience and education
- `src/sections/Contact.tsx` - Update contact info

### Update images

Replace images in `public/images/` folder:
- `profile.jpg` - Your profile photo
- `project-*.jpg` - Project screenshots

## License

MIT
