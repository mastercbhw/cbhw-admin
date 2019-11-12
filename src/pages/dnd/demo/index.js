import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Tabs } from 'antd';
import Topic from './left/topic'
import CenterContent from './center/index'
import styles from './index.less'

const { TabPane } = Tabs;

function Demo() {
  const [tabKey, setTabKey] = useState('1')

  return (
    <div className={styles.configFormPage}>
      <div className={styles.configFormPageLeft}>
        <Tabs
          defaultActiveKey="1"
          style={{ textAlign: 'center' }}
          size="small"
          activeKey={tabKey}
          onChange={activeKey => { setTabKey(activeKey) }}
        >
          <TabPane tab="题型" key="1" />
          <TabPane tab="模板" key="2" />
        </Tabs>
        {tabKey === '1' ? <Topic /> : null}
        {tabKey === '2' ? <Topic /> : null}
      </div>
      <div className={styles.configFormContent}>
        <CenterContent />
      </div>
      <div className={styles.configFormPageRight}>右边</div>
    </div>
  )
}


export default function Demo1() {
  return (
    // <div>
    //   dasd
    // </div>
    <DndProvider backend={HTML5Backend}>
      <Demo />
    </DndProvider>
  )
}
