var regl = createREGL({
  extensions: ['webgl_draw_buffers', 'oes_texture_float']
})


const nodeCount = 100;

// const nodes = Array(nodeCount).fill().map(() => ({
//   position: [Math.random(), Math.random()]
// }));


// const edges = [];
// for (let i = 0; i < nodeCount * 2; i++) { // Exemple : 2*nodeCount arêtes
//   const source = Math.floor(Math.random() * nodeCount);
//   const target = Math.floor(Math.random() * nodeCount);
//   if (source !== target) {
//     edges.push({ source, target });
//   }
// }

const nodes = Array(nodeCount).fill().map(() => ({
  position: [Math.random() * 2 - 1, Math.random() * 2 - 1],
  direction: [Math.random() * 0.02 - 0.01, Math.random() * 0.02 - 0.01], // Vitesse et direction initiales
}));

const edges = [];
for (let i = 0; i < nodeCount * 2; i++) {
  const source = Math.floor(Math.random() * nodeCount);
  const target = Math.floor(Math.random() * nodeCount);
  if (source !== target) {
    edges.push({ source, target });
  }
}

// Fonction pour dessiner les arêtes
const drawEdges = regl({
  frag: `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1, 0, 0, 1);
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,
  attributes: {
    position: regl.prop('positions'),
  },
  count: regl.prop('count'),
  primitive: 'lines',

  // attributes: {
  //   position: edges.flatMap(edge => [nodes[edge.source].position, nodes[edge.target].position]),
  // },

  // count: edges.length * 2,

  // primitive: 'lines',
});

// Fonction pour dessiner les nœuds
const drawNodes = regl({
  frag: `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(0, 1, 0, 1);
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_PointSize = 10.0;
      gl_Position = vec4(position, 0, 1);
    }`,
  attributes: {
    position: regl.prop('positions'),
  },
  count: regl.prop('count'),
  primitive: 'points',
  // attributes: {
  //   position: nodes.map(node => node.position),
  // },

  // count: nodes.length,

  // primitive: 'points',
});

function updatePositions() {
  nodes.forEach((node, index) => {
    node.position[0] += node.direction[0];
    node.position[1] += node.direction[1];
    if (Math.abs(node.position[0]) > 1) node.direction[0] *= -1;
    if (Math.abs(node.position[1]) > 1) node.direction[1] *= -1;
  });
}

regl.frame(() => {
  updatePositions();

  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  });

  drawEdges({
    positions: edges.flatMap(edge => [nodes[edge.source].position, nodes[edge.target].position]),
    count: edges.length * 2,
  });

  drawNodes({
    positions: nodes.map(node => node.position),
    count: nodes.length,
  });
});