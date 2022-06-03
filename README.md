# Getting Started

## Setting up the Reveal SDK Server

1. Create the typescript & express app:
```sh
mkdir reveal-server
cd reveal-server
npm init
npm i -P express
npm i -P cors
npm i -D typescript @types/express @types/node @types/cors
```

2. Install the Reveal SDK:
```sh
npm i -P reveal-sdk-node
```

3. Create the app entry point, 'main.ts':

```ts
import reveal, { defaultDashboardProvider } from 'reveal-sdk-node';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.
const revealOptions = defaultDashboardProvider(); // configures a dashboard provider loading/storing from the './dashboards' folder. Good to quickly test the SDK, but you might want to change it for a real app.
app.use('/reveal-api/', reveal(revealOptions));
app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

4. Create a 'dashboards' folder (needed by the `defaultDashboardProvider`) under your root folder (in this sample, 'reveal-server')

5. Copy [Marketing.rdash](GettingStarted/server/dashboards/Marketing.rdash) in the 'dashboards' folder to quickly test the app using the sample client.

6. Run it:
```sh
npx tsc main.ts --esModuleInterop true --strict
node main.js
```

7. You'll need a client app, using the client SDK. Try with the [GettingStarted client app](GettingStarted/client).

*Source code for this guide in [GettingStartedTS server app](GettingStartedTS/server)*

## More guides

- [how to handle credentials for datasource authentication](AuthenticationProvider)
- [how to set a custom dashboard loader/saver](DashboardProvider).
