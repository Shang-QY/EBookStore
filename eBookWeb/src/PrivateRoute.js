import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            hasLogin: false,
        };
    }


    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem("user")) != null) this.setState({isLogin: true, hasLogin: true});
        else this.setState({isLogin: false, hasLogin: true});
    }


    render() {

        const {component: Component, path = "/", exact = false, strict = false} = this.props;

        console.log(this.state.isLogin);

        if (!this.state.hasLogin) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isLogin ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

