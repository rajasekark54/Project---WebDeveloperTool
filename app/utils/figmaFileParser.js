
function parse(fileNodeData) {
    let page = {
    };

    let pageone = fileNodeData.document.children;//.slice(0, 3);
    pageone.map((item, key) => {
        console.log("page ==>", item.name);
        page[item.id] = {
            pageName: item.name,
            frame: pageFrame(item.children)
        };
    })
    return page
}

function pageFrame(pageFrameList) {
    let frameList = {};
    pageFrameList.map((item, key) => {
        if (item?.children?.length) {
            const frame_x = item.absoluteBoundingBox.x;
            const frame_y = item.absoluteBoundingBox.y;

            frameList[item.id] = {
                name: item.name,
                height: item.absoluteBoundingBox.height,
                width: item.absoluteBoundingBox.width,
                children: [],
            };
            constructFrameComponet(item.children, frame_x, frame_y, frameList[item.id]['children'])
        }
    })
    return frameList;
}

function constructFrameComponet(node, x, y, tree) {
    node.map((item, key) => {
        const childProp = item.absoluteBoundingBox;
        const child_x = Math.abs(x - childProp.x);
        const child_y = Math.abs(y - childProp.y);

        let style = {
            width: childProp.width,
            height: childProp.height,
            left: child_x,
            top: child_y,
        }
        if (item?.style) {
            style = Object.assign(style, item?.style);
        }

        let childData = {
            index: key,
            name: item.name,
            x: child_x,
            y: child_y,
            width: childProp.width,
            height: childProp.height,
            x1: child_x,
            y1: child_y,
            x2: child_x + childProp.width,
            y2: child_y,
            x3: child_x,
            y3: child_y + childProp.height,
            x4: child_x + childProp.width,
            y4: child_y + childProp.height,
            style: style
        }

        tree.push(childData);
        if (item.children) {
            constructFrameComponet(item.children, x, y, tree[tree.length - 1]['children'] = []);
        }
    })
}

export default parse;