

let opened = [],
    matched = [],
    moves = 0,
    starCount = 3,
    time,
    minutes = 0,
    seconds = 0,
    timeStart = false;

const deckCards = ['Agility.png', 'Agility.png', 'Boat.png', 'Boat.png', 'Citizenship.png', 'Citizenship.png', 'Hack.png', 'Hack.png', 'Nerd-Rage.png', 'Nerd-Rage.png', 'Nuka-Cola.png', 'Nuka-Cola.png', 'Robotics.png', 'Robotics.png', 'Shock.png', 'Shock.png'],
    deck = document.querySelector('.deck'),
    modal = document.getElementById('modal'),
    reset = document.querySelector('.resetBtn'),
    playAgain = document.querySelector('.playAgainBtn'),
    movesCount = document.querySelector('.moveCounter'),
    star = document.getElementById("starRating").querySelectorAll('.star'),
    timeCounter = document.querySelector('.timer');

function shuffleArr(arr) {
    // Фишер-Йейтс
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function startGame() {
    const shuffledDeck = shuffleArr(deckCards);
    for (let i = 0; i < shuffledDeck.length; i++) {
        const liTag = document.createElement('li');
        liTag.classList.add('card');
        const addImg = document.createElement('img');
        liTag.appendChild(addImg);
        addImg.setAttribute('src', './image/' + shuffledDeck[i]);
        addImg.setAttribute('alt', 'vault boy');
        deck.appendChild(liTag);
    }
}

startGame();

function removeCard() {
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

function timer() {
    time = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeCounter.innerHTML = '<i class="fa fa-hourglass-start"></i>' + 'Время: ' + minutes + ' мин ' + seconds + ' сек';
    }, 1000);
}

function stopTime() {
    clearInterval(time);
}

function resetGame() {
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + ' Время: 00:00';
    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    moves = 0;
    movesCount.innerHTML = 0;
    matched = [];
    opened = [];
    removeCard();
    startGame();
}

function movesCounter() {
    movesCount.innerHTML++;
    moves++;
}

function starRating() {
    if (moves === 14) {
        star[2].firstElementChild.classList.remove('fa-star');
        starCount--;
    }
    if (moves === 18) {
        star[1].firstElementChild.classList.remove('fa-star');
        starCount--;
    }
}

function compareTwo() {
    if (opened.length === 2) {
        document.body.style.pointerEvents = 'none';
    }
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        match();
    }
    else if (opened.length === 2 && opened[0].src != opened[1].src) {
        noMatch();
    }
}

function match() {
    setTimeout(function () {
        opened[0].parentElement.classList.add('match');
        opened[1].parentElement.classList.add('match');
        matched.push(...opened);
        document.body.style.pointerEvents = 'auto';
        winGame();
        opened = [];
    }, 600);
    movesCounter();
    starRating();
}

function noMatch() {
    setTimeout(function () {
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];
    }, 700);
    movesCounter();
    starRating();
}




function addStats() {
    const stats = document.querySelector('.modalContent');
    for (let i = 1; i <= 3; i++) {
        const statsElements = document.createElement('p');
        statsElements.classList.add('stats');
        stats.appendChild(statsElements);
    }
    let p = stats.querySelectorAll('p.stats');
    p[0].innerHTML = 'Time: ' + minutes + ' min ' + seconds + ' sec';
    p[1].innerHTML = 'Steps: ' + moves;
    p[2].innerHTML = 'Rating: ' + starCount + ' out of 3';
}

function displayModal() {
    const modalClose = document.getElementsByClassName('close')[0];
    modal.style.display = 'block';
    modalClose.onclick = function () {
        modal.style.display = 'none';
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function winGame() {
    if (matched.length === 16) {
        stopTime();
        addStats();
        displayModal();
    }
}

deck.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
        console.log(evt.target.nodeName + ' was clicked');
        if (timeStart === false) {
            timeStart = true;
            timer();
        }
        flipCard();
    }

    

    function flipCard() {
        evt.target.classList.add('flip');
        addToOpened();
    }

    function addToOpened() {
        if (opened.length === 0 || opened.length === 1) {
            opened.push(evt.target.firstElementChild);
        }
        compareTwo();
    }
});

reset.addEventListener('click', resetGame);
playAgain.addEventListener('click', function () {
    modal.style.display = 'none';
    resetGame();
});

