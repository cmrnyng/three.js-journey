import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import GUI from "lil-gui";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Environment Map
 */
// LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//   "/environmentMaps/0/px.png",
//   "/environmentMaps/0/nx.png",
//   "/environmentMaps/0/py.png",
//   "/environmentMaps/0/ny.png",
//   "/environmentMaps/0/pz.png",
//   "/environmentMaps/0/nz.png",
// ]);

// scene.background = environmentMap;

// RGBE HDR texture
rgbeLoader.load(
  "/environmentMaps/MR_HDRIs/MR_INT-006_LoftIndustrialWindow_Griffintown.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  }
);

// Use jpegs
// textureLoader.load(
//   "/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg",
//   (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = texture;
//     scene.backgroundBlurriness = 0;
//     scene.backgroundIntensity = 1;
//     scene.environment = texture;
//   }
// );

// CubeCamera
// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
// cubeRenderTarget.texture.type = THREE.HalfFloatType;

// const cubeCamera = new THREE.CubeCamera(1, 50, cubeRenderTarget);
// cubeCamera.position.set(-4, 4, 0);

/**
 * Objects
 */
// Torus Knot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    // envMap: cubeRenderTarget.texture,
    // envMapIntensity: 1,
    roughness: 0,
    metalness: 1,
  })
);
torusKnot.position.set(-4, 4, 0);
scene.add(torusKnot);

const torusKnotGUI = gui.addFolder("Torus Knot Properties");
torusKnotGUI.add(torusKnot.material, "roughness", 0, 1, 0.001);
torusKnotGUI.add(torusKnot.material, "metalness", 0, 1, 0.001);
torusKnotGUI.add(torusKnot.material, "envMapIntensity", 0, 2, 0.001);

// Torus
// const torus = new THREE.Mesh(
//   new THREE.TorusGeometry(8, 0.5, 16, 100),
//   new THREE.MeshBasicMaterial({ color: 0xffffff })
// );
// torus.position.set(-1.5, 4, 0);
// scene.add(torus);

/**
 * Models
 */
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  console.log(gltf.scene);
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;
// controls.autoRotate = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // CubeCamera update
  // cubeCamera.update(renderer, scene);

  // Torus rotation
  // torus.rotation.x = Math.sin(elapsedTime * 0.5) * Math.PI;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
