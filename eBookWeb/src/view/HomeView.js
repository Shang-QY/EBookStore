import React from 'react';
import {Layout, Carousel, Menu, Input} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBar";
import {BookList} from "../components/BookList";
import {SideBookList} from "../components/SideBookList";

const {Header, Content, Footer} = Layout;

export class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchRequire: "",
            onSearch: false
        };
    }

    onSearch = (value) => {
        this.setState({searchRequire:value, onSearch:true},() => {this.setState({onSearch:false})});
    };

    renderBookList = () => {
        if(this.state.onSearch === true) return null;
        return (<BookList value={this.state.searchRequire}/>)
    };

    render() {
        return (
            <div className="homePage">
                <img alt="fakeSideBar" src={require("../assets/fakeSideBar.png")} style={{width:205,marginTop:"20px"}}/>
                <div className="home-content">
                    <BookCarousel/>
                    {this.renderBookList()}
                </div>
                <div style={{marginTop:"20px", maxWidth:"205px"}}>
                    <Input.Search size="large" style={{width:"205px"}} placeholder="input here" onSearch={this.onSearch}/>
                    <SideBookList/>
                </div>
            </div>
        );
    }
}
