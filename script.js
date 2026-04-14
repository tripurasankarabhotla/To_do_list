let taskList = document.getElementById("taskList");
window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Enter a task!");
    return;
  }

  createTask(taskText, false);
  saveTasks();

  input.value = "";
}

function createTask(text, isCompleted) {
  let li = document.createElement("li");

  let leftDiv = document.createElement("div");
  leftDiv.className = "task-left";
  
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  let span = document.createElement("span");
  span.textContent = text;

  if (isCompleted) {
    span.classList.add("completed");
  }

  checkbox.onchange = function () {
    span.classList.toggle("completed");
    saveTasks();
  };

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";

  deleteBtn.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(leftDiv);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  let tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    let text = li.querySelector("span").textContent;
    let completed = li.querySelector("input").checked;

    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});
