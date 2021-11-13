document.querySelector("#showButton").onclick = function() {
    let town = $("#townChoose").val()
    let showNew = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "new"
    let showCanceled = $("#orderTypeChoose").val() == "all" || $("#orderTypeChoose").val() == "canceled"
    alert(`Town choosed: ${town};\n showNew: ${showNew}; showCanceled: ${showCanceled}`)
}