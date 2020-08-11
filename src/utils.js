//get active menus
export const getActiveMenuItem = (items) => {
  let selectedKey;
  let openKey;
  const path = window.location.pathname;
  items.forEach(({menu, id: itemId, route: itemRoute}) => {
     if (menu) {
       menu.forEach(({id: menuId, route})=> {
         if (route === path) {
           selectedKey = menuId;
           openKey = itemId;
         }
       });
     } else {
       if (itemRoute === path)
       {
         selectedKey = itemId;
         openKey = itemId;
       }
     }
  })
  return [openKey, selectedKey];
}

/*const getVersionedDocs = (v, menus) => {
   //menus.filter(doc => 
  const stack = [...menus];
  while(stack.length > 0) {
    let temp = stack.shift();
    if (Array.isArray(temp.menu)){
       
    } else newlist.push(temp);
  }
}*/

//flattens ordered menu
const listOrderedMenu = (menus) => {
  console.log('menus links', menus);
  const newlist =[];
  const stack =[...menus];
  
  while(stack.length > 0){
    let temp = stack.shift();
    if(Array.isArray(temp.menu)){
      const sortedMenu = temp.menu.sort((a,b)=>a.index-b.index);
      stack.unshift(...sortedMenu);  
    } else newlist.push(temp)
  }
  console.log({ newlist });
  return newlist;
}

//functionality for prev and next button
export const getPreviousAndNextUrls = (menus) => {
  const items = listOrderedMenu(menus);
  let prevUrl;
  let nextUrl;
  const path = window.location.pathname;
  items.forEach(({route}, index)=> {
    if (route === path) {
      if (items[index-1]) {
        prevUrl = items[index - 1].route;
      }
      if (items[index + 1])
      {
        nextUrl = items[index + 1].route;
      }
    }
  })

  return [prevUrl, nextUrl];
}
