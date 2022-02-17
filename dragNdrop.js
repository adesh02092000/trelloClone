import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    const originalRect = selectedItem.getBoundingClientRect() // gives the dimensions of the item
    const offset = {
      x: e.clientX - originalRect.left,
      y: e.clientY - originalRect.top,
    }
    itemClone.style.width = `${originalRect.width}px` // Make sure the dimensions of clone remains the same
    itemClone.classList.add("dragging")
    positionClone(itemClone, e, offset)
    document.body.append(itemClone)
    selectedItem.classList.add("hide")

    const mouseMoveFunc = e => {
      positionClone(itemClone, e, offset)
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

function positionClone(itemClone, e, offset) {
  itemClone.style.top = `${e.clientY - offset.y}px`
  itemClone.style.left = `${e.clientX - offset.x}px`
}
