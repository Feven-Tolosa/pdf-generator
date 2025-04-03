// src/services/pdfService.js
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const generatePDF = () => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument()
      const outputDir = path.join(__dirname, '../outputs')

      // Create outputs directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
      }

      const outputPath = path.join(outputDir, 'document.pdf')
      const stream = fs.createWriteStream(outputPath)

      doc.pipe(stream)

      // Add sample content
      doc.fontSize(25).text('Hello PDF!', { align: 'center' })
      doc.moveDown()
      doc.text(`Generated at: ${new Date().toLocaleString()}`)

      doc.end()

      stream.on('finish', () => {
        console.log('PDF successfully created at:', outputPath)
        resolve(outputPath)
      })

      stream.on('error', (err) => {
        console.error('Stream error:', err)
        reject(err)
      })
    } catch (err) {
      console.error('PDF generation error:', err)
    }
  })
}

module.exports = { generatePDF }
