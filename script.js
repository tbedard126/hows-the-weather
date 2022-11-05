const APIkey = '871b3ff65e2c2af43749b9d344bcd5d5'
const searchButton = $('.searchButton')
let city;


const body = document.body

function getApi(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                const listItem = $('<li>');
                listItem.text = data[i].html_url;
                body.append(listItem);
            }
        });
}



searchButton.click(function () {
    city = $('.userInput').val()
    getApi(city)

})




