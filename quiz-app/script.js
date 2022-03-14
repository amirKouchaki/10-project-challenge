const questions = [
  {
    question: "how old is amir?",
    a: "25",
    b: "22",
    c: "73",
    d: "19",
    answer: "d",
  },
  {
    question: "what number comes after 22?",
    a: "2500 comes after 22",
    b: "there is no number after 22",
    c: "23 comes after 22",
    d: "22 comes after 22",
    answer: "c",
  },
  {
    question: "which one of these are a name of a backend framework?",
    a: ".exe",
    b: "path of exile",
    c: "sinatra",
    d: "this is my grandma's framework",
    answer: "c",
  },
  {
    question: "which one is a programming language?",
    a: "R",
    b: "the path to freedom",
    c: "speakers produce loud noises",
    d: "guitar hero",
    answer: "a",
  },
  {
    question: "which one is a low-level programming language?",
    a: "java",
    b: "python",
    c: "php",
    d: "c++",
    answer: "d",
  },
]

let score = 0

let questionIndex = 0
const question = document.querySelector(".question")
const answers = document.querySelectorAll('.answer .form-label')
const answerInputs = document.querySelectorAll('.answer .form-input')
const submitBtn = document.querySelector(".submit-btn")



const getCheckedButton = () => {
    let answer = undefined
    answerInputs.forEach(value => {
        if(value.checked)
            answer = value
    })
    return !answer?undefined:answer.id
}

const deselectButtons = () => {
    answerInputs.forEach(answer => answer.checked = false)
}


const showQuestion = () =>{
    console.log(`question: ${questionIndex}`)
    const quiz = questions[questionIndex]
    question.innerText = quiz.question
    answers.forEach((answer, index) => {
        switch (index) {
        case 0:
            answer.innerText = quiz.a
            break
        case 1:
            answer.innerText = quiz.b
            break
        case 2:
            answer.innerText = quiz.c
            break
        case 3:
            answer.innerText = quiz.d
            break
        }
    })
    deselectButtons()
}
  
submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const answer = getCheckedButton()

    if(!answer)
      return

    if(answer == questions[questionIndex]?.answer)
      score++

    if(++questionIndex >= questions.length)
       return alert(`your scored ${score}.`)
    
    showQuestion()
});

showQuestion()


