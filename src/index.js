const userUrl = 'https://localhost:3000/users'

// Welcome page should only have username form and disabled board

document.addEventListener("DOMContentLoaded", () => {

    const login = document.querySelector('form')
    login.addEventListener("submit", (e) => {
        // console.log(e)
        renderSideNav(e)
    })
})

function renderSideNav(event){
    event.preventDefault()

    const userName = event.target.querySelector('input').value
    const nameDiv = document.getElementById('name-display')
    const nameText = document.createElement('h2')
    nameText.innerText = `${userName}`
    nameDiv.appendChild(nameText)

    // event.target.reset()

    event.target.querySelector('input').setAttribute('disabled', " ")
    event.target.querySelector("input[type='submit']").setAttribute('style',"display:none")



    const choices = document.querySelector('#options')
    choices.innerHTML = `
    <div id="checkDiv">
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Easy</label>
        </div>
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck2">Medium</label>
        </div>
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck3">Hard</label>
        </div>
    </div>
    
    <div id="radioDiv">
        <p>THEMES:</p>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
            <label class="custom-control-label" for="customRadio1">Default</label>
        </div>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
            <label class="custom-control-label" for="customRadio2">Rick and Morty</label>
        </div>
        <div class="custom-control custom-radio">
            <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
            <label class="custom-control-label" for="customRadio3">Vectors</label>
        </div>
    </div>
    <input type="submit" value="Click to Play!" id="startPlay">`



}

