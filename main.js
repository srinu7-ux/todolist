(function(){
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
   
    function addTask() {
      const taskText = newTaskInput.value.trim();
      if (!taskText) {
        alert('Please enter a task.');
        return;
      }
      createTaskElement(taskText);
      newTaskInput.value = '';
      newTaskInput.focus();
    }
  
    function createTaskElement(text) {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';
  
      const taskTextSpan = document.createElement('span');
      taskTextSpan.className = 'task-text';
      taskTextSpan.textContent = text;
  
      const btnGroup = document.createElement('div');
      btnGroup.className = 'btn-group';
  
  
      const completeBtn = document.createElement('button');
      completeBtn.className = 'task-btn complete-btn';
      completeBtn.textContent = 'Complete';
      completeBtn.setAttribute('aria-label', 'Mark task as complete');
      completeBtn.addEventListener('click', () => {
        if (taskTextSpan.classList.contains('completed')) {
          taskTextSpan.classList.remove('completed');
          completeBtn.textContent = 'Complete';
        } else {
          taskTextSpan.classList.add('completed');
          completeBtn.textContent = 'Undo';
        }
      });
  
      const editBtn = document.createElement('button');
      editBtn.className = 'task-btn edit-btn';
      editBtn.textContent = 'Edit';
      editBtn.setAttribute('aria-label', 'Edit task');
      editBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to edit this task?')) {
          enterEditMode(taskDiv, taskTextSpan, editBtn);
        }
      });
  
     
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'task-btn delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
          taskDiv.remove();
        }
      });
  
      btnGroup.appendChild(completeBtn);
      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);
  
      taskDiv.appendChild(taskTextSpan);
      taskDiv.appendChild(btnGroup);
  
      taskList.appendChild(taskDiv);
    }
  
    function enterEditMode(taskDiv, taskTextSpan, editBtn) {
     
      taskTextSpan.style.display = 'none';
      editBtn.style.display = 'none';
  
      const btnGroup = editBtn.parentElement;
  
      const editInput = document.createElement('input');
      editInput.className = 'edit-input';
      editInput.type = 'text';
      editInput.value = taskTextSpan.textContent;
      editInput.setAttribute('aria-label', 'Edit task input');
  
    
      const saveBtn = document.createElement('button');
      saveBtn.className = 'task-btn edit-btn';
      saveBtn.textContent = 'Save';
      saveBtn.setAttribute('aria-label', 'Save edited task');
      saveBtn.addEventListener('click', () => {
        const newValue = editInput.value.trim();
        if (!newValue) {
          alert('Task cannot be empty.');
          editInput.focus();
          return;
        }
        taskTextSpan.textContent = newValue;
        exitEditMode();
      });
  
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'task-btn delete-btn';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.setAttribute('aria-label', 'Cancel editing task');
      cancelBtn.addEventListener('click', () => {
        exitEditMode();
      });
  
      function exitEditMode() {
        editInput.remove();
        saveBtn.remove();
        cancelBtn.remove();
        taskTextSpan.style.display = '';
        editBtn.style.display = '';
      }
  
      btnGroup.appendChild(editInput);
      btnGroup.appendChild(saveBtn);
      btnGroup.appendChild(cancelBtn);
  
      editInput.focus();
    }
  
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  })();
  
  
  