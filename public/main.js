var height = 16;
var width = 16;
var onLoad = false;
var container;
let wikiInputOne;
let wikiInputTwo;
let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=';
let url;
let url2;
let response;
let searchResult1;
let searchResult2;
let searchResult1discription;
let searchResult2discription;
let wordOne;
let allDec = '';
let currSpanID;
let map;
let mapBoxToken = 'pk.eyJ1Ijoibml2aXRheSIsImEiOiJjam1xZGRxeXAwM21tM3ZwMm80Y3lraXN0In0.6KR8dh24XF8B_XnLs0hJZw';
let mapStyle = 'mapbox://styles/nivitay/cjmqqj5dnip122ro67p1viu39';
//mapbox://styles/nivitay/cjmqokqbcin832ro669l5jgqk
let started = false;
let synthOne;
let synthTwo;
let synthThree;
let innerObj = [];
let returnedpattern =[]

let playableArr = {};
let keys = [];


let isbuttonOn = false;

let currTrees = [];
let playObject = [];
let tempArr =[];
let TreesAndCounts = [];


let pattern = [];

let pattern_01 = [];
let pattern_02 = [];
let pattern_03 = [];
let pattern_04 = [];
let pattern_05 = [];
let pattern_06 = [];


let patterns = [];



function convertRange( value, r1, r2 ) {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}



/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  // console.log(data);
});

//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  console.log("window_load");
  init();
};


function init(){

  for (let i = 0; i < treeTypes.length; i++) {
    TreesAndCounts.push({
      spc: treeTypes[i],
      count: '',
      isOn: false
    });
  }
  // console.log(treesObject);
  createMap();
  console.log("hello init");
  // socket.on('sendAntonym', function(antonyms){
  //   }
  // });
}

function sendSocker(){
  socket.emit('sendGesture', {'Data': "currCell", 'wordsToflip': checkedWord});
}




