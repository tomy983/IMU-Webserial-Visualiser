import '../css/style.css'





// Setting up three js canvas
import * as THREE from 'three';
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
//scene.fog = new THREE.Fog( 0xffffff, 20, 60 );

const camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 80);
camera.position.setZ(50);
camera.up.set( 0, 0, 1 );
camera.position.set( 40, 40, 40 );

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
onWindowResize()
function onWindowResize() {
  const container = document.getElementById('container');
  camera.aspect = container.clientWidth/ container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );
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
  //directionalLight.castShadow = true;
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
import cubeUrl from '../asset/BNO086 brakeout.stl?url'
const loader = new STLLoader();
let IMUcube;
loader.load(
  cubeUrl,
  function (geometry) {
    geometry.center();
    geometry.rotateZ( Math.PI/2);
    const material = new THREE.MeshPhongMaterial( { color: 0xaa8866, specular: 0x111111, shininess: 50 } );
    const mesh = new THREE.Mesh( geometry, material );
    IMUcube = mesh;

    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set( 0, 0, 0);
    mesh.scale.set( 0.5, 0.5, 0.5 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
)





function quat2Euler(q)
{
  q[0] = -q[0];
  const w2 = q[0]*q[0];
  const x2 = q[1]*q[1];
  const y2 = q[2]*q[2];
  const z2 = q[3]*q[3];
  //*/
  const unitLength = w2 + x2 + y2 + z2;    // Normalised == 1, otherwise correction divisor.
  const abcd = q[0]*q[1] + q[2]*q[3];
  const eps = 1e-10;
  const pi = Math.PI;
  let yaw,pitch,roll;
  if (abcd > (0.5-eps)*unitLength)
  {
    yaw = 2 * Math.atan2(q[2], q[0]);
    pitch = pi;
    roll = 0;
  }
  else if (abcd < (-0.5+eps)*unitLength)
  {
    yaw = -2 * Math.atan2(q[2], q[0]);
    pitch = -pi;
    roll = 0;
  }
  else
  {
    const adbc = q[0]*q[3] - q[1]*q[2];
    const acbd = q[0]*q[2] - q[1]*q[3];
    yaw = Math.atan2(2*adbc, 1 - 2*(z2+x2));
    pitch = Math.asin(2*abcd/unitLength);
    roll = Math.atan2(2*acbd, 1 - 2*(y2+x2));
  }
  //*/
  const eulerAngles = [-roll,pitch,-yaw];

  return eulerAngles;
}





// Rendering and animate at set fps
let clock = new THREE.Clock();
let delta = 0;
let interval = 1 / 60;
function animate() {

  requestAnimationFrame(animate);
  delta += clock.getDelta();

  if (delta  > interval) {

    if (IMUcube != null) {
      if (window.currentData != null){
        let quat = window.currentData.slice(0,4);
        const q = new THREE.Quaternion(quat[1], quat[2], quat[3], quat[0]);
        IMUcube.rotation.setFromQuaternion(q);
      }
      else {
        IMUcube.rotation.z += 0.01
        IMUcube.rotation.y += 0.003
        IMUcube.rotation.x += 0.001
      }
    }

    controls.update();
    renderer.render(scene, camera);
    delta = delta % interval;
  }
}
animate();
