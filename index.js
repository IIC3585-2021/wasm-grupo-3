/* Variables HTML */
let container = document.getElementById('graph');
let n_nodes = document.getElementById('n_nodes');
let from = document.getElementById('node1');
let to = document.getElementById('node2');
let cost = document.getElementById('value');

/* Variables Grafo */
let nodes = new vis.DataSet({})
let edges = new vis.DataSet({});
let network = null;
let data = {
    nodes: nodes,
    edges: edges,
};
let options = {
    width: '500px',
    height: '500px',
};

/* Variables Función */
const matrix = (rows, cols) => new Array(cols).fill(-1).map((o, i) => new Array(rows).fill(-1));
let graph_matrix = null;
let route = [];

/* Obtener la cantidad de nodos */
const get_nodes = () => {
    if (!n_nodes.value || n_nodes.value <= 1) {
        alert("Ingresa una cantidad de nodos válida");
    } else {
        create_graph(n_nodes.value);
        // Acá falta eliminar la vista de la cantidad de nodos.
    }
};

/* Creo la matriz que va a contener el grafo y el objeto que se muestra */
const create_graph = (n_nodes) => {
    graph_matrix = matrix(parseInt(n_nodes), parseInt(n_nodes));
    for (let i = 0; i < n_nodes; i++) {
        nodes.add({ id: i, label: i.toString() });
        graph_matrix[i][i] = 0;
    };
    network = new vis.Network(container, data, options);
};

/* Agregar conexión al grafo */
const add_conexion = () => {
    edges.add({ from: parseInt(from.value), to: parseInt(to.value), label: cost.value });
    graph_matrix[from.value][to.value] = parseInt(cost.value);
    graph_matrix[to.value][from.value] = parseInt(cost.value);
};

/* Dibujar la ruta más corta */
const getBestRoute = () => {
  let edge, direction;
  for (let index = 0; index < route.length - 1; index++) {
    edge = edges.get({ filter: (item) => {return (item.from == route[index + 1] && item.to == route[index]) || (item.from == route[index] && item.to == route[index + 1])}})[0];
    direction = edge.from == route[index] ? "to" : "from"; 
    edges.update({id: edge.id, label: edge.label, from: edge.from, to: edge.to, arrows: direction, color: { color: "green" }})
  }
};