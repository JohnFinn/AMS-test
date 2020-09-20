var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function onMapClick(e) {
    if (confirm("add point at " + e.latlng)) {
        axios.get(`/api/add_markers?name=${prompt('type name')}&x=${e.latlng.lat}&y=${e.latlng.lng}`).then(function(){});
    }
}

function onMarkerClick(m) {
    if (confirm("delete " + this.name)) {
        axios.get(`/api/del_markers?name=${this.name}`).then(function(){});
    }
}

mymap.on('click', onMapClick);

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
            let marker = L.marker(resp.data[key]);
            marker.name = key;
            marker.on('click', onMarkerClick);
            markers[key] = marker;
            marker.addTo(mymap);
        }
        await sleep(2000);
    }
}

main().then(function(){});
