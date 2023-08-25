export class SlotMachineWheel {
  private wheelContainer: HTMLElement;

  constructor(container: HTMLElement) {
    this.wheelContainer = this.createWheelContainer();
    container.appendChild(this.wheelContainer);
  }

  private createWheelContainer(): HTMLElement {
    const wheelContainer = document.createElement("div");
    wheelContainer.id = "wheelContainer";

    const wheel = document.createElement("div");
    wheel.className = "wheel";

    const symbols = [
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

    symbols.forEach((symbolName, index) => {
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
  startSpinning() {
    const wheel = this.wheelContainer.querySelector(".wheel");
    (wheel as HTMLElement).style.animation = "spinWheel 4s  linear";

    setTimeout(() => {
      (wheel as HTMLElement).style.animation = "none";
      (wheel as HTMLElement).style.transform =
        "rotateX(360deg) translateY(230px)";
    }, 4000);
  }
}
