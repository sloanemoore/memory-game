let controller = {
    userGuess: Array(2),
    numGuesses: 0,
    numMatches: 0,
    getUserGuess: function(eventObj) {
        let card = eventObj.target;
        let cardNum = Number(card.id.slice(4));
        console.log(cardNum);
        this.userGuess.push(cardNum);
        console.log(this.userGuess); // push this to user guess --this doesn't work right now
    },
    checkUserGuess: function(userGuess) {
        // finish this function
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
        let cardNum = Number(card.id.slice(4)); // push this to user guess
        for (let i = 0; i < model.numCardPairs; i++) {
            if (model.cards[i].matchPair.includes(cardNum)) {
                let cardPic = model.cards[i].image;
                card.src = cardPic;
            }
        }
        controller.numGuesses = controller.numGuesses + 1;
    },
    showNumGuesses: function(numGuesses) {
        let guessDisplay = document.getElementById("guesses");
        guessDisplay.innerHTML = numGuesses;
    },
    showScore: function(score) {
        let scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = score;
    }
};

let model = {
    numCardPairs: 6, 
    score: 0,
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
    determineWhetherCardsAreMatched: function(userGuess) {
        for (let i = 0; i < this.numCardPairs; i++) {
            if (this.cards[i].matchPair.includes(userGuess)) {
                this.cards[i].matched = true;
                this.score = this.score + 1;
                };
        };
     },
     determineWhetherGameIsWon: function() {
        if (this.score === this.numCardPairs) {
            console.log("You won!")
     };
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



// ******* TESTS ******* //

