let countriesData = [];

function displayCountries(countries){

    const container =
    document.getElementById("countries");

    container.innerHTML = "";

    countries.forEach(country => {

        container.innerHTML += `
        
        <div class="country">

            <img
            src="${country.flags.png}"
            alt="flag">

            <h3>
            ${country.name.common}
            </h3>

            <p>
            Population:
            ${country.population.toLocaleString()}
            </p>

        </div>

        `;

    });

}

async function loadCountries() {

    try {

        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags,population"
        );

        const data = await response.json();

        countriesData = data;

        displayCountries(
            data.slice(0,10)
        );

        document.getElementById("loading")
        .style.display = "none";

    }

    catch(error) {

        document.getElementById("loading").innerHTML =
        "❌ Failed to load countries.";

    }

}

loadCountries();
document
.getElementById("search")
.addEventListener("input", function(){

    const searchValue =
    this.value.toLowerCase();

    const filteredCountries =
    countriesData.filter(country =>

        country.name.common
        .toLowerCase()
        .includes(searchValue)

    );

    displayCountries(filteredCountries);

});