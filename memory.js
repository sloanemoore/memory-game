let controller = {
    userGuess: [],
    numGuesses: 0,
    numMatches: 0,
    passUserGuess: function() {
         if (this.userGuess.length === 2) { 
            model.checkUserGuess()
         }

    },
    init: function() {
        model.generateAnimalLocs();
        let cards = document.getElementsByTagName("img");
        for (let i = 0; i < (model.numCardPairs * 2); i++) {
            cards[i].onclick = view.showCard;       
        }
}
    };

let view = {
    showCard: function(eventObj) {
        let card = eventObj.target;
        let cardNum = Number(card.id.slice(4)); 
        for (let i = 0; i < model.numCardPairs; i++) {
            if (model.cards[i].matchPair.includes(cardNum)) {
                let cardPic = model.cards[i].image;
                card.src = cardPic;
            }
        }
        controller.userGuess.push(cardNum);
        controller.passUserGuess();
    },
    hideCard: function() {
        for (let i = 0; i < controller.userGuess.length; i++) {
            let cardNum = "card" + String(controller.userGuess[i]).padStart(2,"0");
            let pic = document.getElementById(cardNum);
            pic.src = model.cardBackImage;
        }
        controller.userGuess = [];
    },
    showNumGuesses: function() {
        let guessDisplay = document.getElementById("guesses");
        guessDisplay.innerHTML = controller.numGuesses;
    },
    showScore: function(score) {
        let scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = model.score;
    },
    showWinModal: function() {
        let modal = document.getElementById("win");
        let closeButton = document.getElementsByClassName("closeButton")[0];
        let numCardPairs = document.getElementById("numCardPairs");
        numCardPairs.innerHTML = model.numCardPairs;
        let numGuesses = document.getElementById("numGuesses");
        numGuesses.innerHTML = controller.numGuesses;
        console.log(numGuesses);
        console.log(numCardPairs);
        modal.style.display = "block";
        closeButton.addEventListener("click", function() { document.getElementById("win").style.display = "none";});
    }

};

let model = {
    numCardPairs: 6, 
    score: 0,
    cardBackImage: "MemoryCardBack.png",
    cards: [{
        type: "elephant",
        image: "elephant.png",
        matched: false,
    },
    {
        type: "giraffe",
        image: "giraffe.png",
        matched: false,
    },
    {
        type: "lion",
        image: "lion.png",
        matched: false,
    },{
        type: "turtle",
        image: "turtle.png",
        matched: false,
    },
    {
        type: "whale",
        image: "whale.png",
        matched: false,
    },
    {
        type: "zebra",
        image: "zebra.png",
        matched: false,
    }
     ],
    checkUserGuess: function(userGuess) { // this seems to work
        let isUserGuessMatch= false;
        for (let i = 0; i < this.numCardPairs; i++) {
            if (this.cards[i].matchPair.includes(controller.userGuess[0]) && this.cards[i].matchPair.includes(controller.userGuess[1])) {
                isUserGuessMatch = true;
                this.cards[i].matched = true;
                }
            }; 
        this.nextCardActions(isUserGuessMatch);
     },

     checkWhetherGameIsWon: function() {
        if (this.score === this.numCardPairs) {
            view.showWinModal(); // add modal message
     }
    },

    nextCardActions: function(isUserGuessMatch) {
        if (isUserGuessMatch) { // this section seems to work
            this.score = this.score + 1;
            controller.numGuesses = controller.numGuesses + 1;
            controller.userGuess = [];
            view.showScore();
            view.showNumGuesses();
            this.checkWhetherGameIsWon();
        }
        else {
            setTimeout(view.hideCard, 500);
            controller.numGuesses = controller.numGuesses + 1;
            view.showNumGuesses();
        }
    },


    generateAnimalLocs: function() {
        let locArray = [];
        while (locArray.length < (model.numCardPairs * 2)) {
            let loc = Math.floor(Math.random() * 12);
            if (!locArray.includes(loc)) {
                locArray.push(loc);
            };
        };
        let locArrayPairs = [];
        for (let i = 0; i < 12; i += 2) {
            let pair = []
            pair.push(locArray[i]);
            pair.push(locArray[i+1]);
            locArrayPairs.push(pair);
        };
        for (let i = 0; i < this.numCardPairs; i++) {
            console.log(locArrayPairs[i]);
            this.cards[i].matchPair = locArrayPairs[i];
        }
    },
};

window.onload = controller.init;


