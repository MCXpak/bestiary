
const getBeastData = async () => {

     // Reach out to the API
    let response = await fetch("http://localhost:3000/beasts");

    // Extract the beast data from the response
    const beasts = await response.json();

    // Log the data
    return beasts;
}

const displayBeastData = async () => {

    // Get the beast data
    const beasts = await getBeastData();
    console.log(beasts)

    // Get reference to cage
    const cage = document.getElementById("cage");

    //Loop through the beast data
    for (let beast of beasts) {

        // Create an HTML element
        const li = document.createElement("li");

        // Set the element's content
        li.textContent = beast["name"]; 

        // Add the element to the cage
        cage.appendChild(li);

    }

}

const createNewBeast = async (e) => {

    //Do not refresh the page
    e.preventDefault();

    // Extract the data into an object
    const data = {
        name: e.target.name.value,
        encounterRate: e.target.encounterRate.value
    }

    console.log("this is data", data)
   

    // Set the options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    // Make a fetch request sending the data
    const res = await fetch("http://localhost:3000/beasts", options);

    if (res.status == 201) {
        alert("Creature created successfully!");
    }

}

const form = document.querySelector('#create-form');
form.addEventListener("submit", createNewBeast);

displayBeastData();


