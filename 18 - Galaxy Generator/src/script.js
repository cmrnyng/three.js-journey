import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 360 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Galaxy
 */
const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColour: "#ff6030",
  outsideColour: "#1b3984",
};

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  // Destroy old galaxy
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // Geometry
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colours = new Float32Array(parameters.count * 3);

  const colourInside = new THREE.Color(parameters.insideColour);
  const colourOutside = new THREE.Color(parameters.outsideColour);

  positions.forEach((_, i) => {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Colour
    const mixedColour = colourInside.clone();
    mixedColour.lerp(colourOutside, radius / parameters.radius);

    colours[i3] = mixedColour.r;
    colours[i3 + 1] = mixedColour.g;
    colours[i3 + 2] = mixedColour.b;
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3));

  // Materials
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  // Points
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

gui.add(parameters, "count", 100, 1000000, 100).onFinishChange(generateGalaxy);
gui.add(parameters, "size", 0.001, 0.1, 0.001).onFinishChange(generateGalaxy);
gui.add(parameters, "radius", 0.01, 20, 0.01).onFinishChange(generateGalaxy);
gui.add(parameters, "branches", 2, 20, 1).onFinishChange(generateGalaxy);
gui.add(parameters, "spin", -5, 5, 0.001).onFinishChange(generateGalaxy);
gui.add(parameters, "randomness", 0, 2, 0.001).onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower", 1, 10, 0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColour").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColour").onFinishChange(generateGalaxy);

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update galaxy
  points.rotation.y = elapsedTime * 0.2;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
