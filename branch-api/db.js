const sqlite3 = require('sqlite3').verbose();

// Create and connect to the database
const db = new sqlite3.Database('./data/branches.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS branches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        branchCode TEXT NOT NULL,
        branchName TEXT NOT NULL,
        branchAddress TEXT,
        branchCity TEXT,
        branchState TEXT,
        branchCountry TEXT DEFAULT 'India',
        latitude REAL,
        longitude REAL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating table', err.message);
        } else {
            // Seed some initial data if the table is empty
            seedDatabase();
        }
    });
}

function seedDatabase() {
    db.get(`SELECT COUNT(*) as count FROM branches`, (err, row) => {
        if (err) {
            console.error('Error checking table count', err.message);
            return;
        }
        
        if (row.count === 0) {
            const branches = [
                { branchCode: 'BR001', branchName: 'Main Branch', branchAddress: '123 Main St', branchCity: 'Mumbai', branchState: 'Maharashtra', latitude: 19.0760, longitude: 72.8777 },
                { branchCode: 'BR002', branchName: 'South Branch', branchAddress: '456 South Ave', branchCity: 'Bangalore', branchState: 'Karnataka', latitude: 12.9716, longitude: 77.5946 },
                { branchCode: 'BR003', branchName: 'North Branch', branchAddress: '789 North Rd', branchCity: 'Delhi', branchState: 'Delhi', latitude: 28.6139, longitude: 77.2090 },
                { branchCode: 'BR004', branchName: 'East Branch', branchAddress: '321 East Blvd', branchCity: 'Kolkata', branchState: 'West Bengal', latitude: 22.5726, longitude: 88.3639 },
                { branchCode: 'BR005', branchName: 'West Branch', branchAddress: '654 West Ln', branchCity: 'Chennai', branchState: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707 },
                { branchCode: 'BR006', branchName: 'Central Branch', branchAddress: '987 Central Sq', branchCity: 'Hyderabad', branchState: 'Telangana', latitude: 17.3850, longitude: 78.4867 },
                { branchCode: 'BR007', branchName: 'Suburban Branch', branchAddress: '135 Suburban Rd', branchCity: 'Pune', branchState: 'Maharashtra', latitude: 18.5204, longitude: 73.8567 },
                { branchCode: 'BR008', branchName: 'Metro Branch', branchAddress: '246 Metro St', branchCity: 'Ahmedabad', branchState: 'Gujarat', latitude: 23.0225, longitude: 72.5714 },
                { branchCode: 'BR009', branchName: 'Rural Branch', branchAddress: '369 Rural Ave', branchCity: 'Jaipur', branchState: 'Rajasthan', latitude: 26.9124, longitude: 75.7873 },
                { branchCode: 'BR010', branchName: 'Urban Branch', branchAddress: '482 Urban Blvd', branchCity: 'Lucknow', branchState: 'Uttar Pradesh', latitude: 26.8467, longitude: 80.9462 },
                { branchCode: 'BR011', branchName: 'Coastal Branch', branchAddress: '573 Coastal Rd', branchCity: 'Kochi', branchState: 'Kerala', latitude: 9.9312, longitude: 76.2673 },
                { branchCode: 'BR012', branchName: 'Hill Branch', branchAddress: '684 Hill St', branchCity: 'Shimla', branchState: 'Himachal Pradesh', latitude: 31.1048, longitude: 77.1734 }
            ];

            const stmt = db.prepare(`INSERT INTO branches (
                branchCode, branchName, branchAddress, branchCity, branchState, latitude, longitude
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`);

            branches.forEach(branch => {
                stmt.run(
                    branch.branchCode,
                    branch.branchName,
                    branch.branchAddress,
                    branch.branchCity,
                    branch.branchState,
                    branch.latitude,
                    branch.longitude
                );
            });

            stmt.finalize();
            console.log('Database seeded with initial data.');
        }
    });
}

module.exports = db;