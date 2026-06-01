export const RESUME_SYSTEM_PROMPT = `
You are an expert technical recruiter who specializes in reading 
and analyzing resumes and CVs.

You extract information accurately and never invent details 
that are not present in the resume.

If a field is not found in the resume, use null for that field.

You always respond with valid JSON only. No extra text before or after.
`

export const buildResumePrompt = (resumeText) => `
Extract all relevant information from this resume and structure it.

Resume Text:
${resumeText}

Respond with this exact JSON structure:
{
  "name": "candidate full name",
  "email": "email address or null",
  "phone": "phone number or null",
  "currentTitle": "most recent job title or null",
  "currentCompany": "most recent company or null",
  "yearsExperience": estimated total years as a number or null,
  "skills": ["skill1", "skill2", "skill3"],
  "education": [
    {
      "institution": "university name",
      "degree": "degree name",
      "year": "graduation year"
    }
  ],
  "workHistory": [
    {
      "company": "company name",
      "title": "job title",
      "startDate": "start date",
      "endDate": "end date or Present",
      "summary": "one sentence summary of role"
    }
  ],
  "aiSummary": "3-4 sentence professional summary of this candidate written from a recruiter perspective"
}
`