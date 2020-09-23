# React JS PWA with AWS Amplify and integration with AWS Lex
This app demonstrates how to build a progressive web app with React JS and AWS Amplify and incorporating a conversational bot created using AWS Lex.

## Steps to create the PWA project
1. Install node and npm. Create a React JS Project or clone this one.

2. Go to the root directory of project. Install AWS Amplify CLI 
   
    ######
        npm install -g @aws-amplify/cli
        amplify configure
        
3. Acquire AWS credentials and Access Key pair and then follow the steps on CLI -  

    ######
        Specify the AWS Region
        ? region:  # Your preferred region
        Specify the username of the new IAM user:
        ? user name:  # User name for Amplify IAM user
        Complete the user creation using the AWS console
        implementation 'com.amazonaws:aws-java-sdk-sns'
        Enter the access key of the newly created user:
        ? accessKeyId:  # YOUR_ACCESS_KEY_ID
        ? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
        This would update/create the AWS Profile in your local machine
        ? Profile Name:  # (default)
        
        Successfully set up the new user.

4. Once your Amplify CLI is configured with AWS credentials, initialize the backend -
   
    ######
        amplify init
        
5. Complete the activities on CLI to initialize the backend, and install following required libraries.  
    ######
        npm install aws-amplify @aws-amplify/ui-react
        npm install aws-amplify-react

6. Add these lines in index.js after last import statement
    ###### index.js
        import 'bootstrap/dist/css/bootstrap.css'
        import Amplify from "aws-amplify";
        import awsExports from "./aws-exports";
        
        Amplify.configure(awsExports);

7. Add the main component, app.js
    ###### app.js
        import React, {Component} from 'react';
        import Amplify, {Auth, Interactions} from 'aws-amplify';
        import {ChatBot, AmplifyTheme} from 'aws-amplify-react';
        import awsconfig from './aws-exports';
        
        Amplify.configure(awsconfig);
        
        Amplify.configure({
            Auth: {
                identityPoolId: 'us-east-1:xxxxxx-xxxx-xxxx-01a2-xxxxxxxxxx',
                region: 'us-east-1'
            },
            Interactions: {
                bots: {
                    "BookTrip": {
                        "name": "BookTrip",
                        "alias": "$LATEST",
                        "region": "us-east-1",
                    },
                }
            }
        });
        
        const myTheme = {
            ...AmplifyTheme,
            sectionHeader: {
                ...AmplifyTheme.sectionHeader,
                backgroundColor: '#ff6600'
            }
        };
        
        const customVoiceConfig = {
            silenceDetectionConfig: {
                time: 2000,
                amplitude: 0.2
            }
        }
        
        class App extends Component {
        
            handleComplete(err, confirmation) {
                if (err) {
                    alert('Bot conversation failed')
                    return;
                }
        
                alert('Success: ' + JSON.stringify(confirmation, null, 2));
                return 'Trip booked. Thank you! what would you like to do next?';
            }
        
            render() {
                return (
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Amazon LEX Demo</h1>
                        </header>
                        <ChatBot
                            title="Book a trip virtual agent"
                            theme={myTheme}
                            botName="BookTrip"
                            welcomeMessage="Welcome, how can I help you today?"
                            onComplete={this.handleComplete.bind(this)}
                            clearOnComplete={true}
                            conversationModeOn={true}
                            voiceEnabled={true}
                            voiceConfig={customVoiceConfig}
                        />
                    </div>
                );
            }
        }
        
        export default App;

8. To make the application PWA (workable while offline) make changes in index.js-
    ###### index.js
        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.register(); 

## Important notes - 
1. To enable PWA, we need to build the app and serve the production build, then toggle the offline mode on a browser devtools
    ######
        npm build
        serve -s build

2. To enable the conversational bot, following is the key code in app.js
    ###### app.js
        conversationModeOn={true}

2. To enable the voice input for the bot, following is the key code in app.js
    ###### app.js
        voiceEnabled={true}
        voiceConfig={customVoiceConfig}
        
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

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
