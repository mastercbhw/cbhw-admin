import React from 'react';
import EchartGl from 'echarts-gl';
import ReactEcharts from 'echarts-for-react'


import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default () => {
  const source = [
    { name: '慢性胰腺炎', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '胰腺良性囊肿', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '自身免疫性胰腺炎', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '食管早癌', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '胃早癌', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '肝移植', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '肝细胞癌', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '胆管癌', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '胆囊癌', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
    { name: '冠心病', 201901: 1, 201902: 2, 201903: 3, 201904: 4, 201905: 5 },
  ]

  // 获取所有的病种中文
  const disease = source.map(item => item.name)
  // 获取所有的时间
  let months = []
  if (source && Array.isArray(source) && source[0]) {
    months = Object.keys(source[0]).filter(item => item !== 'name').sort((a, b) => a - b)
  }

  const databak = []
  source.forEach((item, index) => {
    months.forEach((child, idx) => {
      databak.push({
        name: item.name,
        time: child,
        value: item[child],
        data: [index, idx, item[child]],
      })
    })
  })


  const option = {
    tooltip: {
      formatter(params) {
        try {
          const temp = params.data.name
          const timeArr = temp.time.split('')
          timeArr.splice(4, 0, '-')

          return `${temp.name}<br/> ${timeArr.join('')}的项目总数是${temp.value}`
        } catch (error) {
          return ''
        }
      },
    },
    padding: 90,
    visualMap: {
      max: 40,
      inRange: {
        color: ['#a4d3e8', '#ae9ceb', '#d194ee', '#efb2c7', '#ffcf9d', '#c8e0eb', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
      },
    },
    xAxis3D: {
      type: 'category',
      data: disease,
      name: '',
      splitLine: {
        lineStyle: {
          color: '#f3f3f3',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#d3d3d3',
        },
        interval: 0,
      },
      axisLabel: {
        textStyle: {
          color: '#6c6c6c',
        },
        interval: 0,
      },
    },
    yAxis3D: {
      type: 'category',
      data: months,
      name: '',
      splitLine: {
        lineStyle: {
          color: '#f3f3f3',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#d3d3d3',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#6c6c6c',
        },
      },
    },
    zAxis3D: {
      type: 'value',
      name: '',
      splitLine: {
        lineStyle: {
          color: '#f3f3f3',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#d3d3d3',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#6c6c6c',
        },
      },
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 80,
      viewControl: {
        distance: 200,
      },
      groundPlane: {
        show: true,
      },
      light: {
        main: {
          intensity: 1.2,
        },
        ambient: {
          intensity: 0.3,
        },
      },
    },
    series: [{
      type: 'bar3D',
      data: databak.map(item => ({
        value: [item.data[0], item.data[1], item.data[2]],
        name: item,
      })),
      shading: 'color',

      label: {
        show: false,
        textStyle: {
          fontSize: 14,
          borderWidth: 1,
        },
      },

      itemStyle: {
        opacity: 0.6,
      },

      emphasis: {
        label: {
          textStyle: {
            fontSize: 20,
            color: '#900',
          },
        },
        itemStyle: {
          color: '#900',
        },
      },
    }],
  }

  return (
    <PageHeaderWrapper>
      <ReactEcharts
        option={option}
        style={{ height: 'calc(100vh - 300px)' }}
      />
    </PageHeaderWrapper>
  )
};
