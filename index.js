const express = require('express');
const path = require('path');

const app = express();

// serve files in /public
app.use(express.static(path.join(__dirname, 'public')));

// small health endpoint for CI checks
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// only start server when run directly (keeps tests simple)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

module.exports = app;
