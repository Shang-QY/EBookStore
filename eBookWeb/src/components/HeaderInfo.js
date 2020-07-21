import React from 'react';
import {Row, Col} from 'antd';
import '../css/index.css'
import {UserAvatar} from "./UserAvatar";

export class HeaderInfo extends React.Component {

    render() {

        const user = JSON.parse(sessionStorage.getItem("user"));


        return (
            <div id="header">
                <div id="header-content">
                    <Row>
                        <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={4}>
                            <a id="logo" href={"/"}>
                                <div className="logoDiv">
                                    <img alt="logo" className="logo" src={require("../assets/lingdang.png")} style={{height: 45}}/>
                                    <img alt="Book Store" className="logo-font" src={require("../assets/name.png")} style={{height: 40}}/>
                                    <img alt="Book Store" className="logo-font" src={require("../assets/nameEnd.png")} style={{height: 27}}/>
                                </div>
                            </a>
                        </Col>
                        <Col xs={0} sm={0} md={19} lg={19} xl={19} xxl={20}>
                            {user != null ? <UserAvatar user={user}/> : null}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
