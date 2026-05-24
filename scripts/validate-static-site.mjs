import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "ops.html",
  "launch-kit.html",
  "ig-travel-planner.html",
  "calendar.html",
  "library.html",
  "plans.html",
  "metrics.html",
  "assets/app.js",
  "assets/launch.js",
  "assets/styles.css",
  "vercel.json",
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));

if (htmlFiles.length < 100) {
  failures.push(`Expected at least 100 HTML files, found ${htmlFiles.length}`);
}

const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
const ignoredSchemes = /^(?:https?:|mailto:|tel:|javascript:|data:|#)/i;

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const fromDir = path.dirname(htmlFile);
  for (const match of html.matchAll(attrPattern)) {
    const link = match[1].trim();
    if (!link || ignoredSchemes.test(link)) continue;

    const cleanLink = decodeURIComponent(link.split("#")[0].split("?")[0]);
    if (!cleanLink) continue;

    const target = cleanLink.startsWith("/")
      ? path.join(root, cleanLink.slice(1))
      : path.join(fromDir, cleanLink);

    const resolved = path.resolve(target);
    const relative = path.relative(root, resolved);
    const outsideRoot = relative.startsWith("..") || path.isAbsolute(relative);

    if (outsideRoot) {
      failures.push(`${path.relative(root, htmlFile)} links outside project: ${link}`);
    } else if (!fs.existsSync(resolved)) {
      failures.push(`${path.relative(root, htmlFile)} has missing link: ${link}`);
    }
  }
}

if (failures.length) {
  console.error("Static site validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Static site validation passed: ${htmlFiles.length} HTML files checked.`);
