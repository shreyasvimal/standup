import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
    match?: any;
}

class View extends React.Component<Props & RouteComponentProps,{}> {

    constructor(props: Props & RouteComponentProps) {
        super(props);

        const { match: { params } } = this.props;
    }

    render() {
        return 'Member View';
    }
}

export default withRouter(View);