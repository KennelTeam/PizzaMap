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
    draw.on("drawend", event => {
        label_cords = event.feature.getGeometry().getCoordinates()[0][0]
        hasSelection = true
        map.removeInteraction(draw)

        // insert here function to call bigdata analysisS
        show_legend(label_cords, {})
    })
}

function removePolygonStats() {
    hasSelection = false
    polygonSource.clear()
    popupDOM.style.display = "none"
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

var hasSelection
var draw
var map
var popup
var popupDOM

// point has to be array of floats, not string
function show_legend(point_loc, data) {
    // ol3_sprint_location = ol.proj.transform(point, 'EPSG:4326', 'EPSG:3857');
    console.log(point_loc)
    popupDOM.style.display = "block"

    popup_pos = map.getPixelFromCoordinate(point_loc)
    console.log(popup_pos)
    popup_width = document.getElementById("popup").offsetWidth
    console.log(popup_width)
    popup_pos[0] -= popup_width + 10
    popup_pos[1] -= 10
    cord_popup_pos = map.getCoordinateFromPixel(popup_pos)
    popup.setPosition(cord_popup_pos);


    $("#areaOrdersCount").text(data.ordersCount)
    $("#areaLatesCount").text(data.latesCount)
    $("#areaDeliveryTime").text(data.deliveryTime)
    $("#areaEarnings").text(data.earnings)
}

function setup_OLMap() {
    hasSelection = false
    console.log("Setuping")
    map = new ol.Map({
        controls: [],
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

    popupDOM = document.getElementById('popup')
    popup = new ol.Overlay({
        element: popupDOM
    });
    map.addOverlay(popup);

    ol3_sprint_location = ol.proj.transform([39.954962, 57.651345], 'EPSG:4326', 'EPSG:3857');
    popup.setPosition(ol3_sprint_location);

    popupDOM.style.display = "none"
}