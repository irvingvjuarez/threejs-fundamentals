import { GEOMETRIES } from "../globals/constants";
import { render } from "../utils/render";
import { renderer } from "../utils/renderer";
import { addController } from "./addController";

export function addRotationController(geometriesController) {
    const rotationController = addController('rotation', {rotation: false});
    rotationController.onChange(isRotating => {
        if (isRotating) {
            const { initialValue } = geometriesController;
            const primitiveGeometry = GEOMETRIES.find(geometry => geometry.name === initialValue);
            const geometryInstance = primitiveGeometry.getInstance();
            renderer.setAnimationLoop(() => {
                geometryInstance.rotation.x += 0.01;
                geometryInstance.rotation.y += 0.01;
                render(true)
            });
        } else {
            renderer.setAnimationLoop(null);
        }
    });

    return rotationController;
}