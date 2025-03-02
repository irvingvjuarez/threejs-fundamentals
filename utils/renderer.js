import * as THREE from 'three';

const canvasComponent = document.getElementById('threejs-container');

class Renderer {
    constructor() {
        if (this.instance) {
            return this.instance
        } else {
            this.instance = new THREE.WebGLRenderer({ canvas: canvasComponent });
            this.instance.setSize(window.innerWidth, window.innerHeight);
        }
    }
}

export const renderer = new Renderer().instance;