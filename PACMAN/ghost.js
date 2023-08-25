function redghost() {
  /*  debugger; */
  const redGhost = document.getElementById("ghostred");

  const Pacman = document.getElementById("pacman");

  let wall = false;
  let hole = true;

  let activate = true;
  let xCounter = 0;
  let divisibleByThree = 0;

  serchPacMan();

  function serchPacMan() {
    if (gameOverVar == true) return;
    let topRedGhost = redGhost.style.top;
    topRedGhost = parseInt(topRedGhost);
    let leftRedGhost = redGhost.style.left;
    leftRedGhost = parseInt(leftRedGhost);

    let toppacman = Pacman.style.top;
    toppacman = parseInt(toppacman);
    let leftpacman = Pacman.style.left;
    leftpacman = parseInt(leftpacman);

    debugger;

    activate = true;
    wall = false;
    hole = true;

    /*  canISeeIt(toppacman, leftpacman, topRedGhost, leftRedGhost); */

    if (leftpacman <= leftRedGhost && toppacman >= topRedGhost) {
      if (toppacman == topRedGhost) {
        pathLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }

      if (leftpacman == leftRedGhost) {
        pathDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (
        Math.abs(toppacman - topRedGhost) >= Math.abs(leftpacman - leftRedGhost)
      )
        pathDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
      if (
        Math.abs(toppacman - topRedGhost) < Math.abs(leftpacman - leftRedGhost)
      )
        pathLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost);

      return;
    }
    if (leftpacman <= leftRedGhost && toppacman <= topRedGhost) {
      if (toppacman == topRedGhost) {
        pathLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (leftpacman == leftRedGhost) {
        pathUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (
        Math.abs(toppacman - topRedGhost) >= Math.abs(leftpacman - leftRedGhost)
      )
        pathUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
      if (
        Math.abs(toppacman - topRedGhost) < Math.abs(leftpacman - leftRedGhost)
      )
        pathLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost);

      return;
    }
    if (leftpacman >= leftRedGhost && toppacman <= topRedGhost) {
      if (toppacman == topRedGhost) {
        pathRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (leftpacman == leftRedGhost) {
        pathUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (
        Math.abs(toppacman - topRedGhost) >= Math.abs(leftpacman - leftRedGhost)
      )
        pathUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
      if (
        Math.abs(toppacman - topRedGhost) < Math.abs(leftpacman - leftRedGhost)
      )
        pathRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
      return;
    }
    if (leftpacman >= leftRedGhost && toppacman >= topRedGhost) {
      if (toppacman == topRedGhost) {
        pathRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (leftpacman == leftRedGhost) {
        pathDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
      }
      if (
        Math.abs(toppacman - topRedGhost) >= Math.abs(leftpacman - leftRedGhost)
      )
        pathDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
      if (
        Math.abs(toppacman - topRedGhost) < Math.abs(leftpacman - leftRedGhost)
      )
        pathRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
      return;
    }
  }
  function pathLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathOne(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathOne(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathTwo(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathTwo(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathThree(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathThree(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathFour(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    lookDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    pathFour(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathOne(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    debugger;

    lookUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathTwo(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    debugger;

    lookRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathThree(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    debugger;

    lookDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function pathFour(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    debugger;

    lookLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost);
    lookUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost);
  }
  function lookLeftDown(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /*  debugger;
     */
    let step = leftRedGhost;

    console.log("hole " + hole);
    while (hole == true) {
      step = step - 10;
      wall = scanLeft(topRedGhost, step, "blue");
      hole = scanDown(topRedGhost + 10, step, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);

    if (activate == true)
      moveLeft(step, topRedGhost, leftRedGhost, toppacman, leftpacman);

    return;
  }
  function lookRightDown(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /* debugger; */

    let step = leftRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      step = step + 10;
      wall = scanRight(topRedGhost, step, "blue");
      hole = scanDown(topRedGhost + 10, step, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);

    if (activate == true)
      moveRight(step, topRedGhost, leftRedGhost, toppacman, leftpacman);

    return;
  }
  function lookRightUp(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /* debugger; */

    let step = leftRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      step = step + 10;
      wall = scanRight(topRedGhost, step, "blue");
      hole = scanUp(topRedGhost - 10, step, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);
    if (activate == true)
      moveRight(step, topRedGhost, leftRedGhost, toppacman, leftpacman);

    return;
  }
  function lookLeftUp(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /* debugger; */

    let step = leftRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      step = step - 10;
      wall = scanLeft(topRedGhost, step, "blue");
      hole = scanUp(topRedGhost - 10, step, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);

    if (activate == true)
      moveLeft(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    return;
  }

  function lookUpRight(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /* debugger; */

    let step = topRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      step = step - 10;
      wall = scanUp(step, leftRedGhost, "blue");
      hole = scanRight(step, leftRedGhost + 10, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);

    if (activate == true)
      moveUp(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    return;
  }
  function lookUpLeft(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /* debugger; */

    let step = topRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      step = step - 10;
      wall = scanUp(step, leftRedGhost, "blue");
      hole = scanLeft(step, leftRedGhost - 10, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);

    if (activate == true)
      moveUp(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    return;
  }
  function lookDownLeft(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /*  debugger; */

    let step = topRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      console.log(activate);

      step = step + 10;
      wall = scanDown(step, leftRedGhost, "blue");
      hole = scanLeft(step, leftRedGhost - 10, "blue");
      console.log("wall= " + wall);
      if (wall == true) {
        return;
      }
    }
    console.log(hole);
    keepBusy = 0;
    if (activate == true)
      moveDown(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    return;
  }
  function lookDownRight(toppacman, leftpacman, topRedGhost, leftRedGhost) {
    /* debugger; */

    let step = topRedGhost;
    console.log("hole " + hole);
    while (hole == true) {
      step = step + 10;
      wall = scanDown(step, leftRedGhost, "blue");
      hole = scanRight(step, leftRedGhost + 10, "blue");
      if (wall == true) {
        return;
      }
    }
    console.log(hole);

    if (activate == true)
      moveDown(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    return;
  }
  function moveDown(step, topRedGhost, leftRedGhost, toppacman, leftpacman) {
    debugger;

    activate = false;
    console.log(topRedGhost + " " + step);

    if (topRedGhost == step) {
      serchPacMan();
      return;
    }

    topRedGhost = topRedGhost + 10;
    redGhost.style.top = topRedGhost + "px";
    didIcatchIt();
    setTimeout(function () {
      moveDown(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    }, 120);
  }

  function moveUp(step, topRedGhost, leftRedGhost, toppacman, leftpacman) {
    /* debugger; */

    activate = false;
    console.log(topRedGhost + " " + step);

    if (topRedGhost == step) {
      serchPacMan();
      return;
    }

    topRedGhost = topRedGhost - 10;
    redGhost.style.top = topRedGhost + "px";
    didIcatchIt();
    setTimeout(function () {
      moveUp(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    }, 120);
  }
  function moveLeft(step, topRedGhost, leftRedGhost, toppacman, leftpacman) {
    /* debugger; */

    activate = false;
    console.log(leftRedGhost + " " + step);

    if (leftRedGhost == step) {
      serchPacMan();
      return;
    }

    leftRedGhost = leftRedGhost - 10;
    redGhost.style.left = leftRedGhost + "px";
    didIcatchIt();
    setTimeout(function () {
      moveLeft(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    }, 120);
  }
  function moveRight(step, topRedGhost, leftRedGhost, toppacman, leftpacman) {
    /* debugger; */

    activate = false;
    console.log(leftRedGhost + " " + step);

    if (leftRedGhost == step) {
      serchPacMan();
      return;
    }

    leftRedGhost = leftRedGhost + 10;
    redGhost.style.left = leftRedGhost + "px";
    didIcatchIt();
    setTimeout(function () {
      moveRight(step, topRedGhost, leftRedGhost, toppacman, leftpacman);
    }, 120);
  }
  function didIcatchIt() {
    let topRedGhost = redGhost.style.top;
    topRedGhost = parseInt(topRedGhost);
    let leftRedGhost = redGhost.style.left;
    leftRedGhost = parseInt(leftRedGhost);

    let toppacman = Pacman.style.top;
    toppacman = parseInt(toppacman);
    let leftpacman = Pacman.style.left;
    leftpacman = parseInt(leftpacman);
    if (
      Math.abs(toppacman - topRedGhost) < 40 &&
      Math.abs(leftpacman - leftRedGhost) < 40
    ) {
      gameOverVar = true;
      gameOver(topRedGhost, leftRedGhost, toppacman, leftpacman);
    }
  }
}
