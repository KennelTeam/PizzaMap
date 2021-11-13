$(function() {
    next = _ => {
        setup_filters()
        setup_OLMap()
    }
    include_html(_ => next())
    console.log("Loaded")
})