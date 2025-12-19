let quizzes = [];
let currentIndex = 0;

// JSONから問題を読み込み
async function loadQuizzes() {
  const response = await fetch("quizzes.json");
  const allQuizzes = await response.json();

  const params = new URLSearchParams(window.location.search);
  const subject = decodeURIComponent(params.get("subject") || "");
  const chapter = decodeURIComponent(params.get("chapter") || "");

  quizzes = allQuizzes.filter(q =>
    q.subject === subject && q.chapter === chapter
  );

  quizzes.sort(() => Math.random() - 0.5);

  const savedIndex = parseInt(localStorage.getItem("currentIndex"), 10);
  const savedSubject = localStorage.getItem("currentSubject");
  const savedChapter = localStorage.getItem("currentChapter");

  if (!isNaN(savedIndex) &&
      savedSubject === subject &&
      savedChapter === chapter &&
      savedIndex < quizzes.length) {
    currentIndex = savedIndex;
  } else {
    currentIndex = 0;
  }

  showQuiz(currentIndex);
}

