require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { default: OpenAI } = require('openai');
const app = express();
app.use(cors());
const port = 3010;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

let threadId = null;

async function createThread() {
    try {
        const thread = await openai.beta.threads.create();
        threadId = thread.id;
        console.log('Thread ID:', thread.id);
    } catch (error) {
        console.error('Error creating thread:', error);
    }
}

createThread();

async function waitForRunCompletion(threadId, runId) {
    let run = await openai.beta.threads.runs.retrieve(threadId, runId);
    while (run.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        run = await openai.beta.threads.runs.retrieve(threadId, runId);
    }
    return run;
}

async function communicateWithGPT(message) {
    if (!threadId) {
        await createThread();
    }

    await openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: message,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.ASSISTANT_ID,
    });

    await waitForRunCompletion(threadId, run.id);

    const messages = await openai.beta.threads.messages.list(threadId);
    const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');
    const relevantMessage = assistantMessages.find(msg => msg.run_id === run.id);

    if (relevantMessage && relevantMessage.content && relevantMessage.content.length > 0) {
        return relevantMessage.content[0].text.value || '';
    } else {
        throw new Error('No valid response from assistant');
    }
}

app.post('/ai-move', async (req, res) => {
    const { board } = req.body;
    const message = JSON.stringify(board);
    try {
        const gptResponse = await communicateWithGPT(message);
        const gptBoard = JSON.parse(gptResponse);
        res.json(gptBoard);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

