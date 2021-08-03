const cloneDeep = require('lodash/cloneDeep')
export function genOption(data,option) {
    option = cloneDeep(option)
    let legendData = []
    let xAxisData = []
    let series = []

    data.forEach((d,i) => {
        let {x,y,s} = d
        if(xAxisData.indexOf(x) < 0)
            xAxisData.push(x)
        if(legendData.indexOf(s) >= 0){
            series.find(ser => ser.name == s).data.push({value: y,_index: i})
        }else{
            legendData.push(s)
            series.push({name: s,type: 'bar', data: [{value: y,_index: i}]})
        }
    })

    option.legend.data = legendData
    option.xAxis[0].data = xAxisData
    option.series = series

    if(option.series.length < 2){
        option.yAxis.splice(1,1)
    }else{
        option.series[option.series.length - 1].type = 'bar'
        option.series[option.series.length - 1].yAxisIndex = 1
    }

    return option
}