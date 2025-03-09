import { gui } from "./gui";

export function addOptionsToGUI(optionsName, initialValue, config = null) {
    gui.add(initialValue, optionsName, config)
}