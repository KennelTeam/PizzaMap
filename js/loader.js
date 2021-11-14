$(function() {
    next = function() {
        setup_filters()
        setup_OLMap()
    }
    include_html(next)
    console.log("Loaded")
})