function createMap(){

  mapboxgl.accessToken = mapBoxToken;
  let container = document.getElementById(map);
  map = new mapboxgl.Map({
    container: 'map', // container id
    style: mapStyle, // stylesheet location
    center: [ -73.98886257, 40.69432132], // starting position [lng, lat]
    zoom: 12 // starting zoom
  });



  map.on('load', function() {
    map.addLayer({
      id: 'all-trees',
      type: 'circle',
      source: {
        type: 'vector',
        url: 'mapbox://nivitay.0za0qvu0'
      },
      'source-layer': 'new_york_tree_census_edited-9ee3ez',
      paint: {
        'circle-radius': [ 'interpolate', ['linear'], ['zoom'],
        10, ['/',['-', 20, ['number', ['get', 'tree_dbh'], 20]],9],
        13, ['/',['-', 20, ['number', ['get', 'tree_dbh'], 20]],4],
        17, ['/',['-', 20, ['number', ['get', 'tree_dbh'], 20]],1],
      ],
      'circle-opacity': 0.8,
      // 'circle-color': 'rgb(20, 245, 125)'

      // color circles by ethnicity, using a match expression
      // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
      'circle-color': [
        'match',
        ['get', 'spc_common'],
        'green ash', "rgba(20, 60, 0, 1)",
        'honeylocust',"rgba(20, 90, 0, 1)",
        'Callery pear',"rgba(20, 100, 0, 1)",
        "'Schubert' chokecherry","rgba(20, 110, 0, 1)",
        'northern red oak',"rgba(20, 120, 0, 1)",
        'American linden', "rgba(20, 140, 0, 1)",
        'pin oak',  "rgba(20, 145, 0, 1)",
        'American elm',  "rgba(20, 150, 0, 1)",
        'London planetree',  "rgba(20, 155, 0, 1)",
        'silver maple', "rgba(20, 160, 0, 1)",
        '',  "rgba(20, 165, 90, 1)",
        'white ash', "rgba(20, 170, 0, 1)",
        'hawthorn', "rgba(20, 175, 0, 1)",
        'Japanese zelkova', "rgba(20, 180, 0, 1)",
        'scarlet oak', "rgba(20, 185, 0, 1)",
        'Norway maple',  "rgba(20, 190, 0, 1)",
        'littleleaf linden', "rgba(20, 195, 0, 1)",
        'golden raintree', "rgba(20, 200, 0, 1)",
        'sweetgum', "rgba(20, 205, 0, 1)",
        'ginkgo', "rgba(20, 210, 0, 1)",
        'maple', "rgba(20, 215, 0, 1)",
        'purple-leaf plum', "rgba(20, 220, 0, 1)",
        'crab apple', "rgba(20, 230, 0, 1)",
        'cherry', "rgba(20, 140, 10, 1)",
        'Japanese snowbell', "rgba(20, 140, 20, 1)",
        'willow oak', "rgba(20, 140, 30, 1)",
        'silver linden', "rgba(20, 140, 40, 1)",
        'dawn redwood', "rgba(20, 140, 50, 1)",
        'red maple', "rgba(20, 140, 60, 1)",
        'Amur maackia', "rgba(30, 140, 10, 1)",
        'Sophora',  "rgba(25, 140, 20, 1)",
        'bur oak', "rgba(55, 140, 60, 1)",
        'white oak', "rgba(20, 160, 30, 1)",
        'flowering dogwood', "rgba(20, 180, 60, 1)",
        'common hackberry', "rgba(90, 190, 0, 1)",
        'eastern redcedar',  "rgba(90, 220, 70, 1)",
        'sycamore maple',  "rgba(29, 170, 90, 1)",
        'false cypress', "rgba(45, 230, 89, 1)",
        'sugar maple', "rgba(120, 180, 94, 1)",
        'black oak', "rgba(60, 240, 154, 1)",
        'European hornbeam', "rgba(160, 230, 154, 1)",
        'swamp white oak', "rgba(20, 156, 54, 1)",
        'serviceberry', "rgba(90, 240, 100, 1)",
        'Chinese elm', "rgba(60, 180, 54, 1)",
        'eastern redbud', "rgba(60, 180, 54, 1)",
        'katsura tree', "rgba(200, 240, 190, 1)",
        'crimson king maple', "rgba(200, 230, 54, 1)",
        'Ohio buckeye', "rgba(190, 220, 100, 1)",
        'hardy rubber tree', "rgba(120, 247, 190, 1)",
        'paper birch', "rgba(200, 255, 54, 1)",
        'tulip-poplar', "rgba(190, 249, 120, 1)",
        'Amur maple', "rgba(194, 234, 200, 1)",
        'ash', "rgba(60, 180, 54, 1)",
        'Japanese tree lilac', "rgba(20, 234, 190, 1)",
        'catalpa',  "rgba(160, 255, 234, 1)",
        'Siberian elm', "rgba(60, 180, 54, 1)",
        'cockspur hawthorn', "rgba(190, 234, 154, 1)",
        'spruce', "rgba(200, 240, 190, 1)",
        'sawtooth oak', "rgba(200, 230, 183, 1)",
        'bald cypress', "rgba(154, 235, 154, 1)",
        'hedge maple', "rgba(190, 230, 90, 1)",
        'horse chestnut', "rgba(180, 245, 150, 1)",
        'arborvitae', "rgba(200, 242, 180, 1)",
        'mulberry', "rgba(145, 255, 230, 1)",
        'two-winged silverbell', "rgba(140, 200, 190, 1)",
        'weeping willow', "rgba(60, 250, 190, 1)",
        'American hophornbeam', "rgba(20, 255, 140, 1)",
        'magnolia', "rgba(160, 255, 200, 1)",
        'eastern cottonwood', "rgba(190, 230, 100, 1)",
        'Japanese hornbeam', "rgba(123, 240, 190, 1)",
        'tree of heaven', "rgba(100, 180, 90, 1)",
        'black cherry', "rgba(230, 255, 220, 1)",
        "Schumard's oak", "rgba(79, 237, 50, 1)",
        'black locust', "rgba(122, 236, 170, 1)",

        //   'crepe myrtle', 'river birch', 'Japanese maple', 'American hornbeam', 'Cornelian cherry', 'Oklahoma redbud', 'Kentucky coffeetree', 'sassafras', 'cucumber magnolia', 'Turkish hazelnut', 'Atlantic white cedar', 'pine', 'mimosa', 'Norway spruce', 'English oak', 'black maple', 'shingle oak', 'Amur cork tree', 'holly', 'pond cypress', 'Kentucky yellowwood', 'southern magnolia', 'pagoda dogwood', 'silver birch', 'smoketree', 'black walnut', 'Chinese tree lilac', 'kousa dogwood', 'Persian ironwood', 'boxelder', 'blue spruce', 'American beech', 'empress tree', 'European beech', 'red horse chestnut', 'blackgum', 'quaking aspen', 'white pine', 'bigtooth aspen', 'trident maple', 'black pine', 'paperbark maple', 'Chinese fringetree', 'Chinese chestnut', 'pignut hickory', 'Himalayan cedar', 'Scots pine', 'southern red oak', 'tartar maple', 'Douglas-fir', 'red pine', 'Atlas cedar', 'Shantung maple', 'European alder', 'eastern hemlock', 'pitch pine', 'Osage-orange', 'American larch', 'Virginia pine'

        /* other */ "rgba(200, 255, 90, 1)"
      ]
    }
  });

  map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
  }));

  map.on('moveend', function (e) {
    let newTrees = map.queryRenderedFeatures({layers:['all-trees']});

    for (let i = 0; i < treeTypes.length; i++) {
      TreesAndCounts[i].isOn = false;
      // console.log(TreesAndCounts[i].isOn);
    }

    playObject = []

    if (newTrees) {
      // go through all the trees
      for (let i = 0; i < newTrees.length; i++){
        //push all trees to array

        playObject.push({
          spc: newTrees[i].properties.spc_common,
          diam: newTrees[i].properties.tree_dbh
        });
      }
      // console.log(playObject);
      gettreeStats();
      // var uniqueFeatures = getUniqueFeatures(newTrees, "spc_common");
    }
  });
});
}


