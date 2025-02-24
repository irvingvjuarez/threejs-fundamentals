import WebGL from 'three/addons/capabilities/WebGL.js';
import { setup } from './utils/setup';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();

// Verifying the web browser accepts WebGL
if (WebGL.isWebGL2Available()) {
    setup();
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
	document.body.appendChild( warning );
}