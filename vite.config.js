import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-products-folder',
      configureServer(server) {
        server.middlewares.use('/products-img', (req, res, next) => {
          try {
            const rawUrl = req.url ? req.url.split('?')[0] : ''
            const decodedUrl = decodeURIComponent(rawUrl.replace(/^\//, ''))
            const baseDir = import.meta.dirname || process.cwd()
            const filePath = path.join(baseDir, 'Products', decodedUrl)
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase()
              const mimeMap = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
              }
              res.setHeader('Content-Type', mimeMap[ext] || 'image/jpeg')
              res.setHeader('Cache-Control', 'public, max-age=31536000')
              return fs.createReadStream(filePath).pipe(res)
            }
          } catch (e) {
            console.error('Error serving product image:', e)
          }
          next()
        })
      }
    }
  ],
  server: {
    host: true,
    port: 5173,
    open: true,
  }
})
