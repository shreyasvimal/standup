import React from 'react';
import { Typography, TextField, withStyles } from '@material-ui/core';
import { StateContext } from '../../State/state';

const styles = {
    questionLabel: {
        marginTop: '10px',
        marginBottom: '10px'
    },
    questionField : {
        marginBottom: '15px',
        marginTop: '15px'
    }
}

interface Props {
    classes?: any;
}

class Questions extends React.Component<Props,{}> {

    static contextType = StateContext;

    constructor(props: Props) {
        super(props);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    updateQuestion(index: number, value: string) {
        const [ {questions}, dispatch ] = this.context;
        questions[index] = value;
        dispatch({
            type: 'questions_update',
            questions
        });
    }

    render() {
        const { classes } = this.props;
        const [ {questions} ] = this.context;
        return (
            <div>
                <Typography 
                    variant="h6" 
                    color="inherit"
                    className={classes.questionLabel}
                >
                    Questions for Stand Up:
                </Typography>
                {questions.map( (question: string, index: number) => (
                    <TextField
                        fullWidth
                        placeholder="Please enter your question"
                        key={`question${index}`}
                        value={question}
                        className={classes.questionField}
                        onChange={(event) => {
                            this.updateQuestion(index, event.target.value);
                        }}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Questions);