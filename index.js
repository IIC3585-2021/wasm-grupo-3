import Module from "./WASM.js"

const calcBtn = document.getElementById("calc-btn");
const fibN = document.getElementById("fib-n");

Module().then(function(mymod) {
    calcBtn.onclick = () => {
        let jsTime = jsRunner(parseInt(fibN.value));
        let cTime = cRunner(parseInt(fibN.value), mymod);
        addToTable([jsTime, cTime]);
    }
})

const cRunner = (n, Module) => {
    let startTime = window.performance.now();
    Module._fib(n); // nuestra función
    let endTime = window.performance.now();
    return endTime - startTime;
}