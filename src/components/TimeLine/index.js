import React from 'react';
import { Divider, Spin } from 'antd';
import classNames from 'classnames';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableTabBar from 'rc-tabs/lib/ScrollableTabBar';
import styles from './style.less';
import 'rc-tabs/assets/index.css';

const leftData = [
  {
    key: 0,
    name: '全部',
  },
  {
    key: 1,
    name: '门诊',
  },
  {
    key: 2,
    name: '住院',
  },
];

const rightData = [
  {
    key: 0,
    name: '全部',
  },
  {
    key: 1,
    name: '近7天',
  },
  {
    key: 2,
    name: '近30天',
  },
  {
    key: 3,
    name: '近半年',
  },
  {
    key: 4,
    name: '近1年',
  },
  {
    key: 5,
    name: '近5年',
  },
];

export default ({
  typeActiveKey = 0,
  timeActiveKey = 1,
  activeKey,
  defaultActiveKey,
  loading = false,
  data = [],
  typeOnClick = () => {}, // 全部，门诊，治疗  点击切换
  timeOnClick = () => {}, // 时间段  点击切换
  tabsOnChange = () => {}, // 诊断时间轴 点击切换
}) => {
  // 按时间的诊断信息轴，年份独立出来
  function tabPaneRender() {
    const renderContent = [];
    data.forEach(element => {
      // 年份
      renderContent.push(
        <TabPane
          key={element.year}
          style={{ color: '#ff0', padding: '8px 0px', margin: 0 }}
          className={styles['rc-tabs-tab-disabled']}
          disabled
          tab={
            <div className={styles.tabsItem} style={{ padding: 0 }}>
              <div className={styles.tabsItemContent}>
                <span />
                <span className={styles.disabledYear}>
                  <i style={{ color: '#666' }}>{element.year}</i>
                </span>
                <span></span>
              </div>
            </div>
          }
        />,
      );
      // 年份下具体时间
      if (element.children && Array.isArray(element.children)) {
        element.children.forEach(child => {
          renderContent.push(
            <TabPane
              key={child.id}
              tab={
                <div className={styles.tabsItem}>
                  <div className={styles.tabsItemContent}>
                    <span>{child.name}</span>
                    <span>
                      <i>
                        {child.enterTime}
                        {child.outTime ? `至${child.outTime}` : null}
                      </i>
                    </span>
                    <span>{child.department}</span>
                  </div>
                </div>
              }
            />,
          );
        });
      }
    });
    return renderContent;
  }

  return (
    <Spin spinning={loading} tip="加载中...">
      <div className={styles.timelineWarp}>
        <div className={styles.timelineHeader}>
          {leftData.map(item => (
            <span
              onClick={() => typeOnClick(item)}
              className={classNames(styles.typeItem, {
                [styles.active]: typeActiveKey === item.key,
              })}
              key={item.key}
            >
              {item.name}
            </span>
          ))}
          <Divider type="vertical" />
          {rightData.map(item => (
            <span
              onClick={() => timeOnClick(item)}
              className={classNames(styles.typeItem, {
                [styles.active]: timeActiveKey === item.key,
              })}
              key={item.key}
            >
              {item.name}
            </span>
          ))}
        </div>
        <div className={styles.timeLineBody}>
          <Tabs
            activeKey={activeKey}
            onChange={tabsOnChange}
            defaultActiveKey={defaultActiveKey}
            renderTabBar={() => (
              <ScrollableTabBar
                tabBarGutter={10}
                prevIcon={<div style={{ height: '100%', lineHeight: '90px' }}>&lt;</div>}
                nextIcon={<div style={{ height: '100%', lineHeight: '90px' }}>&gt;</div>}
              />
            )}
            renderTabContent={() => <TabContent />}
          >
            {tabPaneRender()}
          </Tabs>
        </div>
      </div>
    </Spin>
  );
};
