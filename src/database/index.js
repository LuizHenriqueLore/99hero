const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/99hero", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log('something wrong', err);
});

module.exports = mongoose;