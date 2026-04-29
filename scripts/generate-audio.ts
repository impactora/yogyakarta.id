import { mkdir, writeFile } from "node:fs/promises";

const API_KEY = process.env.TYPECAST_API_KEY;

const timeline = [
  {
    year: "732",
    textId:
      "Raja Sanjaya mendirikan lingga di Bukit Stirangga, Gunung Wukir. Dokumen tertua keberadaan peradaban Hindu di dataran Kedu — titik nol sejarah tertulis Yogyakarta.",
    textEn:
      "King Sanjaya erected a lingam on Stirangga Hill, Mount Wukir. The oldest document of Hindu civilization in the Kedu plain — the zero point of Yogyakarta's written history.",
  },
  {
    year: "856",
    textId:
      "Wangsa Sanjaya merampungkan kompleks candi Hindu terbesar Asia Tenggara. 240 struktur batu andesit dibangun tanpa semen — hanya gravitasi, presisi, dan keyakinan.",
    textEn:
      "The Sanjaya dynasty completed Southeast Asia's largest Hindu temple complex. 240 andesite stone structures built without cement — only gravity, precision, and faith.",
  },
  {
    year: "1587",
    textId:
      "Panembahan Senopati mendirikan Kesultanan Mataram di Kotagede. Momen ini menandai pergeseran kembali episentrum kekuatan politik dan budaya Jawa dari pesisir utara ke wilayah pedalaman.",
    textEn:
      "Panembahan Senopati founded the Mataram Sultanate in Kotagede. This moment marked the shift of Java's political and cultural epicenter from the northern coast back to the interior.",
  },
  {
    year: "1755",
    textId:
      "VOC membelah Mataram Islam. Pangeran Mangkubumi menjadi Sultan Hamengku Buwono I dan langsung merancang tata kota berbasis poros kosmologis.",
    textEn:
      "The VOC divided the Islamic Mataram. Prince Mangkubumi became Sultan Hamengku Buwono I and immediately designed a city layout based on a cosmological axis.",
  },
  {
    year: "1825",
    textId:
      "Lima tahun gerilya dari Goa Selarong menguras kas Hindia Belanda hingga Fl 20 juta. Perlawanan terpanjang dan termahal yang pernah dihadapi VOC di Jawa.",
    textEn:
      "Five years of guerrilla warfare from Selarong Cave drained the Dutch East Indies treasury by 20 million guilders. The longest and most expensive resistance the VOC ever faced in Java.",
  },
  {
    year: "1946",
    textId:
      "Sultan HB IX menyerahkan kedaulatan wilayahnya kepada NKRI. Ketika Jakarta jatuh ke NICA, Yogyakarta menjelma menjadi jantung revolusi kemerdekaan.",
    textEn:
      "Sultan HB IX surrendered his territory's sovereignty to the Republic of Indonesia. When Jakarta fell to NICA, Yogyakarta became the heart of the independence revolution.",
  },
  {
    year: "1949",
    textId:
      "TNI menduduki Yogyakarta selama 6 jam di bawah komando Letkol Soeharto. Serangan simbolis yang membuktikan kepada PBB bahwa RI belum mati.",
    textEn:
      "The Indonesian National Armed Forces occupied Yogyakarta for 6 hours under the command of Lt. Col. Soeharto. A symbolic attack proving to the UN that Indonesia was not dead.",
  },
  {
    year: "2012",
    textId:
      "UU No. 13 Tahun 2012 mengukuhkan Sultan dan Paku Alam sebagai Gubernur dan Wakil Gubernur seumur hidup — satu-satunya monarki konstitusional diakui negara.",
    textEn:
      "Law No. 13 of 2012 confirmed the Sultan and Paku Alam as Governor and Vice Governor for life — the only state-recognized constitutional monarchy.",
  },
];

async function generate() {
  if (!API_KEY) {
    console.error("TYPECAST_API_KEY is missing from environment variables.");
    process.exit(1);
  }

  await mkdir("public/audio/sejarah", { recursive: true });

  for (const item of timeline) {
    for (const lang of ["id", "en"]) {
      const text = lang === "id" ? item.textId : item.textEn;
      const language = lang === "id" ? "ind" : "eng";

      console.log(`Memproses audio untuk tahun ${item.year} (${lang})...`);

      try {
        const reqRes = await fetch(
          "https://api.typecast.ai/v1/text-to-speech",
          {
            method: "POST",
            headers: {
              "X-API-KEY": API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model: "ssfm-v30",
              voice_id: "tc_60e5426de8b95f1d3000d7b5",
              language,
              output: { audio_format: "mp3" },
            }),
          },
        );

        if (!reqRes.ok) {
          const errorText = await reqRes.text();
          throw new Error(
            `API Request Failed: ${reqRes.status} - ${errorText}`,
          );
        }

        const buffer = await reqRes.arrayBuffer();
        const filePath = `public/audio/sejarah/${item.year}-${lang}.mp3`;
        await writeFile(filePath, new Uint8Array(buffer));

        console.log(`Berhasil menyimpan: ${filePath}`);
      } catch (error) {
        console.error(`Gagal memproses ${item.year} (${lang}):`, error);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

generate();
