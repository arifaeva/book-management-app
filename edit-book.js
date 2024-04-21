const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

const homeBtn = document.getElementById("homeBtn");
const backBtn = document.getElementById("backBtn");
const deleteBtn = document.getElementById("deleteBtn");

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/gmUOOqcdzBSG/${id}`;
homeBtn.href = `/index.html`;
backBtn.href = `/detailBook.html?id=${id}`;

const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("bookTitle");
const editRating = document.getElementById("bookRating");
const editCategory = document.getElementById("bookCategory");
const editRead = document.getElementById("pageRead");
const editTotal = document.getElementById("pageTotal");
const editAuthor = document.getElementById("bookAuthor");
const editYear = document.getElementById("bookYear");
const editPublisher = document.getElementById("bookPublisher");
const editCover = document.getElementById("bookCover");
const editDesc = document.getElementById("bookDesc");

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("https://v1.appbackend.io/v1/rows/gmUOOqcdzBSG", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
      title: editTitle.value,
      rating: editRating.value,
      category: editCategory.value,
      pageread: editRead.value,
      pagetotal: editTotal.value,
      author: editAuthor.value,
      year: editYear.value,
      publisher: editPublisher.value,
      cover: editCover.value,
      description: editDesc.value,
    }),
  });
  location.replace(`/detailBook.html?id=${id}`);
});

async function getBook() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
}

async function deleteBook(id) {
  await fetch(`https://v1.appbackend.io/v1/rows/gmUOOqcdzBSG`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });
  location.replace(`/index.html`);
}

deleteBtn.addEventListener("click", async () => {
  const a = await getBook();
  await deleteBook(a._id);
});

async function buildApp() {
  const book = await getBook();

  editTitle.value = book.title;
  editRating.value = book.rating;
  editCategory.value = book.category;
  editRead.value = book.pageread;
  editTotal.value = book.pagetotal;
  editAuthor.value = book.author;
  editYear.value = book.year;
  editPublisher.value = book.publisher;
  editCover.value = book.cover;
  editDesc.value = book.description;
}

buildApp();
