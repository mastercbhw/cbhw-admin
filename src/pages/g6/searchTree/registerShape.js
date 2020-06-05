import G6 from '@antv/g6'
import { SOURCE_BUTTON, RELATION_BUTTON, RELATION_BUTTON_ONLY, CONDITION_BUTTON_ONLY, CONDITION_BUTTON, REMOVE_BUTTON, SELECT_BUTTON, SEARCH_NODE } from './contant'
// import './registerShape.css'
import 'antd/dist/antd.css'

// 注册"纳入” 节点
G6.registerNode('sourceButton', {
  shapeType: 'sourceButton',

  draw: function draw(cfg, group) {
    const { name = '' } = cfg;
    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 50,
        height: 24,
        fill: '#178aea',
        stroke: '#178aea',
        radius: 2,
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: SOURCE_BUTTON,
      },
    })

    const textConfig = {
      textAlign: 'center',
      textBaseline: 'middle',
    };

    // label title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 25,
        y: 12,
        text: name.length > 10 ? `${name.substr(0, 10)}...` : name,
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: SOURCE_BUTTON,
      },
    });

    return rect
  },
}, 'rect');

// 注册“关系” 节点
G6.registerNode('relationButtonOnly', {
  shapeType: 'relationButtonOnly',
  draw(cfg, group) {
    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 48,
        height: 24,
        radius: 2,
        lineWidth: 0.6,
        fillOpacity: 1,
      },
    })
    const textConfig = {
      textAlign: 'left',
      textBaseline: 'top',
    };

    // 关系按钮warp
    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 48,
        height: 24,
        fill: '#178aea',
        stroke: '#fff',
        radius: 2,
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: RELATION_BUTTON_ONLY,
      },
    });

    // 关系按钮title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 5,
        y: 4,
        text: '+ 关系',
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: RELATION_BUTTON_ONLY,
      },
    });

    return rect
  },
}, 'rect');

// 注册“条件” 节点
G6.registerNode('conditionButtonOnly', {
  shapeType: 'conditionButtonOnly',
  draw(cfg, group) {
    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 48,
        height: 24,
        radius: 2,
        lineWidth: 0.6,
        fillOpacity: 1,
      },
    })
    const textConfig = {
      textAlign: 'left',
      textBaseline: 'top',
    };

    // 条件按钮warp
    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 48,
        height: 24,
        fill: '#178aea',
        stroke: '#fff',
        radius: 2,
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: CONDITION_BUTTON_ONLY,
      },
    });

    // 条件按钮title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 5,
        y: 4,
        text: '+ 条件',
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: CONDITION_BUTTON_ONLY,
      },
    });

    return rect
  },
}, 'rect');


// 注册“条件 关系” 节点
G6.registerNode('relationButton', {
  shapeType: 'relationButton',
  draw(cfg, group) {
    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 100,
        height: 24,
        radius: 2,
        lineWidth: 0.6,
        fillOpacity: 1,
      },
    })

    const textConfig = {
      textAlign: 'left',
      textBaseline: 'top',
    };

    // 关系按钮warp
    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 48,
        height: 24,
        fill: '#178aea',
        stroke: '#fff',
        radius: 2,
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: RELATION_BUTTON,
      },
    });

    // 关系按钮title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 5,
        y: 4,
        text: '+ 关系',
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: RELATION_BUTTON,
      },
    });

    // 条件按钮warp
    group.addShape('rect', {
      attrs: {
        x: 52,
        y: 0,
        width: 48,
        height: 24,
        fill: '#178aea',
        stroke: '#fff',
        radius: 2,
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: CONDITION_BUTTON,

      },
    });

    // 条件按钮title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 55,
        y: 4,
        text: '+ 条件',
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: CONDITION_BUTTON,
      },
    });

    return rect
  },
}, 'rect');

// 注册“排除” 节点
G6.registerNode('removeButton', {
  shapeType: 'removeButton',
  draw(cfg, group) {
    const { name = '' } = cfg;

    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 50,
        height: 24,
        fill: '#178aea',
        stroke: '#fff',
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: REMOVE_BUTTON,
      },
    })

    const textConfig = {
      textAlign: 'left',
      textBaseline: 'top',
    };

    // 排除按钮title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 14,
        y: 4,
        text: name || '排除',
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: REMOVE_BUTTON,
      },
    });

    return rect
  },
}, 'rect');

// 注册下拉节点
G6.registerNode('selectButton', {
  shapeType: 'selectButton',
  draw(cfg, group) {
    const { name } = cfg
    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 50,
        height: 24,
        fill: '#f0f',
        stroke: '#fff',
        radius: 2,
        cursor: 'pointer',
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: SELECT_BUTTON,
      },
    })

    const textConfig = {
      textAlign: 'left',
      textBaseline: 'top',
    };

    // 下拉按钮title
    group.addShape('text', {
      attrs: {
        ...textConfig,
        x: 5,
        y: 4,
        text: name || '并且',
        fontSize: 12,
        fill: '#fff',
        cursor: 'pointer',
        isTitleShape: true,
        genre: SELECT_BUTTON,
      },
    });

    // 关闭按钮的warp
    group.addShape('circle', {
      attrs: {
        x: 40,
        y: 12,
        r: 8,
        fill: '#0ff',
        stroke: '#fff',
        radius: 12,
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: SELECT_BUTTON,
        cursor: 'pointer',
      },
      name: 'closeBtn',
    })

    group.addShape('text', {
      attrs: {
        textAlign: 'center',
        textBaseline: 'middle',
        x: 40,
        y: 10,
        text: 'x',
        fontSize: 16,
        fill: '#000',
        cursor: 'pointer',
        isTitleShape: true,
        genre: SELECT_BUTTON,
      },
      name: 'closeBtn',
    });
    return rect
  },
});


// 注册表单节点
G6.registerNode('searchNode', {
  shapeType: 'selectNode',
  draw(cfg, group) {
    const { name = '' } = cfg
    const rect = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 200,
        height: 24,
        fill: 'green',
        stroke: '#fff',
        radius: 2,
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: SEARCH_NODE,
      },
    })


    const searchNodeText = group.addShape('text', {
      attrs: {
        textAlign: 'left',
        textBaseline: 'top',
        x: 5,
        y: 4,
        text: (name.length > 14 ? `${name.substr(0, 14)}...` : name) || '请点击选择查询条件',
        fontSize: 12,
        fill: '#000',
        cursor: 'pointer',
        isTitleShape: true,
        genre: SEARCH_NODE,
      },
    });

    searchNodeText.set('className', 'searchNodeText')

    // 关闭按钮的warp
    group.addShape('circle', {
      attrs: {
        x: 190,
        y: 12,
        r: 8,
        fill: '#0ff',
        stroke: '#fff',
        radius: 12,
        lineWidth: 0.6,
        fillOpacity: 1,
        genre: SEARCH_NODE,
        cursor: 'pointer',
      },
      name: 'closeBtn',
    })

    group.addShape('text', {
      attrs: {
        textAlign: 'center',
        textBaseline: 'middle',
        x: 190,
        y: 10,
        text: 'x',
        fontSize: 16,
        fill: '#000',
        cursor: 'pointer',
        isTitleShape: true,
        genre: SEARCH_NODE,
      },
      name: 'closeBtn',
    });

    return rect
  },
});


// 注册 连接线
G6.registerEdge('hvh', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg;
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#ccc',
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
          ['L', endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return shape;
  },
});
