document.querySelector("#showButton").onclick = function() {
    let town = $("#townChoose").val()
    let showNew = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "new"
    let showCanceled = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "canceled"
    let showLate = $("#showLateOrders").is(":checked")
    let minSumOrder = Number($("#orderSum").val())
    let promo = $("#promoInput").val()
    let dateInterval = $("[name='datefilter']").val().split(" - ")
    let startDate = new Date(dateInterval[0])
    let endDate = new Date(dateInterval[1])
    alert(
        `Town choosed: ${town}
        showNew: ${showNew}; showCanceled: ${showCanceled}
        showLate: ${showLate}
        minSum: ${minSumOrder}
        promo: ${promo}
        dateInterval: ${startDate} - ${endDate}`)
}