import React from 'react';
import {Card} from 'antd';

import {Link} from 'react-router-dom'

const {Meta} = Card;

export class Book extends React.Component {


    render() {

        const {info} = this.props;

        let imgUrl = null;
        if(info.image != null){
            imgUrl = info.image.imageBase64;
        }
        else imgUrl = require("../assets/noImage.png");
        return (
            <Link to={{
                pathname: '/bookDetails',
                search: '?id=' + info.bookId
            }}
                // target="_blank"
            >
                <Card
                    hoverable
                    style={{width: 181}}
                    cover={<img alt="image" src={imgUrl} className={"bookImg"}/>}
                    //onClick={this.showBookDetails.bind(this, info.bookId)}
                >
                    <Meta title={info.name} description={'¥' + info.price}/>
                </Card>
            </Link>
        );
    }
}

