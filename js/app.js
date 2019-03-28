/*
 * Create a list that holds all of your cards
 */

let collection = document.querySelectorAll(".card");
let array = [];

for(i=0; i<collection.length; i++){
    array[i] = collection[i].innerHTML;
}

array = shuffle(array);

for(i=0; i<array.length; i++){
    document.querySelectorAll('.card')[i].innerHTML = array[i];
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Add countDown timer
var timeleft = 0;
var firstStar = document.querySelector('.firstStar');
var secondStar = document.querySelector('.secondStar');
var thirdStar = document.querySelector('.thirdStar');

var downloadTimer = setInterval(function(){
  document.getElementById("timer").innerText = timeleft;
  timeleft += 1;

  if(timeleft == 10) {
      
      firstStar.classList.add("black");
  }

  if(timeleft == 25) {
      
    secondStar.classList.add("black");
}
  if(timeleft == 35) {
      
    thirdStar.classList.add("black");
}

  if(timeleft == 50){
      //location.reload();
  }

  if(timeleft <= 0)
    clearInterval(downloadTimer);
}, 1000);



// Restart Action Listener
const restart = document.querySelector('.restart');

restart.addEventListener('click', function(){
    location.reload();
});


var counter = 0;
var item;

// Add Listener to all Cards
for(var i = 0; i < collection.length; i++) {
    collection[i].addEventListener("click", bindClick(i)); 
}

function bindClick(i) {
 return function() {
     console.log("you clicked region number " + i);
     item = collection[i];
     console.log(item);
     openCard(item);

     counter++;
     document.querySelector('.moves').innerHTML = counter;
 };
}


var openCards = [];
var countCards = 0;

function openCard(item) { 

    item.classList.add("show");
    item.classList.add("open");


    openCards.push(item);

    if(openCards.length === 2){
    
        if(openCards[0].innerHTML === openCards[1].innerHTML){

            matchCard(openCards[0]);
            matchCard(openCards[1]);
            
            openCards = [];
            
            // Add counter to check if all cards got matched
            countCards ++; // can add another check if cards == each other and i != i
            if(countCards == 8)
            {
                // finish the game with pop-up
                clearInterval(downloadTimer);
                boxPop();
            }

        }
        
        else{
            
            console.log("They dont match");

            openCards[0].classList.add('orange');

            hideCard(openCards[0]);
            hideCard(openCards[1]);
            
            item = null;
            openCards = [];
            console.log(openCards);
            console.log(item);
            
            
            //item = null;
        }
    }
}


// *** Box Pop-up *** This funcation has been taken from w3school, but I have modified it. 

function boxPop() {

    // Get the modal
    var modal = document.getElementById('myModal');
    var showTimer = document.getElementById("timer").innerText;
    //var showMoves = document.querySelector(".moves").innerText;
    var showMoves = counter + 1;
    var showStars = document.getElementById("showStars");

    // assign Timer and Moves to Paragraph
    document.getElementById("showTimer").innerText = showTimer;
    document.getElementById("showMoves").innerText = showMoves;

    if(firstStar.classList.contains("black")){
        showStars.innerText = 2;
    } else{
        showStars.innerText = 3;
    }

    if(secondStar.classList.contains("black")){
        showStars.innerText = 1;
    }

    if(thirdStar.classList.contains("black")){
        showStars.innerText = 0;
    }

    
    // Play Again Listener
    var playAgain = document.getElementById("playAgainButton");
    playAgain.addEventListener("click", function(){
        location.reload();
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    //btn.onclick = function() {
    modal.style.display = "block";
    //}

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }

}
   
 

  //function to show Card
function showCard(item) {
    item.classList.add("show");
    item.classList.add("open");
}

// function to hide Card
function hideCard(item) {
    //openCards[0].classList.add("orange");
    //document.getElementsByClassName("my-nice-class").style[0] = "background: red;"
    //openCards.style[0] = "background: red;"
    item.classList.add('animated', 'shake');
    setTimeout(myFunction,1000);

    function myFunction(){
    item.classList.remove("show");
    item.classList.remove("open");
    item.classList.remove('animated', 'shake');
    //item.classList.add("orange");
    }
}

//function match card
function matchCard(item) {
    item.classList.add("match");
    item = null;
}
