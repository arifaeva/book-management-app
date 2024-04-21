const catalogContainer = document.getElementById("catalogContainer");
const API_ENDPOINT = "https://v1.appbackend.io/v1/rows/gmUOOqcdzBSG";
const form = document.getElementById("form");
const searchInput = document.getElementById("searchInput");
let dataBooks = [];

form.addEventListener("submit", async (event) => {
  // untuk avoid default behavior
  event.preventDefault();

  // Convention
  const formData = new FormData(event.target);

  const title = formData.get("bookTitle");
  const rating = formData.get("bookRating");
  const category = formData.get("bookCategory");
  const pageread = formData.get("pageRead");
  const pagetotal = formData.get("pageTotal");
  const author = formData.get("bookAuthor");
  const year = formData.get("bookYear");
  const publisher = formData.get("bookPublisher");
  const cover = formData.get("bookCover");
  const description = formData.get("bookDesc");

  await createData(
    title,
    rating,
    category,
    pageread,
    pagetotal,
    author,
    year,
    publisher,
    cover,
    description
  );

  location.reload();
});

async function createData(
  title,
  rating,
  category,
  pageread,
  pagetotal,
  author,
  year,
  publisher,
  cover,
  description
) {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify([
      {
        title,
        rating,
        category,
        pageread,
        pagetotal,
        author,
        year,
        publisher,
        cover,
        description,
      },
    ]),
  });
  const data = await res.json();
  return data;
}

async function getBooksData() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  dataBooks = data;
  return data;
}

async function deleteBook(id) {
  await fetch(API_ENDPOINT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });
  location.reload();
}

async function buildApp() {
  const books = await getBooksData();

  books.data.forEach((book) => {
    const bookContainer = document.createElement("div");
    const topContainer = document.createElement("div");
    const bottomContainer = document.createElement("div");
    const title = document.createElement("h4");
    const author = document.createElement("h5");
    const btnContainer = document.createElement("div");
    const bookBtn = document.createElement("a");
    const editBtn = document.createElement("a");
    const deleteBtn = document.createElement("button");
    const bookCover = document.createElement("img");
    const progressContainer = document.createElement("div");
    const progress = document.createElement("div");

    bookContainer.classList.add(
      "w-60",
      "h-[340px]",
      "relative",
      "bg-indigo-500",
      "rounded-2xl"
    );
    topContainer.classList.add(
      "bg-indigo-500",
      "h-[55%]",
      "space-y-1",
      "rounded-t-2xl"
    );
    bottomContainer.classList.add(
      "bg-gray-700",
      "h-[45%]",
      "space-y-1.5",
      "rounded-2xl",
      "px-3",
      "pt-5"
    );
    title.textContent = book.title;
    title.classList.add("text-sm", "text-white", "font-inter", "font-bold");
    author.textContent = book.author;
    author.classList.add("text-white", "font-inter", "text-xs");
    btnContainer.classList.add("pt-2", "space-x-2", "absolute", "bottom-3");
    bookBtn.textContent = "See Book";
    bookBtn.href = `/detailBook.html?id=${book._id}`;
    editBtn.textContent = "Edit";
    editBtn.classList.add(
      "bg-sky-600",
      "rounded-lg",
      "font-inter",
      "p-1.5",
      "text-sm",
      "text-white",
      "font-medium"
    );
    editBtn.href = `/editBook.html?id=${book._id}`;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add(
      "bg-red-500",
      "rounded-lg",
      "font-inter",
      "font-medium",
      "p-1.5",
      "text-sm",
      "text-white"
    );
    deleteBtn.addEventListener("click", async () => {
      await deleteBook(book._id);
    });
    bookBtn.classList.add(
      "bg-indigo-500",
      "rounded-lg",
      "font-inter",
      "font-medium",
      "p-1.5",
      "text-sm",
      "text-white"
    );
    bookCover.src = book.cover;
    bookCover.classList.add(
      "absolute",
      "bottom-[138px]",
      "left-2",
      "rounded-3xl"
    );
    bookCover.width = 125;
    progressContainer.classList.add(
      "w-52",
      "bg-gray-400",
      "rounded-full",
      "h-2.5",
      "self-center",
      "dark:bg-gray-950",
      "absolute",
      "bottom-[55px]"
    );
    progress.classList.add(
      "bg-indigo-500",
      "h-2.5",
      "rounded-full",
      "dark:bg-blue-500"
    );
    progress.style.width = `${(book.pageread * 100) / book.pagetotal}%`;

    progressContainer.append(progress);
    bottomContainer.append(title, author, progressContainer, btnContainer);
    btnContainer.append(bookBtn, editBtn, deleteBtn);
    bookContainer.append(topContainer, bottomContainer, bookCover);
    catalogContainer.append(bookContainer);
  });
}

