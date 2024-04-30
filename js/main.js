const resultDOM = document.getElementById("error");
// const url = "https://geo-alert-server.onfranciis.dev";
const url = "http://localhost:4321/alert";

function Request(data) {
  resultDOM.innerHTML = "Sending...";

  // make a request to the backend server
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      message: data.message,
      longitude: data.longitude,
      latitude: data.latitude,
    }).toString(),
  })
    .then(async (res) => {
      const response = await res.json();

      if (response.error) {
        resultDOM.innerHTML = response.error;
      } else {
        resultDOM.innerHTML = "Alert has been sent successfully!";
      }
    })
    .finally(() => {
      setTimeout(() => {
        resultDOM.innerHTML = "";
      }, 2000);
    });
}

function handleLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      resultDOM.innerHTML = "You've denied the request for geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      resultDOM.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      resultDOM.innerHTML = "The request to get your location timed out.";
      break;
    default:
      resultDOM.innerHTML = "An unknown error occurred.";
      break;
  }
}

function sendAlert() {
  // Get user's current location using GPS
  if (navigator.geolocation) {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Send alert with location information to the server
        var data = {
          latitude: latitude,
          longitude: longitude,
          message: document.getElementById("alertMessage").value,
        };

        Request(data);
      }, handleLocationError);
    } catch (err) {
      console.log(err);
    }
  } else {
    resultDOM.innerHTML = "Geolocation is not supported by this browser.";
  }
}
