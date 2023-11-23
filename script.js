"use strict"

//Document Query Selectors
const namePlayer2 = document.querySelector("#name--1")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const btnNew = document.querySelector(".btn--new")
const btn1Player = document.querySelector(".btn--1player")
const btn2Player = document.querySelector(".btn--2player")
const scoreP0 = document.querySelector("#score--0")
const scoreP1 = document.querySelector("#score--1")
const currentP0 = document.querySelector("#current--0")
const currentP1 = document.querySelector("#current--1")
const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")
const dice = document.querySelector(".dice")

let activePlayer,
   scoreCurrent,
   scores,
   playingGame,
   btnActive,
   botPlayer = false

const btnGameMode = function (show) {
   if (show) {
      btn1Player.classList.add("hidden")
      btn2Player.classList.add("hidden")
   } else {
      btn1Player.classList.remove("hidden")
      btn2Player.classList.remove("hidden")
   }
}

//Making a Random Number
const randomDice = function () {
   const numberDice = Math.trunc(Math.random() * 6) + 1
   dice.src = `Image/dice-${numberDice}.png`
   return numberDice
}

//Return To Initial State
const init = function () {
   scores = [0, 0]
   scoreCurrent = 0
   scoreP0.textContent = 0
   scoreP1.textContent = 0
   currentP0.textContent = 0
   currentP1.textContent = 0
   activePlayer = 0

   playingGame = true
   btnActive = true

   dice.classList.add("hidden")
   player0.classList.remove("player--winner")
   player1.classList.remove("player--winner")
   player0.classList.add("player--active")
   player1.classList.remove("player--active")
}

//Check Players Score
const checkScore = function () {
   if (scores[activePlayer] >= 100) {
      playingGame = false
      document
         .querySelector(`.player--${activePlayer}`)
         .classList.add("player--winner")
      document

         .querySelector(`.player--${activePlayer}`)
         .classList.remove("player--active")
      dice.classList.add("hidden")
   } else {
      switchPlayer()
      if (botPlayer && !btnActive) {
         setTimeout(ROBOT, 1000)
      }
   }
}

//Hold Player Score
const holdFunction = function () {
   btnGameMode(true)
   scores[activePlayer] += scoreCurrent
   document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]
   checkScore()
}

//Switch Player
const switchPlayer = function () {
   if (botPlayer) {
      btnActive = btnActive === true ? false : true
   }
   document.querySelector(`#current--${activePlayer}`).textContent = 0
   activePlayer = activePlayer === 0 ? 1 : 0
   scoreCurrent = 0
   player0.classList.toggle("player--active")
   player1.classList.toggle("player--active")
}

//Start Game For The First Time
init()

//Button Functions
btnRoll.addEventListener("click", function () {
   if (playingGame && btnActive) {
      btnGameMode(true)
      let numberDice = randomDice()
      dice.classList.remove("hidden")
      if (numberDice !== 1) {
         scoreCurrent += numberDice
         document.querySelector(`#current--${activePlayer}`).textContent =
            scoreCurrent
      } else {
         switchPlayer()
         if (botPlayer) {
            setTimeout(ROBOT, 1000)
         }
      }
   }
})

btnHold.addEventListener("click", function () {
   if (playingGame && btnActive) {
      holdFunction()
   }
})

btnNew.addEventListener("click", function () {
   if (btnActive || !playingGame) {
      btnGameMode(false)
      init()
   }
})

btn1Player.addEventListener("click", function () {
   botPlayer = true
   namePlayer2.textContent = "BOT"
   init()
})

btn2Player.addEventListener("click", function () {
   botPlayer = false
   namePlayer2.textContent = "Player 2"
   init()
})

//ROBOT Game Mode
const ROBOT = function () {
   if (playingGame) {
      let numberDice = randomDice()
      scoreCurrent += numberDice
      document.querySelector(`#current--${activePlayer}`).textContent =
         scoreCurrent
      dice.classList.remove("hidden")
      let totalScore = scoreCurrent + scores[activePlayer]
      if (numberDice !== 1 && scoreCurrent <= 14 && totalScore < 100) {
         setTimeout(ROBOT, 500)
      } else if ((scoreCurrent > 14 || totalScore >= 100) && numberDice !== 1) {
         setTimeout(function () {
            holdFunction()
         }, 500)
      } else {
         switchPlayer()
      }
   }
}
