// let arr = [23, "Ayush", x => x+5];
// arr.length=3;
// for (let i=0; i<arr.length; i++) {
//     console.log(`arr: ${arr[i]} of type ${typeof(arr[i])}`);
// }

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand="";
        this.previousOperand="";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        if (number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() +  number.toString();

    }

    chooseOperation(operation){
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break; 
            case '-':
                computation = prev - current;
                break; 
            case '*':
                computation = prev * current;
                break; 
            case '÷':
                computation = prev / current;
                break; 
            case '+':
                computation = prev + current;
                break; 
            case '+':
                computation = prev + current;
                break; 
            default:
                return;
            }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand = '';
    }

    numberFormat(number){
        console.log(number)
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en-IN', {maximumFractionDigits: 0})
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        // this.currentOperandTextElement.innerText = this.currentOperand;
        // this.previousOperandTextElement.innerText = `{this.previousOperand} this.operation`;
        this.currentOperandTextElement.innerText = this.numberFormat(this.currentOperand);
        if (this.previousOperand === undefined || this.previousOperand === '') {
            this.previousOperandTextElement.innerText = '';
        }else {
            this.previousOperandTextElement.innerText = 
                `${this.numberFormat(this.previousOperand)} ${this.operation}`
        };  
              
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calc = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
})

clearButton.addEventListener('click', button => {
    calc.clear();
    calc.updateDisplay();
})

equalsButton.addEventListener('click', button => {
    calc.compute();
    calc.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calc.delete();
    calc.updateDisplay();
})