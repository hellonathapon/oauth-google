const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// set up view engine

app.listen(port, console.log(`🚀 Server is running on port ${port}`));