/* Variables HTML */
var container = document.getElementById('graph');
var n_nodes = document.getElementById('n_nodes');
var from = document.getElementById('node1');
var to = document.getElementById('node2');
var cost = document.getElementById('value');

/* Variables Grafo */
var nodes = new vis.DataSet({})
var edges = new vis.DataSet({});
var network = null;
var data= {
  nodes: nodes,
  edges: edges,
};
var options = {
  width: '500px',
  height: '500px',
};

/* Variables Función */
const matrix = (rows, cols) => new Array(cols).fill(-1).map((o, i) => new Array(rows).fill(-1));
var graph_matrix = null;
var route = [];

/* Obtener la cantidad de nodos */
const get_nodes = () => {
  if (!n_nodes.value || n_nodes.value <= 1){
    alert("Ingresa una cantidad de nodos válida");
  } else { 
    create_graph(n_nodes.value);
    // Acá falta eliminar la vista de la cantidad de nodos.
  }
};

/* Creo la matriz que va a contener el grafo y el objeto que se muestra */
const create_graph = (n_nodes) => {
  graph_matrix = matrix(parseInt(n_nodes),parseInt(n_nodes));
  for (let i = 0; i < n_nodes; i++) {
    nodes.add({id: i, label: i.toString()});
    graph_matrix[i][i] = 0;
  };
  network = new vis.Network(container, data, options);
};

/* Agregar conexión al grafo */
const add_conexion = () => {
  edges.add({from: from.value, to:to.value, label: cost.value});
  graph_matrix[from.value][to.value] = parseInt(cost.value);
  graph_matrix[to.value][from.value] = parseInt(cost.value);
};


