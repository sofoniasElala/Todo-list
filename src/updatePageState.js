import home from "./homeDOM.js";
import { today, week } from "./calendarDOM.js";
import { projects, projectTasks } from "./projectsDOM.js";
import { getValueFromStorage } from "./storageCRUD.js";

export default function updateState(){
    switch (getValueFromStorage('current-page')) {
        case 'home':
            home(getValueFromStorage('all-tasks'));
            break;
        case 'today':
            today(getValueFromStorage('all-tasks'));
            break;
        case 'week':
            week(getValueFromStorage('all-tasks'));
            break;
        case 'projects':
            projects(getValueFromStorage('projects'));
            break;
        default:
            projectTasks(getValueFromStorage('current-page'));
            break;
    }
}
