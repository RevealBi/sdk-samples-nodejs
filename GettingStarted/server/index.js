const express = require('express');
const cors = require('cors');
const fs = require('fs');
const reveal = require('revealbi-node-sdk');

const app = express();
app.use(cors());
app.use('/reveal-api/', reveal(
	{ 
		dashboardProvider: function(_, dashboardId) {
			return fs.createReadStream(`${__dirname}/dashboards/${dashboardId}.rdash`);
		} 
	}));
app.listen(8080);