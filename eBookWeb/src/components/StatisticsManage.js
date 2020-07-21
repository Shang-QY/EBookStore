import React from 'react';
import {Button, DatePicker, message, Card} from 'antd';
import {getSaleOfBook, getSaleOfUser} from "../services/StatisticService";
import {StatisticsChart1, StatisticsChart2} from "./StatisticsChart";
import moment from "moment";

const { RangePicker } = DatePicker;

export class StatisticsManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookStatistic: [],
            chart1: false,
            userStatistic: [],
            chart2: false,
            startDate1: moment().startOf('month').toDate().getTime(),
            endDate1: moment().endOf('month').toDate().getTime(),
            startDate2: moment().startOf('month').toDate().getTime(),
            endDate2: moment().endOf('month').toDate().getTime(),
        };
    }

    componentDidMount() {
        const callback = (data) => {
            console.log(data);
            this.setState({bookStatistic: this.orderBooksBySales(data)}, () => {this.setState({chart1:true})});
        };
        const callback2 = (data) => {
            console.log(data);
            this.setState({userStatistic: this.orderUsersByCosts(data)}, () => {this.setState({chart2:true})});
        };
        getSaleOfBook(this.state.startDate1, this.state.endDate1, callback);
        getSaleOfUser(this.state.startDate2, this.state.endDate2, callback2)
    }

    //For chart1 which order book by sales
    dateChange1 = (dates, dateStrings) => {
        if(dateStrings[0] === "" && dateStrings[1] === "") this.setState({startDate1:null,endDate1:null});
        else this.setState({startDate1:dates[0].toDate().getTime(), endDate1:dates[1].toDate().getTime()});
    };

    queryTimeSat1 = () => {
        console.log("click!");
        const callback = (data) => {
            this.setState({bookStatistic: this.orderBooksBySales(data)}, () => {this.setState({chart1:true})});
        };
        if(this.state.startDate1 !== null && this.state.endDate1 !== null){
            this.setState({chart1:false}, () => {
                getSaleOfBook(this.state.startDate1, this.state.endDate1, callback);
            });
        }
        else message.error("请选择统计时段");
    };

    compareBookStatistics = (x, y) => {
        if (x.sales < y.sales) {
            return 1;
        } else if (x.sales > y.sales) {
            return -1;
        } else {
            return 0;
        }
    };

    orderBooksBySales = (data) => {
        return data.sort(this.compareBookStatistics);
    };

    renderChart1 = () => {
        if(this.state.chart1 === true) return (
            <StatisticsChart1 data={this.state.bookStatistic}/>
        )
    };

    //For chart2 which order user by cost
    dateChange2 = (dates, dateStrings) => {
        if(dateStrings[0] === "" && dateStrings[1] === "") this.setState({startDate2:null,endDate2:null});
        else this.setState({startDate2:dates[0].toDate().getTime(), endDate2:dates[1].toDate().getTime()});
    };

    queryTimeSat2 = () => {
        console.log("click!");
        const callback = (data) => {
            this.setState({userStatistic: this.orderUsersByCosts(data)}, () => {this.setState({chart2:true})});
        };
        if(this.state.startDate1 !== null && this.state.endDate1 !== null){
            this.setState({chart2:false}, () => {
                getSaleOfUser(this.state.startDate2, this.state.endDate2, callback);
            });
        }
        else message.error("请选择统计时段");
    };

    compareUserStatistics = (x, y) => {
        if (x.costs < y.costs) {
            return 1;
        } else if (x.costs > y.costs) {
            return -1;
        } else {
            return 0;
        }
    };

    orderUsersByCosts = (data) => {
        return data.sort(this.compareUserStatistics);
    };

    renderChart2 = () => {
        if(this.state.chart2 === true) return (
            <StatisticsChart2 data={this.state.userStatistic}/>
        )
    };

    render() {
        return (
            <div style={{marginLeft:"20px",minWidth:"998px"}}>
                <Card>
                    <RangePicker onChange={this.dateChange1} defaultValue={[moment().startOf('month'), moment().endOf('month')]}/>
                    <Button type="primary" onClick={this.queryTimeSat1}>
                        筛选
                    </Button>
                    {this.renderChart1()}
                </Card>
                <Card style={{marginTop:"20px"}}>
                    <RangePicker onChange={this.dateChange2} defaultValue={[moment().startOf('month'), moment().endOf('month')]}/>
                    <Button type="primary" onClick={this.queryTimeSat2}>
                        筛选
                    </Button>
                    {this.renderChart2()}
                </Card>
            </div>
        )
    }
}
