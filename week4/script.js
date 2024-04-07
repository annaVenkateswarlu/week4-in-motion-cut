document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = taskText;

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', function () {
                editTask(taskTextSpan);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function () {
                deleteTask(taskItem);
            });

            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);

            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
            taskInput.value = '';

            saveTasks(); // Save tasks to local storage
        }
    }

    // Function to edit a task
    function editTask(taskTextSpan) {
        const newText = prompt('Enter new task text:', taskTextSpan.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskTextSpan.textContent = newText.trim();
            saveTasks(); // Save tasks to local storage
        }
    }

    // Function to delete a task
    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks(); // Save tasks to local storage
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task-text').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(taskText => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = taskText;

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', function () {
                editTask(taskTextSpan);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function () {
                deleteTask(taskItem);
            });

            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);

            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    }

    // Call loadTasks function when the page loads
    loadTasks();

    // Add event listener for the Add Task button
    addTaskBtn.addEventListener('click', addTask);
});
