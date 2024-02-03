var key = 'b42693947f9bba2dda33a9ecde3fe7a9'

let cities = JSON.parse(localStorage.getItem('cities')) || []
cities.forEach(city => {
    document.getElementById('cities').innerHTML += `
    <button>${city}</button></button>
    `
})

