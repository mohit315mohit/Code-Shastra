const together = require("../config/togetherClient");

const handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { handleChat };
