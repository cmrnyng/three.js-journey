import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.set(-2, 0, 0);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.set(2, 0, 0);

group.add(cube1, cube2, cube3);

group.position.y = 1;
group.scale.y = 2;
group.rotation.y = Math.PI / 4;

// Axes Helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 3);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/* Old object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 0.5;
mesh.position.set(0.7, -0.6, 0.5);

// Scale
// mesh.scale.x = 0.3;
// mesh.scale.y = 0.6;
// mesh.scale.z = 0.7;
mesh.scale.set(0.3, 0.6, 0.7);

// Rotation
// mesh.rotation.x = Math.PI / 4;
// mesh.rotation.y = 0.3;
// mesh.rotation.z = Math.PI / 8;
mesh.rotation.set(Math.PI / 4, 0.3, Math.PI / 8);
*/
