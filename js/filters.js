function makeTownDict() {
    let townDict = {}
    dicts.locations.forEach(element => {
        townDict[element.id] = element.name
    })
    return townDict
}

var townDict
var curShowingData

function parseDate(dateString) {
    let [day, month, year] = dateString.split('/')
    return new Date(year, month - 1, day)
}

function onShowFiltersButton() {
    let town = $("#townChoose").val()
    let showNew = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "new"
    let showCanceled = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "canceled"
    let showLate = $("#showLateOrders").is(":checked")
    let minSumOrder = Number($("#orderSum").val())
    let promo = $("#promoInput").val()
    let dateInterval = $("[name='datefilter']").val().split(" - ")
    let startDate = parseDate(dateInterval[0])
    let endDate = parseDate(dateInterval[1])
    endDate.setDate(endDate.getDate() + 1)

    function filterOrder(ord) {
        if (townDict[ord.locationId] != town) return false
        if (showLate && !ord.lated) return false // ditch
        if (ord.sum < minSumOrder) return false
        if (!showNew && ord.status == 1) return false
        if (!showCanceled && ord.status == 2) return false
        if (promo != "" && ord.promo != promo) return false
        let date = new Date(ord.date)
        if (date <= startDate || date >= endDate) return false
        return true
    }

    curShowingData = JSON.parse(input_orders).filter(filterOrder)
    showStatistics(curShowingData)
    setData(curShowingData)
}

function onClearFilters() {
    let town = $("#townChoose").val()
    $("#orderTypeChoose").val('all')
    $("#showLateOrders").prop('checked', false)
    $("#orderSum").val('0')
    $("#promoInput").val('')
    let now = new Date()
    $("[name='datefilter']").val(`01.01.2011 - ${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`)

    curShowingData = JSON.parse(input_orders).filter(ord => townDict[ord.locationId] == town)
    showStatistics(curShowingData)
    setData(curShowingData)
}

function seltownChanged(event) {
    onClearFilters()
    cord_point = []
    dicts.locations.forEach(el => {
        if (el.name == event.target.value) {
            cord_point = el.point
        }
    })
    relocate_mapcenter(cord_point)
}

function setup_filters() {
    townDict = makeTownDict()
    document.querySelector("#showButton").onclick = onShowFiltersButton

    $("#townChoose").on("change", seltownChanged)

    document.querySelector("#clearButton").onclick = onClearFilters
    seltownChanged({ target: { value: $("#townChoose").val() } })

    let prices = JSON.parse(input_orders).map(el => el.sum)

    let min = 9999999
    let max = 0

    prices.forEach(price => {
        if (price < min) {
            min = price
        }
        if (price > max) {
            max = price
        }
    })
    console.log(min, max)

}