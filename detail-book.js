const bookContainer = document.getElementById("bookContainer");
const editBtn = document.getElementById("editBtn");
const homeBtn = document.getElementById("homeBtn");
const deleteBtn = document.getElementById("deleteBtn");

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/gmUOOqcdzBSG/${id}`;
editBtn.href = `/editBook.html?id=${id}`;
homeBtn.href = `/index.html`;

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

  const firstContainer = document.createElement("div");
  // const coverContainer = document.createElement("div");
  const bookCover = document.createElement("img");
  const category = document.createElement("h4");
  const progressValue = document.createElement("h5");
  const progressContainer = document.createElement("div");
  const progress = document.createElement("div");
  const progressPercent = document.createElement("p");
  const boxProgress = document.createElement("div");
  const rating = document.createElement("h5");
  const bookRating = document.createElement("h3");

  const secondContainer = document.createElement("div");
  const bookTitle = document.createElement("h1");
  const bookAuthor = document.createElement("h4");
  const yearBook = document.createElement("h4");
  const publisherBook = document.createElement("h4");
  const metaAuthor = document.createElement("h4");
  const metaYear = document.createElement("h4");
  const metaPublisher = document.createElement("h4");
  const metaContainer = document.createElement("div");
  const metaContainer1 = document.createElement("div");
  const metaContainer2 = document.createElement("div");
  const descBook = document.createElement("p");

  firstContainer.classList.add("w-[300px]", "bg-gray-700", "rounded-lg");
  secondContainer.classList.add(
    "w-[800px]",
    "bg-gray-700",
    "p-8",
    "space-y-4",
    "rounded-lg"
  );
  // coverContainer.classList.add("w-[250px]");
  bookCover.src = book.cover;
  bookCover.classList.add("bg-cover", "rounded-3xl", "p-4", "m-auto");
  category.textContent = book.category;

  category.classList.add(
    "text-center",
    "text-white",
    "font-medium",
    "font-inter",
    "rounded-xl",
    "p-2",
    "w-40",
    "m-auto",
    "bg-indigo-500"
  );
  progress.textContent = "Your reading progress :";
  progress.classList.add(
    "text-center",
    "text-white",
    "font-inter",
    "m-auto",
    "pt-5",
    "font-sm"
  );
  progressContainer.classList.add(
    "w-full",
    "bg-gray-400",
    "rounded-full",
    "h-2.5",
    "dark:bg-gray-950"
  );
  progressValue.classList.add(
    "bg-indigo-500",
    "h-2.5",
    "rounded-full",
    "dark:bg-blue-500"
  );
  progressValue.style.width = `${(book.pageread * 100) / book.pagetotal}%`;
  progressPercent.textContent = `${book.pageread} / ${book.pagetotal}`;
  progressPercent.classList.add(
    "text-xs",
    "text-white",
    "font-inter",
    "w-20",
    "text-center"
  );
  boxProgress.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "m-auto",
    "p-3",
    "px-5",
    "space-x-2"
  );
  rating.textContent = "Your rating :";
  rating.classList.add(
    "text-center",
    "text-white",
    "font-inter",
    "m-auto",
    "font-sm"
  );
  bookRating.textContent = `${book.rating}/5`;
  bookRating.classList.add(
    "text-center",
    "font-inter",
    "text-white",
    "m-auto",
    "text-3xl",
    "font-bold",
    "pb-5"
  );

  metaContainer.classList.add("flex", "gap-x-0", "text-white", "font-inter");
  metaContainer1.classList.add("w-40");
  metaContainer2.classList.add("w-96");
  metaAuthor.textContent = "Author";
  metaYear.textContent = "Year Published";
  metaPublisher.textContent = "Publisher";
  bookTitle.textContent = book.title;
  bookTitle.classList.add("font-bold", "text-5xl", "font-inter", "text-white");
  bookAuthor.textContent = `: ${book.author}`;
  yearBook.textContent = `: ${book.year}`;
  // stringYearBook = yearBook.toString(2);

  publisherBook.textContent = `: ${book.publisher}`;
  descBook.textContent = book.description;
  descBook.classList.add(
    "whitespace-pre-line",
    "text-white",
    "font-inter",
    "text-sm"
  );

  metaContainer1.append(metaAuthor, metaYear, metaPublisher);
  metaContainer2.append(bookAuthor, yearBook, publisherBook);
  metaContainer.append(metaContainer1, metaContainer2);

  progressContainer.append(progressValue);
  boxProgress.append(progressContainer, progressPercent);
  firstContainer.append(
    bookCover,
    category,
    progress,
    boxProgress,
    rating,
    bookRating
  );
  secondContainer.append(bookTitle, metaContainer, descBook);
  bookContainer.append(firstContainer, secondContainer);
}

buildApp();
