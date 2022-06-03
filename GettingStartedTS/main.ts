import reveal, {defaultDashboardProvider} from 'revealbi-node-sdk';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.
const revealOptions = defaultDashboardProvider(); // DEVELOPMENT only! configures a dashboard provider loading/storing from the 'dashboards' folder
app.use('/reveal-api/', reveal(revealOptions));
app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});

