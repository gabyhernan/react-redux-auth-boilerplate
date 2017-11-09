const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
// register middleware which will run for each request
app.use(express.static(publicPath));

// serve up public index.html folder upon 404 error
// * matches all unmatched routes
app.get('*', (req,res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// start up server - specify port
app.listen(port, () => {
  console.log('Server is up!');
});


