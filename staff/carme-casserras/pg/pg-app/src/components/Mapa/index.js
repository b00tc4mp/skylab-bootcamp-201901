// link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css">

//         <style type="text/css"> 
//             #map{
//                 height: 100vh;
//             }
//         </style>
//     </head>

//     <body>
//           <div id="map"></div>
//     </body>

//     <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.js"></script>
//     <script>
//         var markers = [
//                 ["Casa nostra", 41.5075806, 2.3923895],
//                 ["Skylab", 41.398478, 2.197787],
//                 ["Bagdad", 41.3753953, 2.1684303]
//             ];
//         var zoom = 9;

//         var map = L.map('map').setView([41.360000, 2.2000000], zoom);

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: "Carme's map"
//             //'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         for (var i = 0; i < markers.length; i++) {
//             marker = new L.marker([markers[i][1],markers[i][2]]).bindPopup(markers[i][0]).addTo(map);
//         }
//     </script>
