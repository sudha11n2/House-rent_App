# House Rent App

A modern house rental application built with **React** and **Vite** for fast, responsive browsing of rental properties.

**Live Demo:** [house-rent-app-alpha.vercel.app](https://house-rent-app-alpha.vercel.app/)

**Demo Video:** [Watch on Google Drive](https://drive.google.com/file/d/1kWG_wfbw95s2ua2Z1nUjiv42sQC9G0eO/view?usp=sharing)

## Features

- Browse property listings
- View detailed property information
- Responsive and modern UI
- Fast performance with Vite bundler

## Tech Stack

- **React** — UI library
- **Vite** — build tool and dev server
- **JavaScript** — core language
- **HTML** — markup
- **CSS** — styling

## Project Structure

```
househunt/
├── backend/              Express API
│   ├── config/db.js       MongoDB connection
│   ├── models/            User, Property, Inquiry (Mongoose schemas)
│   ├── middleware/auth.js JWT verification + role guard
│   ├── controllers/       Route handlers
│   ├── routes/            Express routers
│   ├── server.js          App entry point
│   └── .env.example
└── frontend/              React + Vite SPA
    ├── src/
    │   ├── api/axios.js       Axios instance with auth interceptor
    │   ├── context/AuthContext.jsx
    │   ├── components/        Navbar, Footer, PropertyCard, ProtectedRoute, Loader
    │   ├── pages/              Home, Listings, PropertyDetail, Login, Register,
    │   │                       Dashboard, AddProperty, About, Contact, NotFound
    │   ├── index.css          Design tokens & global styles
    │   ├── App.jsx            Routes
    │   └── main.jsx           Entry point
    └── .env.example
```

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sudha11n2/House-rent_App.git
cd House-rent_App
```

### 2. Install dependencies

```bash
cd househunt/frontend
npm install
# or
yarn install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration if needed
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will start on **http://localhost:5173** (default Vite port).

### 5. Build for production

```bash
npm run build
# or
yarn build
```

The compiled files will be in the `dist/` folder.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run linting (if configured) |

## API Integration

If connecting to a backend API, configure the API endpoint in your `.env` file:

```env
VITE_API_URL=http://localhost:5000
# or for production
VITE_API_URL=https://api.yourdomain.com
```

Access it in your code:

```javascript
const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/properties`)
  .then(res => res.json())
  .then(data => console.log(data));
```

## Notes for Deployment

### Environment Variables

Create a `.env.production` file or set environment variables in your deployment platform:

```env
VITE_API_URL=https://your-production-api-url.com
```

⚠️ **Important:** Never commit sensitive data (API keys, secrets) to version control. Use your deployment platform's secrets management.

### Build Optimization

Vite automatically:
- Minifies your code
- Chunks code for better caching
- Optimizes assets

### Deployment Platforms

#### **Vercel** (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on each push

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

#### **Netlify**
1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Set Build command: `npm run build`
3. Set Publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### **GitHub Pages**
1. Update `vite.config.js`:
```javascript
export default {
  base: '/House-rent_App/',
  // ... other config
}
```

2. Add deployment script to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Run: `npm run deploy`

### Performance Checklist

- ✅ Use production build (`npm run build`)
- ✅ Enable gzip compression on your server
- ✅ Set appropriate cache headers for static assets
- ✅ Optimize images (consider WebP format)
- ✅ Use a CDN for static file distribution
- ✅ Monitor performance with tools like Lighthouse

### Production Best Practices

- Set `VITE_API_URL` to your production API endpoint
- Disable source maps in production (add to `vite.config.js`):
```javascript
build: {
  sourcemap: false,
}
```
- Test the production build locally with `npm run preview`
- Monitor error logs and analytics
- Set up CORS properly on your backend API
- Use HTTPS in production

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request with a clear description of your changes

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this software for personal and commercial purposes. Attribution is appreciated but not required.

---

Created by [@sudha11n2](https://github.com/sudha11n2)
