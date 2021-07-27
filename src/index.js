const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/hero')(app);

app.listen(3000, (req, res) => console.log('Server is running on port 3000'));