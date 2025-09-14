# 🚀 Node.js CI/CD Project with GitHub Actions - Full Implementation Guide

---

## 📌 Project Overview
This repo (`simple-node-ci`) contains a minimal **Node.js + Express** app that serves a static page and is wired to **CI/CD workflows** using **GitHub Actions**. This document adds a clear, beginner-friendly **step-by-step implementation** section so anyone can reproduce, run, and extend the project.

---

## ✅ Prerequisites
Make sure you have:
- Git installed
- Node.js (LTS) and npm installed — verify with `node -v` and `npm -v`
- A GitHub account

---

## 🧭 Quick start (clone & run locally)

```bash
git clone https://github.com/Sabhayor/simple-node-ci.git
cd simple-node-ci
npm install
npm run dev
# open http://localhost:3000
```

---

## 📁 Project structure (what to expect)
```
simple-node-ci/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   └── index.html
├── test/
│   └── app.test.js
├── index.js
├── package.json
├── package-lock.json
├── .eslintrc.json
└── eslint.config.mjs
```

---

## 🛠 Step-by-step implementation (full details)

### 1) Initialize the project (if starting from scratch)
```bash
mkdir simple-node-ci
cd simple-node-ci
npm init -y
```

### 2) Install runtime & dev dependencies
```bash
npm install express
npm install --save-dev nodemon eslint jest supertest
```

### 3) Add the Express app (`index.js`)
```js
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}
module.exports = app;
```

### 4) Static page (`public/index.html`)
```html
<!doctype html>
<html>
<head><meta charset="utf-8"/><title>Simple Node CI</title></head>
<body>
  <h1>Hello from Node.js + GitHub Actions CI/CD 👋</h1>
  <p>This page is served from the <code>public/</code> folder.</p>
</body>
</html>
```

### 5) Tests (`test/app.test.js`)
```js
const request = require('supertest');
const app = require('../index');
test('GET /health returns status ok', async () => {
  const res = await request(app).get('/health');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ status: 'ok' });
});
```

### 6) ESLint config (quick)
Create `.eslintrc.json`:
```json
{
  "env": { "node": true, "es2021": true, "jest": true },
  "extends": "eslint:recommended",
  "parserOptions": { "ecmaVersion": 12, "sourceType": "commonjs" },
  "rules": { "no-unused-vars": "warn", "no-console": "off" }
}
```

### 7) NPM scripts (in `package.json`)
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest --runInBand",
  "lint": "eslint ."
}
```

### 8) GitHub Actions CI (`.github/workflows/ci.yml`)
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

### 9) Deploy to GitHub Pages (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

---

## 🐞 Common errors & fixes (recap)

**ESLint config missing (v9)**: migrate to flat config with `npx @eslint/migrate-config .eslintrc.json` or set `ESLINT_USE_FLAT_CONFIG=false` in CI.  
**Parsing import/export**: choose CommonJS or set `"type": "module"` and update files.  
**npm ci fails due to lint in lifecycle**: remove `prepare` script and run lint as separate CI step.

![SourceType](/images/sourcetype_error.png)

---

## ✅ Final checks to run locally
```bash
npm ci
npm run lint
npm test
npm run dev
```
![npm test](/images/npm_test.png)
![npm run lint](/images/npm_run_lint.png)
![npm run dev](/images/npm_run_dev.png)
![localhost](/images/localhost.png)
![workflow](/images/workflow_success.png)
![github page](/images/github_page.png)
---

## 📚 Next steps / improvements

- Dockerize app and publish container
- Deploy full Node app to a cloud provider (Render/Vercel/AWS)


