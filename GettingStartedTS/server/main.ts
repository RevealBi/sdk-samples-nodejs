import reveal from 'reveal-sdk-node';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.
app.use('/reveal-api/', reveal());
app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});

