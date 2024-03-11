import { getValueFromStorage } from './storageCRUD.js';
import taskDisplay from './taskDOM.js';

export default function home (allTasks = getValueFromStorage('all-tasks')){
    const main = document.querySelector('.main');
    main.innerHTML = '';
    allTasks.forEach(task => {
        taskDisplay(task, allTasks);
    })


}
