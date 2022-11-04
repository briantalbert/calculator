let operands = []
let screen = document.querySelector('.screen')

addButtonEventListeners()

function addButtonEventListeners() {

    let buttons = Array.from(document.querySelectorAll('button'))
    buttons.forEach(button => {
        let id = button.id
        //add event listeners to number buttons
        if (button.classList == 'number') {
            let num = ''
            id == 'dec' ? num = '.' : num = id
            button.addEventListener('click', button => {
                //if screen only shows 0, clear and add the number (if it's not a decimal)
                if (screen.textContent == '0' || screen.textContent == '') {
                    screen.textContent = ''
                    if (num != '.') {screen.textContent += num} else {screen.textContent = '0.'}
                } else {
                    if (num != '.' || (num == '.' && !screen.textContent.includes('.'))) {screen.textContent += num}
                }
            })
        }

        //add event listeners to operator buttons
        if (button.classList == 'op') {
            button.addEventListener('click', button => {
                let op = ''
                switch (id) {
                    case 'add':
                        op = '+'
                        break;
                    case 'mult':
                        op = 'x'
                        break
                    case 'sub':
                        op = '-'
                        break
                    case 'divide':
                        op = '/'
                        break
                    case 'equals':
                        op = 'eq'
                        break
                }
                //if this is the first operand, add it to the list
                //if they press equals, don't do anything
                if (!operands[0] && op != 'eq') {
                    operands.push(+screen.textContent)
                    operands.push(op)
                    screen.textContent += op

                //else if there is an operand and an operation
                } else if (operands.length == 2){
                    operands.push(+screen.textContent.split(operands[1])[1])
                    result = operate()
                    operands = [result]
                    screen.textContent = result
                    console.log(operands)
                } else if (operands.length == 1) {
                    operands.push(op)
                    if (op != 'eq') {screen.textContent += op}
                }
            })
        }

        //backspace button
        if (button.classList == 'clear') {
            button.addEventListener('click', button => {
                screen.textContent = '0'
                operands = []
            })

        }


    });
    };

function operate() {
    let a = +operands[0]
    let b = +operands[2]
    let op = operands[1]

    switch (op) {
        case '+':
            return a + b
            break;
        case '-':
            return a - b
            break;
        case 'x':
            return a * b
            break;
        case '/':
            result = ''
            b == 0 ? result = 'ERROR' : result = a/b
            return result
            break;
    }

}
