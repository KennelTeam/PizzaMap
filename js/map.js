function point_to_wgs84(inp_point) {
    cord_i = inp_point.substring(1, inp_point.length - 1).split(',')
    cord = ol.proj.fromLonLat([cord_i[1], cord_i[0]])
    return cord
}


function polygonStatsPressed() {
    if (hasSelection) return
    draw = new ol.interaction.Draw({
        source: polygonSource,
        type: "Polygon",
    });
    map.addInteraction(draw);
    draw.on("drawend", _ => {
        hasSelection = true
        map.removeInteraction(draw)
    })
}

function removePolygonStats() {
    hasSelection = false
    polygonSource.clear()
}

function changeCity(cityPoint) {
    console.log(map)
    view = map.getView()
    view.setCenter(point_to_wgs84(cityPoint))
    view.setZoom(11)
}

function setData(orders_data) {
    features = []
    orders_data.forEach(inp_point => {

        features.push(new ol.Feature({
            geometry: new ol.geom.Point(point_to_wgs84(inp_point.point)),
            weight: 0.1
        }))
    })

    heatmapSource.clear()
    heatmapSource.addFeatures(features)
}

const polygonSource = new ol.source.Vector({ wrapX: false });
const heatmapSource = new ol.source.Vector({})

var hasSelection = false
var draw
var map

function setup_OLMap() {
    console.log("Setuping")
    map = new ol.Map({
        // controls: ol.control.defaults().extend([panel]),
        target: "map",
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            new ol.layer.Heatmap({
                source: heatmapSource,
                gradient: ["#05BC58", "#B1DF03", "#FFFE01", "#FF3104", "#9A2504"],
                opacity: 0.9,
                radius: 10,
                blur: 5
            }),
            new ol.layer.Vector({
                source: polygonSource
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([39.954962, 57.651345]),
            zoom: 11,
        })
    });
}