import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'

export const parseFile = async (fileBuffer, mimetype) => {
  if (mimetype === 'application/pdf') {
    const data = await pdfParse(fileBuffer)
    return data.text
  }

  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer: fileBuffer })
    return result.value
  }

  throw new Error('Unsupported file type. Please upload PDF or DOCX.')
}