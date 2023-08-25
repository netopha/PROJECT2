var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TetrominoT } from "./classes/tetrominoT.js";
const numOfRows = 15;
const numOfboxes = 10;
let numId = 1;
let fallFlag = false;
let eventFlag = 0;
let eventHolder;
let playGround = document.querySelector("#playGround");
let activeIdNum;
/* let catchTheEvent = document.querySelector("#catchTheEvent") as HTMLDivElement; */
/* const rows = createPlayGround(); */
/* function createPlayGround(): HTMLDivElement[][] { */
const rows = [];
for (let r = 0; r < numOfRows; r++) {
    const row = [];
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
        createrow === null || createrow === void 0 ? void 0 : createrow.appendChild(box);
    });
    playGround === null || playGround === void 0 ? void 0 : playGround.appendChild(createrow);
});
createTetrominoT();
document.addEventListener("keydown", (ev) => {
    ev.preventDefault();
    /* debugger; */
    console.log("keydownkeydownkeydownkeydownkeydownkeydown");
    eventHolder = ev;
});
function wait(milisec) {
    return new Promise((resolve) => setTimeout(() => {
        fallFlag = false;
        resolve();
    }, milisec));
}
function controlTetromino(ev) {
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
function nextPosition(direction) {
    /*  debugger; */
    if (eventFlag)
        if (fallFlag)
            return;
    const currentTetroDivs = activeIdNum.map((value) => {
        //יוצר מערך חדש שמכיל את הדיבים לטטרומינו  הנוכחי
        const element = document.querySelector(`#box${value}`);
        return element;
    });
    const nextTetroDivs = activeIdNum.map((value) => {
        //יוצר מערך חדש שמכיל את הדיבים בטטרונימו הבא
        let element = null;
        if (direction === "fall")
            element = document.querySelector(`#box${value + 10}`);
        if (direction === "left")
            element = document.querySelector(`#box${value - 1}`);
        if (direction === "right")
            element = document.querySelector(`#box${value + 1}`);
        return element;
    });
    const canMove = checkPath(currentTetroDivs, nextTetroDivs);
    if (canMove) {
        moveTetromino(currentTetroDivs, nextTetroDivs);
    }
    else {
        if (activeIdNum.some((element) => element < 11)) {
            console.log(activeIdNum);
            youloose();
            return;
        }
        if (direction === "fall") {
            createTetrominoT();
        }
        else {
            nextPosition("fall");
        }
    }
}
function checkPath(currentTetroDivs, nextTetroDivs) {
    /*  debugger; */
    const turnOnDivs = nextTetroDivs.filter((element) => {
        // ובודק אם הדיב הבא צבוע ואם הוא לא אחד מהטטרומינו עצמו ומכניס אותו למערך
        return ((element === null || element === void 0 ? void 0 : element.classList.contains("turnedOn")) &&
            currentTetroDivs.every((elem) => elem !== element));
    });
    if (turnOnDivs.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
function moveTetromino(currentTetroDivs, nextTetroDivs) {
    return __awaiter(this, void 0, void 0, function* () {
        /*   debugger; */
        console.log(fallFlag);
        if (fallFlag)
            return;
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
            const id = element === null || element === void 0 ? void 0 : element.getAttribute("id");
            const num = id ? Number(id.replace("box", "")) : NaN;
            return num;
        });
        yield wait(400);
        if (activeIdNum.some((elem) => Math.floor(elem / 10) === numOfRows - 1)) {
            createTetrominoT();
        }
        console.log(eventFlag + "  " + eventHolder);
        if (eventHolder) {
            eventFlag++;
            if (eventFlag % 2 === 0)
                controlTetromino(eventHolder);
        }
        nextPosition("fall");
    });
}
function createTetrominoT() {
    /*  debugger; */
    const relativeNum = Math.floor(Math.random() * 7) + 1;
    const newTetrominoT = new TetrominoT([
        relativeNum,
        relativeNum + 1,
        relativeNum + 2,
        relativeNum + 11,
    ]);
    activeIdNum = newTetrominoT.idNum;
    const currentTetroDivs = newTetrominoT.idNum.map((value) => {
        //יוצר מערך חדש שמכיל את הדיבים לטטרומינו  הנוכחי
        const element = document.querySelector(`#box${value}`);
        element === null || element === void 0 ? void 0 : element.classList.add("turnedOn");
        return element;
    });
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
