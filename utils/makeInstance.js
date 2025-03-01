import * as THREE from 'three';

export function createCube({x = 0, y = 0, z = 0, color = 0x00ff00, ...props}) {
    const {
        geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
        material = new THREE.MeshPhongMaterial({ color })
    } = props

    const cube = new THREE.Mesh(geometry, material);

    // Creating the segments
    const edgesGeometry = new THREE.EdgesGeometry(geometry, 360);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 'black' });
    const lineSegments = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    cube.add(lineSegments);
    
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
}

export function makeInstance({
    geometry = new THREE.BoxGeometry(1, 1, 1),
    color = 0x00ff00,
    x = 0,
    segments = true,
    instanceName = 'Box',
    gui,
    handlerChange,
}) {
    const material = new THREE.MeshPhongMaterial({ color });
    const instance = new THREE.Mesh(geometry, material);

    if (segments) {
        const geometryEdges = new THREE.EdgesGeometry(geometry, 360);
        const materialEdges = new THREE.LineBasicMaterial({ color: 'black' });
        const lineSegments = new THREE.LineSegments(geometryEdges, materialEdges);
        instance.add(lineSegments);
    }

    instance.position.x = x;

    const folder = gui.addFolder(`${instanceName}`);
    folder.add(instance.scale, 'x', .1, 1.5)
        .name('scale x')
        .onChange(handlerChange)
    
    folder.open();

    return instance;
}