import React from 'react';
import { StateContext } from '../../State/state';
import { Card, CardContent, Typography } from '@material-ui/core';

class View extends React.Component<{},{}> {

    static contextType = StateContext;

    render() {
        const [ {standUpResponse} ] = this.context;
        return standUpResponse && (
            <div>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                        StandUp Name: {standUpResponse.name}
                        </Typography>
                        <ul>
                            {standUpResponse.urls.map((url: string) => (
                                <li style={{
                                    wordBreak: 'break-all'
                                }}>{url}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default View;