const { dal } = require('./data/gigWorkDal');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Hello to the Docs of the Gig Tracker!');
    // TODO: Implement the Docs page
});
app.get('/earnings/:gigId', async (req, res) => {
    const gigId = req.params.gigId;
    let earnings = await dal.getEarningsFromGig(gigId);
    if (earnings.code == 500){
        console.log('500 error calling getEarnings from dal')
        earnings =  await dal.getEarnings();
        // console.log('back-end response: ', earnings);
        return res.json(earnings);
    }
    // console.log('back-end response: ', earnings);
    res.json(earnings);
});
app.get('/shifts/:gigId', async (req, res) => {
    const gigId = req.params.gigId;
    let shifts = await dal.getShiftsFromGig(gigId);
    if (shifts.code == 500){
        shifts =  await dal.getShifts();
        // console.log('back-end response: ', shifts);
        return res.json(shifts);
    }
    // console.log('back-end response: ', shifts);
    res.json(shifts);
});
app.get('/gig/:gigId', async (req, res) => {
    const gigId = req.params.gigId;
    let gig = await dal.getGigById(gigId);
    if (gig.code == 500){
        console.log('500 error gig not found')
        gig =  {
            code: 500,
            data: {
                name: "Gig Not Found",
            }
        }
        // console.log('back-end response: ', gig);
        return res.json(gig);
    }
    // console.log('back-end response: ', gig);
    res.json(gig);
});
app.get('/getShiftById/:id', async (req, res) => {
    const id = req.params.id;
    let shift = await dal.getShiftById(id);
    if (shift.code == 500){
        shift =  {
            code: 500,
            data: {
                message: "Shift Not Found",
            }
        }
        // console.log('back-end response: ', shift);
        return res.json(shift);
    }
    // console.log('back-end response: ', shift);
    res.json(shift);
});
app.get('/getEarningById/:id', async (req, res) => {
    const id = req.params.id;
    let earning = await dal.getEarningById(id);
    if (earning.code == 500){
        earning =  {
            code: 500,
            data: {
                message: "Earning Not Found",
            }
        }
        // console.log('back-end response: ', earning);
        return res.json(earning);
    }
    // console.log('back-end response: ', earning);
    res.json(earning);
});
app.get('/delete-shift/:id', async (req, res) => {
    const id = req.params.id;
    let shift = await dal.deleteShift(id);
    if (shift.code == 500){
        shift =  {
            code: 500,
            data: {
                message: "Shift Not Found",
            }
        }
        // console.log('back-end response: ', shift);
        return res.json(shift);
    }
    // console.log('back-end response: ', shift);
    res.json(shift);
});
app.get('/delete-earning/:id', async (req, res) => {
    const id = req.params.id;
    let earning = await dal.deleteEarning(id);
    if (earning.code == 500){
        earning =  {
            code: 500,
            data: {
                message: "Earning Not Found",
            }
        }
        // console.log('back-end response: ', earning);
        return res.json(earning);
    }
    // console.log('back-end response: ', earning);
    res.json(earning);
});



app.post('/add-shift', async (req, res) => {
    let shiftDetails = req.body;
    shiftDetails = shiftFormatter(shiftDetails);
    const shift = await dal.addShift(shiftDetails);
    // console.log('back-end response: ', shift);
    res.json(shift);
});
app.post('/add-earnings', async (req, res) => {
    let earningsDetails = req.body;
    earningsDetails = earningsFormatter(earningsDetails);
    const earnings = await dal.addEarnings(earningsDetails);
    // console.log('back-end response: ', earnings);
    res.json(earnings);
});
app.post('/edit-shift/:id', async (req, res) => {
    const id = req.params.id;
    let shiftDetails = req.body;
    shiftDetails = shiftFormatter(shiftDetails);
    const shift = await dal.editShift(id, shiftDetails);
    // console.log('back-end response: ', shift);
    res.json(shift);
});
app.post('/edit-earning/:id', async (req, res) => {
    const id = req.params.id;
    let earningsDetails = req.body;
    earningsDetails = earningsFormatter(earningsDetails);
    const earnings = await dal.editEarning(id, earningsDetails);
    // console.log('back-end response: ', earnings);
    res.json(earnings);
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

module.exports = app;