console.log("tagScript");
// let imageProp = {};
// chrome.runtime.onMessage.addListener(function (message) {
//     if (message.type === 'tabScript') {
//         imageProp = message.parameter;
//         // appendHtmlProp();
//     }
// });

// const appendHtmlProp = () => {
//     const { image } = imageProp;

//     let bv = document.getElementById('i2i-web-tool');
//     bv.setAttribute(
//         'style',
//         'position: absolute'
//     );

//     bv.innerHTML = `
//         <div class="background-img">
//           <img id="webtool-image" src=${image} alt="layout" />
//         </div>

//         <div class="showProp" style="text-decoration: none;position: relative;">
//           <span style="display: none; position: fixed;overflow: hidden;">
//           </span>
//           <div style="display: none; position: fixed;overflow: hidden;border: 3px dashed green;"></div>
//         </div>`;
//     // document.body.insertBefore(bv, document.body.childNodes[0]);
//     mouseOver()
// }

// const mouseOver = () => {
//     const { frameProperty } = imageProp;
//     const actualHeight = frameProperty.height;
//     const actualWidth = frameProperty.width;
//     const actualHeight_px_per = actualHeight / 100;
//     const actualWidth_px_per = actualWidth / 100;

//     let showProps = document.querySelectorAll('.showProp span');
//     let showHoverItem = document.querySelectorAll('.showProp div');
//     const customWidth = document.getElementById('webtool-image').width;
//     const customHeight = document.getElementById('webtool-image').height;

//     let isDefaultSize = true;
//     let per_width = 100;
//     let per_height = 100;

//     if (customHeight !== actualHeight || customWidth !== actualWidth) {
//         isDefaultSize = false;
//         per_height = (actualHeight < customHeight) ? addGainPercent(actualHeight, customHeight) : addLosePercent(actualHeight, customHeight)
//         per_width = (actualWidth < customWidth) ? addGainPercent(actualWidth, customWidth) : addLosePercent(actualWidth, customWidth);
//     }

//     window.onscroll = function (e) {
//         showProps[0].style.display = 'none';
//         showHoverItem[0].style.display = 'none';
//     }
//     window.onmousemove = function (e) {
//         let x = (e.pageX),
//             y = (e.pageY);
//         let clientx = (e.clientX),
//             clienty = (e.clientY)

//         for (var i = 0; i < showProps.length; i++) {
//             showProps[i].style.top = clienty + 20 + 'px';
//             showProps[i].style.left = clientx + 20 + 'px';
//             showProps[i].style.display = 'block';

//             if (!isDefaultSize) {
//                 x = actualWidth_px_per * (x / customWidth) * 100;
//                 y = actualHeight_px_per * (y / customHeight) * 100;
//             }

//             let resItem = findArea(x, y);
//             let name = '';
//             if (Object.keys(resItem).length) {
//                 // console.log(true, per_width, per_height, resItem.y, per_height * (resItem.y / 100));

//                 name = resItem.name
//                 showHoverItem[i].style.display = 'block';
//                 showHoverItem[i].style.top = (clienty - e.pageY) + per_height * (resItem.y / 100) + 'px';
//                 showHoverItem[i].style.left = (clientx - e.pageX) + per_width * (resItem.x / 100) + 4 + 'px';

//                 showHoverItem[i].style.width = per_width * (resItem.width / 100) + 'px';
//                 showHoverItem[i].style.height = per_height * (resItem.height / 100) + 'px';

//             } else {
//                 showProps[i].style.display = 'none';
//                 showHoverItem[i].style.display = 'none';
//             }

//             showProps[i].textContent = `${Math.round(e.clientX)}, ${Math.round(e.clientY)}, ${name}`
//         }
//     };

// }

// const addGainPercent = (actualSize, modifiedSize) => {
//     console.log('addGainPercent', actualSize, modifiedSize);
//     const gain = ((modifiedSize - actualSize) * 100) / actualSize;
//     return 100 + gain;
// }

// const addLosePercent = (actualSize, modifiedSize) => {
//     console.log('addLosePercent', actualSize, modifiedSize);
//     const gain = ((modifiedSize - actualSize) * 100) / actualSize;
//     return 100 - gain;
// }

// const arrangeStyleProp = (prop) => {
//     prop.top = per_height * (resItem.y / 100);
//     prop.left = per_width * (resItem.x / 100);
//     prop.width = per_width * (resItem.width / 100);
//     prop.height = per_height * (resItem.height / 100);
//     return prop
// }

// const findArea = (x, y) => {
//     const { frameProperty } = imageProp;
//     let trueNode = [];
//     // nodeTree.children = nodeTree.children;//.slice(0, 1)
//     const nodeList = findFallInItems(x, y, frameProperty.children, trueNode);
//     if (nodeList.length) {
//         if (nodeList.length > 1) {
//             return nodeList[nodeList.length - 1];
//         } else {
//             return nodeList[0];
//         }
//     } else {
//         return {}
//     }
// };

// const findFallInItems = (x, y, node, trueNode) => {
//     let itt = 0
//     for (let index = 0; index < node.length; index++) {
//         const item = node[index];
//         // console.log("item", item);
//         const result = check(x, y, item.x2, item.y2, item.x4, item.y4, item.x3, item.y3, item.x1, item.y1)
//         // console.log('item name - ', item.name, result);
//         if (result && !item.children) {
//             // return item
//             trueNode.push(item);
//         } else if (result && item.children) {
//             return findFallInItems(x, y, item.children, trueNode)
//         };
//         itt++
//     }
//     return trueNode;
// };

// const area = (x1, y1, x2, y2, x3, y3) => {
//     return Math.abs((x1 * (y2 - y3) +
//         x2 * (y3 - y1) +
//         x3 * (y1 - y2)) / 2.0);
// };

// const check = (x, y, x1, y1, x2, y2, x3, y3, x4, y4) => {
//     // console.log(`-----(${x}, ${y}), (${x1}, ${y1}),(${x2}, ${y2}), (${x3}, ${y3}), (${x4}, ${y4})`);
//     // Calculate area of rectangle ABCD  
//     const A = area(x1, y1, x2, y2, x3, y3) +
//         area(x1, y1, x4, y4, x3, y3);

//     // Calculate area of triangle PAB  
//     const A1 = area(x, y, x1, y1, x2, y2);

//     // Calculate area of triangle PBC  
//     const A2 = area(x, y, x2, y2, x3, y3);

//     // Calculate area of triangle PCD 
//     const A3 = area(x, y, x3, y3, x4, y4);

//     // Calculate area of triangle PAD  
//     const A4 = area(x, y, x1, y1, x4, y4);

//     // Check if sum of A1, A2,  
//     // A3 and A4  is same as A
//     const result = (Math.round(A) == Math.round(A1 + A2 + A3 + A4))
//     console.log(`${A} = ${A1 + A2 + A3 + A4} `, result);
//     return result;
// }