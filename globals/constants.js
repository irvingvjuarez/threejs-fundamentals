import { makeInstance } from "../utils/makeInstance";
import { render, requestRenderIfNotRequested } from "../utils/render";
import { scene } from "../utils/scene";

export const FIELD_OF_VIEW = 45;
export const ASPECT = window.innerWidth / window.innerHeight;
export const NEAR_NUMBER = 1;
export const FAR_NUMBER = 1000 / 2;

export const GEOMETRIES = [
    {
        name: 'Cube',
        instance: null,
        setInstance(renderRequested) {
            this.instance = makeInstance({
                handlerChange: () => requestRenderIfNotRequested(renderRequested),
                instanceName: 'Cube', 
                color: 0x44aa88, 
                x: 0
            });
            return this;
        },
        getInstance() {
            return this.instance
        },
        handler(renderRequested) {
            scene.add(this.instance);
            render(renderRequested);
        }
    }
];