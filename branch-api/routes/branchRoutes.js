const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management
 */

/**
 * @swagger
 * /api/branches:
 *   get:
 *     summary: Get a list of branches
 *     tags: [Branches]
 *     parameters:
 *       - in: query
 *         name: searchBy
 *         schema:
 *           type: string
 *         description: Field to search by (e.g., branchCode, branchName, branchCity)
 *       - in: query
 *         name: searchValue
 *         schema:
 *           type: string
 *         description: Text to search in the selected field
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Column name to sort by (e.g., latitude, branchState)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Rows per page
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Branch'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       500:
 *         description: Internal server error
 */
router.get('/', branchController.getAllBranches);

module.exports = router;