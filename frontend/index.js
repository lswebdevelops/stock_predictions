const messages = [
    {
        role: 'system',
        content: 'You are an expert in quantum computing.'
    },
    {
        role: 'user',
        content: 'I am 10 years old, so don´t push. I want to know about quantum computing. write max 100 words.'
    }
];

async function getOpenAIChatResponse() {
    try {
        const response = await fetch('http://localhost:3000/api/openai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from backend:', errorData);
            document.getElementById('response-container').textContent = `Error: ${errorData.error}`;
            return;
        }

        const data = await response.json();
        console.log('Response from OpenAI:', data);
        document.getElementById('response-container').textContent = JSON.stringify(data.choices[0].message.content, null, 2);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('response-container').textContent = 'Failed to connect to the server.';
    }
}

getOpenAIChatResponse();