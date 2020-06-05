import React from 'react'
import { Menu } from 'antd'

const menuItemStyle = {
  height: 24,
  lineHeight: 1,
  padding: 5,
  margin: 0,
  textAlign: 'center',
}

const NodeContextMenu = ({ x = 0, y = 0, onChange }) => (
  <Menu style={{ width: 50, position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 1)', left: x, top: y }} mode="vertical">
    <Menu.Item style={menuItemStyle} key="AND" onClick={() => { onChange('AND', '并且') }}>并且</Menu.Item>
    <Menu.Item style={menuItemStyle} key="OR" onClick={() => { onChange('OR', '或者') }}>或者</Menu.Item>
  </Menu>
)

export default NodeContextMenu
