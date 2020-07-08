There are two parts to the app in this project: **test-app** and **test_api**. These are the front end React application and the backend Node API respectively.

## Install the Dependencies

We need to install dependencies for both **test-app** and **test_api**. Change directories into each and install with **npm**.

```bash
cd test-app
npm install
cd test_api
npm install
```

## Set Up the Environment Files

The React app contains a file called `.env.local`. This file has a single variable called `REACT_APP_API_URL` which is used to connect to the backend.

For `ATLAS_URL`, provide the connection string to your MongoDB Atlas cluster. You can use other MongoDB providers, or even use a local MongoDB connection. .

For `JWT_SECRET`, provide a long, strong, unguessable secret, much like you would in production.

## Run the Applications

The React app is built with **create-react-app**. Run it with the script provided in its **package.json** file.

```bash
cd test-app
npm start
```

The Node API comes with a script in its `package.json` which allows you to run it in development mode with **nodemon**.

Open a new terminal window, change directories into the API, and start it up.

```bash
cd test_api
nodemon server.js
```

The Node API will be running at `http://localhost:3001`.

Navigate to `http://localhost:3000` to see the app running!

## License

MIT
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
