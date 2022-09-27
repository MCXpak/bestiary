async function getBeastData() {
    
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id");

    console.log(id);
    const data = await fetch(`http://localhost:3000/beasts/${id}`)

    const beast = await data.json();
    
    return beast
}

async function displayBeastData() {

    const beast = await getBeastData();
    console.log(beast)

    const nameHeading = document.querySelector('#name');
    const descriptionHeading = document.querySelector('#description')
    const habitHeading = document.querySelector('#habit')
    const lootHeading = document.querySelector('#loot')

    nameHeading.textContent = beast.name
    descriptionHeading.textContent = beast.description
    habitHeading.textContent = beast.habit
    lootHeading.textContent = beast.loot

}

displayBeastData()


