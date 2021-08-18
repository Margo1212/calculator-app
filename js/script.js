const numbers = document.querySelectorAll('.num')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.btn-result')
const reset = document.querySelector('.btn-reset')
const clean = document.querySelector('.btn-del')
const numPrev = document.querySelector('.previous_number')
const numCurr = document.querySelector('.current_number')

let previousOperation = ''
let currentOperation = ''
let operation = undefined

 const chooseOperation = (operator) => {
    if(currentOperation === '') {
        return
    }
    operation = operator
    previousOperation = currentOperation
    currentOperation = ''
 }

const updateResult = () => {
    numCurr.innerText = currentOperation
    numPrev.innerText = previousOperation
}

const addNum = (num) => {
    if(currentOperation.includes('.')) {
        return
    }
    currentOperation = currentOperation.toString() + num.toString()
}

const deleteNumber = () => {
    currentOperation = currentOperation.toString().slice(0, -1)
}

numbers.forEach((num) => {
    num.addEventListener('click', () => {
        addNum(num.innerText)
        updateResult()
    })
})

clean.addEventListener('click', () => {
    deleteNumber()
    updateResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperation(operator.innerText)
        updateResult()
    })
})


