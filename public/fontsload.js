var camera, scene, renderer;

init();
animate();

function init( ) {

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, - 400, 600 );

  var controls = new THREE.OrbitControls( camera );
  controls.target.set( 0, 0, 0 );
  controls.update();

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );


//font loader//


for (let i = 0; i < 16; i ++ ){
  var polyFontLoader = new THREE.FontLoader();
  polyFontLoader.load( 'fonts/Roboto Mono Medium_Regular.json', function ( font ) {

    var xMid
    var fontText;
    var textShape = new THREE.BufferGeometry();

    var color = 0xA3A3A3;

    var matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    } );

    var message = i+1;
    var shapes = font.generateShapes( message, 10, 4 );
    var geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    textShape.fromGeometry( geometry );

    fontText = new THREE.Mesh( textShape, matLite );
    fontText.position.z = 0;
    fontText.position.y = i*40;
    fontText.position.x = 0;
    scene.add( fontText );


  } );
}



for (let i = 0; i < 16; i ++ ){
  var polyFontLoader = new THREE.FontLoader();
  polyFontLoader.load( 'fonts/Roboto Mono Medium_Regular.json', function ( font ) {

    var xMid
    var fontText;
    var textShape = new THREE.BufferGeometry();

    var color = 0xA3A3A3;

    var matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    } );

    var message = i+1;
    var shapes = font.generateShapes( message, 10, 4 );
    var geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    textShape.fromGeometry( geometry );

    fontText = new THREE.Mesh( textShape, matLite );
    fontText.position.z = 0;
    fontText.position.y = 0;
    fontText.position.x = i*40;
    scene.add( fontText );


  } );
}


  //end load function

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

} // end init

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  renderer.render( scene, camera );

}
