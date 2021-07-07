
const USERS_URL ="https://flipmemorygame.herokuapp.com/users"
const BOARDS_URL = "https://flipmemorygame.herokuapp.com/boards"
const deck = document.querySelector('#card-deck')
const ICON_API = []
const RM_API = []
let currentBoard
let currentUser

easyArray = ["fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-gifts fa-3x", "fa fa-glass-cheers fa-3x", "fa fa-holly-berry fa-3x", "fa fa-sleigh fa-3x","fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-gifts fa-3x", "fa fa-glass-cheers fa-3x", "fa fa-holly-berry fa-3x", "fa fa-sleigh fa-3x"]

mediumArray = ["fa fa-dizzy fa-3x", "fa fa-dizzy fa-3x","fa fa-flushed fa-3x", "fa fa-flushed fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-sad-cry fa-3x", "fa fa-sad-cry fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x", "fa fa-kiss fa-3x","fa fa-kiss fa-3x","fa fa-grin-stars fa-3x","fa fa-grin-stars fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x"]

hardArray = ["fa fa-flushed fa-3x", "fa fa-flushed fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-grin-tongue fa-3x", "fa fa-sad-cry fa-3x", "fa fa-sad-cry fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x","fa fa-laugh fa-3x","fa fa-grimace fa-3x", "fa fa-kiss fa-3x","fa fa-kiss fa-3x","fa fa-grin-stars fa-3x","fa fa-grin-stars fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x", "fa fa-baby fa-3x", "fa fa-user-circle fa-3x", "fa fa-user-secret fa-3x", "fa fa-poo fa-3x", "fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x","fa fa-camera fa-3x","fa fa-candy-cane fa-3x", "fa fa-carrot fa-3x", "fa fa-hat-wizard fa-3x", "fa fa-hat-wizard fa-3x", "fa fa-hat-cowboy fa-3x", "fa fa-hat-cowboy fa-3x", "fa fa-dizzy fa-3x", "fa fa-dizzy fa-3x", "fa fa-cookie-bite fa-3x", "fa fa-cookie-bite fa-3x"]


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
    fetch("https://api.iconfinder.com/v2/icons/search?query=fantasy&price=free")
    .then(response => response.json())
    .then(data => {
        data.icons.slice(0, 25).forEach(obj => {
            ICON_API.push(obj.raster_sizes[6].formats[0].preview_url)
        })
    })
}

function fetchRickMorty(){
    fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18")
    .then(response => response.json())
    .then(data => {
        data.forEach(character => {
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

    fetch(USERS_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newData)
      })
      .then(res => res.json())
      .then(data => {
          currentUser = data
        })

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
    // radios.removeAttribute('disabled')
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
    nameText.setAttribute('class','animate__animated animate__bounceInLeft')
    nameText.innerText = `${userName}`
    nameDiv.appendChild(nameText)

}

function fetchPastScores(){

    const listDiv = document.getElementById('score-container')
    listDiv.innerHTML = " "
    const div = document.createElement('div')
    div.id = 'score-list'
    const p = document.createElement('p')
    p.innerText = "GAME HISTORY:"
    div.appendChild(p)
    listDiv.appendChild(div)
    const pastScores = document.createElement('ul')
    div.appendChild(pastScores)

    // debugger
    fetch(USERS_URL + '/' + `${currentUser.id}`)
        .then(response => response.json())
        .then(data => {

        data.boards.forEach(game => {
           const li = document.createElement('li')
           li.innerHTML = `${game.theme} | ${game.difficulty}| MOVES:<strong>${game.moves}</strong>`
           pastScores.append(li)
        })
    })
}


function createBoard(settings){
    const counter = document.getElementById('move-counter')
    const alertDiv = document.getElementById('alert-section')
    counter.innerHTML = " "
    alertDiv.innerHTML = " "
    deck.style.pointerEvents = " "
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
            const moveCounter = document.createElement('h4')
            moveCounter.innerText = `Moves: ${boardData.moves}`
            const moveDiv = document.getElementById('move-counter')
            moveDiv.appendChild(moveCounter)
            currentBoard = boardData
            const radios = document.querySelectorAll("input[type='radio']")
            radios.forEach(dot => {
                dot.setAttribute('disabled', ' ')
            const allCards = document.querySelectorAll('.flip-card-front')
                allCards.forEach(target => {
                    target.style.pointerEvents = "auto"
                })
            }) //disabling radio buttons when user clicks startPlay
        })
}


