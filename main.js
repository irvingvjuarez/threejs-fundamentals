import WebGL from 'three/addons/capabilities/WebGL.js';
import { setup } from './setup';
import { populatePrimitives } from './setup/populatePrimitives';

// Verifying the web browser accepts WebGL
if (WebGL.isWebGL2Available()) {
    const renderRequested = setup();
    populatePrimitives(renderRequested);
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
	document.body.appendChild( warning );
}