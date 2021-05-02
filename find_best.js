import Module from "./main.js";

console.log(" ayuda", n_nodes.value);

/* Función que genera un puntero a partir de la matriz */
const matrixToPtr = (myModule) => {
    const arrayPtr = myModule._calloc(parseInt(n_nodes), 4);
    for (let i = 0; i < n_nodes; i++) {
        let rowsPtr = myModule._calloc(parseInt(n_nodes), 4);
        myModule.setValue(arrayPtr + i * 4, rowsPtr, "i32");
        for (let j = 0; j < n_nodes; j++) {;
            myModule.setValue(rowsPtr + j * 4, graph_matrix[i][j], "i32");
        }
    }
    console.log(arrayPtr);
    return arrayPtr;
};


/* Función que genera un puntero a partir de la matriz */
const arrayToPtr = (myModule) => {
    let arrayPtr = myModule._calloc(parseInt(n_nodes), 4);
    return arrayPtr;
};

/* Función que genera una matriz a partir de un puntero */
const ptrToInt = (myModule, ptr) => {
    let result = myModule.getValue(ptr + 4, "i32");
    return result;
};

/* Función que genera un array a partir de un puntero */
const ptrToArray = (myModule, ptr) => {
    let routeResult = [];
    for (let i = 0; i < n_nodes; i++) {
        routeResult[i] = myModule.getValue(ptr + 4 * i, "i32");
    }
    return routeResult;
};

/* Obtener la ruta más corta */

Module().then(function(mymod) {
    let find_best_btn = document.getElementById('find_best');
    let findBestResult = 0;
    find_best_btn.onclick = () => {
        n_nodes = n_nodes.value;
        console.log(graph_matrix);
        console.log("Hice click, ayuda");
        let ptrMatrix = matrixToPtr(mymod);
        let ptrArray = arrayToPtr(mymod);
        let startTime = window.performance.now();
        console.log("Tiempo inicial:", startTime);
        console.log("Nodos:", n_nodes);
        findBestResult = mymod._findbest(ptrMatrix, ptrArray, parseInt(n_nodes));
        console.log("Costo: ", findBestResult);
        let endTime = window.performance.now();
        console.log("Tiempo final:", endTime);
        let resultPath = ptrToArray(mymod, ptrArray);
        console.log("Arreglo:", resultPath);
        // Función que me cambia la ruta 
    }
})