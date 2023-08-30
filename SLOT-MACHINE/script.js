import { SlotMachineWheel } from "./classes/wheel.js";
let slotMachineWheel1 = null;
let slotMachineWheel2 = null;
let slotMachineWheel3 = null;
const appContainer1 = document.getElementById("wheelContainer1");
if (appContainer1) {
    slotMachineWheel1 = new SlotMachineWheel(appContainer1);
}
const appContainer2 = document.getElementById("wheelContainer2");
if (appContainer2) {
    slotMachineWheel2 = new SlotMachineWheel(appContainer2);
}
const appContainer3 = document.getElementById("wheelContainer3");
if (appContainer3) {
    slotMachineWheel3 = new SlotMachineWheel(appContainer3);
}
const spinButton = document.getElementById("spinButton");
if (slotMachineWheel1 && slotMachineWheel2 && slotMachineWheel3) {
    slotMachineWheel1.startSpinning();
    slotMachineWheel2.startSpinning();
    slotMachineWheel3.startSpinning();
}
if (spinButton) {
    spinButton.addEventListener("click", () => {
        if (slotMachineWheel1 && slotMachineWheel2 && slotMachineWheel3) {
            slotMachineWheel1.startSpinning();
            slotMachineWheel2.startSpinning();
            slotMachineWheel3.startSpinning();
        }
    });
}