function renderGame(ev, settings){
    ev.preventDefault()
    const quitDiv = document.getElementById('quitArea')
    quitDiv.innerHTML = " "
    const quitBtn = document.createElement('button')
    quitBtn.setAttribute('class', 'btn btn-btn-danger')
    quitBtn.id = 'quitButton'
    quitBtn.innerText = "Quit Game"
    quitBtn.style.backgroundColor = "#e6054d"
    quitDiv.appendChild(quitBtn)

    quitBtn.addEventListener('click', () => {
        document.location.reload()
    })

    switch (settings[0]) {
        case
            "easy":
            let ezrm

            if (settings[1] == 'default'){
                themeDefault()
                easyGame(easyArray)
            } else if (settings[1] == 'rickMorty'){
                ezrm = RM_API.slice(0, 8)
                const newArr = ezrm.concat(ezrm)
                themeRickMorty()
                easyGame(newArr)
            } else {
                ezrm = ICON_API.slice(0, 8)
                const newArr = ezrm.concat(ezrm)
                themeVector()
                easyGame(newArr)
            }

            break;
        case
            "medium":
            let medrm
            if (settings[1] == 'default'){
                themeDefault()
                mediumGame(mediumArray)
            } else if (settings[1] == 'rickMorty'){
                medrm = RM_API.slice(0, 12)
                const newArr = medrm.concat(medrm)
                themeRickMorty()
                mediumGame(newArr)
            } else {
                medrm = ICON_API.slice(0, 12)
                const newArr = medrm.concat(medrm)
                themeVector()
                mediumGame(newArr)
            }
            break;
        case
            "hard":
            let hardrm
            if (settings[1] == 'default'){
                themeDefault()
                hardGame(hardArray)
            } else if (settings[1] == 'rickMorty'){
                hardrm = RM_API.slice(0, 18)
                const newArr = hardrm.concat(hardrm)
                themeRickMorty()
                hardGame(newArr)
            } else {
                hardrm = ICON_API.slice(0, 18)
                const newArr = hardrm.concat(hardrm)
                themeVector()
                hardGame(newArr)
            }
    }
    const btn = document.querySelector("#startPlay")
    btn.innerText = 'Restart Game'
    btn.style.backgroundColor = "#c405e6"
    fetchPastScores()
}

// <<<<<---------------- GAME DIFFICULTY FUNCTIONS ---------------->>>>>>>>>>
function easyGame(arr){
    // FIRST, RENDER THE BOARD EASY MODE
    const num = 16
    // Empty the welcome deck aka disabled board
    deck.innerHTML = " "
    // loop over and make the same num of boxes/cards that was gone
    createCards(num)
    const cardDiv = deck.querySelectorAll('.flip-card-back')

    arr.sort(() => Math.random() - 0.6)
    for(let b = 0;b < cardDiv.length; b+=1){
        if(arr[0].length > 25) {
            
            const icon = document.createElement('img')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('src', arr[b])
            icon.setAttribute('width', "70px")
            icon.setAttribute('height', "70px")
            icon.style.borderRadius = "5px"
        } else {
            const icon = document.createElement('i')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('class', arr[b])
        }
    }
    collectClicks()
}

function mediumGame(mediumArr){
    const count = 24
    deck.style.width = "700px"
    deck.innerHTML = " "
    createCards(count)
     // <<<<----------SELECTING ALL CARD-BACKS TO RENDER THE ICONS---------->>>>
     const cardDiv = deck.querySelectorAll('.flip-card-back')

     mediumArr.sort(() => Math.random() - 0.6)
     for(let b = 0;b < cardDiv.length; b+=1){
        if(mediumArr[0].length > 25) {
            const icon = document.createElement('img')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('src', mediumArr[b])
            icon.setAttribute('width', "70px")
            icon.setAttribute('height', "70px")
            icon.style.borderRadius = "5px"
        } else {
            const icon = document.createElement('i')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('class', mediumArr[b])

        }
     }
 collectClicks()
}

