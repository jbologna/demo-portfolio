// ── Project One ───────────────────────────────────────
// Replace this starter code with your own project!

const runBtn = document.getElementById('runBtn');
const demo   = document.getElementById('demo');
const output = document.getElementById('output');

runBtn.addEventListener('click', function () {
  // Clear previous output
  demo.innerHTML = '';
  output.textContent = '';

  // ── Your code starts here ──────────────────────────

  const message = 'Hello from Project One!';

  // Render something in the demo area
  const heading = document.createElement('h2');
  heading.textContent = message;
  heading.style.fontFamily = 'var(--font-head)';
  heading.style.fontSize = '1.8rem';
  heading.style.color = 'var(--accent)';
  demo.appendChild(heading);

  // Log text output below the demo
  output.textContent = '✓ Project ran successfully.';

  // ── Your code ends here ────────────────────────────
});