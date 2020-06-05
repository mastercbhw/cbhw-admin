import G6 from '@antv/g6'

const colorMap = {
  name1: '#72CC4A',
  name2: '#1A91FF',
  name3: '#FFAA15',
}


G6.registerEdge('polyline', {
  itemType: 'edge',
  draw: function draw(cfg, group) {
    const { startPoint } = cfg;
    const { endPoint } = cfg;

    const Ydiff = endPoint.y - startPoint.y;

    const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

    const cpOffset = 16;
    const offset = Ydiff < 0 ? cpOffset : -cpOffset;

    const line1EndPoint = {
      x: startPoint.x + slope,
      y: endPoint.y + offset,
    };
    const line2StartPoint = {
      x: line1EndPoint.x + cpOffset,
      y: endPoint.y,
    };

    // 控制点坐标
    const controlPoint = {
      x:
        ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
        (line1EndPoint.y - startPoint.y) +
        startPoint.x,
      y: endPoint.y,
    };

    const path = [
      ['M', startPoint.x, startPoint.y],
      ['L', line1EndPoint.x, line1EndPoint.y],
      [
        'Q',
        controlPoint.x,
        controlPoint.y,
        line2StartPoint.x,
        line2StartPoint.y,
      ],
      ['L', endPoint.x, endPoint.y],
    ];

    // if (Ydiff === 0) {
    //   path = [
    //     ['M', startPoint.x, startPoint.y],
    //     ['L', endPoint.x, endPoint.y],
    //   ];
    // }

    const line = group.addShape('path', {
      attrs: {
        path,
        stroke: '#72CC4A',
        lineWidth: 1.2,
        endArrow: false,
      },
    });

    return line;
  },
});
