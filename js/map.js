function point_to_wgs84(inp_point) {
    cord_i = inp_point.substring(1, inp_point.length - 1).split(',')
    cord = ol.proj.fromLonLat([cord_i[1], cord_i[0]])
    return cord
}


function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatTimeMinutes(inp_minutes) {
    let hours = Math.floor(inp_minutes / 60)
    let minutes = inp_minutes % 60

    let res = ""
    if (hours >= 10) {
        res += hours
    } else {
        res += "0"
        res += hours
    }

    res += ":"

    if (minutes >= 10) {
        res += minutes
    } else {
        res += "0"
        res += minutes
    }

    return res
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

        let selected_polygon = new ol.geom.Polygon(event.feature.getGeometry().getCoordinates())

        let cool = []

        curShowingData.forEach(inp_point => {
            wgs_cord = point_to_wgs84(inp_point.point)
            if (selected_polygon.intersectsCoordinate(wgs_cord)) {
                cool.push(inp_point)
            }
        })

        show_legend(label_cords, countRegionStats(cool))
    })
}

function countRegionStats(data) {
    if (data.length == 0) {
        return {
            ordersCount: 0,
            latesCount: 0,
            deliveryTime: 0,
            earnings: 0
        }
    }

    let earnings = 0
    let deliveryTime = 0

    data.forEach(el => {
        earnings += el.sum
        deliveryTime += el.deliveryTime
    })

    return {
        ordersCount: numberWithSpaces(data.length),
        latesCount: data.filter(el => el.lated).length,
        deliveryTime: formatTimeMinutes(Math.floor(deliveryTime / data.length)),
        earnings: numberWithSpaces(earnings)
    }
}

function removePolygonStats() {
    hasSelection = false
    polygonSource.clear()
    popupDOM.style.display = "none"
}

function changeCity(cityPoint) {
    view = map.getView()
    view.setCenter(point_to_wgs84(cityPoint))
    view.setZoom(11)
}

function setData(orders_data) {
    features = []
    orders_data.forEach(inp_point => {

        features.push(new ol.Feature({
            geometry: new ol.geom.Point(point_to_wgs84(inp_point.point)),
            weight: 0.5
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
    popupDOM.style.display = "block"

    popup_pos = map.getPixelFromCoordinate(point_loc)
    popup_width = document.getElementById("popup").offsetWidth
    popup_pos[0] -= popup_width + 10
    popup_pos[1] -= 10
    cord_popup_pos = map.getCoordinateFromPixel(popup_pos)
    popup.setPosition(cord_popup_pos);


    $("#areaOrdersCount").text(data.ordersCount)
    $("#areaLatesCount").text(data.latesCount)
    $("#areaDeliveryTime").text(data.deliveryTime)
    $("#areaEarnings").text(data.earnings)
}

function relocate_mapcenter(cord_point) {
    map.getView().setCenter(point_to_wgs84("[" + cord_point.join() + "]"))
    map.getView().setZoom(12)
}

function setup_OLMap() {
    hasSelection = false
    map = new ol.Map({
        controls: [],
        target: "map",
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            new ol.layer.Heatmap({
                source: heatmapSource,
                gradient: heatmapGradient,
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
            zoom: 12,
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

// Set gadient colors for heatmap. Array(<weight>).fill(<color>)
const heatmapGradient = [].concat(
    Array(10).fill("#05BC58"),
    Array(4).fill("#B1DF03"),
    Array(3).fill("#FFFE01"),
    Array(2).fill("#FF3104"),
    Array(1).fill("#9A2504"),
)

// [
//     "#05BC58",
//     "#05BC58",
//     "#05BC58",

//     "#B1DF03",
//     "#B1DF03",

//     "#FFFE01",

//     "#FF3104",

//     "#9A2504"
// ]