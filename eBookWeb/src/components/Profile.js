import React from 'react';
import {Descriptions, Card, Button, DatePicker, message} from 'antd';
import moment from "moment";
import {getBuyOfBook, getSaleOfBook} from "../services/StatisticService";
import {ChartTemplate} from "./ChartTemplate";

const { RangePicker } = DatePicker;

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookStatistic: [],
            statistic: false,
            startDate1: moment().startOf('month').toDate().getTime(),
            endDate1: moment().endOf('month').toDate().getTime(),
        };
    }

    componentDidMount() {
        const callback = (data) => {
            console.log(data);
            this.setState({bookStatistic: data});
        };
        const user = JSON.parse(sessionStorage.getItem("user"));
        getBuyOfBook(this.state.startDate1, this.state.endDate1, user.userId, callback);
    }

    openStatistic = () => {
        let state = this.state.statistic;
        this.setState({statistic:!state});
    };

    dateChange1 = (dates, dateStrings) => {
        if(dateStrings[0] === "" && dateStrings[1] === "") this.setState({startDate1:null,endDate1:null});
        else this.setState({startDate1:dates[0].toDate().getTime(), endDate1:dates[1].toDate().getTime()});
    };

    queryTimeSat1 = () => {
        const callback = (data) => {
            this.setState({bookStatistic: data}, () => {this.setState({statistic:true})});
        };
        if(this.state.startDate1 !== null && this.state.endDate1 !== null){
            this.setState({statistic:false}, () => {
                getSaleOfBook(this.state.startDate1, this.state.endDate1, callback);
            });
        }
        else message.error("请选择统计时段");
    };

    renderOnesStatistic = () => {
        if(this.state.statistic === true){
            let xData = [];
            let yData = [];
            for(let i = 0; i < this.state.bookStatistic.length; ++i){
                xData.push(this.state.bookStatistic[i].book.name);
                yData.push(this.state.bookStatistic[i].sales);
            }
            return (
                <Card style={{marginTop:"20px"}}>
                    <RangePicker onChange={this.dateChange1} defaultValue={[moment(this.state.startDate1), moment(this.state.endDate1)]}/>
                    <Button type="primary" onClick={this.queryTimeSat1}>
                        查询
                    </Button>
                    <ChartTemplate xData={xData} yData={yData} title={'书籍购买情况统计'} yName={'购买数量'}/>
                </Card>
            );
        }
    };

    render() {
        const user = JSON.parse(sessionStorage.getItem("user"));

        return (
            <div>
                <Card style={{marginTop: 40}}>
                    <Descriptions title="User Info" bordered>
                        <Descriptions.Item label="Username" span={3}>{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Tel">{user.tel}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={3}>
                            {user.address}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Button onClick={this.openStatistic} style={{marginTop:"20px"}}>
                    书籍购买情况统计
                </Button>
                {this.renderOnesStatistic()}
            </div>
        )
    }
}
