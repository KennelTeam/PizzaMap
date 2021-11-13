function include_html(callback) {
    $("#filters-div").load("html/filters.html",
        _ => $("#map-div").load("html/map.html",
            _ => $("#legend-div").load("html/legend.html", callback)))
}