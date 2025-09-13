/* NOTE: The leaflet uses a different order for the lat and long coordinates! */
document.addEventListener("DOMContentLoaded", function() {
  const map = L.map("map").setView([39.27, -76.605], 10);

// Get a tile layer from ESRI
 L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles @ Esri'
  }).addTo(map);

/* Use asynchronous so everything is completed in order, next propmt waits for the previous to complete */
  const addGeoJSONLayer = async(url, layerName, popupField) => {
    const response = await fetch(url);
    const data = await response.json();
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) { 
        // Get the x, y coords for the point layer using if stateme nt
      if (layerName === "RAMPS_PIERS") {
        return L.marker(latlng, {
        });
      }  else {
        return L.geoJSON(data);
           }
      },
      onEachFeature: function (feature, layer) {
        const popupContent = `<h4>${layerName}</h4><p>${feature.properties[popupField]}</p>`;
        layer.bindPopup(popupContent);
      }
    }).addTo(map);
  };



// Baltimore City Boat Ramps - Ramps_Piers
  const baltBoatRampsURL = "https://services2.arcgis.com/Ynpzre7M7vSGY7dh/arcgis/rest/services/Ramps_Piers/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson";

  const baltWaterURL = "https://services1.arcgis.com/ZwA0Q1mheCEc5yXS/arcgis/rest/services/Baltimore_City_Water/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson";


// Add the GeoJSON layers - popups and symbology added
  addGeoJSONLayer(baltBoatRampsURL, "RAMPS_PIERS", "AMENITY_NAME");
  addGeoJSONLayer(baltWaterURL, "BALTIMORE_CITY_WATER", "TYPE");
});
