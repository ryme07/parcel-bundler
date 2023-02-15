import animate from "./js/animate";
import createLight from "./js/createLight";
import createRenderer from "./js/createRenderer";
import createCamera from "./js/createCamera";
import createCube from "./js/createCube";
import createScene from "./js/createScene";
import createControls from "./js/createControls";
import "./styles/main.scss";
import * as THREE from "three";


const objects = []

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera();
const controls = createControls(camera, renderer.domElement);

const cubes = {
  pink: createCube({ color: 0xff00ce, positionX: -1, positionY: -1, positionZ: 2 }),
  purple: createCube({ color: 0x9300fb, positionX: 1, positionY: -1 }),
  blue: createCube({ color: 0x0065d9, positionX: 1, positionY: 1, positionZ: -2 }),
  cyan: createCube({ color: 0x00d7d0, positionX: -1, positionY: 1 }),
};

const light = createLight();

for (const cube of Object.values(cubes)) {
  scene.add(cube);
}

scene.add(light);

const updateCube = () => {
  cubes.purple.rotation.x += 0.01;
  cubes.cyan.rotation.y += 0.05;
};

const updateControl = () => {
  controls.update();
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
};


// ADD CUBE IN THE SCENE
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

const cube = new THREE.Mesh(geometry, material);

const distance = 5;

document.body.addEventListener('click', (event) => {


  // The equation get the screen between -1 & 1 while 0 is the center.
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera)

  const mesh = cube.clone();

  raycaster.ray.at(distance, mesh.position);

  scene.add(mesh);
  objects.push(mesh)


})


// GET ITEM BY RIGHT CLICK ALIAS CONTEXTMENU
document.body.addEventListener('contextmenu', onDocumentMouseDown);

function onDocumentMouseDown(event) {
  event.preventDefault();

  const mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5);

  raycaster.setFromCamera(mouse3D, camera);
  const intersects = raycaster.intersectObjects(objects);

  console.log(intersects)

  if (intersects.length > 0) {
    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
  }
}


animate(() => {
  updateCube();
  updateControl();

  renderer.render(scene, camera);
});

// RESIZE SCENE
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});
