const USERS_URL ="http://localhost:3000/users"
const BOARDS_URL = "http://localhost:3000/boards"
const deck = document.querySelector('#card-deck')
const ICON_API = []
const RM_API = []
let easyArray = ["fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-gifts fa-3x", "fa fa-glass-cheers fa-3x", "fa fa-holly-berry fa-3x", "fa fa-sleigh fa-3x","fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-gifts fa-3x", "fa fa-glass-cheers fa-3x", "fa fa-holly-berry fa-3x", "fa fa-sleigh fa-3x"];



// Welcome page should only have username form and disabled board

document.addEventListener("DOMContentLoaded", () => {
    fetchIcons()
    fetchRickMorty()
    const login = document.querySelector('form')
    login.addEventListener("submit", (e) => {
        renderSideNav(e)

    })


})
// <<<<<<-------------FETCHING IMG URLs FROM APIs------------------>>>>>>>
function fetchIcons(){

    fetch("https://api.iconfinder.com/v2/icons/search?query=fantasy")
    .then(response => response.json())
    .then(data => {
        data.icons.forEach(obj => {
            ICON_API.push(obj.raster_sizes[6].formats[0].preview_url)
        })
    })
}

function fetchRickMorty(){

    fetch("https://rickandmortyapi.com/api/character/")
    .then(response => response.json())
    .then(data => {
        data.results.forEach(character => {
            RM_API.push(character.image)

            })
        })

}


// <<<<<<-------------BUILDING ALL ELEMENTS FOR GAME OPTIONS------------------>>>>>>>
function renderSideNav(event){
    event.preventDefault()
    const name = document.querySelector('input','type=text')
    const newData = {
        'username': name.value,
        'boards': []
    }

    fetch(`${USERS_URL} `, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newData)
      })
      .then(res => res.json())
      .then(data => currentUser = data)

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

            enabledSettings =
            Array.from(radios) // Convert radio to an array to use filter and map. Expecting [<difficulty>, <theme>]
            .filter(i => i.checked) // Use Array.filter to remove unchecked radio.
            .map(i => i.value) // Use Array.map to extract only the values from the array of objects.

            if (enabledSettings.length === 2) {
                const playBtn = document.querySelector('#startPlay')
                playBtn.addEventListener('click', (ev) => {
                    renderGame(ev, enabledSettings)
                    createBoard(enabledSettings)
                })
            }
        })
    })
    let userName = document.querySelector('input','type=text').value
    const nameDiv = document.getElementById('name-display')
    const nameText = document.createElement('h2')
    nameText.innerText = `${userName}`
    nameDiv.appendChild(nameText)
}



function createBoard(settings){
    const game_difficulty = `${settings[0]}`
    const game_theme = `${settings[1]}`

// ___________________CREATING A BOARD IN THE DATABASE___________________
    fetch(BOARDS_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(
                {
                "theme": game_theme,
                "difficulty": game_difficulty,
                "score": "0",
                "user_id": currentUser.id
                }
        )
      })
      .then(res => res.json())
      .then(boardData => {
              console.log("BOARD CREATED")
              console.log(boardData)
        })


}

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
    // console.log('rendered game')
}


// <<<<<---------------- GAME DIFFICULTY FUNCTIONS ------->>>>>>>>>>


function easyGame(){
    // FIRST, RENDER THE BOARD EASY MODE
    const num = 16
    // Empty the welcome deck aka disabled board
    deck.innerHTML = " "
    // loop over and make the same num of boxes/cards that was gone
    createCards(num)

}

function mediumGame(){
    const count = 24
    deck.style.width = "700px"
    deck.innerHTML = " "
    createCards(count)
}

function hardGame(){
    const count = 36
    deck.style.width = "800px"
    deck.style.height = "485px"
    deck.innerHTML = " "
    createCards(count)
}

function createCards(number){
    for(i = 0;i < number; i++){

        const container = document.createElement('div')
        const cardDiv = document.createElement('div')
        const frontCard = document.createElement('div')
        const backCard = document.createElement('div')
        container.setAttribute('class', 'flip-card-container')
        cardDiv.setAttribute('class', 'flip-card')

        frontCard.setAttribute('class', "flip-card-front")
        backCard.setAttribute('class', "flip-card-back")

        container.appendChild(cardDiv)
        cardDiv.append(frontCard, backCard)
        deck.appendChild(container)

        container.addEventListener("click", function() {
        container.classList.toggle('flip');
        })

// <<<----------CHECK IF USER CHOSE MEDIUM OR HARD TO POPULATE BOARD WITH MORE CARDS------->>>
        if (number == 24 ){
            document.querySelectorAll('.flip-card-front').forEach(card => {
                card.style.width = "100px"
                card.style.height = "100px"
                })
            document.querySelectorAll('.flip-card').forEach(card => {
                card.style.width = "100px"
                card.style.height = "100px"
                })
            document.querySelectorAll('.flip-card-container').forEach(card => {
                card.style.width = "100px"
                card.style.height = "100px"
                })

        } else if (number == 36){
            document.querySelectorAll('.flip-card-front').forEach(card => {
                card.style.width = "80px"
                card.style.height = "100px"
                })
            document.querySelectorAll('.flip-card').forEach(card => {
                card.style.width = "80px"
                card.style.height = "100px"
                })
            document.querySelectorAll('.flip-card-container').forEach(card => {
                card.style.width = "80px"
                card.style.height = "100px"
                })

        }
    }
}



function themeDefault(){
    // <<<<----------SELECTING ALL CARD-BACKS TO RENDER THE ICONS---------->>>>
    const cardDiv = deck.querySelectorAll('.flip-card-back')
    console.log(cardDiv)

        easyArray.sort(() => Math.random() - 0.7)
        for(let b = 0;b < cardDiv.length; b+=1){
            const icon = document.createElement('i')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('class', easyArray[b])

        }

    // -------PUTTING EMPTY CONTAINERS FOR EVENTS AND CLASSES FOR CHECK IF MATCH
        const pair = []
        const clicks = []
        deck.addEventListener('click', (e) => {
    // -------ADDING LISTENER FOR CLICKS AND GETTING CLASS NAME TO PAIR THEM
            console.log("A CARD HAS BEEN CLICKED #1")
            pair.push(e.target.parentElement.querySelector('i').className) //Expecting array [<iconclass>,<iconclass>]
            // clicks.push(e.target.closest('.flip-card-container').class = 'flip-card-container flip')<<< pushes e.targets to clicks array, to be carried over to another function

    // -------- DOING A CHECK FOR EVENTS IF USER CLICKED 2 CARDS
            if (pair.length !== 2){
                return pair
            }else if (pair.length === 2){
    //---------NEEDS TO DISABLE OTHER CARDS SO THAT USER CANT CLICK MORE THAN 2 BEFORE CHECKCARD FUNCTION
                console.log("A CARD HAS BEEN CLICKED #2")

                checkCard(pair)
                return
            }
        })


}

function checkCard(arr){
// ------- CHECK CARD CLASSES IF MATCH,
//          Disable after animation?
//--------- IF NOT, e.target.closest('.flip-card-container').class = 'flip-card-container flip' << in short flip it back
}

function themeRickMorty(){

}
function themeVector(){

}

