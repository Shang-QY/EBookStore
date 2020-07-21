import React from 'react';
import WrappedSignUpForm from "../components/SignUpForm";
import {withRouter} from "react-router-dom";


class SignUpView extends React.Component {

    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Login</h1>
                        <div className="login-content">
                            <WrappedSignUpForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpView);
