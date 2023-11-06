const blockSize = 40;
const board = 400;

const Board = document.querySelector('#Board');

const Game = document.querySelector('#Game');

const fastShip = document.getElementById('FastShip');
const bullet = document.getElementById('Bullet');
const ship = document.getElementById('Ship');

const slowShip = document.getElementById('SlowShip');

const button = document.querySelector('.button');

const scoreDisplay = document.querySelector('#Score');

let shipPosition = 200;
let bulletPositionX = shipPosition;
let bulletPositionY = 250;
let bulletInterval = null;
let bottomPosition = 2;
let score = 0;



button.addEventListener("mousedown",function(event){
    button.style.display = 'none'; 

    document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && shipPosition + 20 < board) {
        shipPosition += 15;
        ship.style.left = shipPosition + 'px';
        Bullet();
    } else if (event.key === "ArrowLeft" && shipPosition - 20 > 0) {
        shipPosition -= 15;
        ship.style.left = shipPosition + 'px';
        Bullet();
    } else if (event.key === " ") {
        if (bulletInterval === null) {
            bulletPositionX = shipPosition;
            bullet.style.left = bulletPositionX + 'px';
            bullet.style.top = bulletPositionY + 'px';
            bulletInterval = setInterval(Shoot, 5);
        }
    }
    });

    function Shoot() {
    bulletPositionY -= 10;
    bullet.style.top = bulletPositionY + 'px';
    if (bulletPositionY <= 0) {
        clearInterval(bulletInterval);
        bulletInterval = null;
        bulletPositionY = 250;
        bullet.style.top = bulletPositionY + 'px';
    }
    checkCollision(bullet, cloneSlowShips);
    checkCollision(bullet, cloneFastShips);
    }


    function Bullet() {
    bulletPositionX = shipPosition;
    bullet.style.left = bulletPositionX + 'px';
    bullet.style.top = bulletPositionY + 'px';
    }




    let cloneSlowShips = []; 
    function CloneShip(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const clone = slowShip.cloneNode(true);
                clone.style.left = (i * 45) + 'px';
                Board.append(clone);
                cloneSlowShips.push(clone);
                const timerID = setInterval(() => moveCloneSlowShip(clone), 50); 
                clone.timerID = timerID;
            }, Math.random() * 10000); 
        }
    }
    
    function moveCloneSlowShip(clone) {
        const bottomPosition = parseInt(clone.style.bottom) || 0;
        clone.style.bottom = (bottomPosition - 1) + 'px';
        if (bottomPosition >= 200) {
            clearInterval(clone.timerID);
        }

    }
    CloneShip(9);

    let cloneFastShips = []; 
    function CloneFastShip(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const cloneFast = fastShip.cloneNode(true);
                cloneFast.style.left = (i * 45) + 'px';
                Board.append(cloneFast);
                cloneFastShips.push(cloneFast); 
                const timeID = setInterval(() => moveCloneFastShip(cloneFast), 20);
                cloneFast.timeID = timeID;
            }, Math.random() * 20000); 
        }
    }
    
    function moveCloneFastShip(cloneFast) {
        const bottomPosition = parseInt(cloneFast.style.bottom) || 0;
        cloneFast.style.bottom = (bottomPosition - 1) + 'px';
        if (bottomPosition >= 200) {
            clearInterval(cloneFast.timerID);
        }
    }
    CloneFastShip(4);

    function checkCollision(bullet, clones) {
        const bulletRect = bullet.getBoundingClientRect();
    
        clones.forEach(clone => {
            const cloneRect = clone.getBoundingClientRect();
            const points = parseInt(clone.dataset.points) || 0;
    
            if (
                bulletRect.left < cloneRect.right &&
                bulletRect.right > cloneRect.left &&
                bulletRect.top < cloneRect.bottom &&
                bulletRect.bottom > cloneRect.top
            ) {
                clone.remove();
                score += points; 
                scoreDisplay.textContent = `Score: ${score}`; 
            }
        });
    }
   
    
});






/*
Ship.addEventListener("mousemove", function(event){
    Ship.innerHTML=
    `clientX - ${event.clientX} <br> clientY- ${event.clientY}`; 
});
*/