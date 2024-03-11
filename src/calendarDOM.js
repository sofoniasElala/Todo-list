import { isToday, isThisWeek, parseISO } from "date-fns";
import taskDisplay from "./taskDOM.js";

function today(tasks){
    const main = document.querySelector('.main');
    main.innerHTML = '';
    tasks.forEach(task => {
        if (isToday(parseISO(task.dueDate))) taskDisplay(task, tasks);
    });
}

function week(tasks){
    const main = document.querySelector('.main');
    main.innerHTML = '';
    tasks.forEach(task => {
        if (isThisWeek(parseISO(task.dueDate), { weekStartsOn: 1 })) taskDisplay(task, tasks); // weekStartsOn: 1 means week starts on monday
     });
}

export {week, today}
