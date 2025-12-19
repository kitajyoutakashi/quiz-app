async function loadSubjects() {
  const response = await fetch("quizzes.json");
  const quizzes = await response.json();

  const subjects = [...new Set(quizzes.map(q => q.subject))];
  const subjectSelect = document.getElementById("subjectSelect");

  subjects.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subjectSelect.appendChild(opt);
  });

  subjectSelect.onchange = () => {
    const chapterSelect = document.getElementById("chapterSelect");
    chapterSelect.innerHTML = "<option value=''>項目を選択</option>";

    const chapters = quizzes
      .filter(q => q.subject === subjectSelect.value)
      .map(q => q.chapter);

    [...new Set(chapters)].forEach(ch => {
      const opt = document.createElement("option");
      opt.value = ch;
      opt.textContent = ch;
      chapterSelect.appendChild(opt);
    });
  };
}

document.addEventListener("DOMContentLoaded", loadSubjects);

