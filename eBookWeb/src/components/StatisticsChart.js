import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';
import {ChartTemplate} from "./ChartTemplate";


export class StatisticsChart1 extends React.Component {
    render() {
        console.log(this.props.data);
        let xData = [];
        let yData = [];
        for(let i = 0; i < this.props.data.length; ++i){
            xData.push(this.props.data[i].book.name);
            yData.push(this.props.data[i].sales);
        }
        return (
            <ChartTemplate xData={xData} yData={yData} title={'书籍销量排行榜'} yName={'销量'}/>
        );
    }
}

export class StatisticsChart2 extends React.Component{
    componentDidMount() {
        console.log(this.props.data);
        let xData = [];
        let yData1 = [];
        let yData2 = [];
        for(let i = 0; i < this.props.data.length; ++i){
            xData.push(this.props.data[i].user.username);
            yData1.push(this.props.data[i].costs);
            yData2.push(this.props.data[i].buys)
        }
        // 初始化
        var myChart = echarts.init(document.getElementById('chart2'));
        // 绘制图表
        myChart.setOption({
            title: { text: '优质客户排行榜' },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['消费金额','购书数量']
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {
                        show: true,
                        type: 'jpg'
                    }
                }
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 50
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 50
                }
            ],
            xAxis : [
                {
                    type : 'category',
                    data : xData,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '金额',
                    axisLabel: {
                        formatter: '{value} RMB'
                    }
                },
                {
                    type : 'value',
                    name: '数目',
                }
            ],
            series : [
                {
                    name:'消费金额',
                    type:'bar',
                    data: yData1,
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'购书数量',
                    type:'bar',
                    yAxisIndex: 1,
                    data: yData2,
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                },
            ]
        });
    }
    render() {
        return (
            <div id="chart2" style={{ width: '100%', height: 500, marginTop:"20px" }}/>
        );
    }
}
