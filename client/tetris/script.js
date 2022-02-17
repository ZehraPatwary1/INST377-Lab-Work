document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    let nextRandom = 0
    let timerID
    let score = 0
    let isGameOver = false

    const lTertromino = [
        [1, width+1, width*2+1, 2],
        [width,width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+2]
    ]
    
}) 