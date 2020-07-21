import React from 'react';
import {List, Button, Icon, Row, Col, message} from 'antd';
import {getCart, addCartToOrder} from "../services/CartService";
import {CartItem} from "./CartItem";
import {history} from '../utils/history';
import {GiftOutlined} from '@ant-design/icons';

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            totalPrice: 0
        };
    }

    componentDidMount() {

        const callback = (data) => {
            console.log(data);
            this.setState({orderItems: data});
            let price = 0;
            for (let i = 0; i < this.state.orderItems.length; i++) {
                console.log(this.state.orderItems[i].amount + '  ' + this.state.orderItems[i].book.price);
                price += this.state.orderItems[i].amount * this.state.orderItems[i].book.price;
            }
            this.setState({totalPrice: price});
        };

        const user = JSON.parse(sessionStorage.getItem("user"));
        getCart(user.userId, callback);

    }

    settle = () => {
        message.success("购买成功，稍后可在订单中查看");
        const user = JSON.parse(sessionStorage.getItem("user"));
        addCartToOrder(user.userId, console.log);
        this.setState({orderItems: []});
    };

    onChange = () => {
        let items = [];
        const callback = (data) => {
            items = data;
            this.setState({orderItems: items});
        };

        const user = JSON.parse(sessionStorage.getItem("user"));
        getCart(user.userId, callback);
    };

    render() {

        if (this.state.orderItems.length === 0) {
            return (
                <div>
                    <h1>购物车空空如也哦～快去书城逛逛吧！</h1>
                </div>
            )
        } else return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.state.orderItems}

                    renderItem={item => (
                        <List.Item>
                            <CartItem info={item} onChange={this.onChange}/>
                        </List.Item>
                    )}
                />

                <Row>
                    <Col span={8} offset={8}>
                        <span className={"price"}>{'合计： ¥' + this.state.totalPrice}</span>
                    </Col>
                    <Col span={5} offset={3}>
                        <Button type="primary" icon={<GiftOutlined/>} size={"large"} onClick={this.settle}>
                            结算
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
}
