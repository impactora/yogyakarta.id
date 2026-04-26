import Groq from "groq-sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const { days, interest } = body;

  if (!days || !interest) {
    throw createError({
      statusCode: 400,
      statusMessage: "Parameter days dan interest wajib diisi.",
    });
  }

  try {
    const groq = new Groq({ apiKey: config.groqApiKey });

    const prompt = `Buatkan itinerary liburan di Yogyakarta selama ${days} hari dengan fokus pada ${interest}.
    Keluarkan HASIL MURNI DALAM FORMAT JSON array of objects tanpa teks pembuka atau penutup. 
    Setiap object mewakili satu hari dengan struktur:
    { "hari": 1, "kegiatan": ["Pagi: Aktivitas 1", "Siang: Aktivitas 2", "Malam: Aktivitas 3"] }`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 0.2,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "[]";

    let parsedPlan = [];
    try {
      parsedPlan = JSON.parse(reply);
    } catch (e) {
      parsedPlan = [
        { hari: "Error", kegiatan: ["Gagal memproses struktur data dari AI."] },
      ];
    }

    return { success: true, plan: parsedPlan };
  } catch (error: any) {
    const errorMessage = error?.message || "Unknown error";
    console.error("Groq API Error Details:", errorMessage);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal merancang itinerary.",
    });
  }
});
