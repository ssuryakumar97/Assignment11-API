
async function restcountries(){
    try {
        let divElement = document.createElement("div");
        divElement.setAttribute('class','container');
        let title = document.createElement("h1");
        title.setAttribute('class','text-center');
        title.setAttribute('id','title');
        title.innerHTML = "Country Details";
        divElement.appendChild(title);

        let div2 = document.createElement("div");
        div2.setAttribute('class','row');
        divElement.appendChild(div2);
        
        let body = document.querySelector('body');
        body.appendChild(divElement);

        let response = await fetch("https://restcountries.com/v2/all");
        let data = await response.json();
        console.log(data[0].name);

        for (let i = 0; i < data.length; i++) {
            let flag = data[i].flag;
        div2.innerHTML += `
        <div class="card text-center m-0 p-0 col-lg-4 col-sm-12">
        <p class="card-header bg-dark text-light m-0 p-2">${data[i].name}</p>
        
        <div class="card-body">
        
        <image src='${data[i].flag}' height="200" width="200"/>
        
            <p>Capital : ${data[i].capital}</p>
            <p>Region : ${data[i].region}</p>
            <p>Country Code : ${data[i].alpha3Code}</p>
            <p>latlang : ${data[i].latlng}</p>
            <p class="temp"> </p>
            <button class="btn btn-primary">Click for Weather</button>
        </div>
        </div>`
        
        };
        let weatherData = document.getElementsByClassName('btn');
        for(let i = 0; i < weatherData.length; i++) {
        weatherData[i].addEventListener('click', async() => {
            try{
                let temp = document.querySelectorAll('.temp');
            let response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[i].latlng[0]}&lon=${data[i].latlng[1]}&appid=e68a04c8a42a72660924bf2bfa817a42`);
            let data1 = await response1.json();
            let temperature = Number(data1.main.temp)-273.15;
                temperature = temperature.toFixed(2);

            temp[i].innerHTML = `
            temp: ${temperature} C
            `;

            
            }catch(e){
                console.log("Error1");
            }


        });
    }
        
    }catch(err){
        console.log("Error");
    }
}

restcountries();