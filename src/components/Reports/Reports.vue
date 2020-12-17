<template>
    <div>
        <h3>数据报表</h3>
        <div id="main" style="width: 100%;height:400px;"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            option: {
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                        backgroundColor: '#E9EEF3'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value'
                }
            }
        }
    },
    methods: {
        echartsInit () {
            const echarts = require('echarts')
            // console.log('20201213--', myChart)
            // const option = {
            //     title: {
            //         text: 'ECharts 入门示例'
            //     },
            //     tooltip: {},
            //     legend: {
            //         data:['销量']
            //     },
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // }
            const myChart = echarts.init(document.getElementById('main'))
            myChart.setOption(this.option)
        },
        async getReports () {
            const { data: res} = await this.$http.get('http://127.0.0.1:8888/api/private/v1/reports/type/1')
            console.log('20201213 11:16', res)
            this.option = res.data
        }
    },
    mounted () {
        this.getReports()
        this.echartsInit()
    }
}
</script>

<style lang="less" scoped>

</style>