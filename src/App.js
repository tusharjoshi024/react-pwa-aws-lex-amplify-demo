import React, {Component} from 'react';
import Amplify, {Auth, Interactions} from 'aws-amplify';
import {ChatBot, AmplifyTheme} from 'aws-amplify-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:bb9dc2ec-18e6-4ca6-99c7-a7451eb592e0',
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