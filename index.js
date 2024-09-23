const form = document.getElementById("poem-generator");
const poemDiv = document.getElementById("poem");
const submitButton = document.getElementById("submit-button");

// API Key for SheCodes AI
const apiKey = "3t7ce6010b4a8f16bfo4e65cf38caba4";

// Function to display default poem
function displayDefaultPoem() {
  const defaultPoem = `A tranquil morning dawns anew,
Soft whispers of the breeze ensue.
The sun awakens, warm and bright,
Painting the sky in golden light.`;
  displayPoem(defaultPoem);
}

// Display the default poem when the page loads
window.onload = displayDefaultPoem;

form.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  const topic = document.getElementById("instructions").value.trim(); 

  if (topic) {
    submitButton.disabled = true; 
    poemDiv.innerHTML = `Generating your poem about "${topic}"...`; // Show generating message

    try {
      const poem = await generatePoem(topic); 
      displayPoem(poem); 
    } catch (error) {
      poemDiv.innerHTML = "Sorry, an error occurred while generating the poem.";
    } finally {
      submitButton.disabled = false;
    }
  } else {
    poemDiv.innerHTML = "Please enter a topic to generate a poem.";
  }
});

async function generatePoem(topic) {
  const context = "Write a short, concise, and meaningful poem in 4 lines."; 
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${topic}&context=${context}&key=${apiKey}`;
  
  const response = await axios.get(apiUrl);
  return response.data.answer;
}

function displayPoem(poem) {
  poemDiv.innerHTML = "";
  const typewriter = new Typewriter(poemDiv, {
    loop: false, 
    delay: 50,   
  });

  typewriter.typeString(poem).start();
}