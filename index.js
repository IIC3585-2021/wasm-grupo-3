/* Variables HTML */
const container = document.getElementById('graph')
let nNodes = document.getElementById('nNodes')
const from = document.getElementById('node1')
const to = document.getElementById('node2')
const cost = document.getElementById('value')
const createGraphBtn = document.getElementById('createGraphBtn')
const addEdgeBtn = document.getElementById('addEdgeBtn')
const graphPanel = document.getElementById('graph')
const resultPanel = document.getElementById('resultPanel')
const findBestBtn = document.getElementById('findBestBtn')

/* Variables Grafo */
const nodes = new vis.DataSet({})
const edges = new vis.DataSet({})
let network = null
const data = {
    nodes: nodes,
    edges: edges
}
const options = {
    width: '800px',
    height: '400px'
}
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

/* Variables Función */
const matrix = (rows, cols) => new Array(cols).fill(-1).map((o, i) => new Array(rows).fill(-1))
let graphMatrix = null
let route = []

/* Obtener la cantidad de nodos */
createGraphBtn.onclick = () => {
  if (!nNodes.value || nNodes.value <= 1) {
    alert('Ingresa una cantidad de nodos válida')
  } else {
    createGraph(nNodes.value)
    nNodes.disabled = true
    graphPanel.hidden = false
    from.disabled = false
    to.disabled = false
    cost.disabled = false
    addEdgeBtn.disabled = false
    findBestBtn.disabled = false
    createGraphBtn.disabled = true
  }
}

/* Creo la matriz que va a contener el grafo y el objeto que se muestra */
const createGraph = (nNodes) => {
    graphMatrix = matrix(parseInt(nNodes), parseInt(nNodes))
    for (let i = 0; i < nNodes; i++) {
        nodes.add({ id: i, label: alphabet[i] })
        graphMatrix[i][i] = 0
    };
    network = new vis.Network(container, data, options)
}

/* Agregar conexión al grafo */
addEdgeBtn.onclick = () => {
    edges.add({ from: alphabet.indexOf(from.value), to: alphabet.indexOf(to.value), label: cost.value })
    graphMatrix[alphabet.indexOf(from.value)][alphabet.indexOf(to.value)] = parseInt(cost.value)
    graphMatrix[alphabet.indexOf(to.value)][alphabet.indexOf(from.value)] = parseInt(cost.value)
}

/* Dibujar la ruta más corta */
const getBestRoute = (value, startTime, endTime) => {
    let edge;
    let direction;
    let routeString = ''
    resultPanel.hidden = false
    from.disabled = true
    to.disabled = true
    cost.disabled = true
    findBestBtn.disabled = true
    addEdgeBtn.disabled = true
    if (value === 2147483647) {
        alert('No hay ruta que recorra todos los nodos :(')
    } else {
        for (let index = 0; index < route.length - 1; index++) {
            edge = edges.get({ filter: (item) => { return (item.from === route[index + 1] && item.to === route[index]) || (item.from === route[index] && item.to === route[index + 1]) } })[0]
            direction = edge.from === route[index] ? 'to' : 'from'
            edges.update({ id: edge.id, label: edge.label, from: edge.from, to: edge.to, arrows: direction, color: { color: 'green' }, width: 3, font: { size: 20 } })
            routeString += alphabet[route[index]] + ' - '
            if (index === route.length - 2) { routeString += alphabet[route[index + 1]] }
        }
        document.getElementById('bestRoute').innerHTML = 'Ruta más corta: ' + routeString
        document.getElementById('costRoute').innerHTML = 'Costo ruta: ' + value
        document.getElementById('time').innerHTML = 'Tiempo de ejecución: ' + Math.round((endTime - startTime) * 100000) / 100000 + ' milisegundos'
    }
}