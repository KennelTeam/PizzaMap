function include_html(next_callback) {
    // loas = [{
    //         DOMid: "#filters-div",
    //         path: "html/filters.html"
    //     },
    //     {
    //         DOMid: "#popup-div",
    //         path: "html/popup.html"
    //     },
    //     {
    //         DOMid: "#map-div",
    //         path: "html/map.html"
    //     },
    //     {
    //         DOMid: "#legend-div",
    //         path: "html/legend.html"
    //     }
    // ]
    $("#filters-div").load("html/filters.html",
        _ => $("#popup-div").load("html/popup.html",
            _ => $("#map-div").load("html/map.html",
                _ => $("#legend-div").load("html/legend.html", next_callback))))
}