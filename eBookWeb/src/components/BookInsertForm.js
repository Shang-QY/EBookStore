import React from "react";
import {insertNewBook} from "../services/bookService";
import {Button, Col, Input, message, Modal, Row} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import {Uploader} from "./Uploader";
import {noImage} from "../assets/noImageBase64";


const { TextArea } = Input;

export class BookInsertForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            imageBase64:noImage,
            name:null,
            author:null,
            type:null,
            isbn:null,
            inventory:null,
            price:null,
            description:null
        };
    }

    changeValue = (e) => {
        switch (e.target.id) {
            case "1":this.setState({name:e.target.value});break;
            case "2":this.setState({author:e.target.value});break;
            case "3":this.setState({type:e.target.value});break;
            case "4":this.setState({isbn:e.target.value});break;
            case "5":this.setState({inventory:e.target.value});break;
            case "6":this.setState({price:e.target.value});break;
            case "7":this.setState({description:e.target.value});break;
            default:break;
        }
    };

    submit = () => {
        if(this.state.name === null || this.state.author === null || this.state.price === null ||
            this.state.type === null || this.state.isbn === null || this.state.inventory === null || this.state.description === null){
            message.error("文本内容不能为空！");
            return;
        }
        console.log(this.state);
        const callback = (data) => {
            this.props.insertComplete();
        };
        insertNewBook(this.state,callback);
    };

    uploadDone = (imageBase64) => {
        this.setState({imageBase64:imageBase64});
    };

    render() {
        return (
            <Modal
                title="添加书籍"
                centered
                visible={true}
                footer={null}
                onCancel={this.props.move}
            >
                <div className="modalImageSpace">
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minWidth:"102px",height:"102px",backgroundColor:"rgb(238,238,238)"}}>
                        <img alt="image" src={noImage} style={{width:"86px",height:"86px"}}/>
                    </div>
                    <div className="modalIcon">
                        <DoubleRightOutlined style={{fontSize: '25px'}}/>
                    </div>
                    <Uploader changeImageState={this.uploadDone}/>
                </div>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">书名：</text>
                    </Col>
                    <Col span={15}>
                        <Input onChange={this.changeValue} id={"1"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">作者：</text>
                    </Col>
                    <Col span={15}>
                        <Input onChange={this.changeValue} id={"2"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">分类：</text>
                    </Col>
                    <Col span={15}>
                        <Input onChange={this.changeValue} id={"3"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">ISBN：</text>
                    </Col>
                    <Col span={15}>
                        <Input onChange={this.changeValue} id={"4"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">库存：</text>
                    </Col>
                    <Col span={15}>
                        <Input onChange={this.changeValue} id={"5"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">价格：</text>
                    </Col>
                    <Col span={15}>
                        <Input onChange={this.changeValue} id={"6"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">简介：</text>
                    </Col>
                    <Col span={15}>
                        <TextArea
                            onChange={this.changeValue}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            id={"7"}
                        />
                    </Col>
                </Row>
                <Button type="primary" size="large" style={{marginLeft:"180px",marginTop:"20px"}} onClick={this.submit}>
                    确认添加
                </Button>
            </Modal>
        )
    }
}
