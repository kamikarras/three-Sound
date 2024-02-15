import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, addSphere } from './addMeshes'
import { addLight } from './addLights'


let count = 1

const renderer = new THREE.WebGLRenderer({alpha: true})
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,100)
const scene = new THREE.Scene()
const meshes = {}
const lights = {}

//add the three.js audio listeners
const listener = new THREE.AudioListener()
camera.add(listener)

//prepare a song variable for audio using the listener
const song = new THREE.Audio(listener)

//initiate the three js audio loader
const audioLoader = new THREE.AudioLoader()

//initiate the analyzer and get sound data from it
const analyser = new THREE.AudioAnalyser( song, 256 );
let data = analyser.getAverageFrequency();

let title= document.querySelector('#title')

camera.position.set(0,0,5)
init()
function init(){


  //set up renderer default settings
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  meshes.default = addBoilerPlateMeshes()
  meshes.standard = addStandardMesh()
  meshes.sphere = addSphere()

  lights.default = addLight()

  //use the loader to send the song data to the song variable
  audioLoader.load( './music/song.mp3', (buffer)=> {
    song.setBuffer( buffer );
    song.setLoop(true);
    song.setVolume(0.5);
    // song.play();
  });

  window.addEventListener('click', ()=>{
    song.play();
  })


  scene.add(meshes.default, meshes.standard, meshes.sphere, lights.default)

  resize()
  animate()
}

function resize(){
  window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

function animate(){
  if(count!=null){count ++
 title.style.fontVariationSettings = `"BLED" ${data -60}, "SCAN" ${data -60}`}
 else{}
 console.log(title.style.fontVariationSettings)
  requestAnimationFrame(animate)

  data = analyser.getAverageFrequency();
  console.log(data)

  meshes.default.rotation.x = (0.04*data)
  meshes.standard.position.y = 0.01*data

  if(data>75){
    console.log("low")
    meshes.sphere.scale.set(1.2,1.2,1.2)
    document.body.style.backgroundColor = `rgb(200,255,50)`
  }
  else{
    meshes.sphere.scale.set(.7,.7,.7)
    document.body.style.backgroundColor = `rgb(200,255,${data + (data*.4)})`
  }

  if(data<20){
    document.body.style.backgroundColor = `rgb(200,0,50)`
    title.style.color = `rgb(255,255,255)`
    title.innerHTML="click to play"
  }
  else{
    title.innerHTML="fall in love"
    title.style.color = `rgb(0,0,0)`
  }

  renderer.render(scene,camera)
}

