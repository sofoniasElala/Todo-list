import home from "./homeDOM.js";
import { today, week } from "./calendarDOM.js";
import { projects, projectTasks } from "./projectsDOM.js";
import { getValueFromStorage, getProjectFromStorage } from "./storageCRUD.js";

//update the current page when project/task is created/updated
export default function updateState() {
  switch (getValueFromStorage("current-page")) {
    case "home":
      home(getValueFromStorage("all-tasks"));
      break;
    case "today":
      today(getValueFromStorage("all-tasks"));
      break;
    case "week":
      week(getValueFromStorage("all-tasks"));
      break;
    case "projects":
      projects(getValueFromStorage("projects"));
      break;
    default:
      projectTasks(getProjectFromStorage(getValueFromStorage("current-page")));
      break;
  }
}
