document.addEventListener("DOMContentLoaded", () => {
    let animalButton = document.getElementById("animal");
    animalButton.addEventListener("click", validateAnimal)

    let randomButton = document.getElementById("random");
    randomButton.addEventListener("click", randomizer)
})

const btnClk = () => {
    console.log("button was clicked")
}

const validateAnimal = async () => {
    btnClk()
    let animalHolder = document.getElementById("animal-holder");
    let animalSearch = document.getElementById("animal-input").value;
    const myUrl = `http://localhost:3000/animal/${animalSearch}`

    const response = await axios.get(myUrl);
    let result = document.createElement('p')
    result.innerText = `Status: ${response.data.status} Message: ${response.data.message}`
    animalHolder.append(result);
    console.log(`Status: ${response.data.status} Message: ${response.data.message}`)
}

const randomizer = async () => {
    btnClk()
    let numberHolder = document.getElementById("number-holder");
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;

    const myUrl = `http://localhost:3000/random/${min}/${max}`

    const response = await axios.get(myUrl);
    let result = document.createElement('p')
    result.innerText = `Status: ${response.data.status} Range: ${response.data.range} RandomPick: ${response.data.randomPick}`

    numberHolder.append(result)

    console.log(`Status: ${response.data.status} Range: ${response.data.range} RandomPick: ${response.data.randomPick}`)
}