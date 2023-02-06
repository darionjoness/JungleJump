const gameContainer = document.querySelector('.game-container');
const sky = document.querySelector('.sky')
const scoreDisplay = document.querySelector('.score')
const player = document.querySelector('.player')
const results = document.querySelector('.results')

let score = 0;
let playerBottom = 200 ;
let playerRight = 400
let playerGravity = 3.5



const createObstacle = () => {
    let obstacleRight = -50
    let topObstacleRight = -180
    let obstacleBottom = 0
    let topObstacleBottom = 0
    // Create div element called obstacle
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div')

    // Add class of obstacle to div obstacle
    obstacle.classList.add('obstacle');
    topObstacle.classList.add('topObstacle')
    

    // Get a random bottom position for obstacleBottom
    obstacleBottom = Math.random() * 30
    topObstacleBottom = Math.random() * (230 - 200) + 200


    // Style bottom to be obstacleBottom
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = topObstacleBottom + 'px'

    // Append obstacle to child
    gameContainer.appendChild(obstacle)
    gameContainer.appendChild(topObstacle)


    // Create moveObstacle function
    const moveObstacle = () => {
        // check if obstacleRight is equal to 620
        if(obstacleRight ===  620){
            // Remove obstacle Class
            obstacle.classList.remove('obstacle')
            // Remove obstacle from DOM
            obstacle.remove()        
        } 

        if(topObstacleRight === 620){
            topObstacle.classList.remove('topObstacle')
            topObstacle.remove()
        }
            // Increment obstacleRight by 2
            obstacleRight += 2
            topObstacleRight += 2
            // Set style right to obstacleRight
            obstacle.style.right = obstacleRight + 'px'
            topObstacle.style.right = topObstacleRight + 'px'

            // If obstacleRight is more then 380 and less than 450 and playerRight is 400
            if(obstacleRight > 370 && obstacleRight < 430 && playerRight === 400 && (playerBottom < obstacleBottom + 100) || playerBottom < 0 ){
                gameOver()
            }

            if(topObstacleRight > 370 && topObstacleRight < 430 && playerRight === 400 && playerBottom > topObstacleBottom - 135 || playerBottom > 280){
                gameOver()
            }
        
    }

    const gameOver = () => {
        // Clear Intervals
        clearInterval(obstacleId)
        clearInterval(createObstacleId)
        clearInterval(startGameId)

        // Create restart game elements
        const restartText = document.createElement('div');
        const isGameOver = document.createElement('h2')
        const restartBtn = document.createElement('button')
        const restart = document.createElement('div')

        // Add classes to create elements
        restartBtn.classList.add('restartBtn')
        isGameOver.classList.add('isGameOver')
        restartText.classList.add('restartText')
        restart.classList.add('restart')

        // Set innerText to elements creaetd above
        isGameOver.innerText = 'GAME OVER'
        restartBtn.innerText = 'Restart'

        restartBtn.addEventListener('click', () => {
            window.location.reload()
        })

        // Append items
        restartText.appendChild(isGameOver)
        restartText.appendChild(restartBtn)

        restart.appendChild(restartText)

        document.body.appendChild(restart)

        // Remove event listener
        document.removeEventListener('keydown', movePlayer)
    }
    
    // Run moveObstacle every 20ms
    let obstacleId = setInterval(moveObstacle, 20)

}



    // Create startGame function
    const startGame = () => {
        // Decrement playerBottom by playerGravity
        playerBottom -= playerGravity

        // Set bottom position
        player.style.bottom = playerBottom + 'px'
    }

    let startGameId = setInterval(startGame, 20)

    // Create movePlayer function
    const movePlayer = (e) => {
        // if spacebar is clicked
        if(e.keyCode == 32){
            score++
            // Increment playerBottom by 50
            playerBottom += 50
            // Set player bottom
            player.style.bottom = playerBottom + 'px'

        }
        scoreDisplay.innerHTML = score
    }
    document.addEventListener('keydown', movePlayer)
       


// Run createObstacle instantly then every 3500ms
createObstacle()
let createObstacleId = setInterval(createObstacle, 2500)