function hardGame(hArray){
    const count = 36
    deck.style.width = "800px"
    deck.style.height = "485px"
    deck.innerHTML = " "
    createCards(count)

    const cardDiv = deck.querySelectorAll('.flip-card-back')

     hArray.sort(() => Math.random() - 0.5)
     for(let b = 0;b < cardDiv.length; b+=1){
        if (hArray[0].length > 25) {
            const icon = document.createElement('img')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('src', hArray[b])
            icon.setAttribute('width', "70px")
            icon.setAttribute('height', "70px")
            icon.style.borderRadius = "5px"
        } else {
            const icon = document.createElement('i')
            cardDiv[b].appendChild(icon)
            icon.setAttribute('class', hArray[b])

        }

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

function themeRickMorty(){
    const main = document.getElementById('main')
    main.style.backgroundColor = '#c9dfce'
    main.style.borderColor = '#733ccc'

    const body = document.getElementById('main-doc')
    body.style.backgroundColor = '#c9dfce'

    deck.style.boxShadow = '12px 15px 20px 0 #28a745'
    deck.style.background = "linear-gradient(160deg,#0aa6ce, #9ac430 100%)"
}

function themeVector(){
    const main = document.getElementById('main')
    main.style.backgroundColor = "#d1cfe4"
    main.style.borderColor = '#709032'

    const body = document.getElementById('main-doc')
    body.style.backgroundColor = "#d1cfe4"

    deck.style.boxShadow = '11px 7px 17px 3px rgb(56 19 144 / 80%)'
    deck.style.background = "linear-gradient(160deg, rgb(195 171 47) 0%, rgb(9 39 2) 100%)"

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function collectClicks(){

        const pair = []
        const clicks = []
        const containers = deck.querySelectorAll('.flip-card-container')
        let theTarget

        containers.forEach(square => {
            square.addEventListener('click', (e) => {

                if (e.target.parentElement.querySelector('i')){
                    theTarget = e.target.parentElement.querySelector('i').className

                } else {
                    theTarget = e.target.parentElement.querySelector('img').src
                }

                pair.push(theTarget) //Expecting array [<iconclass>,<iconclass>]
                clicks.push(e.target)

                switch (pair.length) {
                    case
                        0:
                        break;
                    case
                        1:
                        break;
                    case
                        2:

                    checkCard(pair, clicks)
                }
            })

        })

}

async function checkCard(cardsArray, clicksArray){
    await sleep(500);

    if (cardsArray[0] !== cardsArray[1]) {
//<<<<---------IF NOT EQUAL IT WILL FLIP IT BACK---------->>>>>
        let addMove = currentBoard.moves += 1
        clicksArray.forEach(target => {
            target.parentNode.parentNode.className = "flip-card-container"
            target.parentNode.parentNode.className = "flip-card-container"
        })

        let updatedData = {
            "id": currentBoard.id,
            "theme": currentBoard.theme,
            "difficulty": currentBoard.difficulty,
            "moves": addMove,
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
        currentBoard.moves+=1
        clicksArray.forEach(target => {
            target.parentNode.parentNode.style.pointerEvents = "none"
            target.parentNode.parentNode.style.pointerEvents = "none"
        })

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
            <p>Aww yeah, you successfully finish a round! Finished within ${currentBoard.moves} moves!</p>
            <hr>
            <p class="mb-0">Click Restart for another round or click <a href="index.html" class="alert-link" color="maroon"><strong>Quit</strong></a> to exit the game. Thank you!</p>
        </div>`
     } else {
        collectClicks()
     }
}

function removeDisable(){
    const radios = document.querySelectorAll("input[type='radio']")
        radios.forEach(dot => {
            dot.removeAttribute('disabled')
        }) //disabling radio buttons when user clicks startPlay
}


