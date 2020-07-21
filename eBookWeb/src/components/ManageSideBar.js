import React from 'react'
import {Menu, Layout, Icon} from 'antd'
import {history} from "../utils/history";


const {SubMenu} = Menu;
const {Sider} = Layout;

export class ManageSideBar extends React.Component {

    changeBooks = () => {
        this.props.changeContentTo("books");
    };

    changeOrders = () => {
        this.props.changeContentTo("orders");
    };

    changeUsers = () => {
        this.props.changeContentTo("users");
    };

    changeStatistics = () => {
        this.props.changeContentTo("statistics");
    };

    render() {
        return (
            <div style={{
                width: "180px",
                maxWidth: "180px",
                minWidth: "180px"
            }}>
                <div className="mySider">
                <Sider width="180px" style={{background: '#fff'}}>
                       <Menu defaultSelectedKeys='1'>
                            <Menu.Item key="1" onClick={this.changeBooks}>
                                <Icon type="read" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>书籍管理</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={this.changeOrders}>
                                <Icon type="shopping-cart" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>订单管理</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.changeUsers}>
                                <Icon type="solution" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>用户管理</span>
                            </Menu.Item>
                           <Menu.Item key="4" onClick={this.changeStatistics}>
                               <Icon type="solution" style={{fontSize: '18px'}}/>
                               <span style={{fontSize: '16px'}}>统计数据</span>
                           </Menu.Item>
                        </Menu>
                </Sider>
                </div>
            </div>
        );
    }

}
