import React, { PureComponent } from 'react';
import TimeLine from '@/components/TimeLine';

class Timebar extends PureComponent {
  state = {
    typeActiveKey: 0,
    timeActiveKey: 0,
    activeKey: '1', // 诊断时间轴的activeKey
  };

  tabsOnChange = activeKey => {
    this.setState({ activeKey });
    console.log('TCL: Timebar -> tabsOnChange -> activeKey', activeKey);
  };

  // 全部，门诊，治疗  点击切换
  typeOnClick = item => {
    this.setState({ typeActiveKey: item.key });
    console.log('TCL: Timebar -> typeOnClick -> item', item);
  };

  // 时间段  点击切换
  timeOnClick = item => {
    this.setState({ timeActiveKey: item.key });
    console.log('TCL: Timebar -> timeOnClick -> item', item);
  };

  render() {
    const timeData = [
      {
        year: '2018',
        children: [
          {
            id: '1',
            name: '外伤',
            year: '2018',
            enterTime: '06-02',
            outTime: null,
            department: '综合科',
            type: '门诊',
          },
          {
            id: '2',
            name: '外伤',
            year: '2018',
            enterTime: '06-02',
            outTime: null,
            department: '综合科',
            type: '门诊',
          },
          {
            id: '3',
            name: '发热',
            year: '2018',
            enterTime: '06-02',
            outTime: null,
            department: '综合科',
            type: '门诊',
          },
          {
            id: '4',
            name: '胃炎',
            year: '2018',
            enterTime: '06-02',
            outTime: '06-10',
            department: '消化内科',
            type: '住院',
          },
          {
            id: '5',
            name: '胃窦早癌',
            year: '2018',
            enterTime: '07-02',
            outTime: '08-08',
            department: '消化内科',
            type: '住院',
          },
        ],
      },
      {
        year: '2019',
        children: [
          {
            id: '6',
            name: '胃窦早癌',
            year: '2019',
            enterTime: '07-02',
            outTime: '08-08',
            department: '消化内科',
            type: '住院',
          },
        ],
      },
    ];
    const { typeActiveKey, timeActiveKey, activeKey } = this.state;
    return (
      <div>
        <TimeLine
          typeActiveKey={typeActiveKey}
          timeActiveKey={timeActiveKey}
          activeKey={activeKey}
          defaultActiveKey="4"
          data={timeData}
          tabsOnChange={this.tabsOnChange}
          typeOnClick={this.typeOnClick} // 全部，门诊，治疗  点击切换
          timeOnClick={this.timeOnClick} // 时间段  点击切换
        />
      </div>
    );
  }
}

export default Timebar;
