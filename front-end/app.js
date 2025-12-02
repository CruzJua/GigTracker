const express = require('express');
const app = express();

const render = require('ejs');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});









app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('http://localhost:' + PORT);
});
