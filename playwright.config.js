module.exports = {
  testDir: "./tests",
  timeout: 30000,
  use: {
    browserName: "chromium",
    headless: true,
  },
  webServer: {
    command: "python -m http.server 8000",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: true,
    stdout: "pipe",
    stderr: "pipe",
  },
};
