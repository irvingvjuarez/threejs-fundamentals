import { gui } from "./gui";

export function addOptionsToGUI(optionsName, initialValue, config) {
    gui.add(initialValue, optionsName, config)
}