const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}
// Added Reset button functionality
  function myfunc_2() {
    location.reload();
    document.getElementById('b1').value = '';
    document.getElementById("b2").value = '';
    document.getElementById("b3").value = '';
    document.getElementById("b4").value = '';
    document.getElementById("b5").value = '';
    document.getElementById("b6").value = '';
    document.getElementById("b7").value = '';
    document.getElementById("b8").value = '';
    document.getElementById("b9").value = '';
    document.getElementById('b10').value = '';
    document.getElementById('b11').value = '';
    document.getElementById("b12").value = '';
    document.getElementById("b13").value = '';
    document.getElementById("b14").value = '';
    document.getElementById("b15").value = '';
    document.getElementById("b16").value = '';
 
}
// This function was changesd in that way which enables the computer to place an "O" in the tic-tac-toe game, with the aim of providing competition to the human player.

function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}
// Displaying method of winner is changed to alert
function displayWinner() {
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    alert("Congratulations You Win!")
  } else if (winner === 'o') {
    alert("Sorry, Computer won Try Next Time!")
  } else {
    header.textContent = "Oops Its a Tie, Try Next Time!";
  }
  resultContainer.appendChild(header);

  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() {

    // Check rows and columns.
    let result = checkBoxes(0 , 1 , 2) ||
        checkBoxes(4 , 5 , 6) || checkBoxes(8, 9, 10) || checkBoxes(12, 13, 14) || checkBoxes(1, 2, 3  ) || checkBoxes(5 , 6 , 7 ) ||
         checkBoxes(9, 10 , 11 ) || checkBoxes(13, 14, 15 ) || checkBoxes(0, 4, 8) || checkBoxes(1 , 5 , 9 ) || 
        checkBoxes(2 , 6 , 10 ) || checkBoxes(3 , 7 , 11 ) || checkBoxes(4 , 8 , 12 ) || checkBoxes(5, 9 , 13) || 
        checkBoxes(6 , 10 , 14  );
    if (result) {
      return result;
    }
  
  // Check diagonals
  return checkBoxes(0, 5, 10) || checkBoxes(1, 6, 11)  || checkBoxes(4, 9, 14)  || checkBoxes(5, 10, 15)  || checkBoxes(8, 5, 2)  || checkBoxes(9, 6, 3)  || checkBoxes(12, 9, 6)  || checkBoxes(13, 10, 7);
}

const freeBoxes = [];
// Map of box number -> 'x' or 'o'
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}