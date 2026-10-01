const sharp = require("sharp");
const path = require("path");

const bg = "#e0263f";
const ink = "#ffffff";

function logoSvg(size, padPct){
  const pad = size * padPct;
  const inner = size - pad * 2;
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size*0.18}" fill="${bg}"/>
  <g transform="translate(${pad},${pad}) scale(${inner/64})">
    <circle cx="32" cy="32" r="27" stroke="${ink}" stroke-width="5" fill="none"/>
    <path d="M26 20 L47 32 L26 44 Z" fill="${ink}"/>
  </g>
</svg>`;
}

async function main(){
  const outDir = path.join(__dirname, "..", "icons");
  await sharp(Buffer.from(logoSvg(192, 0.12))).png().toFile(path.join(outDir, "icon-192.png"));
  await sharp(Buffer.from(logoSvg(512, 0.12))).png().toFile(path.join(outDir, "icon-512.png"));
  await sharp(Buffer.from(logoSvg(512, 0.24))).png().toFile(path.join(outDir, "icon-maskable-512.png"));
  console.log("icons written");
}

main().catch((e) => { console.error(e); process.exit(1); });
