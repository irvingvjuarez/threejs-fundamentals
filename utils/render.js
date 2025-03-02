import * as THREE from 'three';

export function animate(renderer, callback) {
    renderer.setAnimationLoop(callback);
}

export function requestRenderIfNotRequested(renderRequested) {
    return function() {
        if (renderRequested === false) {
            renderRequested = true;
            requestAnimationFrame(render);
        }
    }
}