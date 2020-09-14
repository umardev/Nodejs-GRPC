var express = require('express');
var router = express.Router();
const client = require("../client");
let { response } = require('../helpers/global');
/* GET users listing. */
router.get('/', async (req, res) => {
	try {
		let result = await client.getUserDetail(req.query);
		res.send(result);
	} catch (error) {
		throw error;
	}
});

module.exports = router;
