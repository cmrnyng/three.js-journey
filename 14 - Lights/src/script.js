import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper();
axesHelper.visible = false;
scene.add(axesHelper);
gui.add(axesHelper, "visible").name("Axes Helper");

// Lights

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);
const ambientGUI = gui
  .addFolder("AmbientLight")
  .add(ambientLight, "intensity", 0, 10, 0.001);

/// Directional Light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
const directionalLightGUI = gui.addFolder("DirectionalLight");
directionalLightGUI.add(directionalLight, "intensity", 0, 10, 0.001);

/// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
const hemisphereLightGUI = gui.addFolder("HemisphereLight");
hemisphereLightGUI.add(hemisphereLight, "intensity", 0, 10, 0.001);

/// Point Light
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
const pointLightGUI = gui.addFolder("PointLight");
pointLightGUI.add(pointLight, "intensity", 0, 10, 0.001);
pointLightGUI.add(pointLight, "distance", 0, 20, 0.001);
pointLightGUI.add(pointLight, "decay", 0, 5, 0.001);

/// Rect Area Light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);
const rectAreaLightGUI = gui.addFolder("RectAreaLight");
rectAreaLightGUI.add(rectAreaLight, "intensity", 0, 10, 0.001);
rectAreaLightGUI.add(rectAreaLight, "width", 0, 5, 0.001);
rectAreaLightGUI.add(rectAreaLight, "height", 0, 5, 0.001);

/// Spot Light
const spotLight = new THREE.SpotLight(0x78ff00, 1, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
spotLight.target.position.x = -0.75;
scene.add(spotLight.target);
const spotLightGUI = gui.addFolder("SpotLight");
spotLightGUI.add(spotLight, "intensity", 0, 10, 0.001);
spotLightGUI.add(spotLight, "distance", 0, 20, 0.001);
spotLightGUI.add(spotLight, "angle", 0, Math.PI, 0.001);
spotLightGUI.add(spotLight, "penumbra", 0, 1, 0.001);
spotLightGUI.add(spotLight, "decay", 0, 5, 0.001);
spotLightGUI
  .add(spotLight.target.position, "x", -2, 2, 0.001)
  .name("SpotLight Target (x)");

// Helpers

/// Hemisphere Light Helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
hemisphereLightHelper.visible = false;
scene.add(hemisphereLightHelper);
hemisphereLightGUI.add(hemisphereLightHelper, "visible").name("helper");

/// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);
directionalLightGUI.add(directionalLightHelper, "visible").name("helper");

/// Point Light Helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
pointLightHelper.visible = false;
scene.add(pointLightHelper);
pointLightGUI.add(pointLightHelper, "visible").name("helper");

/// Spot Light Helper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLightHelper.visible = false;
scene.add(spotLightHelper);
spotLightGUI.add(spotLightHelper, "visible").name("helper");

/// Rect Area Helper
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
rectAreaLightHelper.visible = false;
scene.add(rectAreaLightHelper);
rectAreaLightGUI.add(rectAreaLightHelper, "visible").name("helper");

// Objects
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Update helpers
  spotLightHelper.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
