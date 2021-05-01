var nodes = [
  {id: 1, label: 'A'},
  {id: 2, label: 'B'},
  {id: 3, label: 'C'},
  {id: 4, label: 'D'},
  {id: 5, label: 'E'}
];

// create an array with edges
var edges = [
  {from: 1, to: 2, label: '2'},
  {from: 1, to: 3},
  {from: 2, to: 4},
  {from: 2, to: 5},
  {from:3, to:4}
];

// create a network
var container = document.getElementById('graph');
var data= {
  nodes: nodes,
  edges: edges,
};
var options = {
  width: '1000px',
  height: '1000px'
};

var network = new vis.Network(container, data, options);