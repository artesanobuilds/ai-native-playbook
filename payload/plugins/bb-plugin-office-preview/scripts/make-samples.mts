// Writes small sample Office files into samples/ for manual checks in BB.
// Run: node --experimental-strip-types scripts/make-samples.mts
import { writeFileSync } from "node:fs";
import { makeCsv, makeDocx, makePptx, makeXlsx } from "../test/fixtures.ts";

writeFileSync("samples/sample.docx", Buffer.from(await makeDocx()));
writeFileSync("samples/sample.pptx", Buffer.from(await makePptx()));
writeFileSync("samples/sample.xlsx", Buffer.from(makeXlsx(30)));
writeFileSync("samples/sample.csv", Buffer.from(makeCsv("city,temp\nDenver,72\nBoulder,68\n")));
console.log("wrote samples/");
