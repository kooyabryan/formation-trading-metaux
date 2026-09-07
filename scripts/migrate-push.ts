import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required to push the production schema.");
  process.exit(1);
}

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(command, ["drizzle-kit", "push"], {
  env: process.env,
  stdio: "inherit",
});

if (result.error) {
  console.error("Failed to start drizzle-kit:", result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
