let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
  deferredPrompt.prompt();
  deferredPrompt = null;
});

function generateSlides() {
  const input = document.getElementById("mcqInput").value;
  const container = document.getElementById("slidesContainer");
  container.innerHTML = "";

  const mcqs = input.split("---");

  mcqs.forEach(mcq => {
    const lines = mcq.trim().split("\n");
    if (lines.length < 6) return;

    const question = lines[0];
    const options = lines.slice(1,5);
    const correct = lines[5].trim();

    const slide = document.createElement("div");
    slide.className = "slide";

    let html = `<h3>${question}</h3>`;

    options.forEach((opt, index) => {
      html += `<div class="option">${index+1}. ${opt}</div>`;
    });

    html += `<div class="answer">Correct Answer: Option ${correct}</div>`;
    html += `<button onclick="this.previousElementSibling.style.display='block'">Show Answer</button>`;

    slide.innerHTML = html;
    container.appendChild(slide);
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
