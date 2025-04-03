const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let humanscore = 0;
let computerscore = 0;

function getComputerChoice() {
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function getHumanChoice() {
    return new Promise(resolve => {
        readline.question("Enter your choice (rock, paper, or scissors): ", answer => {
            resolve(answer.toLowerCase());
        });
    });
}

async function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
        return;
    }

    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanscore++;
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
        computerscore++;
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    }
}

async function playgame() {
    humanscore = 0;
    computerscore = 0;

    for (let i = 0; i < 5; i++) {
        const humanSelection = await getHumanChoice();
        const computerSelection = getComputerChoice();
        await playRound(humanSelection, computerSelection);
    }

    if (humanscore > computerscore) {
        console.log(`you won the game! final score: You ${humanscore} - Computer ${computerscore}`);
    } else if (computerscore > humanscore) {
        console.log(`you lost the game! final score: You ${humanscore} - Computer ${computerscore}`);
    } else {
        console.log(`the game was a tie! final score: You ${humanscore} - Computer ${computerscore}`);
    }

    readline.close();
}

playGame();
