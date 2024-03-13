import { getValueFromStorage } from "./storageCRUD.js";
import taskDisplay from "./taskDOM.js";

export default function home(allTasks = getValueFromStorage("all-tasks")) {
  const main = document.querySelector(".main");
  main.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = "Home";
  main.appendChild(header);
  allTasks.forEach((task) => {
    taskDisplay(task, allTasks);
  });
}
