$(function() {
    next = function() {
        setup_OLMap()
        setup_filters()
    }
    include_html(next)
    console.log("Loaded")
})