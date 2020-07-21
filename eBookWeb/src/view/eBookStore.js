import React from 'react';
import {Layout, Carousel, Menu} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBar";
import {BookList} from "../components/BookList";
import {TopNavigateBar} from "../components/TopNavigateBar";
import {FooterInfo} from "../components/FooterInfo";
import {HomeView} from "./HomeView";
import {CartView} from "./CartView";
import {OrderView} from "./OrderView";
import {ProfileView} from "./ProfileView";

const {Header, Content, Footer} = Layout;

class eBookStore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choosePage:"home",
        };
    }

    componentWillMount() {
        const query = this.props.location.search;
        if(query === "") return;
        const page = query.slice(6);
        console.log(page);
        this.setState({choosePage:page})
    }

    changePageTo = (page) => {
        this.setState({choosePage:page})
    };

    renderContent = () => {
        if(this.state.choosePage === "home") return <HomeView/>;
        else if(this.state.choosePage === "cart") return <CartView/>;
        else if(this.state.choosePage === "order") return <OrderView/>;
        else if(this.state.choosePage === "profile") return <ProfileView/>;
        else return null;
    };

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <TopNavigateBar page={this.state.choosePage} changePageTo={this.changePageTo}/>
                    <img alt="ad" src={require("../assets/ad.jpg")} style={{height:65,width:1200,margin:"auto"}}/>
                    <Content>
                        {this.renderContent()}
                        <div className="foot-wrapper">
                            <FooterInfo/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(eBookStore);
