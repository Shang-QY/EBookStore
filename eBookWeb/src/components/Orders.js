import React from 'react';
import {Button, List, DatePicker} from 'antd';
import {getOrders} from "../services/OrderService";
import {Order} from "./Order";

const {RangePicker} = DatePicker;

export class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            showOrders: [],
            startDate: null,
            endDate: null
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({orders: data, showOrders:data});
        };

        const user = JSON.parse(sessionStorage.getItem("user"));

        getOrders(user.userId, callback);

    }

    dateChange = (dates, dateStrings) => {
        if(dateStrings[0] === "" && dateStrings[1] === "") this.setState({showOrders:this.state.orders});
        this.setState({startDate:dateStrings[0], endDate:dateStrings[1]});
    };

    queryTimeSat = () => {
        let order, orderYear, orderMonth, orderDay;
        let startYear = parseInt(this.state.startDate.substr(0,4),10);
        let startMonth = parseInt(this.state.startDate.substr(5,2),10);
        let startDay = parseInt(this.state.startDate.substr(8,2),10);
        let endYear = parseInt(this.state.endDate.substr(0,4),10);
        let endMonth = parseInt(this.state.endDate.substr(5,2),10);
        let endDay = parseInt(this.state.endDate.substr(8,2),10);
        let orders = [];
        for(let i = 0; i < this.state.orders.length; ++i){
            order = this.state.orders[i];
            orderYear = parseInt(order.date.substr(0,4),10);
            orderMonth = parseInt(order.date.substr(5,2),10);
            orderDay = parseInt(order.date.substr(8,2),10);
            if(orderYear >= startYear && orderYear <= endYear && orderMonth >= startMonth && orderMonth <= endMonth && orderDay >= startDay && orderDay <= endDay)
                orders.push(order);
        }
        this.setState({showOrders:orders});
    };

    render() {
        if (this.state.orders.length === 0) {
            return (
                <div>
                    <h1>订单记录空空如也哦～快去书城逛逛吧！</h1>
                </div>
            )
        } else return (
            <div style={{marginTop:"20px"}}>
                <RangePicker onChange={this.dateChange}/>
                <Button type="primary" onClick={this.queryTimeSat}>
                    筛选
                </Button>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    dataSource={this.state.showOrders}

                    renderItem={item => (
                        <List.Item>
                            <Order info={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
