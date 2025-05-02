import app from './app.js';

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const protocol = isProduction ? 'https' : 'http';

app.listen(PORT, () => {
  console.log(`Server is running on ${protocol}://localhost:${PORT}`);
});

app.get('/', async(_req, res) => {
  res.status(200).send("Welcome to the eternal rest api");
});

// Add middleware to ensure HTTPS URLs
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else if (isProduction) {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});