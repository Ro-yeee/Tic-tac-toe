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

    const getField = (index) => board[index]

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

    fields.forEach(field =>{
        field.addEventListener('click', (e) =>{
            if(gameController.isFieldOccupied(e.target.dataset.index)) return
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

    const reset = () =>{
        for(let i=0; i < fields.length; i++){
            fields[i].textContent = ""
        }
    }

    return{setMessage,reset}
})()

// Module for Game Controller , it controls the flow of the game
const gameController = (() =>{
    const player1 = Player("X")
    const player2 = Player("O")
    let round = 1
    let isover = false

    const playRound = (index) =>{
        gameBoard.setField(index, getCurrentPlayerSign())
        round++
        displayController.setMessage(`Player ${getCurrentPlayerSign()}'s Turn`)
   
    }

    const getCurrentPlayerSign = () =>{
        if(round % 2 ==0){
            return player2.getSign()
        }else{
            return player1.getSign()
        }
    }

    const reset = () =>{
        round = 1
        isover = false
    }

    const isFieldOccupied = (index) =>{
        return gameBoard.getField(index) !== "" ? true : false
    }

    return {playRound,reset,isFieldOccupied} 
})()