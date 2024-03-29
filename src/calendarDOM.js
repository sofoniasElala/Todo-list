import { isToday, isThisWeek, parseISO } from "date-fns";
import taskDisplay from "./taskDOM.js";

//display all tasks that are due today
function today(tasks) {
  const main = document.querySelector(".main");
  main.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = "Today";
  main.appendChild(header);
  tasks.forEach((task) => {
    if (isToday(parseISO(task.dueDate))) taskDisplay(task, tasks);
  });
}

//display all tasks that are due this week
function week(tasks) {
  const main = document.querySelector(".main");
  main.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = "Week";
  main.appendChild(header);
  tasks.forEach((task) => {
    if (isThisWeek(parseISO(task.dueDate), { weekStartsOn: 1 })) // weekStartsOn: 1 means week starts on monday
      taskDisplay(task, tasks); 
  });
}

export { week, today };
