"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let numOfRows = 30;
let numOfCharms = 30;
let numId = 1;
let direction;
let runFlag = false;
let snakeLinkFlag = false;
let youLostFlag = false;
let newSnakeLink;
let headOfTheSnake = 434;
let snake = [];
let eventHolder = null;
let rotateDeg = 360;
let scoreCounter = 0;
let stepsCounter = 0;
let playGround = document.querySelector("#playGround");
let snakeBord = document.querySelector("#snakeBord");
let foldedDiv = document.querySelector("#foldedDiv");
let scoreBox = document.querySelector("#scoreBox");
let minSteps = document.querySelector("#minSteps");
let playerSteps = document.querySelector("#playerSteps");
let greenSnake = document.querySelector("#greenSnake");
const rows = [];
createCharms();
function createCharms() {
    for (let r = 0; r < numOfRows; r++) {
        const row = [];
        for (let b = 0; b < numOfCharms; b++) {
            const charm = document.createElement("div");
            charm.id = "charm" + numId;
            charm.classList.add("charmClass");
            /* charm.innerHTML = numId.toString(); */
            row.push(charm);
            numId++;
        }
        rows.push(row);
    }
    /* return rows;
  } */
    rows.forEach((element) => {
        console.log(element);
        const createRow = document.createElement("div");
        createRow.classList.add("createRow", "charmBgc");
        element.forEach((charm) => {
            console.log(charm);
            createRow === null || createRow === void 0 ? void 0 : createRow.appendChild(charm);
        });
        snakeBord === null || snakeBord === void 0 ? void 0 : snakeBord.appendChild(createRow);
    });
}
createSnake();
function createSnake() {
    for (let i = headOfTheSnake; i < 438; i++) {
        const snakeLink = document.querySelector(`#charm${i}`);
        snakeLink.classList.add("snakeLink");
        snake.push(snakeLink);
        console.log("snake ", snake);
    }
    createSnakeLink();
}
document.addEventListener("keydown", (ev) => {
    if (youLostFlag)
        return;
    eventHolder = ev;
    if (!direction) {
        greenSnake.style.display = "block";
        eventHandler(eventHolder);
    }
});
function eventHandler(ev) {
    if (runFlag)
        return;
    switch (ev.key) {
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            if (!direction) {
                headOfTheSnake += 3;
                for (let i = 0; i < 2; i++) {
                    const temp = snake[i];
                    snake[i] = snake[3 - i];
                    snake[3 - i] = temp;
                }
            }
            direction = "right";
            break;
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
    }
    eventHolder = null;
    checkRendering();
}
function checkRendering() {
    if (runFlag)
        return;
    const collision = snake.slice(2);
    console.log(collision);
    if (direction === "left") {
        headOfTheSnake--;
        console.log(headOfTheSnake);
        if (headOfTheSnake === extractId(snake[1]))
            headOfTheSnake += 2;
        if (headOfTheSnake % numOfCharms === 0)
            youLost();
        if (collision.some((elem) => extractId(elem) === headOfTheSnake))
            youLost();
    }
    if (direction === "right") {
        headOfTheSnake++;
        if (headOfTheSnake === extractId(snake[1]))
            headOfTheSnake -= 2;
        if (headOfTheSnake % numOfCharms === 1)
            youLost();
        if (collision.some((elem) => extractId(elem) === headOfTheSnake))
            youLost();
    }
    if (direction === "up") {
        headOfTheSnake -= numOfRows;
        if (headOfTheSnake === extractId(snake[1]))
            headOfTheSnake += numOfRows * 2;
        if (Math.floor(headOfTheSnake / (numOfRows + 1)) < 0)
            youLost();
        if (collision.some((elem) => extractId(elem) === headOfTheSnake))
            youLost();
    }
    if (direction === "down") {
        headOfTheSnake += numOfCharms;
        if (headOfTheSnake === extractId(snake[1]))
            headOfTheSnake -= numOfRows * 2;
        if (headOfTheSnake - numOfRows * numOfCharms > 0)
            youLost();
        if (collision.some((elem) => extractId(elem) === headOfTheSnake))
            youLost();
    }
    if (direction)
        renderSnake();
}
function renderSnake() {
    return __awaiter(this, void 0, void 0, function* () {
        if (runFlag)
            return;
        runFlag = true;
        const snakeLink = document.querySelector(`#charm${headOfTheSnake}`);
        snakeLink.classList.add("snakeLink");
        snake.unshift(snakeLink);
        if (snakeLink !== newSnakeLink) {
            const removeLink = snake.pop();
            removeLink.classList.remove("snakeLink");
            removeLink.classList.add("charmBgc");
            stepsCounter++;
            playerSteps.textContent = stepsCounter.toString();
        }
        else {
            snakeLinkFlag = false;
            let minStepsValue = parseInt(minSteps.textContent, 10);
            const addToScore = Math.floor((minStepsValue / stepsCounter) * 10);
            scoreCounter += addToScore;
            scoreBox.textContent = scoreCounter.toString();
            stepsCounter = 0;
        }
        yield wait(100);
    });
}
function wait(milisec) {
    return new Promise((resolve) => setTimeout(() => {
        runFlag = false;
        if (!snakeLinkFlag)
            createSnakeLink();
        if (eventHolder) {
            eventHandler(eventHolder);
        }
        else {
            checkRendering();
        }
        resolve();
    }, milisec));
}
function createSnakeLink() {
    snakeLinkFlag = true;
    const newLinkIdNum = Math.floor(Math.random() * 900);
    console.log(newLinkIdNum);
    newSnakeLink = document.querySelector(`#charm${newLinkIdNum}`);
    if (snake.some((elem) => elem === newSnakeLink))
        createSnakeLink();
    newSnakeLink.classList.add("snakeLink");
    calculateMinSteps(newLinkIdNum);
}
function calculateMinSteps(newLinkIdNum) {
    const headOfTheSnakeRow = Math.floor(headOfTheSnake / numOfRows);
    const newLinkIdNumRow = Math.floor(newLinkIdNum / numOfRows);
    const newLinkIdNumColumn = newLinkIdNum - newLinkIdNumRow * numOfCharms;
    const headOfTheSnakeColumn = headOfTheSnake - headOfTheSnakeRow * numOfCharms;
    const horizontalSteps = Math.abs(newLinkIdNumColumn - headOfTheSnakeColumn);
    const verticalSteps = Math.abs(newLinkIdNumRow - headOfTheSnakeRow);
    const distance = horizontalSteps + verticalSteps;
    minSteps.textContent = distance.toString();
}
function extractId(snakeLink) {
    const id = snakeLink.getAttribute("id");
    const num = id ? Number(id.replace("charm", "")) : NaN;
    console.log(num);
    return num;
}
function youLost() {
    if (youLostFlag)
        return;
    youLostFlag = true;
    /* greenSnake.style.display = "none"; */
    document.removeEventListener("keydown", eventHandler);
    direction = "";
    greenSnake.style.visibility = "hidden";
    snakeBord.style.transform = `rotateX(${rotateDeg}deg)`;
    rotateDeg += 360;
    setTimeout(() => {
        snake.forEach((element) => {
            element.classList.remove("snakeLink");
        });
        snake = [];
        rows.forEach((row) => {
            row.forEach((charm) => {
                if (charm.classList.contains("charmBgc"))
                    charm.classList.remove("charmBgc");
            });
        });
        scoreCounter = 0;
        stepsCounter = 0;
        playerSteps.textContent = stepsCounter.toString();
        scoreBox.textContent = scoreCounter.toString();
        newSnakeLink.classList.remove("snakeLink");
        headOfTheSnake = 434;
        createSnake();
        setTimeout(() => {
            greenSnake.style.visibility = "visible";
            youLostFlag = false;
        }, 3000);
    }, 1500);
    /* playGround.style.transform = "rotateX(360deg)"; */
    /* backSection.style.transform = "rotateX(360deg)"; */
    console.log("you lost");
}
