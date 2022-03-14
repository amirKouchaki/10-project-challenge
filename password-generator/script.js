const pwEl = document.querySelector('.pw')
const copyEl = document.querySelector('.copy')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.querySelector('.generate')

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const numbers  = '0123456789'
const symbols = '~!@#$%^&*()_+'



const getUppercase = () => uppercase[Math.floor(Math.random() * uppercase.length)]

const getLowercase = () => lowercase[Math.floor(Math.random() * lowercase.length)]

const getNumber = () => numbers[Math.floor(Math.random() * numbers.length)]

const getSymbol = () => symbols[Math.floor(Math.random() *symbols.length)]


const generatePassword = () => {

    let password = ''
    const selected = getSelected()
    if(selected.length == 0)
        return

    selected.forEach(funcName => {
        password += eval(`get${funcName}()`)
    })
    
    const passLen = password.length
    
    for(let i = 0;i < (lengthEl.value - passLen);i++){
        randomIndex = Math.floor(Math.random() * selected.length)
        
        password += eval(`get${selected[randomIndex]}()`)
    }


    pwEl.innerHTML = password
}


const getSelected = () =>{
    let selected = []
    if(uppercaseEl.checked)
        selected.push('Uppercase')
    if(lowercaseEl.checked)
        selected.push('Lowercase')
    if(numbersEl.checked)
        selected.push('Number')
    if(symbolsEl.checked)
        selected.push('Symbol')
    return selected

}

const copy = async() => {
    const password = pwEl.innerText
    if(!password)
        return
    
    await navigator.clipboard.writeText(password)
    
    alert('copied to clipboard')
}

copyEl.addEventListener('click', copy)

generateEl.addEventListener('click', generatePassword)

