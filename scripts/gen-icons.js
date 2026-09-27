const sharp = require("sharp");
const path = require("path");

const bg = "#c8891a";
const ink = "#1c1206";
const surface = "#fffaee";

function jollyRogerSvg(size, padPct){
  const pad = size * padPct;
  const inner = size - pad * 2;
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size*0.18}" fill="${bg}"/>
  <g transform="translate(${pad},${pad}) scale(${inner/64})">
    <circle cx="32" cy="26" r="16" fill="${ink}"/>
    <ellipse cx="25" cy="24" rx="4" ry="5.5" fill="${surface}"/>
    <ellipse cx="39" cy="24" rx="4" ry="5.5" fill="${surface}"/>
    <path d="M27 33c2 2.5 8 2.5 10 0" stroke="${surface}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <rect x="30" y="10" width="4" height="4" fill="${ink}" transform="rotate(45 32 12)"/>
    <g stroke="${ink}" stroke-width="5" stroke-linecap="round">
      <path d="M14 46L50 58"/>
      <path d="M50 46L14 58"/>
    </g>
    <circle cx="14" cy="46" r="3" fill="${ink}"/>
    <circle cx="50" cy="46" r="3" fill="${ink}"/>
    <circle cx="14" cy="58" r="3" fill="${ink}"/>
    <circle cx="50" cy="58" r="3" fill="${ink}"/>
  </g>
</svg>`;
}

async function main(){
  const outDir = path.join(__dirname, "..", "icons");
  await sharp(Buffer.from(jollyRogerSvg(192, 0.12))).png().toFile(path.join(outDir, "icon-192.png"));
  await sharp(Buffer.from(jollyRogerSvg(512, 0.12))).png().toFile(path.join(outDir, "icon-512.png"));
  await sharp(Buffer.from(jollyRogerSvg(512, 0.24))).png().toFile(path.join(outDir, "icon-maskable-512.png"));
  console.log("icons written");
}

main().catch((e) => { console.error(e); process.exit(1); });
