import * as THREE from 'three';
import { camera } from './camera';
import { renderer } from './renderer';
import { resizeRenderer } from './resizeRenderer';
import { scene } from './scene';

export function animate(renderer, callback) {
    renderer.setAnimationLoop(callback);
}

export function render(renderRequested) {
    renderRequested = false;

    if (resizeRenderer(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
}

export function requestRenderIfNotRequested(renderRequested) {
    if (renderRequested === false) {
        renderRequested = true;
        requestAnimationFrame(() => render(renderRequested));
    }
}