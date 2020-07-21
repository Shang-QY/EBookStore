import React from 'react'
import {Menu, Layout, Icon} from 'antd'
import {history} from "../utils/history";


const {SubMenu} = Menu;
const {Sider} = Layout;

export class SideBar extends React.Component {

    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
        if (collapsed) {

        }
        console.log(collapsed);
        this.setState({collapsed});
    };

    changeBooks = () => {
        history.push('/');
    };

    changeCart = () => {
        history.push('/cart');
    };

    changeOrders = () => {
        history.push('/order');
    };

    changeProfile = () => {
        history.push('/profile');
    };

    render() {
        return (
            <div style={{
                width: this.state.collapsed ? "80px" : "180px",
                maxWidth: this.state.collapsed ? "80px" : "180px",
                minWidth: this.state.collapsed ? "80px" : "180px"
            }}>
                <div className="mySider">
                    <Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse}
                           className="sider" style={{background: '#fff'}}>
                        <Menu defaultSelectedKeys={[this.props.idx]} mode="inline">
                            <Menu.Item key="1" onClick={this.changeBooks}>
                                <Icon type="read" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>Books</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={this.changeCart}>
                                <Icon type="shopping-cart" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>My Cart</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.changeOrders}>
                                <Icon type="solution" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>My Orders</span>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={this.changeProfile}>
                                <Icon type="user" style={{fontSize: '18px'}}/>
                                <span style={{fontSize: '16px'}}>My Profile</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </div>
            </div>

        );
    }

}
