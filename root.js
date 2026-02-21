const express = require('express');
const app = express();

const frontendApp = require('./front-end/app'); 
const backendApp = require('./back-end/app');


app.use('/api', backendApp);
app.use('', frontendApp);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`InventoryTrackerPlus running on port ${PORT}`);
    console.log(`API & Docs: http://localhost:${PORT}/api`);
    console.log(`Frontend: http://localhost:${PORT}/`);
});