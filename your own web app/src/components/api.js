import OpenAI from "openai";

// TODO: fix dangerouslyAllowBrowser
const openai = new OpenAI({ apiKey: process.env.REACT_APP_APIKEY, dangerouslyAllowBrowser: true })

async function getStudyGuide(subject) {
  // log an error if our apiKey isn't set up
  if (!openai.apiKey) {
    // TODO: more error handling
      console.log("[!] API key not configured")
    return
  }

  try {
    // generate the study guide from openai api
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: generatePrompt(subject),
      max_tokens: 450,
      temperature: 0.3,
    });
    const subjectStr = completion.choices[0].text
    return subjectStr
  } catch (error) {
    // let us know if something went wrong
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
    alert('An error occurred during your request.')
  }
}

export {getStudyGuide}

// the propt for our study guide
function generatePrompt(subject) {
  const capitalizedSubject = subject[0].toUpperCase() + subject.slice(1).toLowerCase()
  return `Generate a study guide for the given subject.
  Wtite it as one paragraph, in 450 tokens or less.

  Subject: ${capitalizedSubject}
  Study guide:`
}