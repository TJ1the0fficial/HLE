const list = document.getElementById("listofwords");

async function loadwords() {
  try {
    const response = await fetch("UnitOfWords.json");
    const data = await response.json();

    data.EnglishWords.forEach(element => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span class="hun">${element.hun}</span> 
                -
        <span class="en">${element.en}</span>`;

      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading words:", error);
  }
}
loadwords()