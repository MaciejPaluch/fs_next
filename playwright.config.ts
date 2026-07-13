import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Wskazuje folder, w którym znajdują się Twoje pliki z testami
  testDir: "./tests",

  // Uruchamia testy równolegle, żeby było szybciej
  fullyParallel: false,
  workers: 1,

  // Zatrzymuje testy, jeśli któryś "wywali się" tylko za pierwszym razem
  retries: 0,

  use: {
    // TO JEST NAJWAŻNIEJSZA LINIJKA - bazowy URL Twojej aplikacji
    baseURL: "http://localhost:3000",

    // Zbieranie logów/błędów (przydatne do debugowania)
    trace: "retain-on-failure",
  },

  // Konfiguracja przeglądarki (domyślnie używamy silnika Chrome)
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
