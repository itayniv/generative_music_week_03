var scene,
    camera,
    light,
    renderer,
    timer,
    manager;
window.onload = () => init();

function init(){
    manager = new THREE.LoadingManager();
    //Don't start rendering until you finish loading
    manager.onload = function(){
      render();
    }

    timer = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.set(0, 0.11, 1);

    light = new THREE.DirectionalLight(0xffffff);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = false;
    document.body.appendChild(renderer.domElement);

      var animLoader = new THREE.JSONLoader(manager);

      animLoader.load('models/Cylinder.json', function(geometry, materials){
          var mat = new THREE.MeshBasicMaterial();
          //Make sure to use the vertex colors and skin the material
          mat.vertexColors = THREE.VertexColors;
          //This is false by default and will not animate!
          mat.skinning = true;

          var skinnedMesh = new THREE.Mesh(geometry, mat);

          mixer = new THREE.AnimationMixer(skinnedMesh);
          //Pick the first animation track
          console.log(geometry);
          // var animation = mixer.clipAction(geometry.animations[ 0 ]);

          scene.add(skinnedMesh);

          // animation.play();

      });

}

function render(){
      requestAnimationFrame(render);
      mixer.update(timer.getDelta());
      renderer.render(scene, camera);
}
