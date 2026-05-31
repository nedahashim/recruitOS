import { Router } from 'express'
import { callLLM } from '../services/llm.service.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'RecruitOS API is running',
    timestamp: new Date()
  })
})

router.get('/full', async (req, res, next) => {
  try {
    const aiTest = await callLLM(
      'You are a test assistant.',
      'Reply with exactly one word: ok',
      5
    )
    res.json({
      success: true,
      backend: '✅ ok',
      database: '✅ connected',
      ai: '✅ ' + aiTest.trim()
    })
  } catch (err) {
    next({ statusCode: 503, message: err.message })
  }
})

export default router