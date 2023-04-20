// Creation of different layers

// Open Street map layer
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
});

// Satellite view layer
var satelliteLayer = L.tileLayer('http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri'
});

// Creation of the map centered on France
var map = L.map('customMap', {
    center: [51.505, -0.09],
    zoom: 5,
    minZoom: 1,
    maxZoom: 6
});


// Add layers to map
osmLayer.addTo(map);
satelliteLayer.addTo(map);


var baseMaps = {
    "OpenStreetMap": osmLayer,
    "Satellite": satelliteLayer
};

// Control layer for switch between satellite and osm view
L.control.layers(baseMaps).addTo(map);

function addSpaces(str) 
{
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

var regionsFolder = "regions";

// To do : Use NodeJS + list all files in "regions" folder
var listOfFiles = ["france.geojson", "germany.geojson",
    "belgium.geojson", "netherlands.geojson",
    "luxembourg.geojson", "italy.geojson",
    "poland.geojson", "portugal.geojson",
    "spain.geojson", "suisse.geojson",
    "united_kingdom.geojson", "denmark.geojson",
    "ireland.geojson", "greenland.geojson",
    "finland.geojson", "norway.geojson",
    "island.geojson", "russia.geojson",
    "china.geojson", "afghanistan.geojson",
    "algeria.geojson", "mongolia.geojson",
    "kazakhstan.geojson", "romania.geojson",
    "australia.geojson", "india.geojson",
    "brasil.geojson", "canada.geojson",
    "usa.geojson", "argentina.geojson",
    "chile.geojson"];

function polystyle(feature) {
    return {
        fillColor: 'blue',
        weight: 0.5,
        opacity: 1,
        color: 'white',  //Outline color
        fillOpacity: 0.3
    };
}

var myRegions = ["Corrèze", "Île-de-France", "Occitanie", "Nouvelle-Aquitaine", "Auvergne-Rhône-Alpes",
    "Noord-Holland", "Cataluña", "Andalucía", "Lisboa", "Québec", "Ontario"];

listOfFiles.forEach(function(file) {
    fetch(regionsFolder + "/" + file)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        L.geoJSON(data, {
            filter: function(feature, layer) {
                return (myRegions.includes(feature.properties.NAME_1));
            },
            style: polystyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup(addSpaces(feature.properties.NAME_1));
            },
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng);
        }}).addTo(map);
    });
    console.log("File : " + file);
});


// Create a marker layer to store all markers
var markersLayer = L.layerGroup();

// table of cities with their name, lat and long
var cities = [
    {name: "Toulouse", latlng: [43.604652, 1.444209]},
    {name: "Brive la gaillarde", latlng: [45.158791, 1.531045]},
    {name: "Tulle", latlng: [45.267136, 1.770594]},
    {name: "Paris", latlng: [48.856613, 2.352222]},
    {name: "Montpellier", latlng: [43.610769, 3.876716]},
    {name: "Bordeaux", latlng: [44.837789, -0.57918]},
    {name: "Amsterdam", latlng: [52.3680, 4.9036]},
    {name: "Perpignan", latlng: [42.688659, 2.894833]},
    {name: "Carcasonne", latlng: [43.212161, 2.353663]},
    {name: "Narbonne", latlng: [43.1832, 3.0046]},
    {name: "Béziers", latlng: [43.3434, 3.2153]},
    {name: "Lyon", latlng: [45.764043, 4.835659]},
    {name: "Andorre", latlng: [42.5063, 1.5218]},
    {name: "Barcelone", latlng: [41.385064, 2.173404]},
    {name: "Roses", latlng: [42.2609, 3.1804]},
    {name: "Malaga", latlng: [36.7196484,-4.4200163]},
    {name: "Lisbonne", latlng: [38.7222524,-9.1393366]},
    {name: "Biarritz", latlng: [43.4832, -1.5586]},
    {name: "Bayonne", latlng: [43.4933, -1.4753]},
    {name: "Saint-jean-de-luz", latlng: [43.3916, -1.6619]},
    { name: "Toronto", latlng: [43.6532, -79.3832] },
    { name: "Montréal", latlng: [45.5017, -73.5673] },
    { name: "Ottawa", latlng: [45.4215, -75.6972] }
  ];
  

// Loop through the list of cities and add each marker to the marker layer
cities.forEach(function(city) {
    // Create the marker for each city
    var marker = L.marker(city.latlng);

    // Add a tooltip to the marker with the name of the city
    marker.bindPopup(city.name);

    // Add the marker to the marker layer
    markersLayer.addLayer(marker);
});

// Add the marker layer to the map
markersLayer.addTo(map);


// Event to display cities when zoomed in
// CURRENTLY DISABLED !
map.on("zoomend", function() {
    console.log(map.getZoom());
if (map.getZoom() >= 6) {
    //markersLayer.addLayer(map);
} else {
    //markersLayer.removeLayer(map);
}
});


// TO DO : TO BE REMOVED

/** 
cities.forEach(function(city) {
    var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + city;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Récupération des coordonnées de la première réponse de Nominatim
        var lat = data[0].lat;
        var lon = data[0].lon;

        // Création d'un marqueur à la position de la ville
        var position = L.latLng(lat, lon);
        L.marker(position).addTo(map);
    });
});

**/