export class SlotMachineWheel {
  private wheelContainer: HTMLElement;
  private currentAngle: number = 0;

  constructor(container: HTMLElement) {
    this.wheelContainer = this.createWheelContainer();
    container.appendChild(this.wheelContainer);
  }

  private createWheelContainer(): HTMLElement {
    const wheelContainer = document.createElement("div");
    wheelContainer.id = "wheelContainer";

    const wheel = document.createElement("div");
    wheel.className = "wheel";

    const Symbols = [
      "bell",
      "cherries",
      "grapes",
      "lemon",
      "orange",
      "plum",
      "seven",
      "strawberry",
      "watermelon",
    ];

    Symbols.forEach((symbolName, index) => {
      const symbol = document.createElement("div");
      symbol.id = `symbol${index + 1}`;
      symbol.className = "window wheel-item";

      const img = document.createElement("img");
      img.src = `symbols/${symbolName}.png`;
      img.alt = symbolName;

      symbol.appendChild(img);
      wheel.appendChild(symbol);
    });
    const frame = document.createElement("div");
    frame.className = "frame window";

    wheelContainer.appendChild(wheel);
    wheelContainer.appendChild(frame);

    return wheelContainer;
  }

  getWheelContainer(): HTMLElement {
    return this.wheelContainer;
  }

  public startSpinning() {
    const wheel = this.wheelContainer.querySelector(".wheel") as HTMLElement;
    wheel.style.transition = "none";

    const spins = Math.floor(Math.random() * 10 + 30); // Random spins more than 30
    const totalTime = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000); // Random time between 3000ms to 4600ms
    const timePerSpin = totalTime / spins;
    let spinCount = 0;
    const intervalId = setInterval(() => {
      if (spinCount < spins) {
        this.currentAngle += 40; // Fixed 40-degree spin
        wheel.style.transition = `transform ${timePerSpin / 1000}s linear`;
        wheel.style.transform = `rotateX(${this.currentAngle}deg) translateY(230px)`;
        spinCount++;
      } else {
        clearInterval(intervalId);
      }
    }, timePerSpin);
  }
  /* handleTransitionEnd() {
    const wheel = this.wheelContainer.querySelector(".wheel") as HTMLElement;

    if (!this.adjusting) {
      wheel.removeEventListener(
        "transitionend",
        this.handleTransitionEnd.bind(this)
      );

      const neededAdjustment = this.calculateNeededAdjustment();
      this.adjusting = true; // Set flag

      // Apply fine adjustment
      wheel.style.transition = "transform 0.5s linear";
      wheel.style.transform = `rotateX(${
        this.currentAngle + neededAdjustment
      }deg) translateY(230px)`;

      this.currentAngle += neededAdjustment;
    } else {
      this.adjusting = false; // Reset flag
      wheel.removeEventListener(
        "transitionend",
        this.handleTransitionEnd.bind(this)
      );
    }
  }

  calculateNeededAdjustment(): number {
    const remainder = this.currentAngle % 360;
    const imageRemainder = remainder % 40;
    const neededAdjustment = 40 - imageRemainder;

    return neededAdjustment;
  } */
}
