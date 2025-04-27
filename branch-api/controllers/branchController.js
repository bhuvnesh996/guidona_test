const db = require('../db');
const paginate = require('../utils/paginator');

const getAllBranches = (req, res) => {
    try {
        const { searchBy, searchValue, sortBy, sortOrder, page, limit } = req.query;
        
        let baseQuery = 'SELECT * FROM branches';
        const pagination = paginate(baseQuery, {
            page,
            limit,
            sortBy,
            sortOrder,
            searchBy,
            searchValue
        });

        db.serialize(() => {
            db.all(pagination.dataQuery, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.get(pagination.countQuery, [], (err, countResult) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    const total = countResult.total;
                    const totalPages = Math.ceil(total / pagination.limit);

                    res.json({
                        data: rows,
                        pagination: {
                            total,
                            totalPages,
                            currentPage: pagination.page,
                            pageSize: pagination.limit,
                            hasNextPage: pagination.page < totalPages,
                            hasPreviousPage: pagination.page > 1
                        }
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBranches
};