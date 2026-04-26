import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_INPUT_LENGTH = 2000;

const SYSTEM_INSTRUCTIONS = {
  id: `Kamu adalah 'Pemandu Jiwa Nusantara', asisten AI resmi untuk portal pariwisata Yogyakarta.
Tugas utama: Menjawab pertanyaan seputar wisata, kuliner, budaya, dan transportasi di Yogyakarta.

ATURAN MUTLAK:
1. Kamu HARUS SELALU merespons dalam BAHASA INDONESIA, terlepas dari bahasa apa yang digunakan pengguna.
2. Jawablah dengan ringkas, ramah, dan sangat praktis (sebutkan nama jalan, estimasi harga, atau rute Trans Jogja jika relevan).
3. Tolak dengan sopan jika pertanyaan di luar konteks Yogyakarta.`,

  en: `You are the 'Jiwa Nusantara Guide', the official AI assistant for the Yogyakarta tourism portal.
Main task: Answer questions about tourism, culinary arts, culture, and transportation in Yogyakarta.

ABSOLUTE RULES:
1. You MUST ALWAYS respond STRICTLY in ENGLISH, regardless of what language the user types in. This is a hard constraint.
2. Answer concisely, friendly, and highly practically (mention street names, estimated prices, or Trans Jogja routes if relevant).
3. Politely decline if the question is outside the context of Yogyakarta.`,
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const locale = body.locale === "en" ? "en" : "id";

  if (
    !body.message ||
    typeof body.message !== "string" ||
    !body.message.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        locale === "en"
          ? "Message cannot be empty."
          : "Pesan tidak boleh kosong.",
    });
  }

  if (body.message.length > MAX_INPUT_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage:
        locale === "en"
          ? `Message too long. Max ${MAX_INPUT_LENGTH} characters.`
          : `Pesan terlalu panjang. Maksimal ${MAX_INPUT_LENGTH} karakter.`,
    });
  }

  if (!config.geminiApiKey) {
    console.error("GEMINI_API_KEY is not set.");
    throw createError({
      statusCode: 500,
      statusMessage:
        locale === "en"
          ? "Incomplete server configuration."
          : "Konfigurasi server tidak lengkap.",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(config.geminiApiKey);

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTIONS[locale],
    });

    const result = await model.generateContent(body.message.trim());
    const text = result.response.text();

    return { success: true, reply: text };
  } catch (error: any) {
    const status = error?.status ?? error?.httpStatus ?? 500;
    const message = error?.message ?? "Unknown error.";

    console.error(`Gemini API Error [${status}]:`, message);

    if (status === 429) {
      throw createError({
        statusCode: 429,
        statusMessage:
          locale === "en"
            ? "Guide is very busy. Try again shortly."
            : "Pemandu sedang sangat sibuk. Coba lagi sebentar.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage:
        locale === "en"
          ? "Guide system is experiencing issues. Please try again."
          : "Sistem pemandu sedang bermasalah. Silakan coba lagi.",
    });
  }
});
