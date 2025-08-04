# Let me create a comprehensive React application structure for the CFA Mastery Platform
# Based on the previous conversation context and requirements

import json
import os

# Create the React app structure
react_structure = {
    "package.json": {
        "name": "karanwal-cfa-mastery",
        "version": "1.0.0",
        "private": True,
        "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "react-router-dom": "^6.8.0",
            "@types/react": "^18.0.28",
            "@types/react-dom": "^18.0.11",
            "typescript": "^4.9.5",
            "chart.js": "^4.2.1",
            "react-chartjs-2": "^5.2.0"
        },
        "devDependencies": {
            "@vitejs/plugin-react": "^3.1.0",
            "vite": "^4.1.0",
            "tailwindcss": "^3.2.7",
            "postcss": "^8.4.21",
            "autoprefixer": "^10.4.14"
        },
        "scripts": {
            "dev": "vite",
            "build": "tsc && vite build",
            "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
            "preview": "vite preview"
        }
    },
    "vite.config.ts": """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
})""",
    "tsconfig.json": """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}""",
    "index.html": """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Karanwal Capital: CFA Mastery Interactive Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>"""
}

print("Created React app structure foundation")
print(f"Package.json dependencies: {len(react_structure['package.json']['dependencies'])} packages")