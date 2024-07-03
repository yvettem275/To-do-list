document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    const searchInput = document.getElementById('searchInput');
  
    window.openTab = (tabName) => {
      const tabContents = document.getElementsByClassName('tab-content');
      for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
      }
      document.getElementById(tabName).classList.add('active');
    };
  
    window.addTask = () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        taskInput.value = '';
      }
    };
  
    window.deleteTask = (button) => {
      const li = button.parentElement;
      li.parentElement.removeChild(li);
    };
  
    window.editTask = (button) => {
      const li = button.parentElement;
      const taskText = prompt('Edit your task:', li.firstChild.textContent);
      if (taskText !== null) {
        li.firstChild.textContent = taskText;
      }
    };
  
    const createTaskElement = (taskText) => {
      const li = document.createElement('li');
      const taskSpan = document.createElement('span');
      taskSpan.textContent = taskText;
  
      const editButton = document.createElement('button');
      editButton.className = 'edit-btn';
      editButton.textContent = 'Edit';
      editButton.onclick = () => editTask(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTask(deleteButton);
  
      li.appendChild(taskSpan);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
  
      li.addEventListener('click', () => {
        li.classList.toggle('completed');
        if (li.classList.contains('completed')) {
          completedList.appendChild(li);
        } else {
          taskList.appendChild(li);
        }
      });
  
      return li;
    };
  
    window.filterTasks = () => {
      const filterText = searchInput.value.toLowerCase();
      const tasks = taskList.getElementsByTagName('li');
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.firstChild.textContent.toLowerCase().includes(filterText)) {
          task.style.display = '';
        } else {
          task.style.display = 'none';
        }
      }
    };
  
    // Open the default tab
    openTab('addItem');
  });
  