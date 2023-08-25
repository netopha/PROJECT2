let numOfRows: number = 30;
let numOfCharms: number = 30;
let numId: number = 1;
let direction: string;
let runFlag: boolean = false;
let snakeLinkFlag: boolean = false;
let youLostFlag: boolean = false;
let newSnakeLink: HTMLDivElement;
let headOfTheSnake: number = 434;
let snake: Array<HTMLDivElement> = [];
let eventHolder: KeyboardEvent | null = null;
let rotateDeg: number = 360;
let scoreCounter: number = 0;
let stepsCounter: number = 0;
let playGround = document.querySelector("#playGround") as HTMLDivElement;
let snakeBord = document.querySelector("#snakeBord") as HTMLDivElement;
let foldedDiv = document.querySelector("#foldedDiv") as HTMLDivElement;
let scoreBox = document.querySelector("#scoreBox") as HTMLDivElement;
let minSteps = document.querySelector("#minSteps") as HTMLDivElement;
let playerSteps = document.querySelector("#playerSteps") as HTMLDivElement;
let greenSnake = document.querySelector("#greenSnake") as HTMLImageElement;
const rows: HTMLDivElement[][] = [];
createCharms();
function createCharms() {
  for (let r = 0; r < numOfRows; r++) {
    const row: HTMLDivElement[] = [];
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
    const createRow: HTMLDivElement = document.createElement("div");
    createRow.classList.add("createRow", "charmBgc");
    element.forEach((charm) => {
      console.log(charm);
      createRow?.appendChild(charm);
    });

    snakeBord?.appendChild(createRow);
  });
}
createSnake();
function createSnake() {
  for (let i: number = headOfTheSnake; i < 438; i++) {
    const snakeLink: HTMLDivElement = document.querySelector(`#charm${i}`)!;
    snakeLink.classList.add("snakeLink");
    snake.push(snakeLink);
    console.log("snake ", snake);
  }
  createSnakeLink();
}

document.addEventListener("keydown", (ev: KeyboardEvent) => {
  if (youLostFlag) return;
  eventHolder = ev;
  if (!direction) {
    greenSnake.style.display = "block";
    eventHandler(eventHolder);
  }
});

function eventHandler(ev: KeyboardEvent) {
  if (runFlag) return;
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
  if (runFlag) return;
  const collision: Array<HTMLDivElement> = snake.slice(2);
  console.log(collision);
  if (direction === "left") {
    headOfTheSnake--;
    console.log(headOfTheSnake);
    if (headOfTheSnake === extractId(snake[1])) headOfTheSnake += 2;
    if (headOfTheSnake % numOfCharms === 0) youLost();
    if (collision.some((elem) => extractId(elem) === headOfTheSnake)) youLost();
  }
  if (direction === "right") {
    headOfTheSnake++;
    if (headOfTheSnake === extractId(snake[1])) headOfTheSnake -= 2;
    if (headOfTheSnake % numOfCharms === 1) youLost();
    if (collision.some((elem) => extractId(elem) === headOfTheSnake)) youLost();
  }
  if (direction === "up") {
    headOfTheSnake -= numOfRows;
    if (headOfTheSnake === extractId(snake[1])) headOfTheSnake += numOfRows * 2;
    if (Math.floor(headOfTheSnake / (numOfRows + 1)) < 0) youLost();
    if (collision.some((elem) => extractId(elem) === headOfTheSnake)) youLost();
  }
  if (direction === "down") {
    headOfTheSnake += numOfCharms;
    if (headOfTheSnake === extractId(snake[1])) headOfTheSnake -= numOfRows * 2;
    if (headOfTheSnake - numOfRows * numOfCharms > 0) youLost();
    if (collision.some((elem) => extractId(elem) === headOfTheSnake)) youLost();
  }
  if (direction) renderSnake();
}
async function renderSnake() {
  if (runFlag) return;
  runFlag = true;
  const snakeLink: HTMLDivElement = document.querySelector(
    `#charm${headOfTheSnake}`
  )!;
  snakeLink.classList.add("snakeLink");
  snake.unshift(snakeLink);
  if (snakeLink !== newSnakeLink) {
    const removeLink: HTMLDivElement = snake.pop()!;
    removeLink.classList.remove("snakeLink");
    removeLink.classList.add("charmBgc");
    stepsCounter++;
    playerSteps.textContent = stepsCounter.toString();
  } else {
    snakeLinkFlag = false;
    let minStepsValue: number = parseInt(minSteps.textContent!, 10);
    const addToScore: number = Math.floor((minStepsValue / stepsCounter) * 10);
    scoreCounter += addToScore;
    scoreBox.textContent = scoreCounter.toString();
    stepsCounter = 0;
  }

  await wait(100);
}
function wait(milisec: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      runFlag = false;
      if (!snakeLinkFlag) createSnakeLink();
      if (eventHolder) {
        eventHandler(eventHolder);
      } else {
        checkRendering();
      }

      resolve();
    }, milisec)
  );
}
function createSnakeLink() {
  snakeLinkFlag = true;
  const newLinkIdNum: number = Math.floor(Math.random() * 900);
  console.log(newLinkIdNum);
  newSnakeLink = document.querySelector(`#charm${newLinkIdNum}`)!;

  if (snake.some((elem) => elem === newSnakeLink)) createSnakeLink();
  newSnakeLink.classList.add("snakeLink");
  calculateMinSteps(newLinkIdNum);
}
function calculateMinSteps(newLinkIdNum: number) {
  const headOfTheSnakeRow: number = Math.floor(headOfTheSnake / numOfRows);
  const newLinkIdNumRow: number = Math.floor(newLinkIdNum / numOfRows);
  const newLinkIdNumColumn: number =
    newLinkIdNum - newLinkIdNumRow * numOfCharms;
  const headOfTheSnakeColumn: number =
    headOfTheSnake - headOfTheSnakeRow * numOfCharms;
  const horizontalSteps: number = Math.abs(
    newLinkIdNumColumn - headOfTheSnakeColumn
  );
  const verticalSteps: number = Math.abs(newLinkIdNumRow - headOfTheSnakeRow);

  const distance: number = horizontalSteps + verticalSteps;
  minSteps.textContent = distance.toString();
}
function extractId(snakeLink: HTMLDivElement) {
  const id = snakeLink.getAttribute("id");
  const num: number = id ? Number(id.replace("charm", "")) : NaN;
  console.log(num);
  return num;
}
function youLost() {
  if (youLostFlag) return;
  youLostFlag = true;
  /* greenSnake.style.display = "none"; */
  document.removeEventListener("keydown", eventHandler as EventListener);
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
