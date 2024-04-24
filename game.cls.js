class Game {
    deck;
    #players = [];
    holecard;

    static template = `
        <div class="dealer-ct" id="dealerCt"></div>
        <div class="players-ct" id="playersCt"></div>
        <div class="action-controls-ct">
            <button id="hitBtn" class="main-btn">Hit</button>
            <button id="stayBtn" class="main-btn">Stay</button>
            <button id="doubleBtn" class="main-btn">Double</button>
            <button id="splitBtn" class="main-btn">Split</button>
        </div>
    `;

    constructor(numberOfDecks, numberOfPlayers, holecard) {
        this.deck = new Deck(numberOfDecks, "");

        document.querySelector("#content").innerHTML = Game.template;

        for(let i = 0; i < numberOfPlayers; i++) {
            let player = new Player(this.deck);
            this.#players.push(player);
        }

        let dealer = new Player(this.deck, true, holecard);
        this.#players.push(dealer);

        this.holecard = holecard;

        this.roundStart(this.holecard);

        this.createControlBtns();
    }

    roundStart(holecard) {
        this.#players.forEach(player => {
            player.hit();
        })
        for(let i = 0; i < (this.#players.length - 1); i++) {
            this.#players[i].hit();
        }
        if(holecard) {
            this.#players[this.#players.length - 1].hit();
        }

        this.activePlayerNumber = 0;
        this.#players[this.activePlayerNumber].activate();
    }

    createControlBtns() {
        this.hitBtn = document.querySelector("#hitBtn");
        this.stayBtn = document.querySelector("#stayBtn");
        this.doubleBtn = document.querySelector("#doubleBtn");
        this.splitBtn = document.querySelector("#splitBtn");

        this.hitBtn.addEventListener("click", () => {
            if(this.#players[this.activePlayerNumber].handValue < 21) {
                this.#players[this.activePlayerNumber].hit();
                if(this.#players[this.activePlayerNumber].handValue >= 21)
                    this.stayBtn.click();
            }
        })

        this.stayBtn.addEventListener("click", () => {
            this.#players[this.activePlayerNumber].deActivate();

            this.activePlayerNumber++;

            if(!this.#players[this.activePlayerNumber].dealer)
                this.#players[this.activePlayerNumber].activate();
            else
                this.dealerPlay();        
        })

        this.doubleBtn.addEventListener("click", () => {
            if(this.#players[this.activePlayerNumber].handValue < 21) {
                this.#players[this.activePlayerNumber].hit();
                this.stayBtn.click();
            }
        })
    }

    dealerPlay() {
        let interval = setInterval(() => {
            if(this.#players[this.activePlayerNumber].handValue < 17)
                this.#players[this.activePlayerNumber].hit();
            else{
                clearInterval(interval);
                this.resultDisplay();

                this.#players.forEach(player => {
                    player.hand = [];
                })
                
                setTimeout(() => {
                    this.roundStart(this.holecard)
                }, 3000)
            }
        }, 1000);
        

    }

    resultDisplay() {
        this.#players.forEach(player => {
            if(!player.dealer) {
                if((player.handValue !== "BUST" 
                    && this.#players[this.#players.length - 1].handValue 
                        === "BUST") 
                    || (player.handValue !== "BUST" && player.handValue > 
                        this.#players[this.#players.length - 1].handValue)) {
                            player.handValue = "WON";
                } else if (player.handValue === "BUST" 
                            || player.handValue < 
                            this.#players[this.#players.length - 1].handValue) {
                            player.handValue = "LOST";
                } else if (player.handValue === 
                    this.#players[this.#players.length - 1].handValue) {
                            player.handValue = "DRAW";
                }
            }
            player.handDisplayUpdate();
        })
    }
}

