import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFileSync } from "node:fs";

const logo = "src/assets/logo.jpg";
const makePng = (size) =>
  sharp(logo)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

const png16 = await makePng(16);
const png32 = await makePng(32);
const png192 = await makePng(192);
const png512 = await makePng(512);
const ico = await pngToIco([png16, png32]);

writeFileSync("public/favicon.ico", ico);
writeFileSync("public/favicon.png", png192);
writeFileSync("public/og-image.jpg", await sharp(png512).jpeg({ quality: 85 }).toBuffer());
console.log("sizes:", ico.length, png192.length);
