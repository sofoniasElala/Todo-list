import { updateStorage, getValueFromStorage } from './storageCRUD.js';
import taskDisplay from './taskDOM.js';

export default function home (allTasks = getValueFromStorage('all-tasks')){
   
    allTasks.forEach(task => {
        taskDisplay(task, allTasks);
    })


}
