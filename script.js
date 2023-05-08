const pokemon = document.querySelectorAll('.logo')

pokemon.forEach(logo => {
    logo.addEventListener('click', () => playthemeSong(logo))
})

function playthemeSong(logo){
    const song = document.getElementById(logo.dataset.note)
    song.currentTime = 0
    song.play()
}