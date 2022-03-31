document.querySelector('button').addEventListener('click', handleClick);

function handleClick() {
    let city = document.getElementById('city').value.trim();
    if (city) {
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
        fetch(url)
            .then(data => data.json())
            .then(data => {
                const { lat, lon } = data[0];
                let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`
                fetch(url2)
                    .then(data => data.json())
                    .then(console.log);
            })
    }
}
