import React from 'react';
import {Layout, Carousel, Button} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {history} from '../utils/history';
import {TopNavigateBar} from "../components/TopNavigateBar";
import {ManageSideBar} from "../components/ManageSideBar";
import {BookManage} from "../components/BookManage";
import {UserManage} from "../components/UserManage";
import {OrderManage} from "../components/OrderManage";
import {StatisticsManage} from "../components/StatisticsManage";

const {Header, Content, Footer} = Layout;

class AdminStore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choosePage:"books",
        };
    }

    changePageTo = (page) => {
        history.push("/?page=" + page)
    };

    changeContentTo = (page) => {
        this.setState({choosePage:page})
    };

    renderContent = () => {
        if(this.state.choosePage === "books") return <BookManage/>;
        else if(this.state.choosePage === "users") return <UserManage/>;
        else if(this.state.choosePage === "orders") return <OrderManage/>;
        else if(this.state.choosePage === "statistics") return <StatisticsManage/>;
        else return null;
    };

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <TopNavigateBar page="admin" changePageTo={this.changePageTo}/>
                    <Content>
                        <div className="content">
                            <Layout style={{width:"1200px"}}>
                                <ManageSideBar changeContentTo={this.changeContentTo}/>
                                {this.renderContent()}
                            </Layout>
                        </div>
                        <div style={{minHeight:"80px"}}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }

}

export default withRouter(AdminStore);
