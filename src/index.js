document.addEventListener("DOMContentLoaded", () => {

    const login = document.querySelector('form')
    login.addEventListener("submit", (e) => {
        renderSideNav(e)
    })
})

function renderSideNav(event)

