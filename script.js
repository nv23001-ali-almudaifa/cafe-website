const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let humanScore = 0;
let computerScore = 0;

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
        humanScore++;
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
        computerScore++;
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    }
}

async function playGame() {
    humanScore = 0;
    computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const humanSelection = await getHumanChoice();
        const computerSelection = getComputerChoice();
        await playRound(humanSelection, computerSelection);
    }

    if (humanScore > computerScore) {
        console.log(`You won the game! Final score: You ${humanScore} - Computer ${computerScore}`);
    } else if (computerScore > humanScore) {
        console.log(`You lost the game! Final score: You ${humanScore} - Computer ${computerScore}`);
    } else {
        console.log(`The game was a tie! Final score: You ${humanScore} - Computer ${computerScore}`);
    }

    readline.close();
}

playGame();
