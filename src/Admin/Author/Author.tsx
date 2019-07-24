import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { StateContext } from '../../State/state';

const styles = {
    textField: {
        marginBottom: '30px'
    }
}

interface Props {
    classes?: any;
}

export interface State {
    error: boolean;
    slackError: boolean;
}
class Author extends React.Component<Props,State> {

    static contextType = StateContext;

    constructor(props: Props) {
        super(props);
        this.state = {
            error: false,
            slackError: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handleSlackBlur = this.handleSlackBlur.bind(this);
    }

    handleChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
        //TODO:: Need to find out destructure and take only second value
        const dispatch = this.context[1];
        if( name === 'email' ) {
            dispatch({
                type: 'author_email_update',
                email: event.target.value
            });
        } else if( name === 'slackHandle' ) {
            dispatch({
                type: 'author_slack_update',
                slackHandle: event.target.value
            });
        }
    }

    handleEmailBlur(event: any) {
        const { value } = event.target;
        let error: boolean = false;
        if( value !== '' && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value) ) {
            error = true;
        } 
        this.setState({ error });
    }

    handleSlackBlur(event: any) {
        const { value } = event.target;
        let slackError: boolean = false;
        if( value !== '' && value.indexOf('@') !== 0 ) {
            slackError = true;
        } 
        this.setState({ slackError });
    }


    render() {

        const { classes } = this.props;
        const [ {email, slackHandle} ] = this.context;

        return (
            <div>
                <FormControl className={classes.textField} error={this.state.error} fullWidth>
                    <InputLabel htmlFor="emailAddress">Author Email</InputLabel>
                    <Input
                        id="emailAddress"
                        name="email"
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            this.handleChange('email', event)
                        }}
                        onBlur={this.handleEmailBlur}
                    />
                    {this.state.error && (
                        <FormHelperText id="error-text">Provide a valid Email.</FormHelperText>
                    )}
                </FormControl>
                <FormControl className={classes.textField} error={this.state.slackError} fullWidth>
                    <InputLabel htmlFor="slackHandle">Author Slack Handle</InputLabel>
                    <Input
                        id="slackHandle"
                        name="slackHandle"
                        value={slackHandle}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            this.handleChange('slackHandle', event)
                        }}
                        onBlur={this.handleSlackBlur}
                    />
                    {this.state.slackError && (
                        <FormHelperText id="error-text">Provide a Author's valid slack handle. It should have a @ in front of it.</FormHelperText>
                    )}
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(Author);