import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Checkbox, Col, Descriptions, Row} from "antd";
import {CartItem} from "./CartItem";
import {getOrderItems} from "../services/OrderService";
import {getBook} from "../services/bookService";

export class Order extends React.Component {

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
            <Card>
                <p className="site-card-demo-inner-p">购买日期：{this.state.info.date}</p>
                {this.state.orderItems.map(function (item) {
                    return (<OrderItem info={item}/>)
                }, this)}
            </Card>
        );
    }
}

class OrderItem extends React.Component{
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
            <Link to={{
                pathname: '/bookDetails',
                search: '?id=' + book.bookId
            }}
                  target="_blank"
            >
                <Card hoverable>
                    <Row>
                        <Col span={6}>
                            <img alt="image" src={imgUrl} className={"bookImg"}/>
                        </Col>
                        <Col span={6}>
                            <Descriptions title={book.name}>
                                <Descriptions.Item label={"作者"} span={3}>{book.author}</Descriptions.Item>
                                <Descriptions.Item label={"状态 "} span={3}>{book.inventory !== 0 ?
                                    <span>有货 <span className={"inventory"}>库存{book.inventory}件</span></span> :
                                    <span className={"status"}>无货</span>}</Descriptions.Item>
                                <Descriptions.Item label={"定价"} span={5}>{<span
                                    className={"price"}>{'¥' + book.price}</span>}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={6} offset={6}>
                            <Descriptions>
                                <Descriptions.Item label={"数量"} span={3}>{this.props.info.amount}</Descriptions.Item>
                                <Descriptions.Item label={"总价"} span={5}>{<span
                                    className={"price"}>{'¥' + (book.price * this.props.info.amount)}</span>}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </Link>
        );
    }
}
