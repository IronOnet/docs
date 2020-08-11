// src/Menu.js
import React from 'react'
import { useMenus, Link } from 'docz'
import { Menu } from 'antd';
import { getActiveMenuItem } from '../utils';
const { SubMenu } = Menu;

export default () => {
  const menus = useMenus();
  const [ openKey, selectedKey ] = getActiveMenuItem(menus);
  console.log(menus)
  console.log('useMenus', menus);
  return (
    <Menu
      mode="inline"
      defaultOpenKeys={[openKey]}
      defaultSelectedKeys={[selectedKey]}
    >
      {menus.map(menuItem => { 
        console.log('menuItem', menuItem.menu);
        if (menuItem.menu?.length > 0)
        {
          return (
            <SubMenu key={menuItem.id} title={menuItem.name}>
              {menuItem.menu
                .sort((a,b)=>a.index-b.index)
                .map(submenuItem => (
                <Menu.Item key={submenuItem.id}>
                  <Link to={submenuItem.route}>{submenuItem.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }
          return (
            <Menu.Item key={menuItem.id}>
              <Link to={menuItem.route}>{menuItem.name}</Link>
            </Menu.Item>
          );
      })}
    </Menu>
  )
}
