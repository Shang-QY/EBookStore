import React from 'react';
import {Layout, Carousel, Button} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {Orders} from "../components/Orders";

const {Header, Content, Footer} = Layout;

export class OrderView extends React.Component {

    render() {
        return (
            <div className="content">
                <Orders/>
            </div>
        );
    }
}
