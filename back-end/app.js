const { dal } = require('./data/gigWorkDal');
const express = require('express');
const app = express();
const PORT = 3050;












app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('http://localhost:' + PORT);
});