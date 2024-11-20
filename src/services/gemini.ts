import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function processText(text: string): Promise<string> {
  try {
    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze and transform the following text into a comprehensive markdown document with two main sections:

SECTION 1 - CONTENT ANALYSIS
- Start with a brief executive summary (2-3 sentences)
- Create an introduction that sets the context
- Transform the content into detailed bullet points with:
  * Clear hierarchy and organization
  * Examples and elaboration where relevant
  * Logical grouping of related concepts
- End with a concise conclusion of key takeaways

SECTION 2 - VISUAL REPRESENTATION
- Create 2-4 markdown tables that:
  * Categorize and compare key points from Section 1
  * Show relationships and patterns in the data
  * Include relevant metrics where possible
  * Serve as quick-reference summaries
  * Use clear headers and organized columns

Use proper markdown syntax including ##, ###, -, *, and | for tables.
Each table should provide unique insights and complement the narrative.

Text to analyze:
${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error processing text:', error);

    // Specific logging for API errors
    if (error.response) {
      console.error('Response error:', error.response.data || error.response.statusText);
    } else if (error.message) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred');
    }

    throw new Error('Failed to process text with AI');
  }
}
