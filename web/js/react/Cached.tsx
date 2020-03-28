import * as React from 'react';

export class Cached extends React.Component {

    public shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        return false;
    }

    public render() {
        return this.props.children;
    }

}

