const path = require(`path`)
const express = require(`express`)
const app = express()
const publicPath = path.join(__dirname, `..`, `public`)
const port = process.env.PORT || 3000;

// Check Express documentation at https://expressjs.com

app.use(express.static(publicPath))

// Match all unmatched routes
app.get(`*`, (req, res) => {
  res.sendFile(path.join(publicPath, `index.html`));
})

app.listen(port, () => {
  console.log(`Server is up`)
})

