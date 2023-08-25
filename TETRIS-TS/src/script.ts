import { TetrominoT } from "./classes/tetrominoT.js";
import { Tetromino } from "./classes/tetromino.js";
const numOfRows: number = 15;
const numOfboxes: number = 10;
let numId: number = 1;
let fallFlag: boolean = false;
let eventFlag: number = 0;
let eventHolder: KeyboardEvent | null;
let playGround = document.querySelector("#playGround") as HTMLDivElement;
let activeIdNum: Array<number>;
/* let catchTheEvent = document.querySelector("#catchTheEvent") as HTMLDivElement; */

/* const rows = createPlayGround(); */
/* function createPlayGround(): HTMLDivElement[][] { */
const rows: HTMLDivElement[][] = [];

for (let r = 0; r < numOfRows; r++) {
  const row: HTMLDivElement[] = [];
  for (let b = 0; b < numOfboxes; b++) {
    const box = document.createElement("div");
    box.id = "box" + numId;
    box.classList.add("boxClass");
    /* box.innerHTML = numId.toString(); */
    row.push(box);
    numId++;
  }
  rows.push(row);
}
/* return rows;
} */

rows.forEach((element) => {
  console.log(element);
  const createrow = document.createElement("div");
  createrow.classList.add("createrow");
  element.forEach((box) => {
    console.log(box);
    createrow?.appendChild(box);
  });

  playGround?.appendChild(createrow);
});

createTetrominoT();

document.addEventListener("keydown", (ev: KeyboardEvent) => {
  ev.preventDefault();
  /* debugger; */
  console.log("keydownkeydownkeydownkeydownkeydownkeydown");
  eventHolder = ev;
});

function wait(milisec: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      fallFlag = false;
      resolve();
    }, milisec)
  );
}
function controlTetromino(ev: KeyboardEvent) {
  /* debugger; */

  switch (ev.key) {
    case "ArrowLeft":
      console.log(activeIdNum);
      if (activeIdNum.some((elem) => elem % 10 === 1)) {
        return;
      }

      eventHolder = null;
      nextPosition("left");

      break;
    case "ArrowRight":
      console.log(activeIdNum);
      if (activeIdNum.some((elem) => elem % 10 === 0)) {
        return;
      }

      eventHolder = null;
      nextPosition("right");
      break;
  }
}

function nextPosition(direction: string): void {
  /*  debugger; */
  if (eventFlag) if (fallFlag) return;
  const currentTetroDivs: Array<Element | null> = activeIdNum.map((value) => {
    //יוצר מערך חדש שמכיל את הדיבים לטטרומינו  הנוכחי
    const element = document.querySelector(`#box${value}`);
    return element;
  });
  const nextTetroDivs: Array<Element | null> = activeIdNum.map((value) => {
    //יוצר מערך חדש שמכיל את הדיבים בטטרונימו הבא
    let element: Element | null = null;
    if (direction === "fall")
      element = document.querySelector(`#box${value + 10}`);
    if (direction === "left")
      element = document.querySelector(`#box${value - 1}`);
    if (direction === "right")
      element = document.querySelector(`#box${value + 1}`);
    return element;
  });
  const canMove: boolean = checkPath(currentTetroDivs, nextTetroDivs);
  if (canMove) {
    moveTetromino(currentTetroDivs, nextTetroDivs);
  } else {
    if (activeIdNum.some((element) => element < 11)) {
      console.log(activeIdNum);
      youloose();
      return;
    }
    if (direction === "fall") {
      createTetrominoT();
    } else {
      nextPosition("fall");
    }
  }
}

function checkPath(
  currentTetroDivs: (Element | null)[],
  nextTetroDivs: (Element | null)[]
) {
  /*  debugger; */
  const turnOnDivs: Element[] = nextTetroDivs.filter((element) => {
    // ובודק אם הדיב הבא צבוע ואם הוא לא אחד מהטטרומינו עצמו ומכניס אותו למערך
    return (
      element?.classList.contains("turnedOn") &&
      currentTetroDivs.every((elem) => elem !== element)
    );
  }) as Element[];

  if (turnOnDivs.length === 0) {
    return true;
  } else {
    return false;
  }
}

async function moveTetromino(
  currentTetroDivs: (Element | null)[],
  nextTetroDivs: (Element | null)[]
): Promise<void> {
  /*   debugger; */
  console.log(fallFlag);
  if (fallFlag) return;
  (fallFlag = true),
    currentTetroDivs.forEach((element) => {
      if (element) {
        element.classList.remove("turnedOn");
      }
    });
  nextTetroDivs.forEach((element) => {
    if (element) {
      element.classList.add("turnedOn");
    }
  });
  activeIdNum = nextTetroDivs.map((element) => {
    const id = element?.getAttribute("id");
    const num: number = id ? Number(id.replace("box", "")) : NaN;
    return num;
  });

  await wait(400);
  if (activeIdNum.some((elem) => Math.floor(elem / 10) === numOfRows - 1)) {
    createTetrominoT();
  }
  console.log(eventFlag + "  " + eventHolder);
  if (eventHolder) {
    eventFlag++;
    if (eventFlag % 2 === 0) controlTetromino(eventHolder);
  }
  nextPosition("fall");
}

function createTetrominoT(): void {
  /*  debugger; */
  const relativeNum: number = Math.floor(Math.random() * 7) + 1;
  const newTetrominoT: TetrominoT = new TetrominoT([
    relativeNum,
    relativeNum + 1,
    relativeNum + 2,
    relativeNum + 11,
  ]);
  activeIdNum = newTetrominoT.idNum;

  const currentTetroDivs: Array<Element | null> = newTetrominoT.idNum.map(
    (value) => {
      //יוצר מערך חדש שמכיל את הדיבים לטטרומינו  הנוכחי
      const element: Element | null = document.querySelector(`#box${value}`);
      element?.classList.add("turnedOn");
      return element;
    }
  );
  nextPosition("fall");
}
function youloose() {
  /* debugger; */
  console.log("youloose");
}

/* function checkIfCanMoveLeft(): void {
   debugger;
  if (fallFlag) return;

  

  console.log("tetromino.idNum: " + activeIdNum);
  const currentTetroDivs: Array<Element | null> = activeIdNum.map((value) => {
    //יוצר מערך חדש שמכיל את הדיבים לטטרומינו  הנוכחי
    const element = document.querySelector(`#box${value}`);
    return element;
  });
  console.log("currentTetroDivs : " + currentTetroDivs);
  const leftTetroDivs: Array<Element | null> = activeIdNum.map((value) => {
    //יוצר מערך חדש שמכיל את הדיבים בטטרונימו הבא
    const element = document.querySelector(`#box${value - 1}`);
    return element;
  });
  const canMove: boolean = checkIfCanMove(currentTetroDivs, leftTetroDivs);
  if (canMove) moveLeft(currentTetroDivs, leftTetroDivs);
  checkIfCanFallDown();
} */
/* async function moveLeft(
  currentTetroDivs: (Element | null)[],
  leftTetroDivs: (Element | null)[]
): Promise<void> {
  debugger;
  if (fallFlag) return;
  (fallFlag = true),
    currentTetroDivs.forEach((element) => {
      if (element) {
        element.classList.remove("turnedOn");
      }
    });
  leftTetroDivs.forEach((element) => {
    if (element) {
      element.classList.add("turnedOn");
    }
  });
  activeIdNum = leftTetroDivs.map((element) => {
    const id = element?.getAttribute("id");
    const idNum = id ? Number(id.replace("box", "")) : NaN;
    return idNum;
  });

  await wait(400);
  checkIfCanFallDown("fall");
} */
