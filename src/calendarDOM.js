import { isToday, isThisWeek } from "date-fns";
import taskDisplay from "./taskDOM.js";

function today(tasks){
    tasks.forEach(task => {
        if (isToday(task.dueDate)) taskDisplay(task, tasks);
    });
}

function week(tasks){
    tasks.forEach(task => {
        if (isThisWeek(task.dueDate, { weekStartsOn: 1 })) taskDisplay(task, tasks); // weekStartsOn: 1 means week starts on monday
     });
}

export {week, today}
