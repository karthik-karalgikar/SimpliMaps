// Function to initialize the map,callback function
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14, // Adjust the zoom level as needed
        center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
    });

    const directionsService = new google.maps.DirectionsService();//request and calculate directions
    const directionsRenderer = new google.maps.DirectionsRenderer();//display the dircetions
    directionsRenderer.setMap(map);

    // Add a click event listener to the "Get Directions" button
    document.getElementById('getDirections').addEventListener('click', () => {
        calculateRouteAndDisplay(directionsService, directionsRenderer);
    });
}

// Function to calculate and display the route
function calculateRouteAndDisplay(directionsService, directionsRenderer) {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING', // You can change this to other travel modes if needed
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
                displayDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}

// Function to display turn-by-turn directions in text
function displayDirections(directions) {
    const route = directions.routes[0].legs[0]; // Get the first route and its first leg

    // Create an HTML element to display directions
    const directionsContainer = document.createElement('div');

    // Loop through the steps and add them to the directions container
    route.steps.forEach((step, index) => {
        const directionStep = document.createElement('p');
        directionStep.innerHTML = `Step ${index + 1}: ${step.instructions}`;
        
        // Add an underline to each step
        // directionStep.style.textDecoration = 'underline';

        directionsContainer.appendChild(directionStep);
    });

    // Append the directions container to the page
    const mapDiv = document.getElementById('map');
    mapDiv.parentNode.insertBefore(directionsContainer, mapDiv.nextSibling);
}

