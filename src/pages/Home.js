import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { setRouteRecord } from '../store/action'
import { DeviceApi, AlarmApi } from '../api/index'
import G2 from '@antv/g2';
import { DataSet } from '@antv/data-set';
import { Carousel, Button, Ico, Radio} from 'antd';
const ButtonGroup = Button.Group;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceState: {},
            alarmList: [],
            curveAshData: [],//瞬间灰分
            curveAshDetectData: [],//检测灰分
            curveLaserData: [],//物料厚度
            chart_1:null,
            index:'0',
            chart_2:null,
            chart_3:null,
        }

    }
    componentDidMount() {
        this.initDevice()
        this.initAlarm()
        this.getCurve()
    }
    initDevice() {
        DeviceApi.deviceState().then(res => {
            this.setState({
                deviceState: res.result
            })
        })
    }
    initAlarm() {
        let data = {
            currentPage: 1,
            pageNum: 3
        }
        AlarmApi.search(data).then(res => {
            this.setState({
                alarmList: res.message.alarmInfoList
            })
        })
    }
    runTime(data) {
        let runTime = data;
        let hour = Math.floor(runTime / (60 * 60 * 1000))
        let min = Math.floor((runTime % 3600000) / 60 / 1000)
        return `${hour}小时${min}分钟`
    }
    handleEchartChange = (e)=>{
        this.setState({
            index: e.target.value
        })
        this.refs.Carousel.goTo(e.target.value)
        
    }
    async getCurve(){
        const curveLaserData = await DeviceApi.getLaserCurve().then(res => { return res.message})
        const curveAshData = await DeviceApi.getASHCurve(0).then(res => { return res.message})
        const curveAshDetectData = await DeviceApi.getASHCurve(4).then(res => { return res.message})
        this.setState({
            curveLaserData, curveAshData, curveAshDetectData
        });
        this.initChart(curveAshDetectData,'chart_2')
        this.initLaserChart(this.transformData(curveLaserData),'chart_1')
        this.initChart(curveAshDetectData,'chart_3')
    }
    transformData(data) {
        var ds = new DataSet();
        var dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: ['frontThickness', 'behindThickness'], // 展开字段集
            key: "type", // key字段
            value: "value" // value字段
        });
        return dv;
    }
    initLaserChart(data, container) {
        let self = this;
        let chartObj = this.state[container];
        if (chartObj) {
            chartObj.changeData(data)
            return
        }
        const chart = new G2.Chart({
            container: container,
            height: 410,
            forceFit: true,
            padding: [80, 30, 60, 80]
        })
        this.state[container] = chart
        chart.source(data, {
            time: {
                line: {
                    stroke: '#cccccc'
                },
                title: {
                    textStyle: {
                        fontSize: 12, // 文本大小
                        textAlign: 'center', // 文本对齐方式
                        fill: '#999', // 文本颜色
                    }
                },
            },
            value: {
                alias: '厚度(mm)',
                type: 'linear',
                nice: true,
                tickCount: 10,
                formatter: val => {
                    return val.toFixed(2)
                }
            }
        });
        chart.axis('value', {
            line: {
                stroke: '#cccccc'
            },
            title: {
                textStyle: {
                    fontSize: 12, // 文本大小
                    textAlign: 'center', // 文本对齐方式
                    fill: '#999', // 文本颜色
                }
            },

        })
        chart.legend({
            position: "top-left", // 设置图例的显示位置
            itemGap: 20, // 图例项之间的间距
            offsetY: -20,
            offsetX: 50,
            // marker: "circle",
            itemFormatter: val => {
                console.log(val)
                if (val == "behindThickness") {
                    return "规整厚度";
                } else if (val == "frontThickness") {
                    return "原始厚度";
                }
            }
        });

        chart.line().position('time*value').shape('smooth').color('type').tooltip('time*value*type', (time, value, type) => {
            value = type == 'behindThickness' ? '规整厚度：' + value : '原始厚度：' + value
            return {
                time, value
            }
        })
        chart.point().position('time*value').size(2).shape('circle').color('type');
        chart.render();

    }
    initChart(data, container) {
        let self = this;
        let chartObj = this.state[container];
        if (chartObj){
            chartObj.changeData(data)
            return
        }
        chartObj = new G2.Chart({
            container: container,
            height: 410,
            forceFit: true,
            padding: [80, 30, 60, 80]
        })
        this.setState({
            [container]: chartObj
        })
        chartObj.source(data, {
            timestamp: {
                // formatter: val => {
                //     return `${this.$utils.formatTime(val).H}:${this.$utils.formatTime(val).m}`;
                // },
                line: {
                    stroke: '#cccccc'
                },
                title: {
                    textStyle: {
                        fontSize: 12, // 文本大小
                        textAlign: 'center', // 文本对齐方式
                        fill: '#999', // 文本颜色
                    }
                },
            },
            t_ash_value: {
                alias: '灰分趋势(%)',
                type: 'linear',
                nice: true,
                min: 7,
                max: 11,
                tickInterval: 0.5,

            }
        });
        chartObj.axis('t_ash_value', {
            line: {
                stroke: '#cccccc'
            },
            title: {
                textStyle: {
                    fontSize: 12, // 文本大小
                    textAlign: 'center', // 文本对齐方式
                    fill: '#999', // 文本颜色
                }
            },
            grid: {
                type: 'line',
                lineStyle: {
                    stroke: '#999',
                    lineWidth: 1,
                    lineDash: [4, 4]
                }
            }
        })
        chartObj.line().position('timestamp*t_ash_value').shape('smooth')
        chartObj.point().position('timestamp*t_ash_value').size(2).shape('circle');
        chartObj.render();

    }
   
    render() {
        let { deviceState, alarmList, index} = this.state
        let browseList = Array.from(this.props.routes)//将Set类型转化成array
        return (
            <div className='home'>
                <div className="device_wrap">
                    <div className="part">
                        <h4>设备状态</h4>
                        <ul>
                            <li>
                                <p>上电</p>
                                <b className={deviceState.poweronStatus ? 'blue' : ''}></b>
                            </li>
                            <li>
                                <p>工作</p>
                                <b className={deviceState.workStatus ? 'red' : ''}></b>
                            </li>
                            <li>
                                <p>报警</p>
                                <b className={deviceState.alarmStatus ? 'yellow' : ''}></b>
                            </li>
                        </ul>
                        <p>启动时间：{deviceState.startUpTime ? deviceState.startUpTime:'--'}</p>
                        <p>运行时长：{deviceState.runTime?this.runTime(deviceState.runTime):'--'}</p>
                    </div>
                    <div className="part">
                        <h4>部件信息</h4>
                        <div>
                            {
                                deviceState.parts && deviceState.parts.length > 0 ? deviceState.parts.map((item, i) => {
                                    return <p key={i}>{item.part}：{item.property}--{item.value}</p>
                                }) : <p>暂无部件信息</p>
                            }
                        </div>
                    </div>
                    <div className="part">
                        <h4>报警信息</h4>
                        <div>
                            {
                                alarmList.length > 0 ? alarmList.map((item, i) => {
                                    return <div key={i}>
                                        <p>时间：{item.alarmBeginTime}</p>
                                        <p>{item.partDesc}：{item.alarmDesc}</p>
                                    </div>
                                }) : <p>暂无报警信息</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="chart_wrap">
                    <div className="panel_ctr">
                        <Radio.Group lassName="btn_c" value={index} onChange={this.handleEchartChange}>
                            <Radio.Button value='0'>物料厚度</Radio.Button>
                            <Radio.Button value='1'>瞬间灰分</Radio.Button>
                            <Radio.Button value='2'>累计灰分</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='chart_group'>
                        <Carousel dots={false} ref='Carousel' effect='fade'>
                            <div className='chart_box' id='chart_1'></div>
                            <div className='chart_box' id='chart_2'></div>
                            <div className='chart_box' id='chart_3'></div>
                        </Carousel>
                    </div>

                </div>
            </div>
        )

    }
}

Home.propTypes = {

};
const mapStateToProps = (state) => {
    return {
        routes: state.routesList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // set: (routes) => dispatch(setRouteRecord(routes))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);