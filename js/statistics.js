function formatNumber(num) {
    let formatted = String(num % 1000)
    if (num >= 1000) formatted = String(Math.floor(num % 1e6 / 1000)) + " " + formatted
    if (num >= 1e6) formatted = String(Math.floor(num / 1e6)) + " " + formatted
    return formatted
}

function showStatistics(orders_data) {
    let numberOrders = orders_data.length
    let numberLate = orders_data.filter(el => el.lated).length
    let mediumTime = Math.round(orders_data.reduce((prev, current) => prev + current.deliveryTime, 0) / numberOrders)
    let proceeds = orders_data.reduce((prev, current) => prev + current.sum, 0)
    console.log(`number: ${numberOrders}, number late: ${numberLate},\nmedium time: ${mediumTime}, proceeds: ${proceeds}`)
    document.getElementById("numberOrdersStat").innerHTML = numberOrders
    document.getElementById("numberLateStat").innerHTML = formatNumber(numberLate)
    document.getElementById("mediumTimeStat").innerHTML = `${Math.floor(mediumTime / 60)}:${mediumTime % 60}`
    document.getElementById("proceedsStat").innerHTML = formatNumber(proceeds) + " ₽"

    for (let i = 0; i < 5; i++) {
        let target_id = "#legend-progress" + i
        console.log(target_id)
        $(target_id).text(
            Math.round(numberOrders * i / 4).toString()
        )
    }
}