const path = require('path')
const fs = require('fs')

// Register custom fonts (e.g., for non-Latin scripts)
const registerFonts = (doc) => {
  const fontsDir = path.join(__dirname, '../assets/fonts')

  doc.font('Helvetica') // Default font
  // doc.registerFont('CustomFont', path.join(fontsDir, 'custom-font.ttf'));
}

module.exports = { registerFonts }
