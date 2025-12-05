const { dal } = require('./data/gigWorkDal');
const express = require('express');
const app = express();
const PORT = 3050;

app.get('/', (req, res) => {
    res.send('Hello to the Docs of the Gig Tracker!');
    // TODO: Implement the Docs page
});

app.get('/earnings/:gigName', async (req, res) => {
    const gigName = req.params.gigName;
    const gig = await dal.getGig(gigName);
    let response = {
        code: 200,
        data: gig
    };
    res.json(response);
});












app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('http://localhost:' + PORT);
});