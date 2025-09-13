import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// serve files in /public
app.use(express.static(path.join(__dirname, "public")));

// small health endpoint for CI checks
app.get("/health", (req, res) => res.json({ status: "ok" }));

// always start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});

export default app;
