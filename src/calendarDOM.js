import { isToday, isThisWeek } from "date-fns";
import taskDisplay from "./taskDOM.js";

function today(tasks){
    tasks.forEach(task => {
        if (isToday(task.dueDate)) taskDisplay(task);
    });
}

function week(tasks){
    tasks.forEach(task => {
        if (isThisWeek(task.dueDate, { weekStartsOn: 1 })) taskDisplay(task); // weekStartsOn: 1 means monday
     });
}

export {week, today}
