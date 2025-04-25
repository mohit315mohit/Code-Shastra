const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askLLM(message) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are CampusCopilot, a helpful assistant for college students." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI:", error);
    return "Sorry, I couldn't get a response from the AI.";
  }
}

module.exports = { askLLM };
