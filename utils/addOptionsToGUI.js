import { gui } from "./gui";

export function addOptionsToGUI(optionsName, initialValue, config = null) {
    return gui.add(initialValue, optionsName, config)
}