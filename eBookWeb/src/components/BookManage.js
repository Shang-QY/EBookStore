import React from 'react';
import {
    Button,
    Col,
    Descriptions,
    List,
    Row,
    Switch,
    Modal,
    Card,
    Input,
    Form,
    Icon,
    Checkbox,
    AutoComplete,
    message
} from 'antd';
import { DoubleRightOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {getBooks} from "../services/bookService";
import {Uploader} from "./Uploader";
import {BookInsertForm} from "./BookInsertForm";
import {changeOnesInfo, deleteOneBook} from "../services/bookService";

const { TextArea } = Input;

export class BookManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showBooks: [],
            searchRequire: "",
            chooseBook: null,
            modalVisible: false,
            insertModalVisible: false
        };
    }

    componentDidMount() {

        const callback = (data) => {
            console.log(data);
            this.setState({books: data, showBooks:data, chooseBook: data[0]});
        };
        getBooks({},callback)
    }

    //查找
    onSearch = (value) => {
        let books = [];
        for(let i = 0; i < this.state.books.length; ++i){
            if(this.state.books[i].name.includes(value)) books.push(this.state.books[i]);
        }
        this.setState({showBooks:books, searchRequire:value});
    };

    maintainSearch = () => {
        let books = [];
        let value = this.state.searchRequire;
        for(let i = 0; i < this.state.books.length; ++i){
            if(this.state.books[i].name.includes(value)) books.push(this.state.books[i]);
        }
        this.setState({showBooks:books});
    };

    //添加
    insertNewBook = () => {
        const callback = (data) => {
            console.log(data);
            this.setState({books: data, chooseBook: data[0]},() => {this.maintainSearch(); this.setState({insertModalVisible:false})});
        };
        getBooks({},callback)
    };

    renderInsertModal = () => {
        if(this.state.insertModalVisible === true) return (<BookInsertForm move={this.moveOutInsertModal} insertComplete={this.insertNewBook}/>);
        else return null;
    };

    moveOutInsertModal = () => {
        this.setState({insertModalVisible:false})
    };


    //删除
    deleteOneBook = (bookId) => {
        const callback2 = (data) => {
            message.success("删除成功");
            this.setState({books: data, chooseBook: data[0]}, () => {this.maintainSearch()});
        };
        const callback = () => {
            getBooks({},callback2)
        };
        deleteOneBook(bookId,callback);
    };


    //修改
    //这里将setState添加回调函数，使两次操作异步变同步
    chooseOneBook = (book, index) => {
        this.setState({chooseBook: book},() => {this.setState({modalVisible:true});});
    };

    //这里在状态更改时新声明一个Modal，确保数据更新
    renderModal = () => {
        if(this.state.modalVisible === true) return (<BookForm book={this.state.chooseBook} move={this.moveOutModal} submitComplete={this.modalSubmitAndReturn}/>);
        else return null;
    };

    moveOutModal = () => {
        this.setState({modalVisible:false})
    };

    modalSubmitAndReturn = (data) => {
        const callback = (data) => {
            this.setState({books: data}, () => {
                message.success("修改成功");
                this.maintainSearch();
                this.setState({modalVisible:false})
            });
        };
        getBooks({},callback)

    };


    render() {
        if (this.state.books.length === 0) {
            return (
                <div>
                    <h1>没有书籍在售哦，快点添加吧～</h1>
                </div>
            )
        } else return (
            <div style={{marginLeft:"20px"}}>
                <div className="bookManageTopBar">
                    <Button type="primary" shape="circle" onClick={() => {this.setState({insertModalVisible:true})}}>
                        <PlusOutlined />
                    </Button>
                    <Input.Search size="large" style={{width:"300px"}} placeholder="input here" onSearch={this.onSearch}/>
                </div>

                <List
                    itemLayout="vertical"
                    size="small"
                    split={false}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 12,
                    }}
                    dataSource={this.state.showBooks}

                    renderItem={(item,index) => (
                        <List.Item>
                            <BookItem book={item} idx={index} edit={this.chooseOneBook} delete={this.deleteOneBook}/>
                        </List.Item>
                    )}
                />
                {this.renderModal()}
                {this.renderInsertModal()}
            </div>
        )
    }
}

class BookItem extends React.Component{

    render() {
        let {book} = this.props;

        let imgUrl = null;
        if(book.image != null){
            imgUrl = book.image.imageBase64;
        }
        else imgUrl = require("../assets/noImage.png");
        return (
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
                    <Col span={3} offset={6}>
                        <Button type="primary" onClick={() => this.props.edit(book, this.props.idx)}>
                            <EditOutlined />
                            编辑
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => {this.props.delete(book.bookId)}}>
                            <DeleteOutlined />
                            删除
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}

class BookForm extends React.Component{

    constructor(props) {
        super(props);
        const book = this.props.book;
        this.state = {
            bookId:book.bookId,
            imageBase64:null,
            name:book.name,
            author:book.author,
            isbn:book.isbn,
            inventory:book.inventory,
            price:book.price,
            description:book.description
        };
    }

    changeValue = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        switch (e.target.id) {
            case "1":this.setState({name:e.target.value});break;
            case "2":this.setState({author:e.target.value});break;
            case "3":this.setState({isbn:e.target.value});break;
            case "4":this.setState({inventory:e.target.value});break;
            case "5":this.setState({price:e.target.value});break;
            case "6":this.setState({description:e.target.value});break;
            default:break;
        }
    };

    submit = () => {
        console.log(this.state);
        const callback = (data) => {
            this.props.submitComplete(data);
        };
        changeOnesInfo(this.state,callback);
    };

    uploadDone = (imageBase64) => {
        this.setState({imageBase64:imageBase64});
    };

    render() {
        const book = this.props.book;
        let imgUrl = null;
        if(book.image != null){
            imgUrl = book.image.imageBase64;
        }
        else imgUrl = require("../assets/noImage.png");
        return (
            <Modal
                title="书籍信息修改"
                centered
                visible={true}
                footer={null}
                onCancel={this.props.move}
            >
                <div className="modalImageSpace">
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minWidth:"102px",height:"102px",backgroundColor:"rgb(238,238,238)"}}>
                        <img alt="image" src={imgUrl} style={{width:"86px",height:"86px"}}/>
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
                        <Input defaultValue={book.name} onChange={this.changeValue} id={"1"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">作者：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.author} onChange={this.changeValue} id={"2"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">ISBN：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.isbn} onChange={this.changeValue} id={"3"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">库存：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.inventory} onChange={this.changeValue} id={"4"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">价格：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.price} onChange={this.changeValue} id={"5"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">简介：</text>
                    </Col>
                    <Col span={15}>
                        <TextArea
                            defaultValue={book.description}
                            onChange={this.changeValue}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            id={"6"}
                        />
                    </Col>
                </Row>
                <Button type="primary" size="large" style={{marginLeft:"180px",marginTop:"20px"}} onClick={this.submit}>
                    确认修改
                </Button>
            </Modal>
        )
    }
}
