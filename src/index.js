const userUrl = 'https://localhost:3000/users'
const login = document.querySelector('form')
const deck = document.querySelector('#card-deck')

let easyArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];

// Welcome page should only have username form and disabled board

document.addEventListener("DOMContentLoaded", () => {

    login.addEventListener("submit", (e) => {
        // console.log(e)
        renderSideNav(e)
    })
})
// <<<<<<-------------BUILDING ALL ELEMENTS FOR GAME OPTIONS------------------>>>>>>>
function renderSideNav(event){
    event.preventDefault()

    // event.target.reset()
    event.target.querySelector('input').setAttribute('disabled', " ")
    event.target.querySelector('#submitName').setAttribute('style',"display:none")


    const choices = document.querySelector('#options')
    choices.innerHTML = `

    <div id="difDiv">
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio1a" name="customRadio1" class="custom-control-input" required value="easy">
            <label class="custom-control-label" for="customRadio1a">Easy</label>
        </div>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio1b" name="customRadio1" class="custom-control-input" required value='medium'>
            <label class="custom-control-label" for="customRadio1b">Medium</label>
        </div>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio1c" name="customRadio1" class="custom-control-input" required value="hard">
            <label class="custom-control-label" for="customRadio1c">Hard</label>
        </div>
    </div>

    <div id="radioDiv">
        <p>THEMES:</p>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio2a" name="customRadio2" class="custom-control-input" required value="default">
            <label class="custom-control-label" for="customRadio2a">Default</label>
        </div>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio2b" name="customRadio2" class="custom-control-input" required value='rickMorty'>
            <label class="custom-control-label" for="customRadio2b">Rick and Morty</label>
        </div>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio2c" name="customRadio2" class="custom-control-input"  required value="vectors">
            <label class="custom-control-label" for="customRadio2c">Vectors</label>
        </div>
    </div>
    <button type="submit" class="btn btn-success" id="startPlay">Click to Play!</button>`

    const radios = document.querySelectorAll("input[type='radio']")
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            // debugger
            enabledSettings =
            Array.from(radios) // Convert radio to an array to use filter and map. Expecting [<difficulty>, <theme>]
            .filter(i => i.checked) // Use Array.filter to remove unchecked radio.
            .map(i => i.value) // Use Array.map to extract only the values from the array of objects.

            const playBtn = document.querySelector('#startPlay')

            playBtn.addEventListener('click', (ev) => {
                renderGame(ev, enabledSettings)

            })
        })
    })
    let userName = document.querySelector('#user').value
    const nameDiv = document.getElementById('name-display')
    const nameText = document.createElement('h2')
    nameText.innerText = `${userName}`
    nameDiv.appendChild(nameText)
}

// <<<<--------WHEN EVENT IS CONSOLE.LOGGED, 2 OF THE SAME EVENT LOGS-- A PROBLEM?---->>>>>>>
function renderGame(ev, settings){
    ev.preventDefault()

    switch (settings[0]) {
        case
            "easy":
            easyGame()
            break;
        case
            "medium":
            mediumGame()
            break;
        case
            "hard":
            hardGame()

    }
    switch (settings[1]) {
        case
            "default":
            themeDefault()
            break;
        case
            "rickMorty":
            themeRickMorty()
            break;
        case
            "vectors":
            themeVector()
            break;
    }
    const btn = document.querySelector("#startPlay")
    btn.innerText = 'Quit Game'
    btn.style.backgroundColor = "#c50f21"
}

function easyGame(){
    // FIRST, RENDER THE BOARD EASY DIFFICULTY
    const num = deck.childElementCount
    deck.innerHTML = " "
    for(i=0;i < num;i++){
    const front = document.createElement('div')
    const back = document.createElement('div')
    front.setAttribute('class', 'card__side')
    back.setAttribute('class', 'card__side card__side--back is-active')
    deck.append(back)
    back.addEventListener('click', (e) => {
        console.log(e)
        // THIS SHOULD BE FUNC TO FLIP CARD
    })

   }

}


function mediumGame(){
    deck.innerHTML = " "

}
function hardGame(){
    deck.innerHTML = " "
}

function themeDefault(){

}

function themeRickMorty(){

}
function themeVector(){

}