function paginate(query, params = {}) {
    const {
        page = 1,
        limit = 10,
        sortBy,
        sortOrder = 'asc',
        searchBy,
        searchValue
    } = params;

    let paginationQuery = query;
    const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
    const offset = (page - 1) * limit;

    // Add search filter if provided
    if (searchBy && searchValue) {
        const searchCondition = `${searchBy} LIKE '%${searchValue}%'`;
        paginationQuery = paginationQuery.includes('WHERE') 
            ? `${paginationQuery} AND ${searchCondition}`
            : `${paginationQuery} WHERE ${searchCondition}`;
    }

    // Add sorting if provided
    if (sortBy) {
        paginationQuery = `${paginationQuery} ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }

    // Add pagination
    paginationQuery = `${paginationQuery} LIMIT ${limit} OFFSET ${offset}`;

    return {
        dataQuery: paginationQuery,
        countQuery,
        page: parseInt(page),
        limit: parseInt(limit)
    };
}

module.exports = paginate;