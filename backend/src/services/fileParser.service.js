import mammoth from 'mammoth'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const officeParser = require('officeparser')

const extractPdfText = (buffer) => {
  return new Promise((resolve, reject) => {
    officeParser.parseOfficeAsync(buffer, { outputErrorToConsole: false })
      .then(resolve)
      .catch(reject)
  })
}

export const parseFile = async (fileBuffer, mimetype) => {
  try {
    if (mimetype === 'application/pdf') {
      const text = await extractPdfText(fileBuffer)
      return text
    }

    if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer })
      return result.value
    }

    throw new Error('Unsupported file type. Please upload PDF or DOCX.')
  } catch (error) {
    throw new Error(`Failed to extract text from file: ${error.message}`)
  }
}