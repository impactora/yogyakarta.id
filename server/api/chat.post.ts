import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL = "gemini-2.0-flash";
const MAX_INPUT_LENGTH = 2000;

const SYSTEM_INSTRUCTION = `Kamu adalah 'Pemandu Jiwa Nusantara', asisten AI resmi untuk portal pariwisata Yogyakarta.
Tugasmu menjawab pertanyaan seputar wisata, kuliner, budaya, dan transportasi di Yogyakarta.
Jawablah dengan ringkas, ramah, dan sangat praktis (sebutkan nama jalan, estimasi harga, atau rute Trans Jogja jika relevan).
Jangan pernah menjawab pertanyaan di luar konteks Yogyakarta. Jika ditanya hal lain, tolak dengan sopan.`;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (
    !body.message ||
    typeof body.message !== "string" ||
    !body.message.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Pesan tidak boleh kosong.",
    });
  }

  if (body.message.length > MAX_INPUT_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Pesan terlalu panjang. Maksimal ${MAX_INPUT_LENGTH} karakter.`,
    });
  }

  if (!config.geminiApiKey) {
    console.error("GEMINI_API_KEY is not set.");
    throw createError({
      statusCode: 500,
      statusMessage: "Konfigurasi server tidak lengkap.",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(config.geminiApiKey);

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(body.message.trim());
    const text = result.response.text();

    return { success: true, reply: text };
  } catch (error: any) {
    const status = error?.status ?? error?.httpStatus ?? 500;
    const message = error?.message ?? "Terjadi kesalahan tidak dikenal.";

    console.error(`Gemini API Error [${status}]:`, message);

    if (status === 429) {
      throw createError({
        statusCode: 429,
        statusMessage: "Pemandu sedang sangat sibuk. Coba lagi sebentar.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Sistem pemandu sedang bermasalah. Silakan coba lagi.",
    });
  }
});
