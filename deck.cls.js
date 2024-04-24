class Deck {
    #pack = [];

    constructor(numberOfDecks, deckType) {
        for(let i = 0; i < numberOfDecks; i++) {
            defaultCardColors.forEach((picture, color) => {
                defaultCardValues.forEach((value, key) => {
                    let card = new Card(color, value, key, picture);
                    this.#pack.push(card);
                })
            })
        }

        this.shuffle();

        let cutter = new Card("cutter", 0);
        this.#pack.splice(
            Math.floor(
                Math.random() * (this.#pack.length * 0.2)) 
                + Math.floor(this.#pack.length * 0.1), 
            0, 
            cutter)
    }

    get pack() {
        return this.#pack;
    }

    shuffle() {
        for(let i = 0; i < this.#pack.length; i++) {
            const oldCard = this.#pack[i];
            const num = Math.floor(Math.random() * this.#pack.length);
            this.#pack[i] = this.#pack[num];
            this.#pack[num] = oldCard;
        }
    }
}

