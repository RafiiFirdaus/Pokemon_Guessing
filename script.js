
let correctName = "";
let randomInt = getRandomInteger(1, 100);
fetchPokemonData(randomInt);

// JavaScript function to fetch Pokémon data from the PokéAPI
async function fetchPokemonData(pokemon) {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const pokemonImage = document.getElementById("pokemonImage");

  // Show the loading spinner and hide the image while fetching
  loadingSpinner.style.display = "block";
  pokemonImage.style.display = "none";

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const data = await response.json();

  // Set Pokémon data and hide the loading spinner
  document.getElementById("pokemonImage").src = data.sprites.front_default;
  correctName = data.name.toLowerCase();

  // Hide the loading spinner and show the image
  loadingSpinner.style.display = "none";
  pokemonImage.style.display = "block";
}

// Function to get random integer for Pokémon ID
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPokemon() {
  // Fetch data for a new random Pokémon and reset the blur effect
  let randomInt = getRandomInteger(1, 100);
  fetchPokemonData(randomInt);
  resultMessage.textContent=" ";
  // Re-apply the blur effect for the new Pokémon
  document.getElementById("pokemonImage").style.filter = "blur(5px)";
}

// Function popup
function showPopup(isCorrect, pokemonName) {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupContainer = document.getElementById("popupContainer");
  const popupIcon = document.getElementById("popupIcon");
  const popupMessage = document.getElementById("popupMessage");
  const popupPokemonName = document.getElementById("popupPokemonName");

  // Reset classes
  popupContainer.classList.remove("correct", "incorrect");

  if (isCorrect) {
    popupContainer.classList.add("correct");
    popupIcon.textContent = "✓";
    popupMessage.textContent = "Correct!";
    popupPokemonName.textContent = `It's ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}!`;
  } else {
    popupContainer.classList.add("incorrect");
    popupIcon.textContent = "✗";
    popupMessage.textContent = "Incorrect!";
    popupPokemonName.textContent = "Try again!";
  }

  // Show popup
  popupOverlay.classList.add("show");

  // Hide popup after delay
  setTimeout(() => {
    popupOverlay.classList.remove("show");
  }, 1500);
}


// Function to check the player's guess
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.toLowerCase();
  const resultMessage = document.getElementById("resultMessage");
  const pokemonImage = document.getElementById("pokemonImage");

  if (guess === correctName) {
    // If the guess is correct, reveal the Pokémon and show a success message
    pokemonImage.style.filter = "none";
    resultMessage.textContent = `Correct! It's ${correctName.charAt(0).toUpperCase() + correctName.slice(1)}!`;
    resultMessage.style.color = "green";

    // Show popup animation
    showPopup(true, correctName);

    // Clear the input box after correct guess
    guessInput.value = "";

    // Load a new Pokémon after a short delay
    setTimeout(getPokemon, 2000);
  } else {
    // If the guess is incorrect, display a message to try again
    resultMessage.textContent = "Incorrect! Try again.";
    resultMessage.style.color = "red";

    // Show popup animation
    showPopup(false, correctName);
  }
}