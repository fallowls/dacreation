const fs = require("node:fs");
const path = require("node:path");

function loadOptionalEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const env = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key) {
      env[key] = value;
    }
  }

  return env;
}

const envFilePath = path.join(__dirname, ".env");
const fileEnv = loadOptionalEnvFile(envFilePath);
const port = process.env.PORT || fileEnv.PORT || "5000";

module.exports = {
  apps: [
    {
      name: "dacreation",
      cwd: __dirname,
      script: "dist/index.cjs",
      interpreter: "node",
      exec_mode: "fork",
      instances: 1,
      watch: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 5000,
      kill_timeout: 5000,
      time: true,
      env: {
        ...fileEnv,
        NODE_ENV: "production",
        PORT: port,
      },
    },
  ],
};
