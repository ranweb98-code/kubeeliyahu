import { execSync } from "node:child_process";
import { existsSync, readdirSync, rmSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "dist-deploy";
const LEGACY_DIR = "dist";

for (const dir of [OUT_DIR, LEGACY_DIR]) {
  rmSync(dir, { recursive: true, force: true });
}

execSync("vite build", { stdio: "inherit" });

function removeMovFiles(dir) {
  if (!existsSync(dir)) return;

  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      removeMovFiles(path);
      continue;
    }
    if (/\.mov$/i.test(name)) {
      unlinkSync(path);
      console.log(`Removed stale video: ${path}`);
    }
  }
}

removeMovFiles(OUT_DIR);
removeMovFiles(LEGACY_DIR);
