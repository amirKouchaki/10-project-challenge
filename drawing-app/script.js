const canvas = document.querySelector('.canvas')
const increase= document.querySelector('.increase')
const decrease= document.querySelector('.decrease')
const sizeEl= document.querySelector('.size')
const colorPicker = document.querySelector('input')

const clr = document.querySelector('.clr')


let size = 10
let x = undefined
let y = undefined
let ctx = canvas.getContext("2d")
let pressed = false

const drawCircle = (x,y) =>{
    if(!x || !y)
     return
    ctx.beginPath()
    ctx.lineWidth = size
    ctx.arc(x,y,size,0,2*Math.PI)
    ctx.fillStyle = colorPicker.value
    ctx.fill()
}

const drawLine = (x,y,x2,y2) => {
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = size * 2
    ctx.strokeStyle = colorPicker.value
    ctx.stroke();
}


const updateSize = () =>
     sizeEl.innerHTML = size




canvas.addEventListener('mousedown',e =>{
    pressed = true
    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup',e =>{
    pressed = false
    x = undefined
    y = undefined
})


canvas.addEventListener('mousemove',e =>{
    if(!pressed)
     return
    x2 = e.offsetX
    y2 = e.offsetY
    drawLine(x,y,x2,y2)
    drawCircle(x,y)
    
    x = x2
    y = y2
})

increase.addEventListener('click', e =>{
    if(size == 30)
     return
    size++
    updateSize()
})
decrease.addEventListener('click', e =>{
    if(size == 5)
     return
    size--
    updateSize()
})

clr.addEventListener('click',e =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
