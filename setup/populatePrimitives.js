import { gui } from '../utils/gui';
import { makeInstance } from '../utils/makeInstance';
import { render, requestRenderIfNotRequested } from '../utils/render';
import { scene } from '../utils/scene';

function getPrimitives(renderRequested) {
    return [
        {
            name: 'Cube',
            handler: () => {
                const instance = makeInstance({
                    handlerChange: () => requestRenderIfNotRequested(renderRequested),
                    instanceName: 'Cube', 
                    color: 0x44aa88, 
                    x: 0
                });
                scene.add(instance);
                render(renderRequested);

                return instance;
            }
        }
    ];
}

function renderPrimitives(primitives, renderRequested) {
    const [geometries] = gui.controllers;
    const currentGeometry = geometries.initialValue;
    const currentInstance = primitives.find(primitive => primitive.name === currentGeometry)?.handler();
}

export function populatePrimitives(renderRequested) {
    const primitives = getPrimitives(renderRequested);
    renderPrimitives(primitives, renderRequested);
}