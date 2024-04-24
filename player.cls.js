class Player {
    hand = [];
    handValue = 0;
    deck;
    dealer = false;
    holecard;

    constructor(deck, dealer = false, holecard = false) {
        this.deck = deck;

        if(dealer)
            this.dealer = dealer;

        this.handDisplay = document.createElement("div");
        this.handDisplay.classList.add("player-hand-ct");

        if(!dealer)
            document.querySelector("#playersCt").appendChild(this.handDisplay);

        if(dealer)
            document.querySelector("#dealerCt").appendChild(this.handDisplay);

        this.holecard = holecard;
    }

    hit() {
        this.hand.push(this.deck.pack.pop());

        this.handValueUpdate();
        this.handDisplayUpdate();
    }

    handValueUpdate() {
        this.handValue = 0;
        this.ace = 0;
        this.hand.forEach(card => {
            this.handValue += card.value;
            if(card.value === 11)
                this.ace++;
        })

        if(this.dealer && this.holecard && this.hand.length === 2)
            this.handValue = this.hand[0].value;

        if(this.ace > 0 && this.handValue > 21) {
            for(let i = 0; i < this.ace; i++)
                this.handValue -= 10;
        }

        if(this.handValue > 21)
            this.handValue = "BUST"
    }

    handDisplayUpdate() {
        this.handDisplay.innerHTML = `<div class="hand-display"></div>`;
        if(this.dealer && this.holecard && this.hand.length === 2) {
            this.handDisplay.querySelector(".hand-display").innerHTML += `
                <div class="card-display">
                    ${this.hand[0].name}<img src="assets/${this.hand[0].picture}" class="card-pip" />
                </div>
            `;
        } else {
            this.hand.forEach(card => {
                this.handDisplay.querySelector(".hand-display").innerHTML += `
                    <div class="card-display">
                        ${card.name}<img src="assets/${card.picture}" class="card-pip" />
                    </div>
                `;
            })
        }
        this.handDisplay.innerHTML += `
            <div class="hand-value">${this.handValue}</div>
        `;
    }

    activate() {
        this.handDisplay.classList.add("active");
    }

    deActivate() {
        this.handDisplay.classList.remove("active");
    }
}