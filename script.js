($ = n => document.getElementById(n))

const template = JSON.parse($("-template").text)
let data = localStorage.getItem("_dataStore")
data = (data ? JSON.parse(data) : template)

const F = (n) => { return n }
const N = (n) => Number(n).toFixed(2)
const T = () => Date.now()

const renminbi = $("renminbi")
const renminbi_idle = $("renminbi-idle")

function text(element, v) {
    if (element.textContent === v) return
    element.textContent = v
}

let tick = T()
setInterval(() => {
    const _renminbi = data["renminbi"]
    const renminbi_step = data["renminbi/step"]

    let u = Math.floor((T() - tick) / data.step)
    if (u > 0) { data.renminbi += (u * renminbi_step)
        tick += (u * data.step)}

    text(renminbi, (`${_renminbi} ¥`))
    text(renminbi_idle, (`+${renminbi_step} ¥/step (${data.step}ms)`))

    localStorage.setItem("_dataStore",
        JSON.stringify(data))
}, 100)

document.visibilitychange = function() {
    if (!document.hidden) tick = T()
}