var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

markers = {

}

async function main() {
    while (true) {
        console.log("updating markers");
        var resp = await axios.get('/api/get_markers');
        for (var key in markers) {
            mymap.removeLayer(markers[key]);
        }
        markers = {};
        for (var key in resp.data) {
            markers[key] = L.marker(resp.data[key]).addTo(mymap);
        }
        await sleep(2000);
    }
}

main().then(function(){});
