const fs = require('fs') // Critical fix: Import fs module
const express = require('express')
const path = require('path')
const { generatePDF } = require('./services/pdfService')

const app = express()
const PORT = 3000

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Serve static files
app.use(express.static(path.join(__dirname, '../public')))

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// PDF generation endpoint
app.get('/generate-pdf', async (req, res) => {
  try {
    console.log('Generating PDF...')
    const pdfPath = await generatePDF()

    // Verify file exists
    if (!fs.existsSync(pdfPath)) {
      throw new Error('PDF file was not created')
    }

    // Set headers and stream the file
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf')

    const fileStream = fs.createReadStream(pdfPath)
    fileStream.pipe(res)

    fileStream.on('error', (err) => {
      console.error('File stream error:', err)
      res
        .status(500)
        .json({ error: 'Error streaming PDF', details: err.message })
    })
  } catch (err) {
    console.error('PDF endpoint error:', err)
    res.status(500).json({
      error: 'Failed to generate PDF',
      details: err.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
