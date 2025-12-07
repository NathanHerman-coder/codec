// ========== DOM ELEMENTS ==========
const DOM = {
    navTasks: document.getElementById('navTasks'),
    navProjects: document.getElementById('navProjects'),
    navStats: document.getElementById('navStats'),
    sections: {
        tasks: document.getElementById('tasksSection'),
        projects: document.getElementById('projectsSection'),
        stats: document.getElementById('statsSection')
    },
    taskInput: document.getElementById('taskInput'),
    addTaskBtn: document.getElementById('addTaskBtn'),
    taskList: document.getElementById('taskList'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    projectInput: document.getElementById('projectInput'),
    addProjectBtn: document.getElementById('addProjectBtn'),
    projectSelect: document.getElementById('projectSelect'),
    sidebarProjects: document.getElementById('sidebarProjects'),
    totalTasksElem: document.getElementById('totalTasks'),
    completedTasksElem: document.getElementById('completedTasks'),
    activeTasksElem: document.getElementById('activeTasks'),
    projectStatsDiv: document.getElementById('projectStats')
};

// ========== STATE MANAGEMENT ==========
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentFilter = 'all';

// ========== STORAGE ==========
const Storage = {
    save: () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('projects', JSON.stringify(projects));
    }
};

// ========== NAVIGATION ==========
function showSection(sectionName) {
    Object.values(DOM.sections).forEach(sec => sec.classList.add('hidden'));
    DOM.sections[sectionName].classList.remove('hidden');

    [DOM.navTasks, DOM.navProjects, DOM.navStats].forEach(nav => nav.classList.remove('font-bold'));
    const navMap = { tasks: DOM.navTasks, projects: DOM.navProjects, stats: DOM.navStats };
    if (navMap[sectionName]) navMap[sectionName].classList.add('font-bold');
}

// ========== EVENT LISTENERS - NAVIGATION ==========
DOM.navTasks.addEventListener('click', () => showSection('tasks'));
DOM.navProjects.addEventListener('click', () => showSection('projects'));
DOM.navStats.addEventListener('click', () => showSection('stats'));

showSection('tasks');

// ========== PROJECTS MANAGEMENT ==========
DOM.addProjectBtn.addEventListener('click', addProject);
DOM.projectInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addProject();
});

function addProject() {
    const name = DOM.projectInput.value.trim();
    if (name && !projects.includes(name)) {
        projects.push(name);
        DOM.projectInput.value = '';
        Storage.save();
        renderProjectSelect();
        renderSidebarProjects();
    }
}

function deleteProject(index) {
    const projName = projects[index];
    projects.splice(index, 1);
    tasks = tasks.filter(t => t.project !== projName);
    Storage.save();
    renderProjectSelect();
    renderSidebarProjects();
    renderTasks(currentFilter);
    renderStats();
}

// ========== PROJECT RENDERING ==========
function renderProjectSelect() {
    DOM.projectSelect.innerHTML = '<option value="all">Tous les projets</option>';
    projects.forEach(proj => {
        const option = document.createElement('option');
        option.value = proj;
        option.textContent = proj;
        DOM.projectSelect.appendChild(option);
    });
}