///convert daim to note
function convertDiamToNote(diamArray){
  let myArr = [];

  if (diamArray != undefined ){

    for (var i = 0; i < diamArray.length; i++) {
      let note;
      switch (Math.floor(convertRange( diamArray[i], [ 1, 30 ], [ -1, 22 ] ))) {
        case -1:
        note = 0;
        break;
        case 0:
        note = 0;
        break;
        case 1:
        note = 196.00;
        break;
        case 2:
        note = 220.00;
        break;
        case 3:
        note = 246.94;
        break;
        case 4:
        note = 261.63;
        break;
        case 5:
        note = 293.66;
        break;
        case 6:
        note = 329.63;
        break;
        case 7:
        note = 369.99;
        break;
        case 8:
        note = 392.00;
        break;
        case 9:
        note = 440.00;
        break;
        case 10:
        note = 493.88;
        break;
        case 11:
        note = 523.25;
        break;
        case 12:
        note = 587.33;
        case 13:
        note = 659.25;
        break;
        case 14:
        note = 739.99;
        break;
        case 15:
        note = 783.99;
        break;
        case 16:
        note = 880.00;
        break;
        case 17:
        note = 987.77;
        break;
        case 18:
        note = 1046.50;
        break;
        case 19:
        note = 1174.66;
        break;
        case 20:
        note = 1318.51;
        break;
        case 21:
        note = 1479.98;
        break;
        case 22:
        note = 1567.98;
      }

      myArr.push(note);

    }

  }
  return myArr;
}


///////function
function preparePatterns(objectArray){

  patterns = [];



  // console.log("array recieved", objectArray, Object.keys(objectArray).length);
  // console.log("tree[0] name",  Object.keys(objectArray)[0]);
  // console.log("tree[0] name",  Object.keys(objectArray)[1]);
  //for all the objects that are now visible prepare an array
  for (var i = 0; i < Object.keys(objectArray).length; i++) {
    // console.log(i);
    let currentspc = Object.keys(objectArray)[i];
    let currentspcdiam = convertDiamToNote(objectArray[Object.keys(objectArray)[i]].diam);
    patterns.push({
      spc: currentspc,
      diamArr: currentspcdiam
    });
  }


  if ( (patterns[0].spc != null) && ( patterns[0].spc != null) ){

    let nowPlayingTree01 = patterns[0].spc;
    let nowPlayingTree02 = patterns[1].spc;
    let nowPlayingTree03 = patterns[2].spc;

    console.log(nowPlayingTree02,"and",  nowPlayingTree01 );

    document.getElementById("treeNoOne").innerHTML = nowPlayingTree02;
    document.getElementById("and").innerHTML = "and ";
    document.getElementById("treeNoTwo").innerHTML = nowPlayingTree01;
    document.getElementById("and2").innerHTML = "and ";
    document.getElementById("treeNothree").innerHTML = nowPlayingTree03;
  }




  // stop prevsounds
  if (started){
    Tone.Transport.stop();
    // seq.stop();
    console.log("stop");
  }



  Tone.Transport.bpm.value = 100;
  Tone.Transport.start();

  synthOne = createSyntOnehWithEffects();
  synthTwo = createSyntTwoWithEffects();
  synthThree = createSyntThreeWithEffects();


if(patterns[0].diamArr != null){
    var seq = new Tone.Sequence(playNote1, patterns[0].diamArr, "9n");
    seq.start();
    console.log("start this sequencer1");
}

if (patterns[1].diamArr != null){
  var seq2 = new Tone.Sequence(playNote2, patterns[1].diamArr, "2n");
  seq2.start();
    console.log("start this sequencer2");
}

if (patterns[2].diamArr != null){
  var seq3 = new Tone.Sequence(playNote3, patterns[2].diamArr, "3n");
  seq3.start();
  console.log("start this sequencer3");
}



  started = true;

}





