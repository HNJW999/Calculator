class Calculator {
    constructor(preansTextElement, ansTextElement) {
        this.preansTextElement = preansTextElement
        this.ansTextElement = ansTextElement
        this.clear()
    }

    clear() {
        this.ans = ''
        this.preans = ''
        this.operator = undefined

    }

    delete() {
        this.ans = this.ans.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.ans.includes('.')) return
        this.ans = this.ans.toString() + number.toString()
    }

    chooseOperator(operator) {
        if (this.ans === '') return
        if (this.preans !== '') {
            this.compute()
        }
        this.operator = operator
        this.preans = this.ans
        this.ans = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.preans)
        const current = parseFloat(this.ans)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.ans = computation
        this.operator = undefined
        this.preans = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.ansTextElement.innerText = this.getDisplayNumber(this.ans)
        if (this.operator != null) {
            this.preansTextElement.innerText = `${this.getDisplayNumber(this.preans)} ${this.operator}`
        } else {
            this.preansTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalButtons = document.querySelector('[data-equal]')
const deleteButtons = document.querySelector('[data-delete]')
const allclearButtons = document.querySelector('[data-allclear]')
const preansTextElement = document.querySelector('[data-preans]')
const ansTextElement = document.querySelector('[data-ans]')

const calculator = new Calculator(preansTextElement, ansTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equalButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})