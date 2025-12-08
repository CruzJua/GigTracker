const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { MongoClient, ObjectId } = require('mongodb');

const connectionString = process.env.CONNECTION_STRING;
const client = new MongoClient(connectionString);
let dal = {
    // TODO: needed is user specific gigs are added
    // getGigs: async () => {
    //     try {
    //         await client.connect();
    //         const db = await client.db("gigTracker")
    //         const collection = db.collection("gigs")
    //         let gigs = await collection.find().toArray();
    //         console.log("This is the gigs array from MongoDB:\n", gigs);
    //         let response = {
    //             code: 200,
    //             data: gigs
    //         }
    //         return response;
    //     } catch (error) {
    //         console.log(`There was an error ${error}`)
    //         let response = {
    //             code: 500,
    //             data: error
    //         }
    //         return response;
    //     } finally {
    //         await client.close();
    //     }
    // },
    // TODO: needed is user specific gigs are added
    // getgig: async (gigId) => {
    //     try {
    //         await client.connect();
    //         const db = await client.db("gigTracker")
    //         const collection = db.collection("")


    //         let response = {
    //             code: 200,
    //             data: ""
    //         }
    //         return response;
    //     } catch (error) {
    //         console.log(`There was an error ${error}`)
    //         let response = {
    //             code: 500,
    //             data: error
    //         }
    //         return response;
    //     } finally {
    //         await client.close();
    //     }
    // },
    getEarnings: async () => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("earnings")
            let earnings = await collection.find().toArray();
            let response = {
                code: 200,
                data: earnings
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },
    getShifts: async () => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("shifts")
            let shifts = await collection.find().toArray();
            let response = {
                code: 200,
                data: shifts
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },
    getEarningsFromGig: async (gigId) => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("earnings")
            let earnings = await collection.find({ source: new ObjectId(gigId) }).toArray();
            let response = {
                code: 200,
                data: earnings
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },
    getShiftsFromGig: async (gigId) => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("shifts")
            let shifts = await collection.find({ source: new ObjectId(gigId) }).toArray();
            let response = {
                code: 200,
                data: shifts
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },
    getGigAnalytics: async (gigId) => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("")


            let response = {
                code: 200,
                data: ""
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },
    addShift: async (shiftDetails) => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("shifts")
            shiftDetails.source = new ObjectId(shiftDetails.source);
            let shift = await collection.insertOne(shiftDetails);
            let response = {
                code: 200,
                data: shift
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },
    addEarnings: async (earningsDetails) => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("earnings")
            earningsDetails.source = new ObjectId(earningsDetails.source);
            let earnings = await collection.insertOne(earningsDetails);
            let response = {
                code: 200,
                data: earnings
            }
            return response;
        } catch (error) {
            console.log(`There was an error ${error}`)
            let response = {
                code: 500,
                data: error
            }
            return response;
        } finally {
            await client.close();
        }
    },

    // TODO: Stretch Goal, add user specific gigs as opposed to hard coding them
    // addGig: async (gigDetails) => {
    //     try {
    //         await client.connect();
    //         const db = await client.db("gigTracker")
    //         const collection = db.collection("")


    //         let response = {
    //             code: 200,
    //             data: ""
    //         }
    //         return response;
    //     } catch (error) {
    //         console.log(`There was an error ${error}`)
    //         let response = {
    //             code: 500,
    //             data: error
    //         }
    //         return response;
    //     } finally {
    //         await client.close();
    //     }
    // },
    removeShift: async (shiftId) => {

    },
    removeGig: async (gigId) => {

    },
    updateShift: async (shiftId, shiftDetails) => {

    },
    updateGig: async (gigId, gigDetails) => {

    }

}


exports.dal = dal;