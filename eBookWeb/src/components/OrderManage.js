import React from 'react';
import {Card, Col, Descriptions, List, Row, DatePicker, Button} from 'antd';
import {getAllOrders, getOrderItems} from "../services/OrderService";
import {getBook} from "../services/bookService";
import {Link} from "react-router-dom";

const { RangePicker } = DatePicker;

export class OrderManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            showOrders: [],
            startDate: null,
            endDate: null
        };
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({orders: data, showOrders:data});
        };

        getAllOrders(callback);
    }

    dateChange = (dates, dateStrings) => {
        console.log(dateStrings[0]);
        console.log(dateStrings[1]);
        if(dateStrings[0] === "" && dateStrings[1] === "") this.setState({showOrders:this.state.orders});
        this.setState({startDate:dateStrings[0], endDate:dateStrings[1]});
    };

    queryTimeSat = () => {
        console.log("click!");
        let orders = [];
        let order, orderYear, orderMonth, orderDay;
        let startYear = parseInt(this.state.startDate.substr(0,4),10);
        let startMonth = parseInt(this.state.startDate.substr(5,2),10);
        let startDay = parseInt(this.state.startDate.substr(8,2),10);
        let endYear = parseInt(this.state.endDate.substr(0,4),10);
        let endMonth = parseInt(this.state.endDate.substr(5,2),10);
        let endDay = parseInt(this.state.endDate.substr(8,2),10);
        console.log(startYear,startMonth,startDay);
        console.log(endYear,endMonth,endDay);
        for(let i = 0; i < this.state.orders.length; ++i){
            order = this.state.orders[i];
            orderYear = parseInt(order.date.substr(0,4),10);
            orderMonth = parseInt(order.date.substr(5,2),10);
            orderDay = parseInt(order.date.substr(8,2),10);
            if(orderYear >= startYear && orderYear <= endYear && orderMonth >= startMonth && orderMonth <= endMonth && orderDay >= startDay && orderDay <= endDay)
                orders.push(order);
        }
        this.setState({showOrders:orders});
    };

    render() {
        if (this.state.orders.length === 0) {
            return (
                <div>
                    <h1>天呐，真的没有订单？</h1>
                </div>
            )
        } else return (
            <div style={{marginLeft:"20px"}}>
                <RangePicker onChange={this.dateChange}/>
                <Button type="primary" onClick={this.queryTimeSat}>
                    筛选
                </Button>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    dataSource={this.state.showOrders}

                    renderItem={item => (
                        <List.Item>
                            <OrderInManage info={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

class OrderInManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            info: this.props.info
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({orderItems: data});
        };

        getOrderItems(this.props.info.orderID, callback);
    }

    render() {
        return (
            <div>
                <div className="topInfo">
                    <p style={{width:160}}>购买人：{this.state.info.user.username}</p>
                    <p className="site-card-demo-inner-p">购买日期：{this.state.info.date}</p>
                </div>
                {this.state.orderItems.map(function (item) {
                    return (<OrderItemInManage info={item}/>)
                }, this)}
            </div>
        );
    }
}

class OrderItemInManage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: this.props.info.amount,
            book: this.props.info.book
        };
    }

    componentDidMount() {
        const bookId = this.props.info.book.bookId;
        getBook(bookId, (data) => {
            this.setState({book: data})
        })
    }

    render() {
        let book = this.state.book;
        let imgUrl = null;
        if(book.image != null){
            imgUrl = book.image.imageBase64;
        }
        else imgUrl = require("../assets/noImage.png");
        return (
            <Card hoverable>
                <Row>
                    <Col span={3}>
                        <Link to={{
                            pathname: '/bookDetails',
                            search: '?id=' + book.bookId
                        }}
                              target="_blank"
                        >
                            <img alt="image" src={imgUrl} className={"imageInOrderManage"}/>
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Descriptions title={book.name}>
                            <Descriptions.Item label={"作者"} span={3}>{book.author}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={6}>
                        <Descriptions>
                            <Descriptions.Item label={"状态 "} span={3}>{book.inventory !== 0 ?
                                <span>有货 <span className={"inventory"}>库存{book.inventory}件</span></span> :
                                <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={5}>{<span
                                className={"price"}>{'¥' + book.price}</span>}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={6}>
                        <Descriptions>
                            <Descriptions.Item label={"数量"} span={3}>{this.props.info.amount}</Descriptions.Item>
                            <Descriptions.Item label={"总价"} span={5}>{<span
                                className={"price"}>{'¥' + (book.price * this.props.info.amount)}</span>}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        );
    }
}



