// Factory function for player creation 
const Player = (sign) =>{

    this.sign = sign
    const getSign = () => sign

    return {getSign}
}

// Module for GameBoard creation and updation
const gameBoard = (() =>{

    const board = ["","","","","","","","",""]

    const setField = (index,sign) => {
        board[index] = sign
    }

    const getField = (index) => {
        return board[index]
    }

    const reset = () =>{
        for(let i=0;i < board.length;i++){
            board[i] = ""
        }
    }

    return {setField,getField,reset}
})()

// Module for the UI of the game
const displayController = (() =>{

    let round = 0
    const fields = document.querySelectorAll(".field")
    const messagefield = document.querySelector(".message")
    const restartBtn = document.querySelector(".restartBtn")

    fields.forEach(field =>{
        field.addEventListener('click', (e) =>{
            if(gameController.isFieldOccupied(e.target.dataset.index)|| gameController.getIsOver()) return
            gameController.playRound(e.target.dataset.index)
            field.textContent = gameBoard.getField(e.target.dataset.index)
            if(round % 2 !== 0){
                field.classList.add("white")
            }else{
                field.classList.add("pink")
            }
            round++
        })
    })

    const setMessage = (message) =>{
        messagefield.textContent = message
    }

    const setWinColor = (winCombination) =>{
        winCombination.forEach(value =>{
            fields[value].classList.add("yellow")
        })
    }

    const reset = () =>{
        for(let i=0; i < fields.length; i++){
            fields[i].textContent = ""
            fields[i].classList.remove("yellow")
            fields[i].classList.remove("white")
            fields[i].classList.remove("pink")
        }
        setMessage("Player X's Turn")
    }

    restartBtn.addEventListener('click', () =>{
        reset()
        gameBoard.reset()
        gameController.reset()
        round = 0
    })

    return{setMessage,setWinColor}
})()

// Module for Game Controller , it controls the flow of the game
const gameController = (() =>{
    const player1 = Player("X")
    const player2 = Player("O")
    let round = 1
    let isOver = false

    const playRound = (index) =>{
        gameBoard.setField(index, getCurrentPlayerSign())
        const winCombination = checkForWinner(index)
        if(winCombination){
            displayController.setMessage(`Player ${getCurrentPlayerSign()} Won !`)
            displayController.setWinColor(winCombination)
            isOver = true
            return
        }
        if(round === 9){
            displayController.setMessage(`It's a Draw`)
            displayController.setWinColor([0,1,2,3,4,5,6,7,8])
            isOver = true
            return
        }
        round++
        displayController.setMessage(`Player ${getCurrentPlayerSign()}'s Turn`)
   
    }

    const getCurrentPlayerSign = () =>{
        if(round % 2 === 0){
            return player2.getSign()
        }else{
            return player1.getSign()
        }
    }

    const checkForWinner = (index) =>{
        fieldindex = +index  //converting the index which is string to integer
        let winCombination = false
        const winningCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
        const combinationsToCheck = winningCombinations.filter(element => element.includes(fieldindex))
        combinationsToCheck.some(combination => combination.every(element => gameBoard.getField(element) === getCurrentPlayerSign())? winCombination = combination:false)
        return winCombination // returns either the winning combination or if not present, then returns false
    }

    const reset = () =>{
        round = 1
        isOver = false
    }

    const isFieldOccupied = (index) =>{
        return gameBoard.getField(index) !== "" ? true : false
    }

    const getIsOver = () =>{
        return isOver
    }

    return {playRound,reset,isFieldOccupied,getIsOver} 
})()