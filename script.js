import setup from "./dragNdrop"
import { v4 as uuidV4 } from "uuid"

const STORAGE_PREFIX = "TRELLO_CLONE"
const LANES_STORAGE_KEY = `${STORAGE_PREFIX}-lanes`
const DEFAULT_LANES = {
  backlog: [{ id: uuidV4(), text: "Create your first task" }],
  doing: [],
  done: [],
}

const lanes = loadLanes()

renderTasks()

setup(onDragComplete)

function onDragComplete(dataObj) {
  console.log(dataObj)
}

function loadLanes() {
  const lanesJson = localStorage.getItem(LANES_STORAGE_KEY)
  return JSON.parse(lanesJson) || DEFAULT_LANES
}

function renderTasks() {
  Object.entries(lanes).forEach(obj => {
    const laneId = obj[0]
    const tasks = obj[1]
    const lane = document.querySelector(`[data-lane-id="${laneId}"]`)
    tasks.forEach(task => {
      const taskElement = createTaskElement(task)
      lane.append(taskElement)
    })
  })
}

// To loop through objects, use Object.entries()
//  obj = { a : 1, b : 2} , Object.entries(obj) ==> [[a, 1], [b, 2]]

function createTaskElement(task) {
  const element = document.createElement("div")
  element.id = task.id
  element.innerText = task.text
  element.classList.add("task")
  element.dataset.draggable = true
  return element
}
