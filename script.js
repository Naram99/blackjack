const startBtn = document.querySelector("#startBtn");
const rulesBtn = document.querySelector("#rulesBtn");

startBtn.addEventListener("click", () => {
    const numberOfPlayers = document.querySelector("#numberOfPlayers").value;
    const numberOfDecks = document.querySelector("#numberOfDecks").value;
    const holecard = document.querySelector("#holecard").checked;

    const game = new Game(numberOfDecks, numberOfPlayers, holecard);
})
