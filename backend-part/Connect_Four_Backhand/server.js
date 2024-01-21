const express = require('express');
const { default: OpenAI } = require('openai');
const app = express();
const port = 3010;

const data= [
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "PLAYER",
        "EMPTY",
        "EMPTY",
        "AI",
        "EMPTY",
        "EMPTY"
    ]
]

const openai = new OpenAI({
    apiKey: "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",
});

const waitForCompletion = async (thread_id, run_id) => {
    let run = await openai.beta.threads.runs.retrieve(thread_id, run_id);
    while (run.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Waiting for completion...');
        run = await openai.beta.threads.runs.retrieve(thread_id, run_id);
        console.log(run);
    }
    return run;
};

app.use(express.json());

app.get('/', async (req, res) => {
    const thread = await openai.beta.threads.create(); 
    console.log(thread.id);
    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: JSON.stringify(data) // Convert the data to JSON format and send to OpenAI
        }
    );
    const run = await openai.beta.threads.runs.create(
        thread.id,
        { 
            assistant_id: "asst_8s56kdyNl5ZzE11iWFNX1idG",
            instructions: null
        }
    );
    const result = await waitForCompletion(thread.id, run.id);

    const messages = await openai.beta.threads.messages.list(thread.id);
    messages.data.forEach(message => {
        console.log("--------------------------------------------");
        console.log(message.content[0].text.value);
        console.log("--------------------------------------------");
    });

    // Send the response from OpenAI as the HTTP response
    res.json(result); // Here, sending the result as a JSON response
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});