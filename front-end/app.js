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
        {name: "Door Dash", id: "6930992db06d779eb48ef6d2"},
        {name: "Uber Eats", id: "69309958b06d779eb48ef6d3"}
    ],
    RideShare: [
        {name: "Uber", id: "69309994b06d779eb48ef6d4"},
        {name: "Lyft", id: "693099a9b06d779eb48ef6d5"}
    ]
}
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        gig: "No Gig Selected",
        gigToShow: "No gig selected",

    });
});
app.get('/add-shift', (req, res) => {
    res.render('add-shift', {
        title: 'Add Your Shift',
        gigToShow: "No gig selected",
    });
});
app.get('/add-earnings', (req, res) => {
    res.render('add-earnings', {
        title: 'Add Your Earnings',
        gigToShow: "No gig selected",
    });
});
app.get('/earnings', (req, res) => {
    let gigToShow = req.query.gig;
    // console.log("This is the gig found in the query: ", gigToShow);
    if (!gigToShow) {
        // console.log("No gig found in the query");
        gigToShow = 'No Gig Selected';
    }
    // console.log("This is the gig being shown: ", gigToShow);
    res.render('earnings', {
        title: 'Earnings',
        gigToShow: gigToShow,
    });
});
app.get('/shifts', (req, res) => {
    let gigToShow = req.query.gig;
    // console.log("This is the gig found in the query: ", gigToShow);
    if (!gigToShow) {
        // console.log("No gig found in the query");
        gigToShow = 'No Gig Selected';
    }
    // console.log("This is the gig being shown: ", gigToShow);
    res.render('shifts', {
        title: 'Shifts',
        gigToShow: gigToShow,
    });
});
app.post('/earnings', (req, res) => {
    const id = req.body.gigs;
    res.redirect('/earnings?gig=' + id);
});
app.post('/shifts', (req, res) => {
    const id = req.body.gigs;
    res.redirect('/shifts?gig=' + id);
});
app.post('/add-shift', (req, res) => {
    const id = req.body.source;
    const shiftDetails = req.body;
    console.log('Shift details From Front End Form: ', shiftDetails);
    let url = 'http://localhost:3050/add-shift'

    let headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shiftDetails)
    }

    fetch(url, headers)
    .then(response => response.json())
    .then(data => {
        console.log('Featched data: ', data);
        res.redirect('/earnings?gig=' + id);
    })
    .catch(error => {
        console.log('Fetch error: ', error);
        res.redirect('/earnings?gig=' + id);
    });
});
app.post('/add-earnings', (req, res) => {
    const id = req.body.source;
    const earningsDetails = req.body;
    console.log('Earnings details From Front End Form: ', earningsDetails);
    let url = 'http://localhost:3050/add-earnings'

    let headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(earningsDetails)
    }

    fetch(url, headers)
    .then(response => response.json())
    .then(data => {
        console.log('Featched data: ', data);
        res.redirect('/earnings?gig=' + id);
    })
    .catch(error => {
        console.log('Fetch error: ', error);
        res.redirect('/earnings?gig=' + id);
    });
});
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('http://localhost:' + PORT);
});


