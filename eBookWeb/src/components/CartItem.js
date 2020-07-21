import React from 'react';
import {Row, Col, Card, Descriptions, Radio, Button, message} from 'antd';
import {deleteCartItem, changeItemAmount} from "../services/CartService";

import {Link} from 'react-router-dom'
import {history} from "../utils/history";
import {getBook} from "../services/bookService";

export class CartItem extends React.Component {

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

    //注意这里onChange的位置，再次牢记请求是异步的
    deleteItem = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const callback = (data) => {
            console.log(data);
            this.props.onChange();
        };

        deleteCartItem(user.userId, this.props.info.id, callback);
    };

    changeAmountLarge = () => {
        let amount = this.state.amount + 1;
        changeItemAmount(this.props.info.id, amount, console.log);
        this.setState({amount: amount});
    };

    changeAmountLittle = () => {
        if(this.state.amount === 1){
            message.error("该宝贝不能再减少了哦～");
            return;
        }
        let amount = this.state.amount - 1;
        changeItemAmount(this.props.info.id, amount, console.log);
        this.setState({amount: amount});

    };

    render() {
        const book = this.state.book;

        let imgUrl = null;
        if(book.image != null){
            imgUrl = book.image.imageBase64;
        }
        else imgUrl = require("../assets/noImage.png");
        return (
            <Card hoverable>
                <Row>
                    <Link to={{
                        pathname: '/bookDetails',
                        search: '?id=' + book.bookId
                    }}
                          target="_blank"
                    >
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
                        <Col span={6}>
                            <Descriptions>
                                <Descriptions.Item label={"数量"} span={3}>{this.state.amount}</Descriptions.Item>
                                <Descriptions.Item label={"总价"} span={5}>{<span
                                    className={"price"}>{'¥' + (book.price * this.state.amount)}</span>}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Link>

                    <Button onClick={this.changeAmountLittle}>-</Button>
                    <Button onClick={this.changeAmountLarge}>+</Button>
                    <Button onClick={this.deleteItem}>删除</Button>
                </Row>
            </Card>

        );
    }

}