function gettreeStats(){

  tempArr = [];
  let theseTrees = {};
  instancesDiam = [];
  playableArr = {};
  // pattern_02 = [];

  for (var i = 0; i < playObject.length; i++) {
    let key = playObject[i].spc;
    if (playableArr[key] === undefined){
      playableArr[key] = {};
      playableArr[key].count = 1;
      playableArr[key].diam = [];
      playableArr[key].diam.push(playObject[i].diam)
    }else {
      playableArr[key].count++;
      playableArr[key].diam.push(playObject[i].diam)
    }
  }

  preparePatterns(playableArr);

}





function getUniqueFeatures(array, comparatorProperty){
  let existingFeatureKeys = {};

  // Because features come from tiled vector data, feature geometries may be split
  // or duplicated across tile boundaries and, as a result, features may appear
  // multiple times in query results.

  let uniqueFeatures = array.filter(function(el){
    if (existingFeatureKeys[el.properties[comparatorProperty]]){
      return false;
    }else{
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true;
    }
  });
  return uniqueFeatures;
}



//////// --------> Tone Js Stuff



function buttonPressed(){
  isbuttonOn = true;
  console.log(isbuttonOn);
}




  function playNote1(time, note) {
    if (note != undefined) {
      synthOne.triggerAttackRelease(note, "1n");
      // console.log("play notes1");
    }
  }


  function playNote2(time, note) {
    if (note != undefined) {
      synthTwo.triggerAttackRelease(note, "5n");
      // console.log("play notes2");
    }
  }



  function playNote3(time, note) {
    if (note != undefined) {
      synthThree.triggerAttackRelease(note, "6n");
      // console.log("play notes3");
    }
  }








function createSyntOnehWithEffects()  {
  let vol = new Tone.Volume(-40).toMaster();

  let reverb = new Tone.Freeverb(0.2).connect(vol);
  reverb.wet.value = 0.2;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.2;

  let vibrato = new Tone.Vibrato(5, 0.1).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.8,
      "decay": 0.9,
      "sustain": 0.6,
      "release": 7,
    }
  });
  return polySynth.connect(vibrato);
}





function createSyntTwoWithEffects()  {
  let vol = new Tone.Volume(-20).toMaster();

  let reverb = new Tone.Freeverb(0.2).connect(vol);
  reverb.wet.value = 0.2;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.2;

  let vibrato = new Tone.Vibrato(5, 0.1).connect(delay);

  let polySynth = new Tone.PolySynth(4, Tone.Synth, {
    "oscillator" : {
				"partials" : [0, 2, 3, 4, 7],
			},
    "envelope": {
      "attack": 0.08,
      "decay": 0.98,
      "sustain": 0.6,
      "release": 1,
    }
  });
  return polySynth.connect(vibrato);
}





function createSyntThreeWithEffects()  {
  let vol = new Tone.Volume(-45).toMaster();

  let reverb = new Tone.Freeverb(0.2).connect(vol);
  reverb.wet.value = 0.3;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.1;

  let vibrato = new Tone.Vibrato(5, 0.1).connect(delay);

  let polySynth = new Tone.PolySynth(315, Tone.Synth, {
    "oscillator": {
      "type": "square"
    },
    "envelope": {
      "attack": 0.001,
      "decay": 0.98,
      "sustain": 0.6,
      "release": 2,
    }
  });
  return polySynth.connect(vibrato);
}
