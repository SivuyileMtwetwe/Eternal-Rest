import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/',  async(_req, res) => {
  res.status(200).send("Welcome to the eternal rest api")
})