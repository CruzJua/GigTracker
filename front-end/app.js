const express = require('express');
const app = express();

const render = require('ejs');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.locals.gigsByCatagory = {
    Delivery: [
        {name: "Door Dash", id: "DoorDash"},
        {name: "Uber Eats", id: "UberEats"}
    ],
    RideShare: [
        {name: "Uber", id: "Uber"},
        {name: "Lyft", id: "Lyft"}
    ]
}



app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        gig: "No Gig Selected"
    });
});
app.get('/add-shift', (req, res) => {
    res.render('add-shift', {
        title: 'Add Your Shift'
    });
});
app.get('/earnings', (req, res) => {
    let gigToShow = req.query.gig;
    // console.log("This is the gig found in the query: ", gigToShow);
    if (!gigToShow) {
        console.log("No gig found in the query");
        gigToShow = 'No Gig Selected';
    }
    console.log("This is the gig being shown: ", gigToShow);
    res.render('earnings', {
        title: 'Earnings',
        gigToShow: gigToShow,
    });
});

app.post('/', (req, res) => {
    const id = req.body.gigs;
    // console.log('id:', id, '\ngigName:', gigName);
    res.render('home', {
        title: 'Home',
        gig: id
    })
});
app.post('/earnings', (req, res) => {
    const id = req.body.gigs;
    res.redirect('/earnings?gig=' + id);
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('http://localhost:' + PORT);
});
