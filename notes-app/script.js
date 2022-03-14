const notesEl = document.querySelector(".notes")
const add = document.querySelector(".add-note")
const lsNotes = JSON.parse(localStorage.getItem('notes')) ?? []



add.addEventListener("click", (e) => addNewNode())

const addNewNode = (text = '') =>{
    const note = document.createElement("div")
  note.classList.add("note")
  note.innerHTML = `<div class="header">
        <div class="icons">
        <div class="edit fa fa-pen-to-square"></div>
        <div class="delete fa fa-trash"></div>
        </div>
        </div>
        <textarea class="notes-sheet ${text ? 'hidden':''}">${text}</textarea>
        <div class="main ${text ? '':'hidden'}"></div>`

  const editBtn = note.querySelector(".edit")
  const deleteBtn = note.querySelector(".delete")
  const notesArea = note.querySelector(".notes-sheet")
  const mainEl = note.querySelector(".main")
  
  mainEl.innerHTML = marked.parse(text)
  notesArea.addEventListener("input", e => {
    const { value } = e.target
    mainEl.innerHTML = marked.parse(value)
    updateLs()
  })

  editBtn.addEventListener("click", e => {
    notesArea.classList.toggle("hidden")
    mainEl.classList.toggle("hidden")
  })

  deleteBtn.addEventListener('click', e =>{
      note.remove()  
      updateLs()
  })

  notesEl.appendChild(note)
}

lsNotes.forEach(note => addNewNode(note))

const updateLs = () => {
    let notes = []
    const texts = document.querySelectorAll('textArea')
    texts.forEach(note => notes.push(note.value))
    notes = notes.filter(note => note != '')
    localStorage.setItem('notes',JSON.stringify(notes))
}
