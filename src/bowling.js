
let game = []
let round = []

//Generates random number of pins knocked down
ballRoll = () => {
    let knockedDownPins = Math.floor(Math.random() * 11)
    return knockedDownPins
}

//Validates what kind of turn cam out of the two rolls
turnValidation = (roundRoll) => {
    let firstRoll = roundRoll[0]
    let secondRoll = roundRoll[1]
    let leftOver = Math.abs(roundRoll[0] - 10);
    let isOf = firstRoll + secondRoll

    if (firstRoll == 10) { //Strike
        roundRoll = ["X", "", 10]
        return roundRoll
    } else if (secondRoll == leftOver) { //Spare
        roundRoll = [firstRoll, "/", 10]
        return roundRoll
    } else if (isOf != 10 && secondRoll <= leftOver) { //Open Frrame
        roundRoll = [firstRoll, secondRoll, isOf]
        return roundRoll
    }
}

//Rolls ball twice
turn = () => {
    for (let i = 0; i <= 1; i++) {
        round[i] = ballRoll()
    }
    return round
}

//returns match scoorre
getScore = () => {
    return score
}

//Starts game
startGame = (rounds) => { //starts the game and fills up the score board
    for (let i = 0; i < rounds + 1; i++) {
        game[i] = turnValidation(turn())
    }
    return game
}



//let bowlingMatch = new BowlingMatch(10, 0)
//bowlingMatch.startGame()

console.table(startGame(10))


//Open-frame = not all 10 pins knocked down in the 2 rolls in the turn
//    an openframe sums all the pins you managed to knock on the 2 rolls as the #frame score

//strike = knock all 10 pins with the firsrt roll [X]
//    a spare sums 10 to yout next two rolls (next frame)

//spare = knock all 10 pins in two rolls         [/]
//    a spare sums your next frame roll to your previous frame score