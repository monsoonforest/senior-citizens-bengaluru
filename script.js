// Edit the center point and zoom level
var map = L.map('map', {
  center: [12.9761232,77.5918883],
  zoom: 11  ,
  minZoom : 11,
  scrollWheelZoom: true
});

// // layer controls
// var controlLayers = L.control.layers( null, null, {
//       position: "topleft",
//       collapsed: false // false = open by default
//     }).addTo(map);

// new L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   ,var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//         attribution: '©OpenStreetMap, ©CartoDB'
// }).addTo(map);


// Edit links to your GitHub repo and data source credit
map.attributionControl
.setPrefix('View <a href="https://github.com/monsoonforest/senior-citizens-bengaluru">open-source code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
map.attributionControl.addAttribution('Population data &copy; <a href="https://eci.gov.in/">ECI India </a>');

// // Basemap layer
new L.tileLayer(

//  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomain: 'abcd',
  ext: 'png'
}).addTo(map);


// Edit to upload GeoJSON data file from your local directory
$.getJSON("bengaluru-wards-joined.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});



// Edit ranges and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
// FOR VIRIDIS COLOUR SCHEME
// function getColor(d) {
//   return d > 60  ? '#440154' :
//          d > 40  ? '#443a83' :
//          d > 20  ? '#31688e' :
//          d > 10  ? '#20908d' :
//          d > 5   ? '#35b779' :
//          d > 2.5 ? '#8fd744' :
//          d > 0.5 ? '#fde725' :
//                     '#FFEDA0';
// }

// FOR MAGMA COLOUR SCHEME
function getColor(d) {
  return d > 40  ? '#000004' :
         d > 30  ? '#3b0f6f' :
         d > 20  ? '#8c2981' :
         d > 10  ? '#de4969' :
         d > 5   ? '#fe9f6d' :
         d > 3   ? '#fcfdbf' :
                   '#ff0000';
}


// Edit the getColor property to match data column header in your GeoJson file
function style(feature) {
  return {
    fillColor: getColor(feature.properties.Elderly_Density_True),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.65
  };
}


// This highlights the layer on hover, also for mobile
function highlightFeature(e) {
  resetHighlight(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'red',
    fillOpacity: 0.9
  });
  info.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight(e) {
  geoJsonLayer.setStyle(style);
  info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// This instructs highlight and reset functions on hover movement
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: highlightFeature,
    click: zoomToFeature
  });
}


$.getJSON("relief-riders.geojson", function (data) {
  var geoJsonLayer = L.geoJson(data, {
        pointToLayer: function( feature, latlng) {
          return L.marker(latlng, { options: {
            iconSize:     [20, 80],
            color:'#6afc6c'
          }
          })
          .bindPopup(feature.properties.Name + '<br>' + feature.properties.description);
        }
      }).addTo(map); // display by default

    });



// Creates an info box on the map
var info = L.control();
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

// Edit info box text and variables (such as elderly density 2014) to match those in your GeoJSON data
info.update = function (props) {
  this._div.innerHTML = '<h4>Bengaluru City<br />Population of Senior Citizens in 2014</h4>' +  (props ?
    '<b>' + props.Ward_Name + ' ' + props.Ward_Number + '</b>' + ' '  + props.Ward_Area + ' Acres' + '<br />' + '<b>' +  props.Total + ' Senior Citizens' + '</b><br />' + props.Elderly_Density_True + ' Senior Citizens per Acre'
    : 'Hover over a Ward');
};


info.addTo(map);

// Edit grades in legend to match the ranges cutoffs inserted above
// In this example, the last grade will appear as 50+
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    lower = [3, 5, 10, 20, 30, 40],
    upper = [5, 10, 20, 30, 40, 75],
    labels = ['<strong> Senior Citizens <br /> Per Acre </strong>'],
    from, to;
  for (var i = 0; i < lower.length; i++) {
        labels.push(
            '<i style="background:' + getColor(lower[i] + 1) + '"></i> ' +
            lower[i] + '&ndash;' + upper[i]);
   }
    div.innerHTML = labels.join('<br>');
    return div;
};
legend.addTo(map);

// Use in info.update if GeoJSON data contains null values, and if so, displays "--"
function checkNull(val) {
  if (val != null || val == "NaN") {
    return comma(val);
  } else {
    return "--";
  }
}

// Use in info.update if GeoJSON data needs to be displayed as a percentage
function checkThePct(a,b) {
  if (a != null && b != null) {
    return Math.round(a/b*1000)/10 + "%";
  } else {
    return "--";
  }
}

// Use in info.update if GeoJSON data needs to be displayed with commas (such as 123,456)
function comma(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}
