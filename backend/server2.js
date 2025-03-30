require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const twilio = require('twilio');
const axios = require('axios');
const cors = require('cors');

// Load environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'Patients';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));

// Ensure Twilio credentials are available
if (!accountSid || !authToken) {
    console.error("❌ Twilio credentials are missing. Check your .env file.");
    process.exit(1);
}

const client = twilio(accountSid, authToken);
let db, hospitalCollection, patientCollection, checkupCollection;

// Connect to MongoDB
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connection => {
        db = connection.db(dbName);
        hospitalCollection = db.collection('hospital');
        patientCollection = db.collection('data');
        checkupCollection = db.collection('check_date');
        console.log('✅ Connected to MongoDB');
    })
    .catch(err => {
        console.error('❌ Failed to connect to MongoDB:', err);
        process.exit(1);
    });

// --- API Endpoints ---

// Fetch hospitals by location and disease
app.get('/hospitals', async (req, res) => {
    try {
        const { location, disease } = req.query;
        const query = {};
        if (location) query.location = location;
        if (disease) query.disease = disease;

        const hospitals = await hospitalCollection.find(query).toArray();
        res.json(hospitals);
    } catch (error) {
        console.error('❌ Error fetching hospitals:', error);
        res.status(500).send('An error occurred while fetching hospital data.');
    }
});

// Fetch patient data for the dashboard
app.get('/data', async (req, res) => {
    try {
        const data = await patientCollection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('❌ Error fetching patient data:', error);
        res.status(500).send('An error occurred while fetching data.');
    }
});

// Send SMS messages via Twilio
app.post('/send-messages', async (req, res) => {
    try {
        const { phoneNumbers, messageBody } = req.body;
        if (!phoneNumbers || !messageBody) {
            return res.status(400).json({ error: "Phone numbers and message body are required." });
        }

        const sendMessages = phoneNumbers.map(async number => {
            try {
                const message = await client.messages.create({
                    body: messageBody,
                    from: twilioPhoneNumber,
                    to: number
                });
                return { number, sid: message.sid };
            } catch (error) {
                return { number, error: error.message };
            }
        });

        const results = await Promise.all(sendMessages);
        const success = results.filter(result => !result.error).length;
        const failed = results.filter(result => result.error).length;

        res.json({ success, failed, details: results });
    } catch (error) {
        console.error('❌ Error sending messages:', error);
        res.status(500).json({ error: error.message });
    }
});

// Send SOS alert with SMS & Call
app.post('/send-sos', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ error: "Phone number is required." });
        }

        const location = await fetchLocation();
        console.log(`🌍 Location fetched: ${location}`);

        const messageResult = await sendSOSNotification(phoneNumber, location);
        console.log(`📩 Message Result:`, messageResult);

        const callResult = await makeSOSCall(phoneNumber);
        console.log(`📞 Call Result:`, callResult);

        res.json({ message: '🚨 SOS sent successfully', details: { messageResult, callResult } });
    } catch (error) {
        console.error('❌ Error in /send-sos:', error);
        res.status(500).json({ message: 'Error sending SOS', error: error.message });
    }
});

// Function to send SOS message
async function sendSOSNotification(to, location) {
    try {
        console.log(`📩 Sending SOS to ${to} from ${twilioPhoneNumber}`);
        const message = await client.messages.create({
            body: `🚨 SOS! Emergency from ${location}. Please respond immediately.`,
            from: twilioPhoneNumber,
            to
        });
        return { sid: message.sid };
    } catch (error) {
        console.error(`❌ SMS Failed:`, error);
        return { error: error.message };
    }
}

// Function to make SOS call
async function makeSOSCall(to) {
    try {
        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to,
            from: twilioPhoneNumber
        });
        return { sid: call.sid };
    } catch (error) {
        console.error(`❌ Call Failed:`, error);
        return { error: error.message };
    }
}

// Fetch user's approximate location
async function fetchLocation() {
    try {
        const response = await axios.get('https://ipinfo.io/json?token=db6a53167ab70d');
        return response.data.city || 'Unknown Location';
    } catch (error) {
        console.error('❌ Error fetching location:', error.message);
        return 'Unknown Location';
    }
}

// Import Twilio call logs into MongoDB
async function importCallLogs() {
    try {
        const calls = await client.calls.list({ limit: 20 });
        await checkupCollection.insertMany(calls.map(call => call.toJSON()));
        console.log('✅ Call logs imported into MongoDB');
    } catch (error) {
        console.error('❌ Error importing call logs:', error);
    }
}

// Fetch call logs from MongoDB
app.get('/call-logs', async (req, res) => {
    try {
        const callLogs = await checkupCollection.find({}).toArray();
        res.json(callLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    importCallLogs();
});
