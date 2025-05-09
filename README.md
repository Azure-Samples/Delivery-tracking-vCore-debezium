# Delivery Tracking System using Cosmos DB vCore Change Streams and Kafka-Debezium

A real-time delivery tracking web application powered by **vCore based Azure CosmosDB for MongoDB utlizing Change Streams**, integrated with **Kafka** using the [Debezium MongoDB Connector](https://debezium.io/documentation/reference/stable/connectors/mongodb.html).

This app simulates **delivery agents 🛵** moving toward **Delivery Locations 🏠** using real map data. Location updates are written directly to **MongoDB vCore**, and **Debezium** captures these changes via change streams and forwards them to **Kafka**. The frontend consumes these updates from Kafka to display live movement on the map.

[Architecture Flow](./architecture/Architecture_CS_Debezium.png)

## Pre-requisites

- A **Cosmos DB for MongoDB vCore** instance ([Create one](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/vcore/quickstart-portal))
    - **Change Streams** enabled on the cluster ([Enable it](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/vcore/change-streams?tabs=javascript%2CInsert))
    - **Store the MongoDB connection string** for use in subsequent configuration steps
- **Docker** and **Docker Compose** installed and running ([Install guide](https://docs.docker.com/get-docker/))

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/Azure-Samples/Delivery-tracking-vCore-debezium.git
cd Delivery-tracking-vCore-debezium
npm install
```

### 2. Set Environment Variables

Ensure that both the `.env` file and `mongo-connector.json` file are updated with the appropriate values. Any configuration values that appear in both files must match exactly to ensure proper integration and avoid connection issues.

> **Note:** if any port overlapping error, both values of new ports must be configired in `.env` file and `mongo-connector.json` file


### 3. Run with Docker

```bash
# Check if any containers are running
docker ps

# Start the containers
docker compose up -d # wait till the all the containers are up and running

# Tail logs from a container (e.g., node backend)
docker logs -f node-server # wait till the message ✅ MongoDB and Kafka consumer initialized successfully. 

# Stop the containers
docker compose down -v
```

### 4. View in Browser

Please open **index.html** within Chrome \ Edge browser.

(or) 

✅ macOS (Terminal)
```bash
cd navigate to repo directory
open index.html
```

✅ Windows (Command Prompt)
```bash
cd navigate to repo directory
start index.html
```

✅ Linux (Terminal)
```bash
cd navigate to repo directory
xdg-open index.html
```

- "See Live Deliveries" button starts streaming agent GPS location.
- Agents real-time location updates as data flows from MongoDB → Debezium → Kafka → Frontend.
- Summary button allows for viewing overall info dashboard on deliveries status created to help admins with actionable insights.
---
