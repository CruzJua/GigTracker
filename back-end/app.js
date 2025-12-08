const { dal } = require('./data/gigWorkDal');
const express = require('express');
const app = express();
const PORT = 3050;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Hello to the Docs of the Gig Tracker!');
    // TODO: Implement the Docs page
});

app.get('/earnings/:gigId', async (req, res) => {
    const gigId = req.params.gigId;
    const earnings = await dal.getEarningsFromGig(gigId);
    if (earnings.code == 500){
        earnings =  await dal.getEarnings();
        let response = {
            code: 200,
            data: earnings
        };
        console.log('back-end response: ', response);
        return res.json(response);
    }
    let response = {
        code: 200,
        data: earnings
    };
    console.log('back-end response: ', response);
    res.json(response);
});
app.get('/shifts/:gigId', async (req, res) => {
    const gigId = req.params.gigId;
    let shifts = await dal.getShiftsFromGig(gigId);
    if (shifts.code == 500){
        shifts =  await dal.getShifts();
        let response = {
            code: 200,
            data: shifts
        };
        console.log('back-end response: ', response);
        return res.json(response);
    }

    let response = {
        code: 200,
        data: shifts
    };
    console.log('back-end response: ', response);
    res.json(response);
});
app.post('/add-shift', async (req, res) => {
    let shiftDetails = req.body;
    shiftDetails = shiftFormatter(shiftDetails);
    const shift = await dal.addShift(shiftDetails);
    let response = {
        code: 200,
        data: shift
    };
    console.log('back-end response: ', response);
    res.json(response);
});
app.post('/add-earnings', async (req, res) => {
    let earningsDetails = req.body;
    earningsDetails = earningsFormatter(earningsDetails);
    const earnings = await dal.addEarnings(earningsDetails);
    let response = {
        code: 200,
        data: earnings
    };
    console.log('back-end response: ', response);
    res.json(response);
});












app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('http://localhost:' + PORT);
});


function shiftFormatter(shift) {
    let newDate = new Date(shift.date);
    let formattedStartingMiles = parseInt(shift.sOdometerReading);
    let formattedEndingMiles = parseInt(shift.eOdometerReading);
    let distance = formattedEndingMiles - formattedStartingMiles;
    return {
        date: newDate,
        startingMiles: formattedStartingMiles,
        endingMiles: formattedEndingMiles,
        distance: distance,
        source: shift.source,
        notes: shift.notes
    };
}

function earningsFormatter(earnings) {
    let newDate = new Date(earnings.date);
    let fromattedPayout = parseFloat(earnings.payoutAmount);
    let fromattedTips = parseFloat(earnings.tips);
    let basePay = fromattedPayout - fromattedTips;
    let formattedTotalHoursWorked = parseFloat(earnings.totalHoursWorked);
    return {
        date: newDate,
        payoutAmount: fromattedPayout,
        tips: fromattedTips,
        basePay: basePay,
        totalHoursWorked: formattedTotalHoursWorked,
        source: earnings.source,
        notes: earnings.notes
    };
}