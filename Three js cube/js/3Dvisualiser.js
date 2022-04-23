import '../css/style.css'





// Setting up three js canvas
import * as THREE from 'three';
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog( 0xffffff, 20, 60 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 80);
camera.position.setZ(50);
camera.up.set( 0, 0, 1 );
camera.position.set( 20, 20, 20 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;





// Autosize canvas
let canvas = document.getElementById('bg');
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / (window.innerHeight)
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera);
}





// Importing orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const controls = new OrbitControls(camera, renderer.domElement);






// Defining lights
scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
addShadowedLight( 1, 1, 1, 0xffffff, 1.2 );
addShadowedLight( 0.5, 1, - 1, 0xffccaa, 1 );
addShadowedLight( -1, -0.5, -1, 0xccaa88, 1 );
function addShadowedLight( x, y, z, color, intensity ) {
  const directionalLight = new THREE.DirectionalLight( color, intensity );
  directionalLight.position.set( x, y, z );
  scene.add( directionalLight );
  directionalLight.castShadow = true;
}





// Ground plane
/*/
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 400, 400 ),
    new THREE.MeshPhongMaterial( { color: 0xcccccc, specular: 0x101010 } )
);
plane.translateZ(-15);
scene.add( plane );
plane.receiveShadow = true;
//*/






// Defining geometries
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
const loader = new STLLoader();
let IMUcube;
loader.load(
  '../asset/xyzCalibrationCube.stl',
  function (geometry) {
    geometry.center();
    const material = new THREE.MeshPhongMaterial( { color: 0xaa8866, specular: 0x111111, shininess: 50 } );
    const mesh = new THREE.Mesh( geometry, material );
    IMUcube = mesh;

    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set( 0, 0, Math.PI/2 );
    mesh.scale.set( -0.5, 0.5, 0.5 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
)





// helper functions
scene.add(new THREE.AxesHelper(17));

// Rendering and animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  if (IMUcube != null) {
    IMUcube.rotation.x += 0.01;
    IMUcube.rotation.x += 0.02;
    IMUcube.rotation.z += 0.03;
  }
}
animate();