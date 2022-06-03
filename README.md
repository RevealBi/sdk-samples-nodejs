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
const revealOptions = defaultDashboardProvider(); // configures a dashboard provider loading/storing from the './dashboards' folder.
						  // Good to quickly test the SDK, but you might want to change it for a real app.
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
More client-side example apps can be found in the [javascript samples](https://github.com/RevealBi/sdk-samples-javascript) and in the [react samples](https://github.com/RevealBi/sdk-samples-react).

*Source code for this guide in [GettingStartedTS server app](GettingStartedTS/server)*

## Authentication for data sources

The Reveal SDK allows you to provide authentication credentials to your data sources in the node.js server application.

1. Create the function:
```ts
const myAuthenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		return new RVUserNamePasswordDataSourceCredential("your-user-name", "some-password");
	} else if (dataSource instanceof RVBigQueryDataSource) {
		return new RVBearerTokenDataSourceCredential("your-token");
	} else if (dataSource instanceof RVAthenaDataSource) {
		return new RVAmazonWebServicesCredentials("your-key", "your-secret");
	} else {
		return null;
	}
}
```

2. Add the function to the `RevealOptions` object passed to the `reveal` function:

```
import reveal from 'reveal-sdk-node';

const revealOptions: RevealOptions {
	authenticationProvider: myAuthenticationProvider
};
app.use('/reveal-api/', reveal(revealOptions));

```

## Using Reveal to serve dashboard files

The easiest way to serve dashboard files is by using the `defaultDashboardProvider` mentioned earlier. However, the SDK allows you to also change how the dashboards are loaded/saved.

1. Create the dashboardProvider / dashboardSaver functions. The following example shows how to make a separate directory per userId:
```ts
const myDashboardProvider = async (userContext:IRVUserContext | null, dashboardId: string) => {
	return fs.createReadStream(`${__dirname}/dashboards/${userContext?.userId ?? "unknown"}/${dashboardId}.rdash`);
}

const myDashboardSaver = async (userContext:IRVUserContext | null, dashboardId: string, stream: fs.ReadStream) => {
	await pipeline(
		stream,
		fs.createWriteStream(`${__dirname}/dashboards/${userContext?.userId ?? "unknown"}/${dashboardId}.rdash`)
	  );
}
```

2. Add the function to the `RevealOptions` object passed to the `reveal` function:

```ts
import reveal from 'reveal-sdk-node';

const revealOptions: RevealOptions {
	dashboardProvider: myDashboardProvider,
	dashboardSaver: myDashboardSaver
};
app.use('/reveal-api/', reveal(revealOptions));
```

Note that you don't need to set-up both, if you have read-only dashboards, just don't provide the `dashboardSaver` function.

## UserContext

The `userContext:IRVUserContext` argument present in most of the extension functions is null unless there's a `userContextProvider` defined. 

1. Create the function. Typically, it gets information from the request object (e.g. cookies or other headers, values put there by other middleware, etc.)
```ts
const userContextProvider = (request:IncomingMessage) => {
	var props = new Map<string, Object>();
	props.set("some-property", "some-value"); // this can be used to store values coming from the request.
	// ...
	return new RVUserContext("user identifier", props);
};
```

2. Add the function to the `RevealOptions` object passed to the `reveal` function:

```ts
import reveal from 'reveal-sdk-node';

const revealOptions: RevealOptions {
	userContextProvider: userContextProvider
};
app.use('/reveal-api/', reveal(revealOptions));
```
