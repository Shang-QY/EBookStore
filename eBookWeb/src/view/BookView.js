import React from 'react';
import {Layout, Carousel, Button, InputNumber, message} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {history} from '../utils/history';
import {addOrderItem} from "../services/CartService";


import {getBook} from "../services/bookService";
import {BookDetail} from "../components/BookDetail";
import {TopNavigateBar} from "../components/TopNavigateBar";
import {Cart} from "../components/Cart";
import {FooterInfo} from "../components/FooterInfo";

const {Header, Content, Footer} = Layout;

class BookView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            books: null,
            amount: 1
        };
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({user: user});

        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        getBook(bookId, (data) => {
            this.setState({bookInfo: data})
        })
    }

    changePageTo = (page) => {
        history.push("/?page=" + page)
    };

    changeAmount = (value) => {
        this.setState({amount:value});
    };

    addIntoCart = () => {
        addOrderItem(this.state.bookInfo.bookId, this.state.amount, this.state.user.userId);
        message.success("宝贝在购物车中等您～");
    };

    render() {
        return (
            <Layout className="layout">

                <Header>
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <TopNavigateBar changePageTo={this.changePageTo}/>
                    <img alt="ad" src={require("../assets/ad.jpg")} style={{height:65,width:1200,margin:"auto"}}/>
                    <Content>
                        <div className="detail-content">
                            <BookDetail info={this.state.bookInfo}/>

                            <div className={"button-groups"}>
                                <div className={"numberPicker"}>
                                    <div>数量：</div>
                                    <InputNumber min={1} max={10} defaultValue={1} onChange={this.changeAmount}/>
                                </div>
                                <div className={"button"}>
                                <Button type="danger" icon="shopping-cart" size={"large"} onClick={this.addIntoCart}>
                                    加入购物车
                                </Button>

                                <Button type="danger" icon="pay-circle" size={"large"} disabled
                                        ghost>
                                    立即购买
                                </Button>
                                </div>
                            </div>
                        </div>
                        <div className={"foot-wrapper"}>
                            <FooterInfo/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }

}

export default withRouter(BookView);
