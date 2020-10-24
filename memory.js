let controller = {
    init: function() {
        model.generateAnimalLocs();
        let cards = document.getElementsByTagName("img");
        for (let i = 0; i < (model.animals.length * 2); i++) {
            cards[i].onclick = view.showCard;
    }
}
};

let view = {
    showCard: function(eventObj) {
        let card = eventObj.target;
        let cardNum = Number(card.id.slice(4));
        for (let i = 0; i < model.animals.length; i++) {
            if (model.animals[i].matchPair.includes(cardNum)) {
                let cardPic = model.animals[i].image;
                card.src = cardPic;
            }
        }
    }
};

let model = {
    animals: [{
        image: "elephant.png",
        matched: false,
    },
    {
        image: "giraffe.png",
        matched: false,
    },
    {
        image: "lion.png",
        matched: false,
    },{
        image: "turtle.png",
        matched: false,
    },
    {
        image: "whale.png",
        matched: false,
    },
    {
        image: "zebra.png",
        matched: false,
    }
     ],
    generateAnimalLocs: function() {
        let locArray = [];
        while (locArray.length < 12) {
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
        for (let i = 0; i < this.animals.length; i++) {
            // console.log(locArrayPairs[i]);
            this.animals[i].matchPair = locArrayPairs[i];
        }
    }
};

window.onload = controller.init;
