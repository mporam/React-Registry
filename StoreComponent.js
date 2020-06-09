import React, {Children, Component} from 'react';
import * as Registry from "./index";

export default class StoreComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {store: Registry.open(this.props.store)}

        this.state.store.onValueChange = this.rerender

    }

    rerender = (key, value) => {
        this.setState((state) => ({store: state.store}))
    }

    render = () => {
        const renderChildren = Children.map(this.props.children, child => {
            return React.cloneElement(child, {store: this.state.store})
        })
        return (
            <>
                {renderChildren}
            </>
        )
    }
}

