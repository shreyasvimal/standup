import React from 'react';
import {Stepper, Step, StepLabel, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Author from '../Author/Author';
import Questions from '../Questions/Questions';
import SlackHandle from '../Slack/SlackHandle';

const styles = {
    root: {
      width: '100%',
    },
    buttonGrp: {
        marginTop: '10px'
    },
    button: {
        marginRight: '20px'
    }
};

interface State {
    activeStep: number;
}

interface Props { 
    classes?: any;
}

class Steps extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeStep: 0
        }
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    getSteps() {
        return ['Author Information', 'Questions', 'Slack Handles'];
    }

    handleNext() {
        let { activeStep } = this.state;
        if(activeStep !== (this.getSteps().length - 1) ) {
            this.setState({ activeStep: activeStep + 1 })
        }
    }

    handleBack() {
        let { activeStep } = this.state;
        if(activeStep !== 0) {
            this.setState({ activeStep: activeStep - 1 })
        }
    }

    getStepContent(step: number) {
        switch (step) {
          case 0:
            return <Author/>;
          case 1:
            return <Questions/>
          case 2:
            return <SlackHandle/>;
          default:
            return 'Unknown step';
        }
    }
      

    render() {

        const { classes } = this.props;
        const steps: string[] = this.getSteps();

        return (
            <div className={classes.root}>
                <Stepper activeStep={this.state.activeStep} >
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.getStepContent(this.state.activeStep)}
                </div>
                <div className={classes.buttonGrp} style={{
                    float: 'right'
                }}>
                    <Button 
                        disabled={this.state.activeStep === 0} 
                        onClick={this.handleBack}
                        className={classes.button}
                        variant="contained"
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                    >
                        {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Steps);