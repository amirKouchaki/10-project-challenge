const form = document.getElementById('form')
const input = document.querySelector('input')
const todoList = document.querySelector('.todo-list')
form.addEventListener('submit',e =>{
    e.preventDefault()
    if(!input.value)
        return
    addTodo({text: input.value})
    input.value = ''
    updateLS()
})


/**
 * * the parameters passed are deconstructed
 */
const addTodo = ({text,completion = false} = {}) => {

    const li = document.createElement('li')
    if(completion)
        li.classList.toggle('completed')
    li.innerText = text

    li.addEventListener('click', e =>{
        li.classList.toggle('completed')
        updateLS()
    })

    li.addEventListener('contextmenu',e => {
        e.preventDefault()
        li.remove()
        updateLS()
    })

    todoList.appendChild(li)
}

const updateLS = () => {
    let todoTexts = []

    document.querySelectorAll('li')
        .forEach(li => todoTexts.push({text:li.innerText,completion:li.classList.contains('completed')}))
    localStorage.setItem('todoTexts',JSON.stringify(todoTexts))    
}

const LoadLS = () =>{
    return JSON.parse(localStorage.getItem('todoTexts')) ?? []
}

const LoadTodos = () => {
    const todoTexts = LoadLS()
    todoTexts.forEach(obj => {
        addTodo(obj)
    });
}

LoadTodos()