import React from 'react';
import {Avatar, Button, Col, Descriptions, List, Row, Switch} from 'antd';
import {getAllUser, changeBanState} from "../services/userService";

export class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {

        const callback = (data) => {
            console.log(data);
            this.setState({users: data});
        };
        getAllUser(callback);
    }

    render() {
        if (this.state.users.length === 0) {
            return (
                <div>
                    <h1>服务器开小差了...过会儿再来吧～</h1>
                </div>
            )
        } else return (
            <div style={{marginLeft:"20px", width:"1000px"}}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 12,
                    }}
                    dataSource={this.state.users}

                    renderItem={item => (
                        <List.Item>
                            <UserItem user={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

class UserItem extends React.Component{

    banUser = () => {
        changeBanState(this.props.user.userId);
    };

    renderSwitch = () => {
        let notBan = true;
        let {user} = this.props;
        if(user.ban === 1) notBan = false;
        if(user.userTpye === 1) {
            console.log("this is a guanli ");
            return (<div></div>);
        }
    };

    render() {
        let {user} = this.props;

        let imgUrl = null;
        if(user.icon != null){
            imgUrl = user.icon.iconBase64;
        }
        else imgUrl = "../assets/defaultIcon.jpeg";
        let notBan = true;
        if(user.ban === 1) notBan = false;
        return (
            <Row>
                <Col span={6}>
                    <div className="userInfo">
                        <Avatar src={imgUrl} style={{cursor: "pointer"}}/>
                        <text style={{marginLeft:"20px"}}>{user.username}</text>
                    </div>
                </Col>
                <Col span={3}>
                    <text>{user.tel}</text>
                </Col>
                <Col span={3}>
                    <text>{user.address}</text>
                </Col>
                <Col span={6}>
                    <text>{user.email}</text>
                </Col>
                <Col span={3}>
                    {user.userType === 1?<text>管理员</text>:<text>顾客</text>}
                </Col>
                {user.userType === 1?
                    <Switch checkedChildren="正常" unCheckedChildren="禁用" disabled defaultChecked={notBan} onChange={this.banUser}/> :
                    <Switch checkedChildren="正常" unCheckedChildren="禁用" defaultChecked={notBan} onChange={this.banUser}/>
                }
            </Row>
        )
    }
}
