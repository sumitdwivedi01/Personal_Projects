// async function gettemp(city) {
// 	let api = await fetch(`http://api.weatherapi.com/v1/current.json?key=55435b29c6304d84b0294502250405&q=${city}&aqi=no`);
// 	let response = await api.json();
// 	return response;
// }

// async function main() {
// 	document.getElementById("getweather").addEventListener("click", async(e)=>{
// 		let city_name = document.getElementById("city");
// 	if (city_name.value=="") {
// 		alert("Enter city name");
// 	}
// 	else{
// 		let city_temp = await gettemp(toString(city_name.value).toLowerCase().trim());
// 		console.log(city_temp);
// 	}

// 	})
// }
// main();

async function gettemp(city) {
  try {
    let api = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=55435b29c6304d84b0294502250405&q=${city}&aqi=no`
    );
    let response = await api.json();

    // Check if response contains error
    if (response.error) {
      alert(response.error.message);
      return null;
    }

    return response;
  } catch (err) {
    console.error("Error fetching weather:", err);
    alert("Failed to fetch weather data. Please try again.");
    return null;
  }
}

async function main() {
  document.getElementById("getweather").addEventListener("click", async (e) => {
    let city_input = document.getElementById("city");
    let city = city_input.value.toLowerCase().trim();

    if (city === "") {
      alert("Enter city name");
    } else {
      let city_temp = await gettemp(city);
      if (city_temp) {
        console.log("Temperature:", city_temp.current.temp_c, "°C");
        // You can display this on the page too
		let div= document.createElement("div");
		
        document.querySelector(".weatherinfo").innerHTML=`
        <span>
          <h3>City: ${city_temp.location.name}</h3>
        </span>
		<span>
		 <h3>Country / Region: ${city_temp.location.country} / ${city_temp.location.region} </h3>
		</span>
        <span>
          <h3>temperature: ${city_temp.current.temp_c} °C</h3> 
        </span>`
		city_input.value =``;
		city_input.placeholder =`check for another`;
      }
    }
  });
}

main();
