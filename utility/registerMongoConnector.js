require('dotenv').config({ path: './.env' });

const axios = require('axios');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const DEBEZIUMCONNECTORPORT = process.env.DEBEZIUMCONNECTORPORT || 8030;
const MONGODBURI        = process.env.MONGODBURI;
const DBNAME            = process.env.DBNAME;
const COLLECTIONNAME    = process.env.COLLECTIONNAME;
const TOPICPREFIX       = process.env.TOPICPREFIX;

const connectorConfig = {
  name: 'mongodb-source-connector',
  config: {
    'connector.class':        'io.debezium.connector.mongodb.MongoDbConnector',
    'mongodb.connection.string': MONGODBURI,
    'topic.prefix':           TOPICPREFIX,
    'collection.include.list': `${DBNAME}.${COLLECTIONNAME}`,
    'mongodb.ssl.enabled':    'true',
    'heartbeat.interval.ms':  '0',
    'capture.mode':           'change_streams_update_full',
  },
};

const CONNECT_URL = `http://debezium-connect:${DEBEZIUMCONNECTORPORT}`;

async function deleteConnectorIfExists(name) {
  try {
    await axios.get(`${CONNECT_URL}/connectors/${name}`);
    // Connector exists — delete it
    console.log(`Found existing connector '${name}'. Deleting...`);
    await axios.delete(`${CONNECT_URL}/connectors/${name}`);
    console.log(`Connector '${name}' deleted.`);
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(`No existing connector '${name}' found. Proceeding with registration.`);
    } else {
      throw error;
    }
  }
}

async function registerMongoConnector() {
  try {
    await deleteConnectorIfExists(connectorConfig.name);

    const response = await axios.post(`${CONNECT_URL}/connectors`, connectorConfig, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Connector registered:', response.data);
  } catch (error) {
    const errData = error.response?.data;
    console.error('Retrying registering connector:', errData || error.message);
    await delay(4000);
    await registerMongoConnector();
  }
}

//registerMongoConnector();

module.exports = { registerMongoConnector };
