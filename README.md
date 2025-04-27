# guidona_test

A RESTful API for managing bank branches with features like pagination, searching, and sorting.

## Features

- Get a list of branches with pagination
- Search branches by any column
- Sort branches by any column in ascending or descending order
- Swagger API documentation

## Technologies Used

- Node.js
- Express.js
- SQLite (file-based database)
- Swagger UI for API documentation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/branch-api.git
   cd branch-api
Install dependencies:

bash
npm install
Start the server:

bash
npm start
For development with auto-reload:

bash
npm run dev

## API USAGE 
API Usage Examples
    Get all branches (first page, 10 items):

    GET /api/branches
    Search for branches in Maharashtra:

    GET /api/branches?searchBy=branchState&searchValue=Maharashtra
    Sort branches by city name in descending order:

    GET /api/branches?sortBy=branchCity&sortOrder=desc
    Get second page with 5 items per page:
8