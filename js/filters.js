function makeTownDict() {
    let townDict = {}
    dicts.locations.forEach(element => {
        townDict[element.id] = element.name
    })
    return townDict
}

var townDict

function parseDate(dateString) {
    let [day, month, year] = dateString.split('.')
    return new Date(year, month - 1, day)
}

function setup_filters() {
    townDict = makeTownDict()
    document.querySelector("#showButton").onclick = function() {
        let town = $("#townChoose").val()
        let showNew = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "new"
        let showCanceled = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "canceled"
        let showLate = $("#showLateOrders").is(":checked")
        let minSumOrder = Number($("#orderSum").val())
        let promo = $("#promoInput").val()
        let dateInterval = $("[name='datefilter']").val().split(" - ")
        let startDate = parseDate(dateInterval[0])
        let endDate = parseDate(dateInterval[1])

        function filterOrder(ord) {
            if (townDict[ord.locationId] != town) return false
            if (!showLate && ord.lated) return false
            if (ord.sum < minSumOrder) return false
            if (!showNew && ord.status == 1) return false
            if (!showCanceled && ord.status == 2) return false
            if (promo != "" && ord.promo != promo) return false
            let date = new Date(ord.date)
            if (date < startDate || date > endDate) return false
            return true
        }

        let orders = JSON.parse(input_orders).filter(filterOrder)

        showStatistics(orders)

        setData(orders)
    }

    document.querySelector("#clearButton").onclick = function() {
        let town = $("#townChoose").val()
        $("#orderTypeChoose").val('all')
        $("#showLateOrders").prop('checked', false)
        $("#orderSum").val('0')
        $("#promoInput").val('')
        let now = new Date()
        $("[name='datefilter']").val(`01.01.2000 - ${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`)

        let orders = JSON.parse(input_orders).filter(ord => townDict[ord.locationId] == town)

        showStatistics(orders)

        setData(orders)
    }

}