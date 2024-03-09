import Task from './todo.js';
import home from './homeDOM.js';
import Project from './project.js';
import {format} from 'date-fns';
import {today, week} from './calendarDOM.js';
import { projects as projectsDOM, projectTasks as projectTasksDOM } from './projectsDOM.js';
import './style.css';
class App {

    constructor(){
        this.main = document.querySelector('.main');
        this.homeButton = document.querySelector('.home');
        this.todayButton = document.querySelector('.today');
        this.weekButton = document.querySelector('.week');
        this.projectsButton = document.querySelector('.projects');
    }

    start(){
         /*------tests-------*/
        const testProject = new Project('Fitness'); 
        const testProject2 = new Project('Household');
        const testProject3 = new Project('Work');
        const allTasks = [];

        const testProjectTask = new Task('jump rope', '20 x 4', '',format(Date.now(), "MM/dd/yyyy"),'', testProject.name, false);
        testProject.addTask(testProjectTask);
        allTasks.push(testProjectTask);

        const testProjectTask1 = new Task('squat', '300 x 4', '', format(new Date(2024, 2, 10), "MM/dd/yyyy"),'', testProject.name, false);
        testProject.addTask(testProjectTask1);
        allTasks.push(testProjectTask1);

        const testProjectTask2 = new Task('bench press', '150 x 4', '', format(Date.now(), "MM/dd/yyyy"),'', testProject.name, false);
        testProject.addTask(testProjectTask2);
        allTasks.push(testProjectTask2);
        /*---------------------*/

        home(allTasks); //landing page loaded with the test tasks

        this.homeButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            home(allTasks);
        })
        this.todayButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            today(allTasks);
        })
        this.weekButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            week(allTasks);
        })
        this.projectsButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            projectsDOM([testProject, testProject2, testProject3]);
        })
    }
}

const app = new App();
app.start();