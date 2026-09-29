# 🎮 Voxera - Gaming Community Landing Page

A modern, high-performance gaming-themed landing page built with React and Vite. Voxera presents a futuristic server/community brand with smooth animations, interactive components, and a professional UI/UX.

**Live Demo:** [Voxera on GitHub Pages](https://mthomas-00.github.io/Vexera/)

---

## ✨ Features

### 🎨 Design & UX
- Responsive layout optimized for desktop, tablet, and mobile
- Smooth animations and ambient particle effects
- Neon color palette with modern gaming aesthetics
- Interactive UI components with hover effects
- Dark theme optimized for gaming audiences

### 🚀 Performance
- Fast page loads with Vite's optimized build
- Production-ready static site generation
- Gzip-optimized assets (~134KB JS, ~10KB CSS)
- GitHub Pages ready deployment

### 📱 Navigation & Pages
- Multi-page routing with React Router
- Home page with hero section and features
- Store page with animated rank carousel
- Blog, Wiki, and Download pages
- Smooth scroll behavior and scroll-to-top component

### 🎯 Core Components
- Dynamic rank carousel with auto-play and manual controls
- Ambient particle background system
- Server status display with copyable IP
- Social media integration links
- Responsive footer with branding

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite 8.3** | Build tool & dev server |
| **React Router 6** | Client-side routing |
| **Tailwind CSS 4** | Utility-first styling |
| **React Icons** | Icon library |
| **Motion** | Animation utilities |

---

## 📋 Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager
- Git (for deployment)

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MrThomas-00/Vexera.git
cd Vexera/my-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Access from other devices

To access the dev server from another machine on your network:
```bash
npm run dev -- --host 0.0.0.0
```

Then visit: `http://<your-ip>:5173`

---

## 🏗️ Build & Deployment

### Local Production Build

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### GitHub Pages Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to GitHub Pages**
```bash
npm run deploy
```

This publishes the build to the `gh-pages` branch.

3. **Configure GitHub Pages** (one-time setup)
   - Go to: Repository Settings → Pages
   - Set **Source** to `Deploy from a branch`
   - Set **Branch** to `gh-pages` with `/(root)` folder

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
Vexera/
├── my-app/
│   ├── public/
│   │   ├── Footer.mp4           # Footer video asset
│   │   └── ranks/               # Rank images
│   │
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Ranks.jsx        # Carousel component
│   │   │   ├── Aboutsection.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Store.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Wiki.jsx
│   │   │   ├── Download.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── api/                 # API utilities
│   │   │   └── api.js
│   │   │
│   │   ├── utils/               # Helper functions
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   │
│   ├── index.html               # HTML template
│   ├── package.json
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.cjs       # Tailwind CSS config
│   ├── postcss.config.cjs        # PostCSS config
│   └── README.md
│
└── Backend/                      # Backend scripts (PHP)
    ├── config.php
    └── ranks.php
```

---

## 📝 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run lint` | Run Oxlint code linting |

---

## 🎨 Customization

### Update Server Information
- Edit server IP in `src/components/Footer.jsx`
- Update social media links throughout components
- Modify rank pricing and descriptions in `src/components/Ranks.jsx`

### Change Branding
- Update colors in `tailwind.config.cjs`
- Replace logo and branding text
- Customize fonts in `src/index.css`

### Add New Pages
1. Create new file in `src/pages/`
2. Add route in `src/App.jsx`
3. Link from navigation components

---

## 🌐 Deployment Options

- **GitHub Pages** (recommended) - Free, automatic deploys
- **Vercel** - Optimized for React, zero-config deployment
- **Netlify** - Drag-and-drop deployment
- **Traditional Hosting** - Upload `dist/` folder via FTP

---

## 📊 Performance Metrics

```
Build Output:
- HTML:  0.46 kB (gzip: 0.29 kB)
- CSS:   60.73 kB (gzip: 10.06 kB)
- JS:    423.80 kB (gzip: 134.07 kB)

Build Time: ~1s
Modules: 448 transformed
```

---

## 🔒 Security & Best Practices

- No sensitive data in frontend code
- Static site, no server-side vulnerabilities
- Optimized assets for minimal attack surface
- CSP-ready structure

---

## 📄 License

This project is private and maintained by MrThomas-00.

---

## 🤝 Contributing

This is a private project. For feature requests or bug reports, please open an issue on GitHub.

---

## 📞 Support

- **Documentation:** See README files in relevant directories
- **Issues:** GitHub Issues page
- **Email:** Contact repository owner

---

**Last Updated:** September 29, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
