import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBookArticle = async (bookTitle: string, authorName: string, releaseDate: string) => {
  const ai = getClient();
  if (!ai) {
    // Fallback if no API key is present
    return {
      headline: `BREAKING: ${bookTitle} Announced!`,
      content: `The literary world is buzzing with excitement as ${authorName} announces their latest work, "${bookTitle}". Slated for release on ${releaseDate}, this highly anticipated book promises to captivate readers. Pre-orders are expected to open soon as fans eagerly await more details.`
    };
  }

  try {
    const prompt = `
      You are a newspaper editor for "Author's Newsletter".
      Write a short, sensational, vintage-style newspaper snippet (approx 80 words) announcing a new book release.
      
      Details:
      - Book Title: ${bookTitle}
      - Author: ${authorName}
      - Release Date: ${releaseDate}

      Output JSON format:
      {
        "headline": "A catchy, old-school newspaper headline",
        "content": "The article body text."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    
    return JSON.parse(text) as { headline: string; content: string };
  } catch (error) {
    console.error("Gemini generation failed", error);
    return {
      headline: `New Release: ${bookTitle}`,
      content: `${authorName} has officially announced the release of "${bookTitle}" on ${releaseDate}. Mark your calendars for this exciting new addition to the literary canon.`
    };
  }
};