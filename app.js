const startScreen = document.querySelector("#overlay"); 
const startGame = document.querySelectorAll(".btn__reset")[0]; 
const qwerty = document.querySelector("#qwerty"); 
const phrase = document.querySelector("#phrase");
let missed = 0;

let phrases = [                             
    "Money doesnt grow on trees",
    "What goes up must come down",
    "Jack of all trades master of none",
    "Between a rock and a hard place",
    "Two down one to go",
    "A fool and his money are soon parted",
    "Dont look a gift horse in the mouth",
    "You cant judge a book by its cover",
    "Hard pill to swallow",
    "Raining cats and dogs"
];

// Select random phrases when the person clicks the start game button

function getRandomPhraseAsArray(arr) {
    var a =  arr[Math.floor(Math.random() * 6)];
    const b = [];
    
    for (let i = 0; i < a.length; i += 1) {
        b.push(a.charAt(i));
    }

    return b
}

// Put the hidden phrase on the page/board

function addPhraseToDisplay(arr){

    for (let i = 0; i < arr.length; i += 1) {
        const letter = document.querySelector("#phrase ul");
        const li = document.createElement("li");
        
        letter.appendChild(li);
        li.textContent = arr[i].toUpperCase();

        if (li.textContent !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
    }
}

// Start the game 

startGame.addEventListener("click", () => {
    startScreen.style.display = "none";

// Resets the phrases to guess

    const letter = document.querySelector("#phrase ul");
        letter.textContent = "";

// Resets styling of the buttons to default

    const reset_qwerty = document.querySelectorAll(".keyrow button");

    for (let i = 0; i < reset_qwerty.length; i += 1) {
        reset_qwerty[i].className = " ";
        reset_qwerty[i].removeAttribute("disabled");
    }

// Resets hearts images to default (5 lifes)

    const tries = document.querySelectorAll(".tries");
            
    for (let i = 0; i < tries.length; i += 1) {
        tries[i].firstChild.setAttribute("src","images/liveHeart.png");
    }
        missed = 0;
    let a = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(a);
});


// Checks the letter

function checkLetter (chosen_letter) {
    const selected_letter = chosen_letter.toUpperCase();
    const letters = document.querySelectorAll(".letter");
    let letterFound = "null";

    for (let i = 0; i < letters.length; i += 1) {
         if (selected_letter === letters[i].textContent) {
            letterFound = selected_letter;
            letters[i].className += " show";
        }
    }
    return letterFound
}

// Checks if the player guessed the correct answer

function checkWin() {
    const letters = document.querySelectorAll(".letter");
    const shown_letters = document.querySelectorAll(".show");
    const status_message = startScreen.firstChild.nextElementSibling;
    const cta_replay = startScreen.lastChild.previousElementSibling;
    
    if (letters.length === shown_letters.length) {
        startScreen.style.display = "flex";
        startScreen.className = "win";
        status_message.textContent = "YOU WON!!!";
        cta_replay.textContent = "Play Again";
    } 
    
    if (missed >= 5) {
        startScreen.style.display = "flex";
        startScreen.className = "lose";
        status_message.textContent = "YOU LOST!!!";
        cta_replay.textContent = "Play Again";
    }
}

// Gameplay event starter game

qwerty.addEventListener("click", (event) => {

    const a = event.target;
    const b = a.textContent;

    if (a.tagName == "BUTTON") {
        a.className = "chosen";
        a.setAttribute("disabled", true);
        const c = checkLetter(b);

        if (c === "null") {
            a.className += " chosen_mistaken"; 
            const tries = document.querySelectorAll(".tries");
            tries[missed].firstChild.setAttribute("src","images/lostHeart.png");
            missed += 1;
        }  
    }
    checkWin();
});