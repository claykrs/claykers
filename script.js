($ = n => document.getElementById(n))

const template = JSON.parse($("-template").text)
let dataStore = localStorage.getItem("_dataStore")
dataStore = (dataStore ? JSON.parse(dataStore) : {})
const data = { ...template, ...dataStore }

const F = (n) => {
    if (n < 1E6) 
        return n.toLocaleString()

    const suffixes = [
        "thousand", "million",
        "billion", "trillion"]

    let value = n, i = 0
    while (Math.abs(value) >= 1e3
        && i < suffixes.length - 1)
    {
        value /= 1e3, i++
    }

    if (i === suffixes.length - 1
        && Math.abs(value) >= 1e3)
    { return n.toExponential(2) }

    return value.toFixed(Number.isInteger(value) 
        ? 0 : 2) + " " + suffixes[i - 1]}
const N = (n) => Number(n.toFixed(2))
const T = () => Date.now()

const renminbi = $("renminbi")
const renminbi_idle = $("renminbi-idle")

const reset_ = $("reset-")
let count = 0, _tick = null
reset_.onclick = function() {
    count++

    if (count === 1) {
        setTimeout(() => {
            count = 0
        }, 1.5E3)
    } else if (count === 3) {
        developer_mode = true
        localStorage.setItem("_dataStore", 
            JSON.stringify(template))
        location.reload()
    }
}

function text(element, v) {
    if (element.textContent === v) return
    element.textContent = v
}

let tick = T()
let developer_mode

setInterval(() => {
    if (developer_mode) {
        tick = T(); return}

    const _renminbi = data["renminbi"]
    const renminbi_step = data["renminbi/step"]

    let mulx = N(data["renminbi/mulx"])

    let u = Math.floor((T() - tick) / data.step)
    if (u > 0) { data.renminbi += (u * renminbi_step) * mulx
        tick += (u * data.step)}

    text(renminbi, (`${F(_renminbi)} ¥ ${mulx > 1 && `(x${F(mulx)} mul)` || ""}`))
    text(renminbi_idle, (`+${F(renminbi_step * mulx)} ¥/step (${data.step}ms)`))

    localStorage.setItem("_dataStore",
        JSON.stringify(data))
}, 10)

document.addEventListener("keydown", function (event) {
    if (event.shiftKey && event.key.toLowerCase() === "h") {
        developer_mode = developer_mode
            === true ? null : true

        reset_.style.visibility = 
            (reset_.style.visibility === "visible")
                ? "hidden" : "visible"
        reset_.disabled = !reset_.disabled
    }
})

document.addEventListener("visibilitychange", function() {
    if (!document.hidden) tick = T()
})
