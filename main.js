// NOTE: User needs to remove local storage restrictions in Safari to run this code.
//       Firefox and Chrome should run the code properly by default.
//       Browsers need to support querySelectors and in-browser local storage.

function randInt(start, end) {
  return Math.floor( ( Math.random() * end ) + start );
}

function incrScore( incr ) {
  score = parseInt( localStorage.getItem( "score" ) ) + incr;
  attempts = parseInt( localStorage.getItem( "attempts" ) );
  localStorage.setItem( "score", score );
  updateAccuracy();
}

function incrAttempts( incr ) {
  attempts = parseInt( localStorage.getItem( "attempts" ) ) + incr;
  localStorage.setItem( "attempts", attempts );
  updateAccuracy();
}

function updateAccuracy() {
  score = parseInt( localStorage.getItem( "score" ) );
  attempts = parseInt( localStorage.getItem( "attempts" ) );
  if ( attempts <= 0 ) {
    accuracy = 0;
  }
  else {
    accuracy = ( score / attempts * 100 ).toFixed(0);
  }
  localStorage.setItem( "accuracy", accuracy );
}

function displayScore( elem ) {
  score = parseInt( localStorage.getItem( "score" ) );
  attempts = parseInt( localStorage.getItem( "attempts" ) );
  elem.innerHTML = "Score: " + score + " / " + attempts;
}

function displayAccuracy( elem ) {
  accuracy = parseFloat( localStorage.getItem( "accuracy" ) );
  elem.innerHTML = "Accuracy: " + accuracy + " %";
}

function displayMissed( elem ) {
  score = parseInt( localStorage.getItem( "score" ) );
  attempts = parseInt( localStorage.getItem( "attempts" ) );
  missed = attempts - score;
  elem.innerHTML = "Missed: " + missed;
}

function sleep( ms ) {
  return new Promise(resolve => setTimeout( resolve, ms ) );
}

function notifyUserResult( answer, result ) {
  updateStateImage( answer + "_" + result );
}

function checkKeyPress( event ) {
  if ( event.key == "Enter" ) {
    check();
  }
}

function clearAndFocusTextInput( inputElem ) {
  inputElem.value = "";
  inputElem.focus();
}

async function check() { 
  states = JSON.parse( localStorage.getItem( "states" ) );
  state = localStorage.getItem( "state" );
  input = document.querySelector( ".cont-input input" );
  isCorrect = false;

  guess = input.value.toLowerCase();

  if ( guess == "" ) {
    clearAndFocusTextInput( document.querySelector( ".cont-input input" ) );
    return;
  }

  incrAttempts( 1 );

  if ( guess == state.toLowerCase() ) {
    incrScore( 1 );
    notifyUserResult( state, "T" );
    await sleep( 650 ); // allow user to see result
    isCorrect = true;
  }
  else {
    notifyUserResult( state, "F" );
    await sleep( 650 ); // allow user to see result
    isCorrect = false;
  }

  // If guessed correctly, remove state form queue. Get next state regardlessly. 
  state = advanceNextState( states, state, isCorrect );
  localStorage.setItem( "states", JSON.stringify( states ) );
  localStorage.setItem( "state", state );

  displayScore( document.querySelector( ".cont-general #score" ) );
  displayAccuracy( document.querySelector( ".cont-general #accuracy" ) );

  clearAndFocusTextInput( document.querySelector( ".cont-input input" ) );
}

function skip() {
  // Skip to next state
  states = JSON.parse( localStorage.getItem( "states" ) );
  state = localStorage.getItem( "state" );
  state = advanceNextState( states, state, false );
  localStorage.setItem( "states", JSON.stringify( states ) );
  localStorage.setItem( "state", state );

  clearAndFocusTextInput( document.querySelector( ".cont-input input" ) );

  incrAttempts( 1 );
  displayScore( document.querySelector( ".cont-general #score" ) );
  displayAccuracy( document.querySelector( ".cont-general #accuracy" ) );
}

async function reveal() {
  state = localStorage.getItem( "state" );
  input = document.querySelector( ".cont-input input" );
  input.value = state;
  await sleep( 650 ); // allow user to see answer
  skip();
}

function removeFromArr( arr, item ) {
  index = arr.indexOf( item );
  if ( index > -1 ) {
    return arr.splice( index, 1 );
  }
  return null;
}

function updateStateImage( state ) {
  src = "";
  if ( state ) {
    src = "img/" + state + ".png";
  }
  else {
    src = "img/USA.png";
  }
  img = document.querySelector( ".cont-img img" );
  img.src = src;
}

function advanceNextState( arr, currState, remove ) {
  if ( remove ) {
    removeFromArr( arr, currState );
  }
  
  nextState = getRandElem( arr );

  if ( arr.length > 0 ) {
    updateStateImage( nextState );
  }
  else {
    updateStateImage( "" );
    setDone();
  }

  return nextState;
}

function getRandElem( arr ) {
  return arr[ randInt( 0, arr.length ) ];
}

function toggleShowResults() {
  results = document.querySelector( ".cont-results" );
  general = document.querySelector( ".cont-general" );

  if ( results.style.display == "none" ) {
    results.style.display = "flex";
    general.style.display = "none";
  }
  else {
    results.style.display = "none";
    general.style.display = "flex";
  }
}

function setDone() {
  toggleShowResults();

  displayScore( document.querySelector( ".cont-results #score" ) );
  displayMissed( document.querySelector( ".cont-results #missed" ) );
  displayAccuracy( document.querySelector( ".cont-results #accuracy" ) );

  resetBtn = document.querySelector( ".cont-results button" );
  resetBtn.focus();
}

function reset() {
  toggleShowResults();
  init();
}

function init() {
  //states = [ "Texas" ]; // USE FOR TESTING ONLY
  //states = [ "California", "Texas", "Nevada", "Arizona" ]; // USE FOR TESTING ONLY
  states = [ "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming" ];
 
  state = getRandElem( states );

  localStorage.setItem( "states", JSON.stringify( states ) );
  localStorage.setItem( "state", state );
  localStorage.setItem( "score", 0 );
  localStorage.setItem( "accuracy", 0 );
  localStorage.setItem( "attempts", 0 );
  localStorage.setItem( "numStates", states.length );
  
  updateStateImage( state );
  
  displayScore( document.querySelector( ".cont-general #score" ) );
  displayAccuracy( document.querySelector( ".cont-general #accuracy" ) );

  clearAndFocusTextInput( document.querySelector( ".cont-input input" ) );
}

init();
