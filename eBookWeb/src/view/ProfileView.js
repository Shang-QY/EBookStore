import React from 'react';
import {Layout, Carousel, Button} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {history} from '../utils/history';
import {Orders} from "../components/Orders";
import {Profile} from "../components/Profile";

const {Header, Content, Footer} = Layout;

export class ProfileView extends React.Component {

    render() {
        return (
            <div className="content">
                <Profile/>
            </div>
        );
    }
}
