import { gui } from "./gui";

export function addController(optionsName, initialValue, config = null) {
    return gui.add(initialValue, optionsName, config)
}