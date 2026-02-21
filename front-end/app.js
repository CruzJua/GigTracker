const express = require('express');
const app = express();
const path = require('path');
const api_url = "http://localhost/api/";

const render = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
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

let globalSources = {};


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
app.get('/earnings', async (req, res) => {
    let gigToShow = req.query.gig;
    // console.log("This is the gig found in the query: ", gigToShow);
    // console.log("Attempting to filter data")
    let data = await filterData('earnings', gigToShow);
    // console.log("Data that was found", data)
    if (!gigToShow) {
        // console.log("No gig found in the query");
        gigToShow = 'No Gig Selected';
    }
    if (data){
        return res.render('earnings', {
            title: 'Earnings',
            gigToShow: gigToShow,
            message: data.message,
            data: data.data       
        });
    }
    res.render('earnings', {
        title: 'Earnings',
        gigToShow: gigToShow,
        message: "No data found"
    });
});
app.get('/shifts', async (req, res) => {
    let gigToShow = req.query.gig;
    // console.log("This is the gig found in the query: ", gigToShow);
    // console.log("Attempting to filter data")
    let data = await filterData('shifts', gigToShow);
    // console.log("Data that was found", data)
    if (!gigToShow) {
        // console.log("No gig found in the query");
        gigToShow = 'No Gig Selected';
    }
    // console.log("This is the gig being shown: ", gigToShow);
    if (data){
        return res.render('shifts', {
        title: 'Shifts',
        gigToShow: gigToShow,
        message: data.message,
        data: data.data
    });
} else {
    res.render('shifts', {
        title: 'Shifts',
        gigToShow: gigToShow,
        message: "No data found",
        data: data.data
    });
}
});
app.get('/edit-shift/:id', (req, res) =>{
    const id = req.params.id;
    let url = "http://localhost:3050/getShiftById/" + id;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let date = data.data.date.slice(0, data.data.date.indexOf('T'));
        console.log("Data that is being passed to the edit-shift page", data.data)
        res.render('edit-shift', {
            title: 'Edit Your ' + date + ' Shift',
            shift:data.data,
            date: date
        });
    });
});
app.get('/edit-earning/:id', (req, res) =>{
    const id = req.params.id;
    let url = "http://localhost:3050/getEarningById/" + id;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let date = data.data.date.slice(0, data.data.date.indexOf('T'));
        console.log("Data that is being passed to the edit-earning page", data.data)
        res.render('edit-earning', {
            title: 'Edit Your '+ date + ' Earnings',
            earning:data.data,
            date: date
        });
    });
});
app.get('/delete-shift/:id', (req, res) => {
    const id = req.params.id;
    let url = "http://localhost:3050/delete-shift/" + id;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Data that was deleted", data)
        res.redirect('/shifts');
    });
});
app.get('/delete-earning/:id', (req, res) => {
    const id = req.params.id;
    let url = "http://localhost:3050/delete-earning/" + id;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Data that was deleted", data)
        res.redirect('/earnings');
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
    let url = api_url + 'add-shift'

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
        res.redirect('/shifts?gig=' + id);
    })
    .catch(error => {
        console.log('Fetch error: ', error);
        res.redirect('/shifts?gig=' + id);
    });
});
app.post('/add-earnings', (req, res) => {
    const id = req.body.source;
    const earningsDetails = req.body;
    console.log('Earnings details From Front End Form: ', earningsDetails);
    let url = api_url + 'add-earnings'

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
app.post('/edit-shift/:id', (req, res) => {
    const id = req.params.id;
    const shiftDetails = req.body;
    console.log('Shift details From Front End Form: ', shiftDetails);
    let url = api_url + 'edit-shift/' + id

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
        res.redirect('/shifts');
    })
    .catch(error => {
        console.log('Fetch error: ', error);
        res.redirect('/shifts');
    });
});
app.post('/edit-earning/:id', (req, res) => {
    const id = req.params.id;
    const earningsDetails = req.body;
    console.log('Earnings details From Front End Form: ', earningsDetails);
    let url = api_url + 'edit-earning/' + id

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
        res.redirect('/earnings');
    })
    .catch(error => {
        console.log('Fetch error: ', error);
        res.redirect('/earnings');
    });
});


async function filterData(route, id){
    if (!id){
        console.log("No gig selected")
        return {message: "No gig selected"}
    }
    let url = api_url + '' + route + '/' + id;
    try {
        // console.log("Attempting to fetch data")
        let response = await fetch(url);
        let data = await response.json();
        // console.log('Fetched data: ', data);
        let message = "";
        switch (data.code){
            case (200):
                message = "Your Shifts";
                break;
            case (500):
                message = "Sorry that filter didn't work; Sending all data";
                break;
            default:
                message = "Error not accounted for" + data.code;
                break;
        }
        if (data.data.length == 0){
            console.log("No data found")
            message = "No data found";
        }
        data.message = message;
        // console.log('back-end response: ', data);
        // console.log("Data found and being returned", data)
        return await replaceGigName(data);
    } catch (error) {
        console.log('Fetch error: ', error);
        return null;
    }
}
async function getGigName(gigId) {
    let url = api_url + 'gig/' + gigId;
    try {
        // console.log("Attempting to fetch data")
        let response = await fetch(url);
        let data = await response.json();
        // console.log('Fetched data: ', data);
        return data.data.name;
    } catch (error) {
        console.log('Fetch error: ', error);
        return null;
    }
}
async function replaceGigName(data){
    for (let i = 0; i < data.data.length; i++) {
        let sourceId = data.data[i].source;
        if (globalSources[sourceId]) {
            data.data[i].source = globalSources[sourceId];
            continue;
        }else {
            console.log("Finding new source")
            let sourceName = await getGigName(sourceId);
            globalSources[sourceId] = sourceName;
            data.data[i].source = globalSources[sourceId];
        }
    }
    console.log("globalSources Found: ", globalSources)
    return data;
}


module.exports = app;