function renderSidebarProjects() {
    DOM.sidebarProjects.innerHTML = '';
    projects.forEach((proj, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center cursor-pointer hover:underline';

        const span = document.createElement('span');
        span.textContent = proj;
        span.addEventListener('click', () => {
            DOM.projectSelect.value = proj;
            renderTasks(currentFilter);
            showSection('tasks');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.className = 'ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProject(index);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        DOM.sidebarProjects.appendChild(li);
    });
}


// ========== TASKS MANAGEMENT ==========
DOM.addTaskBtn.addEventListener('click', addTask);
DOM.taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const text = DOM.taskInput.value.trim();
    const project = DOM.projectSelect.value !== 'all' ? DOM.projectSelect.value : null;
    if (text) {
        tasks.push({ text, completed: false, project });
        DOM.taskInput.value = '';
        Storage.save();
        renderTasks(currentFilter);
    }
}

// ========== TASKS RENDERING & FILTERING ==========
function filterTasks(filter) {
    let filtered = tasks;

    if (filter === 'active') filtered = tasks.filter(t => !t.completed);
    if (filter === 'completed') filtered = tasks.filter(t => t.completed);

    const selectedProject = DOM.projectSelect.value;
    if (selectedProject !== 'all') {
        filtered = filtered.filter(t => t.project === selectedProject);
    }

    return filtered;
}

function renderTasks(filter = 'all') {
    currentFilter = filter;
    DOM.taskList.innerHTML = '';
    const filteredTasks = filterTasks(filter);

    filteredTasks.forEach((task, index) => {
        const actualIndex = tasks.indexOf(task);
        const li = createTaskElement(task, actualIndex, filter);
        enableDragAndDrop(li, actualIndex);
        DOM.taskList.appendChild(li);
    });

    updateTaskStats();
    renderStats();
}

function createTaskElement(task, index, filter) {
    const li = document.createElement('li');
    li.className = 'bg-white p-4 rounded shadow flex justify-between items-center fade-in';
    li.draggable = true;

    const leftDiv = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) span.className = 'line-through text-gray-400';
    
    leftDiv.appendChild(span);
    
    if (task.project) {
        const projSpan = document.createElement('span');
        projSpan.className = 'ml-2 text-sm text-purple-600';
        projSpan.textContent = `[${task.project}]`;
        leftDiv.appendChild(projSpan);
    }

    const rightDiv = document.createElement('div');
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Done';
    completeBtn.className = 'complete-btn bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2';
    completeBtn.addEventListener('click', () => toggleTask(index, filter));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.className = 'delete-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600';
    deleteBtn.addEventListener('click', () => deleteTask(index, filter));

    rightDiv.appendChild(completeBtn);
    rightDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    return li;
}

function toggleTask(index, filter) {
    tasks[index].completed = !tasks[index].completed;
    Storage.save();
    renderTasks(filter);
}

function deleteTask(index, filter) {
    tasks.splice(index, 1);
    Storage.save();
    renderTasks(filter);
}

function updateTaskStats() {
    DOM.totalTasksElem.textContent = tasks.length;
    DOM.completedTasksElem.textContent = tasks.filter(t => t.completed).length;
    DOM.activeTasksElem.textContent = tasks.filter(t => !t.completed).length;
}

// ========== FILTER BUTTONS ==========
DOM.filterButtons.forEach(btn => {
    btn.addEventListener('click', () => renderTasks(btn.dataset.filter));
});
// ========== DRAG & DROP ==========
function enableDragAndDrop(li, index) {
    li.addEventListener('dragstart', (e) => {
        li.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index);
    });

    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
    });

    li.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const draggingEl = document.querySelector('.dragging');
        if (draggingEl && draggingEl !== li) {
            const allLis = Array.from(DOM.taskList.children);
            const draggedPos = allLis.indexOf(draggingEl);
            const targetPos = allLis.indexOf(li);
            
            if (draggedPos < targetPos) {
                li.parentNode.insertBefore(draggingEl, li.nextSibling);
            } else {
                li.parentNode.insertBefore(draggingEl, li);
            }
        }
    });

    li.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const movedTask = tasks.splice(draggedIndex, 1)[0];

        const targetIndex = Array.from(DOM.taskList.children).indexOf(li);
        tasks.splice(targetIndex, 0, movedTask);

        Storage.save();
        renderTasks(currentFilter);
    });
}


// ========== STATISTICS ==========
function renderStats() {
    DOM.totalTasksElem.textContent = tasks.length;
    DOM.completedTasksElem.textContent = tasks.filter(t => t.completed).length;
    DOM.activeTasksElem.textContent = tasks.filter(t => !t.completed).length;

    DOM.projectStatsDiv.innerHTML = '';
    projects.forEach(proj => {
        const projTasks = tasks.filter(t => t.project === proj);
        const total = projTasks.length;
        const completed = projTasks.filter(t => t.completed).length;
        const active = total - completed;

        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded shadow';
        div.innerHTML = `
            <h3 class="font-bold text-purple-600 mb-2">${proj}</h3>
            <p class="text-gray-700">Total : <span class="font-semibold">${total}</span></p>
            <p class="text-green-600">Terminées : <span class="font-semibold">${completed}</span></p>
            <p class="text-yellow-600">En cours : <span class="font-semibold">${active}</span></p>
        `;
        DOM.projectStatsDiv.appendChild(div);
    });
}


// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProjectSelect();
    renderSidebarProjects();
    renderTasks();
    renderStats();
});
