const defaultCardColors = new Map();

defaultCardColors.set("hearts", "kor.png");
defaultCardColors.set("spades", "pikk.png");
defaultCardColors.set("diamonds", "karo.png");
defaultCardColors.set("clubs", "treff.png");

const defaultCardValues = new Map();

defaultCardValues.set("A", 11);
defaultCardValues.set("K", 10);
defaultCardValues.set("Q", 10);
defaultCardValues.set("J", 10);
defaultCardValues.set("10", 10);
defaultCardValues.set("9", 9);
defaultCardValues.set("8", 8);
defaultCardValues.set("7", 7);
defaultCardValues.set("6", 6);
defaultCardValues.set("5", 5);
defaultCardValues.set("4", 4);
defaultCardValues.set("3", 3);
defaultCardValues.set("2", 2);

class Card {
    #color;
    #value;
    #name;
    #picture;

    constructor(color, value, name, picture) {
        this.#color = color;
        this.#value = value;
        this.#name = name;
        this.#picture = picture;
    }

    get color() {
        return this.#color;
    }

    get value() {
        return this.#value;
    }

    get name() {
        return this.#name;
    }

    get picture() {
        return this.#picture;
    }
}