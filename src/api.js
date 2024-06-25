// src/api.js
import axios from 'axios';

const API_KEY = 'Replace with your OpenAI API key';

const openaiApi = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

export const sendMessageToChatGPT = async (message) => {
    try {
        const response = await openaiApi.post('/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending message to ChatGPT:', error);
        return 'Sorry, there was an error. Please try again later.';
    }
};
