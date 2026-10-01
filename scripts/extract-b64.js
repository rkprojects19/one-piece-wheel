const fs = require("fs");
const [,, srcPath, destPath, mode] = process.argv;
const raw = fs.readFileSync(srcPath, "utf8");
const arr = JSON.parse(raw);
const text = arr[0].text;
if(text.charCodeAt(0) !== 34){
  throw new Error("expected leading quote, got: " + JSON.stringify(text.slice(0, 20)));
}
const closeIdx = text.indexOf('"', 1);
if(closeIdx === -1){
  throw new Error("no closing quote found");
}
const b64 = text.slice(1, closeIdx);
if(mode === "append"){
  fs.appendFileSync(destPath, b64);
} else {
  fs.writeFileSync(destPath, b64);
}
console.log("wrote", b64.length, "base64 chars from", srcPath);
