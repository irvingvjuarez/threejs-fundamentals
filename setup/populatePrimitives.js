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

function renderPrimitives(selectElement, primitives, renderRequested) {
    const [optionSelected] = selectElement.selectedOptions;
    const primitiveSelected = primitives.find(primitive => primitive.name === optionSelected.value);
    const currentInstance = primitiveSelected.handler();

    const form = document.querySelector('.config-form');
    form.addEventListener('submit', event => event.preventDefault());

    // form.addEventListener("input", (event) => {
    //     const { target } = event;
        
    //     switch (target.name) {
    //         case 'position':
    //             currentInstance.position[target.id] = Number(target.value);
    //         break;
    //     }
    //     render(renderRequested);
    // });
}

export function populatePrimitives(renderRequested) {
    const selectElement = document.getElementById('primitives-select');
    const primitives = getPrimitives(renderRequested);

    const optionList = primitives.map(primitive => {
        const primitiveOption = document.createElement('option');
        primitiveOption.value = primitive.name;
        primitiveOption.textContent = primitive.name;
        return primitiveOption;
    });

    optionList.forEach((option, index) => {
        if (index === 0) {
            option.selected = true;
        }
        selectElement.appendChild(option)
    });

    renderPrimitives(selectElement, primitives, renderRequested);
}