import Groq from 'groq-sdk'

export const callLLM = async (systemPrompt, userPrompt, maxTokens = 1500) => {
  // Client is created here instead of at the top
  // This way it always reads the env variable after dotenv has loaded
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error('LLM call failed:', error.message)
    throw new Error('AI service unavailable. Please try again.')
  }
}