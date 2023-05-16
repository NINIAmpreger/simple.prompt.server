import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const model = req.body.model || 'text-davinci-003';
    const temperature = req.body.temperature || 0;
    const max_tokens = req.body.maxTokens || 256;
    const top_p = req.body.topP || 0;

    console.log(prompt);

    const response = await openai.createCompletion({
      model: model,
      prompt: `${prompt}`,
      temperature: parseInt(temperature),
      max_tokens: parseInt(max_tokens),
      top_p: parseInt(top_p),
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      answer: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000")
);
