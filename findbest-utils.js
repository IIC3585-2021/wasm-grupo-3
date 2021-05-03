import Module from './main.js'

/* Función que genera un puntero a partir de la matriz */
const matrixToPtr = (myModule) => {
  const arrayPtr = myModule._calloc(parseInt(nNodes), 4)
  for (let i = 0; i < nNodes; i++) {
    const rowsPtr = myModule._calloc(parseInt(nNodes), 4)
    myModule.setValue(arrayPtr + i * 4, rowsPtr, 'i32')
    for (let j = 0; j < nNodes; j++) {
      ;
      myModule.setValue(rowsPtr + j * 4, graphMatrix[i][j], 'i32')
    }
  }
  return arrayPtr
}

/* Función que genera un puntero a partir de la matriz */
const arrayToPtr = (myModule) => {
  const arrayPtr = myModule._calloc(parseInt(nNodes), 4)
  return arrayPtr
}

/* Función que genera un array a partir de un puntero */
const ptrToArray = (myModule, ptr) => {
  const routeResult = []
  for (let i = 0; i < nNodes; i++) {
    routeResult[i] = myModule.getValue(ptr + 4 * i, 'i32')
  }
  return routeResult
}

/* Obtener la ruta más corta */
Module().then(function (mymod) {
  const findBestBtn = document.getElementById('findBestBtn')
  findBestBtn.onclick = () => {
    nNodes = nNodes.value
    const ptrMatrix = matrixToPtr(mymod)
    const ptrArray = arrayToPtr(mymod)
    const startTime = window.performance.now()
    const findBestResult = mymod._findbest(ptrMatrix, ptrArray, parseInt(nNodes))
    const endTime = window.performance.now()
    route = ptrToArray(mymod, ptrArray)
    getBestRoute(findBestResult, startTime, endTime)
  }
})
