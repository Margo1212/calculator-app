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


const calculate = () => {
    let action
    if(!previousOperation || !currentOperation) {
        return
    } 

    const previous = parseFloat(previousOperation)
    const current = parseFloat(currentOperation)

    if(isNaN(previous) || isNaN(current)) {
        return
    }

    switch (operation) {
        case '+':
            action = previous + current
            break;
        case '-' :
            action = previous - current   
            break;
        case '/' :
            if(current === 0) {
                resetResult()
                return
            }
            action = previous / current   
            break;
        case '×' :
            action = previous * current   
            break;    
        default:
            return;
    }

    currentOperation = action
    operation = undefined
    previousOperation = ''
}


const chooseOperation = (operator) => {
    if(currentOperation === '') {
        return
    }
    if (previousOperation !== '') {
        const previous = numPrev.innerText
        if(currentOperation.toString() === '0' && previous[previous.length -1] === '/') {
            resetResult()
            return
        }
        calculate()
    }
    operation = operator
    previousOperation = currentOperation
    currentOperation = ''
}

const updateResult = () => {
    numCurr.innerText = currentOperation
    if(operation != null) {
        numPrev.innerText = previousOperation + operation
    } else {
        numPrev.innerText = ''
    }
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

const resetResult = () => {
previousOperation = ''
currentOperation = ''
operation = undefined
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

equal.addEventListener('click', () => {
    calculate()
    updateResult()
})

reset.addEventListener('click', () => {
    resetResult()
    updateResult()
})


