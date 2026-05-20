import { existsSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "dist-deploy";
const LEGACY_DIR = "dist";

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
      console.log(`Removed before deploy: ${path}`);
    }
  }
}

removeMovFiles(OUT_DIR);
removeMovFiles(LEGACY_DIR);

if (!existsSync(OUT_DIR)) {
  console.error(`Missing build output directory: ${OUT_DIR}`);
  process.exit(1);
}
