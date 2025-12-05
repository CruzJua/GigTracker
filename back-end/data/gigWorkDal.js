const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { MongoClient } = require('mongodb');

const connectionString = process.env.CONNECTION_STRING;
const client = new MongoClient(connectionString);
let dal = {
    getGigs: async () => {
        try {
            await client.connect();
            const db = await client.db("gigTracker")
            const collection = db.collection("gigs")
            let gigs = await collection.find().toArray();
            console.log("This is the gigs array from MongoDB:\n", gigs);
            let response = {
                code: 200,
                data: gigs
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
    getgig: async (gigId) => {
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
    getEarnings: async () => {
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
    getEarningsFromGig: async (gigId) => {
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
    addGig: async (gigDetails) => {
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