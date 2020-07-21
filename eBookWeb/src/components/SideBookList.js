import React from 'react';
import {Card, List} from 'antd'
import {Book} from './Book'
import {getBooks} from "../services/bookService";
import {Link} from "react-router-dom";


export class SideBookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({books: data});
        };

        getBooks({"search": null}, callback);
    }

    render() {
        return (
            <div style={{marginTop:"10px"}}>
                <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={this.state.books}

                    renderItem={(item,index) => (
                        <List.Item>
                            <Link to={{
                                pathname: '/bookDetails',
                                search: '?id=' + item.bookId
                            }}
                                  target="_blank"
                            >
                                <div className="bookListEntry">
                                    <div className="entryName">{item.name} </div>
                                    <div className="entryAuthor">{item.author}</div>
                                </div>
                            </Link>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
