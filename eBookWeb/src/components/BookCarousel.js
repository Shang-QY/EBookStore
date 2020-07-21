import React from 'react';
import {Carousel} from 'antd';

export class BookCarousel extends React.Component {

    createContent = (ctx) => {
        const images = ctx.keys().map(ctx);
        console.log(images);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
            result.push(<div><img alt={i} src={img}/></div>);
        }
        return result;
    };


    render() {
        const requireContext = require.context("../assets/carousel", true, /^\.\/.*\.jpg$/);


        return (
            <Carousel autoplay style={{marginTop:20}}>
                {this.createContent(requireContext)}
            </Carousel>
        )
    }
}