buildApp();

searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value;
  catalogContainer.innerHTML = "";

  const filteredBooks = dataBooks.data.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredBooks.forEach((book) => {
    const bookContainer = document.createElement("div");
    const topContainer = document.createElement("div");
    const bottomContainer = document.createElement("div");
    const title = document.createElement("h4");
    const author = document.createElement("h5");
    const btnContainer = document.createElement("div");
    const bookBtn = document.createElement("a");
    const editBtn = document.createElement("a");
    const deleteBtn = document.createElement("button");
    const bookCover = document.createElement("img");
    const progressContainer = document.createElement("div");
    const progress = document.createElement("div");

    bookContainer.classList.add(
      "w-60",
      "h-[340px]",
      "relative",
      "bg-indigo-500",
      "rounded-2xl"
    );
    topContainer.classList.add(
      "bg-indigo-500",
      "h-[55%]",
      "space-y-1",
      "rounded-t-2xl"
    );
    bottomContainer.classList.add(
      "bg-gray-700",
      "h-[45%]",
      "space-y-1.5",
      "rounded-2xl",
      "px-3",
      "pt-5"
    );
    title.textContent = book.title;
    title.classList.add("text-sm", "text-white", "font-inter", "font-bold");
    author.textContent = book.author;
    author.classList.add("text-white", "font-inter", "text-xs");
    btnContainer.classList.add("pt-2", "space-x-2", "absolute", "bottom-3");
    bookBtn.textContent = "See Book";
    bookBtn.href = `/detailBook.html?id=${book._id}`;
    editBtn.textContent = "Edit";
    editBtn.classList.add(
      "bg-sky-600",
      "rounded-lg",
      "font-inter",
      "p-1.5",
      "text-sm",
      "text-white",
      "font-medium"
    );
    editBtn.href = `/editBook.html?id=${book._id}`;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add(
      "bg-red-500",
      "rounded-lg",
      "font-inter",
      "font-medium",
      "p-1.5",
      "text-sm",
      "text-white"
    );
    deleteBtn.addEventListener("click", async () => {
      await deleteBook(book._id);
    });
    bookBtn.classList.add(
      "bg-indigo-500",
      "rounded-lg",
      "font-inter",
      "font-medium",
      "p-1.5",
      "text-sm",
      "text-white"
    );
    bookCover.src = book.cover;
    bookCover.classList.add(
      "absolute",
      "bottom-[138px]",
      "left-2",
      "rounded-3xl"
    );
    bookCover.width = 125;
    progressContainer.classList.add(
      "w-52",
      "bg-gray-400",
      "rounded-full",
      "h-2.5",
      "self-center",
      "dark:bg-gray-950",
      "absolute",
      "bottom-[55px]"
    );
    progress.classList.add(
      "bg-indigo-500",
      "h-2.5",
      "rounded-full",
      "dark:bg-blue-500"
    );
    progress.style.width = `${(book.pageread * 100) / book.pagetotal}%`;

    progressContainer.append(progress);
    bottomContainer.append(title, author, progressContainer, btnContainer);
    btnContainer.append(bookBtn, editBtn, deleteBtn);
    bookContainer.append(topContainer, bottomContainer, bookCover);
    catalogContainer.append(bookContainer);
  });
});
