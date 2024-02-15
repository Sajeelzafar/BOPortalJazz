const express = require('express')
const app = express()
const router = require('./routers/api-routes')
const cors = require('cors');
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());
app.use('/api', router)

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something Broke!')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
