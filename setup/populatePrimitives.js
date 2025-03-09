import { GEOMETRIES } from '../globals/constants';
import { gui } from '../utils/gui';

export function populatePrimitives(renderRequested) {
    const primitives = GEOMETRIES;
    const [geometries] = gui.controllers;
    const currentGeometryName = geometries.initialValue;
    const currentGeometryPrimitive = primitives.find(primitive => primitive.name === currentGeometryName);
    const currentInstance = currentGeometryPrimitive.setInstance(renderRequested);
    currentInstance.handler(renderRequested);
}