const path = require("node:path");
const envFilePath = path.join(__dirname, ".env");
const port = process.env.PORT || "5000";

module.exports = {
  apps: [
    {
      name: "dacreation",
      cwd: __dirname,
      script: "dist/index.cjs",
      interpreter: "node",
      node_args: `--env-file=${envFilePath}`,
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
        NODE_ENV: "production",
        PORT: port,
      },
    },
  ],
};
