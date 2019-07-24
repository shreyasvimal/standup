import React from 'react';
import { TextField } from '@material-ui/core';
import { StateContext } from '../../State/state';

class SlackHandle extends React.Component<{},{}> {

    static contextType = StateContext;

    render() {

        const [ {slackHandles}, dispatch ] = this.context;

        return (
            <div>
                <TextField
                    id="slackHandles"
                    multiline={true}
                    variant="outlined"
                    rows="5"
                    fullWidth
                    placeholder={"Enter Slack Handles for the team members"}
                    value={slackHandles}
                    onChange={(event: any) => {
                        dispatch({
                            type: 'team_slack_update',
                            slackHandles: event.target.value
                        });
                    }}
                />
            </div>
        );
    }
}

export default SlackHandle;