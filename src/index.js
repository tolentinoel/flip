const USERS_URL ="http://localhost:3000/users"
const BOARDS_URL = "http://localhost:3000/boards"
const deck = document.querySelector('#card-deck')
const ICON_API = []
const RM_API = []

let easyArray = ["fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-gifts fa-3x", "fa fa-glass-cheers fa-3x", "fa fa-holly-berry fa-3x", "fa fa-sleigh fa-3x","fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-gifts fa-3x", "fa fa-glass-cheers fa-3x", "fa fa-holly-berry fa-3x", "fa fa-sleigh fa-3x"]

let mediumArray = ["fa fa-dizzy fa-3x", "fa fa-dizzy fa-3x","fa fa-flushed fa-3x", "fa fa-flushed fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-sad-cry fa-3x", "fa fa-sad-cry fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x", "fa fa-kiss fa-3x","fa fa-kiss fa-3x","fa fa-grin-stars fa-3x","fa fa-grin-stars fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x"]

let hardArray = ["fa fa-flushed fa-3x", "fa fa-flushed fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-sad-cry fa-3x", "fa fa-sad-cry fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x", "fa fa-kiss fa-3x","fa fa-kiss fa-3x","fa fa-grin-stars fa-3x","fa fa-grin-stars fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x", "fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x","fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-hat-wizard fa-3x", "fa fa-hat-wizard fa-3x", "fa fa-hat-cowboy fa-3x", "fa fa-hat-cowboy fa-3x"]


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
    const counter = document.getElementById('move-counter')
    const alertDiv = document.getElementById('alert-section')
    counter.innerHTML = " "
    alertDiv.innerHTML = " "
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
                "moves": 0,
                "user_id": currentUser.id
                }
        )
      })
      .then(res => res.json())
      .then(boardData => {
        //   debugger
          const moveCounter = document.createElement('h4')
          moveCounter.innerText = `Moves: ${boardData.moves}`
          const moveDiv = document.getElementById('move-counter')
          moveDiv.appendChild(moveCounter)
          currentBoard = boardData
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
    btn.innerText = 'Restart Game'
    btn.style.backgroundColor = "#c405e6"
    // btn.addEventListener('click', () => {
    //     document.location.reload()
    // })
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
    const cardDiv = deck.querySelectorAll('.flip-card-back')

    easyArray.sort(() => Math.random() - 0.6)
    for(let b = 0;b < cardDiv.length; b+=1){
        const icon = document.createElement('i')
        cardDiv[b].appendChild(icon)
        icon.setAttribute('class', easyArray[b])

    }
collectClicks()

}

function mediumGame(){
    const count = 24
    deck.style.width = "700px"
    deck.innerHTML = " "
    createCards(count)
     // <<<<----------SELECTING ALL CARD-BACKS TO RENDER THE ICONS---------->>>>
     const cardDiv = deck.querySelectorAll('.flip-card-back')

     mediumArray.sort(() => Math.random() - 0.6)
     for(let b = 0;b < cardDiv.length; b+=1){
         const icon = document.createElement('i')
         cardDiv[b].appendChild(icon)
         icon.setAttribute('class', mediumArray[b])

     }
 collectClicks()
}

function hardGame(){
    const count = 36
    deck.style.width = "800px"
    deck.style.height = "485px"
    deck.innerHTML = " "
    createCards(count)

    const cardDiv = deck.querySelectorAll('.flip-card-back')

     hardArray.sort(() => Math.random() - 0.5)
     for(let b = 0;b < cardDiv.length; b+=1){
         const icon = document.createElement('i')
         cardDiv[b].appendChild(icon)
         icon.setAttribute('class', hardArray[b])

     }
 collectClicks()
}

function createCards(number){
    for(i = 0;i < number; i++){

        const container = document.createElement('div')
        const cardDiv = document.createElement('div')
        const frontCard = document.createElement('div')
        const backCard = document.createElement('div')
        container.setAttribute('class', 'flip-card-container')
        // `flip-card-container-${i}`
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
    deck.style.background = "linear-gradient(160deg,#0eabfc 0%, rgb(161 0 157) 100%)"
    document.querySelectorAll('.flip-card-front').forEach(card => {
        card.style.backgroundColor = '#f7d900cc'
    })

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function collectClicks(){

        const pair = []
        const clicks = []
        const containers = deck.querySelectorAll('.flip-card-container')
        containers.forEach(square => {
            square.addEventListener('click', (e) => {
                pair.push(e.target.parentElement.querySelector('i').className) //Expecting array [<iconclass>,<iconclass>]
                clicks.push(e.target)

                switch (pair.length) {
                    case
                        0:
                        break;
                    case
                        1:
                        console.log("-----CARD #1-----")
                        break;
                    case
                        2:
                        console.log("-----CARD #2-----")

                    checkCard(pair, clicks)
                }
            })

        })

}

async function checkCard(cardsArray, clicksArray){
    await sleep(500);
    console.log('finish wait time')

    const theCards = document.querySelectorAll('.flip-card')

    if (cardsArray[0] !== cardsArray[1]) {
//<<<<---------IF NOT EQUAL IT WILL FLIP IT BACK---------->>>>>
        clicksArray.forEach(target => {
            target.parentNode.parentNode.className = "flip-card-container"
            target.parentNode.parentNode.className = "flip-card-container"
        })
        currentBoard.moves+=1

        let updatedData = {
            "id": currentBoard.id,
            "theme": currentBoard.theme,
            "difficulty": currentBoard.difficulty,
            "moves": currentBoard.moves,
            "user_id": currentUser.id
            }

        fetch(BOARDS_URL + `/${currentBoard.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updatedData)
          })
          .then(res => res.json())
          .then(newData => {

            const move = document.getElementById('move-counter')
            const h4Text = move.querySelector('h4')
            h4Text.innerText = `Moves: ${newData.moves}`
            move.appendChild(h4Text)
          })

    } else {
//<<<<---------WILL ADD MOVES EVEN MATCHED---------->>>>>
        console.log("MATCH MADE! SCORE!")

        currentBoard.moves+=1

        let updatedData = {
            "id": currentBoard.id,
            "theme": currentBoard.theme,
            "difficulty": currentBoard.difficulty,
            "moves": currentBoard.moves,
            "user_id": currentUser.id
            }

        fetch(BOARDS_URL + `/${currentBoard.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updatedData)
          })
          .then(res => res.json())
          .then(newData => {

            const move = document.getElementById('move-counter')
            const h4Text = move.querySelector('h4')
            h4Text.innerText = `Moves: ${newData.moves}`
            move.appendChild(h4Text)
          })
    }

    if (deck.childElementCount === deck.querySelectorAll('.flip-card-container.flip').length) {
        deck.style.pointerEvents = "none"
        const alertDiv = document.getElementById('alert-section')
        alertDiv.innerHTML= `
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Well done!</h4>
            <p>Aww yeah, you successfully finish a round!</p>
            <hr>
            <p class="mb-0">Click Restart for another round or click <a href="index.html" class="alert-link"><strong>Quit</strong></a> to exit the game. Thank you!</p>
        </div>`

        // alert("DING DING DING!! WELL DONE!")

     } else {
        collectClicks()
     }
}
// setTimeout(checkCard, 5000000);



function themeRickMorty(){

}

function themeVector(){

}

