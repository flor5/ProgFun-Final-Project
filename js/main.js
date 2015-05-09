/*
  This program displays a random unique number from 1-6 each round for a maximum
  of 6 rounds. Player 1 then enters a unique number from 1-6. That number is
  compared to another random unique number from 1-6 belonging to Player 2.
  Whoever has the higher number gets the value of all 3 numbers added to their
  score. If both players choose the same number, the value of all 3 numbers will
  be added to the next random number in the next round. The first player who
  scores above 32 or who has the highest score after 6 rounds wins.
  
  Coded by: Fong Lor
  Last revision: 
*/


// Check to see if value is valid
// Courtesy of: Brian P. Hogan
function isValueInWhitelist(userInput, userArray) {
  var result = false;
  for(var i = 0; i < userArray.length; i++) {
    if(userInput === userArray[i]) {
      result = true;
      break;
    }
  }
  return result;
}

// Removes value from given array
// Courtesy of: Brian P. Hogan
function findAndRemoveValue(userInput, userArray) {
  var newArray = [];

  for(var i = 0; i < userArray.length; i++) {
    if(userInput !== userArray[i]) {
      newArray.push(userArray[i]);
    }
  }
  return newArray;
}

// Fisher-Yates Shuffle - shuffles an array
// Courtesy of: http://stackoverflow.com/posts/12646864/revisions
function randomNumberArray() {
  var shuffledArray = [1,2,3,4,5,6];

  for (var currentIndex = shuffledArray.length - 1; currentIndex > 0; currentIndex--) {
    var randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    var temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }
  return shuffledArray;
}

// Initialize variables
var $answer = $("#player1Answer");
var $form = $("#game");
var $inputs = $("#player1Inputs");
var $message;
var $randomPrize = $("#prizeNumber");
var $results = $("#results");
var $score1 = $("#player1Score");
var $score2 = $("#player2Score");
var player1Answer = 0;
var player1Inputs = [1," - ",2," - ",3," - ",4," - ",5," - ",6];
var player1Score = 0;
var player2Answer = 0;
var player2Inputs = randomNumberArray();
var player2Score = 0;
var prizeNumber = 0;
var randomPrizeNumbers = randomNumberArray();
var rounds = 1;
var winnings = 0;

// Assign default values and display
$answer.html(player1Answer);
$inputs.html(player1Inputs);
$score1.html(player1Score);
$score2.html(player2Score);
$randomPrize.html(prizeNumber);

prizeNumber = randomPrizeNumbers.pop();
$randomPrize.html(prizeNumber);

$form.submit(function(event) {
  event.preventDefault();
  
  // Get player 1's answer and convert to a number
  player1Answer = Number($answer.val());
  
  //************NEED TO ADD TO PSEUDOCODE
  $answer.val("");
  
  // Check if player 1's input is unique
  if(isValueInWhitelist(player1Answer, player1Inputs)) {
    player1Inputs = findAndRemoveValue(player1Answer, player1Inputs);
    
    // Display what inputs are left
    $inputs.html(player1Inputs);
    
    // Get player 2's answer
    player2Answer = player2Inputs.pop();
    
    // Check winner of round
    if(player1Answer !== player2Answer) {
      winnings = player1Answer + player2Answer + prizeNumber;
      prizeNumber = 0; // Reset to 0 for next round
      if(player1Answer > player2Answer) {
        player1Score += winnings;
        $score1.html(player1Score);
        $message = $("<li>Player 2 bet: " + player2Answer + ". You win this round. " +
                   winnings + " added to your score.</li>");
        $results.prepend($message);
      }else{
        player2Score += winnings;
        $score2.html(player2Score);
        $message = $("<li>Player 2 bet: " + player2Answer + ". You lose this round. " +
                   winnings + " added to player 2's score.</li>");
        $results.prepend($message);
      }
    }else{
      prizeNumber += player1Answer + player2Answer;
      $randomPrize.html(prizeNumber);
      $message = $("<li>Tie. " + prizeNumber + " added to next prize number.</li>");
        $results.prepend($message);
    }
    
    // Check if game is done and determine winner, otherwise continue
    if(player1Score >= 32 || player2Score >= 32 || rounds === 6) {
      if(player1Score > player2Score) {
        $message = $("<li>You win.</li>");
        $results.prepend($message);
      }else if(player2Score > player1Score){
        $message = $("<li>You lose.</li>");
        $results.prepend($message);
      }else{
        $message = $("<li>Tie game.</li>");
        $results.prepend($message);
      }
    }else{
        prizeNumber += randomPrizeNumbers.pop();
        $randomPrize.html(prizeNumber);
        rounds++;
    }
    
  }else{
    $message = $("<li>You entered that number already. Try again.</li>");
    $results.prepend($message);
  }
});