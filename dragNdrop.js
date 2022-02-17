import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    const ghost = selectedItem.cloneNode() // deep copy is not needed

    const offset = setupDragItems(selectedItem, itemClone, ghost, e)
    setupDragEvents(selectedItem, itemClone, offset)
  })
}

function setupDragItems(selectedItem, itemClone, ghost, e) {
  const originalRect = selectedItem.getBoundingClientRect()
  const offset = {
    x: e.clientX - originalRect.left,
    y: e.clientY - originalRect.top,
  }
  selectedItem.classList.add("hide")

  itemClone.style.width = `${originalRect.width}px`
  itemClone.classList.add("dragging")
  positionClone(itemClone, e, offset)
  document.body.append(itemClone)

  ghost.style.height = `${originalRect.height}px`
  ghost.classList.add("ghost")
  // ghost.innerHTML = ""
  selectedItem.parentElement.insertBefore(ghost, selectedItem) // Insert the ghost before the selected item,
  // Since the selected item will be hidden once it is moved, and the ghost will take it's place

  return offset
}

function setupDragEvents(selectedItem, itemClone, offset) {
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
}

function positionClone(itemClone, e, offset) {
  itemClone.style.top = `${e.clientY - offset.y}px`
  itemClone.style.left = `${e.clientX - offset.x}px`
}
