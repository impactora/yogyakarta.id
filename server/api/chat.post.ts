import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (!body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Pesan tidak boleh kosong",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(config.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `Kamu adalah 'Pemandu Jiwa Nusantara', asisten AI resmi untuk portal pariwisata Yogyakarta. 
    Tugasmu menjawab pertanyaan seputar wisata, kuliner, budaya, dan transportasi di Yogyakarta. 
    Jawablah dengan ringkas, ramah, dan sangat praktis (sebutkan nama jalan, estimasi harga, atau rute Trans Jogja jika relevan). 
    Jangan pernah menjawab pertanyaan di luar konteks Yogyakarta. Jika ditanya hal lain, tolak dengan sopan.`;

    const prompt = `${systemInstruction}\n\nPertanyaan Turis: ${body.message}\nJawaban Pemandu:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, reply: text };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Sistem pemandu sedang sibuk.",
    });
  }
});
