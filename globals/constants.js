import * as THREE from 'three';
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
            const { instance, guiFolder } = makeInstance({
                handlerChange: () => requestRenderIfNotRequested(renderRequested),
                instanceName: 'Cube', 
                color: 0x44aa88, 
                x: 0
            });
            this.instance = instance;
            this.guiFolder = guiFolder;
            return this;
        },
        getInstance() {
            return this.instance
        },
        addFolderController(controllerName, initialValue, config = []) {
            return this.guiFolder.add(initialValue, controllerName, ...config);
        },
        addSegmentsController(renderRequested) {
            const segmentsController = this.addFolderController(
                'segments',
                { segments: 1 },
                [1, 8, 1]
            );

            segmentsController.onChange((segmentsValue) => {
                const [segmentsGeometry] = this.instance.children;
                this.instance.geometry.dispose();

                this.instance.geometry = new THREE.BoxGeometry(8,8,8,segmentsValue, segmentsValue, segmentsValue);
                this.instance.remove(segmentsGeometry);

                const newSegmentsGeometry = new THREE.LineSegments(
                    new THREE.EdgesGeometry(this.instance.geometry, 360),
                    new THREE.LineBasicMaterial({ color: 'black' })
                );
                this.instance.add(newSegmentsGeometry);

                requestRenderIfNotRequested(renderRequested);
            });
        },
        handler(renderRequested) {
            scene.add(this.instance);
            render(renderRequested);

            this.addSegmentsController(renderRequested);
        }
    }
];