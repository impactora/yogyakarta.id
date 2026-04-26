export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const lat = "-7.7956";
  const lon = "110.3695";

  try {
    const data = await $fetch<any>(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        query: {
          lat,
          lon,
          appid: config.openWeatherApiKey,
          units: "metric",
        },
      },
    );

    return {
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      desc: data.weather[0].main.toUpperCase(),
    };
  } catch (error) {
    return { temp: "--", humidity: "--", desc: "OFFLINE" };
  }
});
