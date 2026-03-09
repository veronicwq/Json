import { products } from "./products.js";
const bookmarkInput = document.getElementById("bookmarkInput");
const addBtn = document.getElementById("addBookmarkBtn");
const bookmarkList = document.getElementById("bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
  bookmarkList.innerHTML = "";

  bookmarks.forEach((url, index) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = url;
    link.textContent = url;
    link.target = "_blank";

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete");

    delBtn.onclick = () => {
      bookmarks.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      renderBookmarks();
    };

    li.append(link, delBtn);
    bookmarkList.append(li);
  });
}

addBtn.onclick = () => {
  const url = bookmarkInput.value;

  if (url === "") return;

  bookmarks.push(url);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  bookmarkInput.value = "";

  renderBookmarks();
};

renderBookmarks();

const username = document.getElementById("username");
const password = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");

const savedData = JSON.parse(localStorage.getItem("formData"));

if (savedData) {
  username.value = savedData.username;
  password.value = savedData.password;
}

saveBtn.onclick = () => {
  const data = {
    username: username.value,
    password: password.value,
  };

  localStorage.setItem("formData", JSON.stringify(data));
};

const source = document.querySelector("#template")?.innerHTML;

const templateScript = fetch("src/template.hbs")
  .then((res) => res.text())
  .then((text) => {
    const template = Handlebars.compile(text);

    const container = document.getElementById("products");

    function render(items) {
      container.innerHTML = template(items);
    }

    render(products);

    const search = document.getElementById("search");

    search.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value),
      );

      render(filtered);
    });
  });
