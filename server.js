const express = require('express');
const connectDB = require('./config/db')
const app = express();
const cors = require('cors')
const path = require('path')

connectDB();

app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use('/uploads',express.static(__dirname + '/uploads'))


app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/collections',require('./routes/api/collections'));
app.use('/api/games',require('./routes/api/games'));
app.use('/api/gameplays',require('./routes/api/gameplays'));

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`) )