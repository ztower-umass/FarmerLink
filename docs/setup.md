# FarmerLink Setup, First Revision

## Local Setup

To run the web server locally:

1) To get database access, you must attach the Postgre server URL into line 4 (or thereabout) of index.js as follows:

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

becomes

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL || "X",
            ssl: {
                rejectUnauthorized: false
            }
        });

where X is the full name of the PostgreSQL URL.

2) Boot the server from the root directory

        cd farmerlink-backend
        node index.js

The website should now be fully functional and responsive to server queries. Use name localhost:3000/. 

# Heroku Setup

Heroku will automatically start upon a push to the FarmerLink Github given the included config files (and node modules).

Note that a PostgreSQL Heroku plugin is required. See Heroku documentation for PostgreSQL integration for more on configuring this.
