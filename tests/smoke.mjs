// Smoke test for the static export. Precondition: `npm run build` (serves ./out).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    const root = execSync("npm root -g").toString().trim();
    return createRequire(path.join(root, "noop.js"))("playwright");
  }
}
const { chromium } = loadPlaywright();

const BASE = "/abhishek-engagement/";
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const ROUTES = [
  { path: "", texts: ["tap envelope to open", "you’ve got mail from"] },
  { path: "invitation/", texts: ["getting", "countdown is on", "kindly", "with love"] },
  { path: "rsvp/", texts: ["accepts with pleasure", "regretfully declines", "submit"] },
  { path: "details/", texts: ["our timeline", "guest arrival", "farewell", "gupta family", "venue location"] },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".map": "application/json",
};

function serve() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!pathname.startsWith(BASE)) {
      res.writeHead(404).end("not found");
      return;
    }
    let file = path.join(OUT, pathname.slice(BASE.length));
    if (!file.startsWith(OUT)) {
      res.writeHead(404).end("not found");
      return;
    }
    try {
      if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      const data = fs.readFileSync(file);
      res.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

const failures = [];
const fail = (ctx, msg) => failures.push(`[${ctx}] ${msg}`);

async function scrollToBottom(page) {
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
}

async function checkImages(page, ctx) {
  const deadline = Date.now() + 10_000;
  let bad = [];
  while (Date.now() < deadline) {
    bad = await page.evaluate(() =>
      [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.currentSrc || i.src),
    );
    if (bad.length === 0) return;
    await page.waitForTimeout(250);
  }
  for (const src of bad) fail(ctx, `image not loaded: ${src}`);
}

async function checkRoute(browser, origin, vp, route) {
  const ctx = `${vp.name} /${route.path}`;
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  page.on("console", (m) => m.type() === "error" && fail(ctx, `console error: ${m.text()}`));
  page.on("pageerror", (e) => fail(ctx, `pageerror: ${e.message}`));
  page.on("response", (r) => r.status() >= 400 && fail(ctx, `HTTP ${r.status()} ${r.url()}`));
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.origin === origin && !u.pathname.startsWith(BASE)) fail(ctx, `request outside basePath: ${r.url()}`);
  });

  const resp = await page.goto(origin + BASE + route.path, { waitUntil: "load" });
  if (!resp || resp.status() !== 200) fail(ctx, `status ${resp?.status()}`);

  const body = (await page.evaluate(() => document.body.innerText)).toLowerCase();
  for (const t of route.texts) if (!body.includes(t)) fail(ctx, `missing text: "${t}"`);

  await scrollToBottom(page);
  await checkImages(page, ctx);

  if (vp.width === 390) {
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    if (w > 390) fail(ctx, `horizontal overflow: scrollWidth ${w} > 390`);
  }
  await context.close();
}

async function step(ctx, label, fn) {
  try {
    await fn();
  } catch (e) {
    fail(ctx, `${label}: ${String(e.message).split("\n")[0]}`);
  }
}

async function checkFlows(browser, origin) {
  const url = (p) => origin + BASE + p;
  const newPage = async () => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    context.setDefaultTimeout(5000);
    return { context, page: await context.newPage() };
  };

  // Landing -> invitation, countdown ticks to digits.
  {
    const { context, page } = await newPage();
    await step("flow landing", "open envelope navigates to invitation", async () => {
      await page.goto(url(""), { waitUntil: "load" });
      await page.click('button[aria-label="Open invitation"]');
      await page.waitForURL(/\/abhishek-engagement\/invitation\/$/, { timeout: 6000 });
    });
    await step("flow invitation", "countdown days is numeric", async () => {
      await page.waitForTimeout(1500);
      const days = await page.locator("[data-testid=cd-days]").first().innerText();
      if (!/^\d+$/.test(days.trim())) throw new Error(`cd-days is "${days}"`);
    });
    await step("flow invitation", "Kindly RSVP link goes to /rsvp/", async () => {
      await page.getByRole("link", { name: /kindly\s*rsvp/i }).first().click();
      await page.waitForURL(/\/abhishek-engagement\/rsvp\/$/, { timeout: 6000 });
    });
    await context.close();
  }

  // RSVP submit.
  {
    const { context, page } = await newPage();
    await context.route("https://docs.google.com/**", (r) => r.fulfill({ status: 200, body: "" }));
    await step("flow rsvp", "whitespace-only name is blocked by native validation", async () => {
      await page.goto(url("rsvp/"), { waitUntil: "load" });
      await page.locator("#rsvp-name").fill("   ");
      await page.getByLabel("Accepts with pleasure").check();
      await page.getByRole("button", { name: /submit/i }).click();
      await page.waitForTimeout(400);
      if ((await page.locator("[role=status]").count()) !== 0) throw new Error("status shown for blank name");
      const bad = await page.locator("#rsvp-name").evaluate((el) => el.validity.patternMismatch);
      if (bad !== true) throw new Error("patternMismatch is not true");
    });
    await step("flow rsvp", "fill and submit shows thank you or closed notice", async () => {
      await page.goto(url("rsvp/"), { waitUntil: "load" });
      await page.getByLabel(/your full name/i).fill("Test Guest");
      await page.getByLabel("Accepts with pleasure").check();
      await page.getByRole("button", { name: /submit/i }).click();
      await page.locator("[role=status]").waitFor({ timeout: 6000 });
      const t = (await page.locator("[role=status]").innerText()).toLowerCase();
      if (!t.includes("thank you") && !t.includes("rsvp isn’t open yet")) throw new Error(`unexpected status: ${t}`);
    });
    await step("flow rsvp", "GO BACK goes to /invitation/", async () => {
      await page.goto(url("rsvp/"), { waitUntil: "load" });
      await page.getByRole("link", { name: /go back/i }).first().click();
      await page.waitForURL(/\/abhishek-engagement\/invitation\/$/, { timeout: 6000 });
    });
    await context.close();
  }

  // Invitation -> details -> back.
  {
    const { context, page } = await newPage();
    await step("flow invitation", "The Details link goes to /details/", async () => {
      await page.goto(url("invitation/"), { waitUntil: "load" });
      await page.getByRole("link", { name: /the\s*details/i }).first().click();
      await page.waitForURL(/\/abhishek-engagement\/details\/$/, { timeout: 6000 });
    });
    await step("flow details", "GO BACK goes to /invitation/", async () => {
      await page.getByRole("link", { name: /go back/i }).first().click();
      await page.waitForURL(/\/abhishek-engagement\/invitation\/$/, { timeout: 6000 });
    });
    await context.close();
  }
}

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("out/ missing: run `npm run build` first");
  process.exit(1);
}

const server = await serve();
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      await checkRoute(browser, origin, vp, route).catch((e) => fail(`${vp.name} /${route.path}`, `crashed: ${e.message}`));
    }
  }
  await checkFlows(browser, origin);
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(`\nSMOKE FAILED (${failures.length})`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log("SMOKE OK");
