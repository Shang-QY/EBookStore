import React from 'react'
import {Menu, Layout, Icon} from 'antd'
import {history} from "../utils/history";
import {LineChartOutlined} from '@ant-design/icons';

export class TopNavigateBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navIndex:'',
            drawAdminButton:false
        };
    }

    componentWillMount() {
        console.log(this.props.page);
        let idx = '';
        if(this.props.page === "home") idx = '1';
        else if(this.props.page === "cart") idx = '2';
        else if(this.props.page === "order") idx = '3';
        else if(this.props.page === "profile") idx = '4';
        else if(this.props.page === "admin") idx = '5';
        this.setState({navIndex:idx});
        const user = JSON.parse(sessionStorage.getItem("user"));
        if(user.userType === 1) this.setState({drawAdminButton:true})
    }

    changeBooks = () => {
        this.props.changePageTo("home");
    };

    changeCart = () => {
        this.props.changePageTo("cart");
    };

    changeOrders = () => {
        this.props.changePageTo("order");
    };

    changeProfile = () => {
        this.props.changePageTo("profile");
    };

    changeAdmin = () => {
        history.push('/admin');
    };

    renderAdmin = () => {
        if(this.state.drawAdminButton === false) return null;
        return (
            <Menu.Item key="5" onClick={this.changeAdmin}>
                <LineChartOutlined style={{fontSize: '18px'}}/>
                <span style={{fontSize: '16px'}}>系统管理</span>
            </Menu.Item>
        )
    };

    render() {
        return (
            <div style={{
                marginTop:"20px",
                width:"100%",
                marginBottom:"20px",
                backgroundColor:"#001529"
            }}>
                <div style={{
                    width: "1200px",
                    margin:"auto",
                }}>
                    <Menu theme={"dark"} defaultSelectedKeys={this.state.navIndex} mode="horizontal">
                        <Menu.Item key="1" onClick={this.changeBooks}>
                            <Icon type="read" style={{fontSize: '18px'}}/>
                            <span style={{fontSize: '16px'}}>主页</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.changeCart}>
                            <Icon type="shopping-cart" style={{fontSize: '18px'}}/>
                            <span style={{fontSize: '16px'}}>购物车</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.changeOrders}>
                            <Icon type="solution" style={{fontSize: '18px'}}/>
                            <span style={{fontSize: '16px'}}>我的订单</span>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={this.changeProfile}>
                            <Icon type="user" style={{fontSize: '18px'}}/>
                            <span style={{fontSize: '16px'}}>我的账户</span>
                        </Menu.Item>
                        {this.renderAdmin()}
                    </Menu>
                </div>
                <div style={{height:"5px",backgroundColor:"#1890ff"}}/>
            </div>
        );
    }

}
