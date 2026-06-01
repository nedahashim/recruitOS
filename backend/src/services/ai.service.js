import { callLLM } from './llm.service.js'
import { JD_SYSTEM_PROMPT, buildJDPrompt } from '../prompts/jdGenerator.prompt.js'
import { RESUME_SYSTEM_PROMPT, buildResumePrompt } from '../prompts/resumeParser.prompt.js'
import { INTERVIEW_SYSTEM_PROMPT, buildInterviewPrepPrompt } from '../prompts/interviewPrep.prompt.js'

// Safely parse JSON from LLM response
// LLMs sometimes wrap JSON in markdown code blocks like ```json ... ```
// This function strips those out before parsing
const parseJSON = (text) => {
  try {
    // Remove markdown code blocks if present
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('Failed to parse LLM response as JSON:', text)
    throw new Error('AI returned an unexpected response format. Please try again.')
  }
}

// Generate a polished job description from raw notes
export const generateJobDescription = async (rawInput, jobTitle) => {
  const systemPrompt = JD_SYSTEM_PROMPT
  const userPrompt = buildJDPrompt(rawInput, jobTitle)

  const response = await callLLM(systemPrompt, userPrompt, 2000)
  return parseJSON(response)
}

// Parse a resume text into structured candidate data
export const parseResume = async (resumeText) => {
  const systemPrompt = RESUME_SYSTEM_PROMPT
  const userPrompt = buildResumePrompt(resumeText)

  const response = await callLLM(systemPrompt, userPrompt, 2000)
  return parseJSON(response)
}

// Generate interview prep from candidate + job data
export const generateInterviewPrep = async (candidateProfile, jobDescription) => {
  const systemPrompt = INTERVIEW_SYSTEM_PROMPT
  const userPrompt = buildInterviewPrepPrompt(candidateProfile, jobDescription)

  const response = await callLLM(systemPrompt, userPrompt, 2000)
  return parseJSON(response)
}