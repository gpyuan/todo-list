const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const storage_key = "todoList";

function createListItem(text, completed) {
  const li = document.createElement("li");

  //新增checkbox
  const uniqueId = "todo-" + crypto.randomUUID();
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = uniqueId;
  checkbox.classList.add("todo-checkbox");

  // 設定checkbox狀態若完成就打勾
  if (completed) {
    checkbox.checked = true;
    li.classList.add("completed");
  }

  //完成後+刪除線
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    saveList(); // 每次狀態改變就儲存
  });

  // 新增 label，並將 for 屬性指向 checkbox 的 id
  const userLable = document.createElement("label");
  userLable.htmlFor = uniqueId;
  userLable.textContent = text;

  //刪除鍵
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delBtn.addEventListener("click", () => {
    li.style.animation = "scaleDown 0.5s ease forwards";
    li.addEventListener("animationend", () => {
      li.remove();
      saveList();
    });
  });

  li.appendChild(checkbox);
  li.appendChild(userLable);
  li.appendChild(delBtn);
  list.appendChild(li);

  li.style.animation = "scaleUp 0.5s ease forwards";
}

//載入清單
function loadList() {
  const storedList = localStorage.getItem(storage_key);
  if (storedList) {
    const todos = JSON.parse(storedList);
    todos.forEach((todo) => {
      // 畫出清單
      createListItem(todo.text, todo.completed);
    });
  }
}

// 儲存清單
function saveList() {
  const todos = [];
  document.querySelectorAll("#list li").forEach((li) => {
    const text = li.querySelector("label").textContent;
    const completed = li.classList.contains("completed");
    todos.push({ text, completed });
  });
  localStorage.setItem(storage_key, JSON.stringify(todos));
}

// 網頁載入完成後，執行 loadList 函式
document.addEventListener("DOMContentLoaded", loadList);

//Enter加入清單
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

//避免加入無效清單
addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  createListItem(input.value.trim(), false); // 呼叫新函式來建立項目
  saveList(); // 新增後儲存

  input.value = "";
});
