import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Textures
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights

/// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
const ambientLightGUI = gui.addFolder("AmbientLight");
ambientLightGUI.add(ambientLight, "intensity", 0, 3, 0.001);
scene.add(ambientLight);

/// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(2, 2, -1);
const directionalLightGUI = gui.addFolder("DirectionalLight");
directionalLightGUI.add(directionalLight, "intensity", 0, 3, 0.001);
directionalLightGUI.add(directionalLight.position, "x", -5, 5, 0.001);
directionalLightGUI.add(directionalLight.position, "y", -5, 5, 0.001);
directionalLightGUI.add(directionalLight.position, "z", -5, 5, 0.001);
scene.add(directionalLight);

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// directionalLight.shadow.radius = 10;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightCameraHelper);
directionalLightCameraHelper.visible = false;
directionalLightGUI
  .add(directionalLightCameraHelper, "visible")
  .name("Camera Helper");

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(directionalLightHelper);
directionalLightHelper.visible = false;
directionalLightGUI.add(directionalLightHelper, "visible").name("Helper");

/// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 5, 10, Math.PI * 0.3);
spotLight.position.set(0, 2, 2);
const spotLightGUI = gui.addFolder("SpotLight");
spotLightGUI.add(spotLight, "intensity", 0, 10, 0.001);
spotLightGUI.add(spotLight, "distance", 0, 20, 0.001);
spotLightGUI.add(spotLight, "angle", 0, Math.PI / 2, 0.001);
scene.add(spotLight);
scene.add(spotLight.target);

spotLight.castShadow = true;
spotLight.shadow.mapSize.set(1024, 1024);
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);
spotLightCameraHelper.visible = false;
spotLightGUI.add(spotLightCameraHelper, "visible").name("Camera Helper");

/// Point Light
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(-1, 1, 0);
const pointLightGUI = gui.addFolder("PointLight");
pointLightGUI.add(pointLight, "intensity", 0, 10, 0.001);
scene.add(pointLight);

pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);
pointLightCameraHelper.visible = false;
pointLightGUI.add(pointLightCameraHelper, "visible").name("Camera Helper");

// Materials
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
const materialGUI = gui.addFolder("Material");
materialGUI.add(material, "metalness", 0, 1, 0.001);
materialGUI.add(material, "roughness", 0, 1, 0.001);

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

plane.receiveShadow = true;

scene.add(sphere, plane);

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);
sphereShadow.rotation.x = -Math.PI / 2;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = false; // Set to true and remove baked in textures to test shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // Update shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();