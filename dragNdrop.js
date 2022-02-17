import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    itemClone.classList.add("dragging")
    positionClone(itemClone, e)
    document.body.append(itemClone)
    selectedItem.classList.add("hide")

    const mouseMoveFunc = e => {
      positionClone(itemClone, e)
    }
    document.addEventListener("mousemove", mouseMoveFunc)

    document.addEventListener(
      "mouseup",
      e => {
        document.removeEventListener("mousemove", mouseMoveFunc)
        selectedItem.classList.remove("hide")
        itemClone.remove()
        console.log("Mouse up")
      },
      { once: true }
    )
  })
}

function positionClone(itemClone, e) {
  itemClone.style.top = `${e.clientY}px`
  itemClone.style.left = `${e.clientX}px`
}
