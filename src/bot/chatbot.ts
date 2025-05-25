import OpenAI from 'openai';

class Chatbot {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Ensure your .env is loaded
        });
    }

    async processMessage(message: string): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            });
            return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        } catch (error) {
            console.error('Error processing message:', error);
            return 'An error occurred while processing your message.';  
        }
    }
}

export default Chatbot;