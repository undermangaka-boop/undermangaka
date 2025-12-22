const preview = document.getElementById('preview');
const previewImg = document.getElementById('preview-img');

document.querySelectorAll('.title-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    previewImg.src = card.dataset.preview;
    preview.classList.remove('hidden');
  });
  card.addEventListener('mouseleave', () => {
    preview.classList.add('hidden');
  });
  card.addEventListener('touchstart', () => {
    previewImg.src = card.dataset.preview;
    preview.classList.remove('hidden');
  });
  card.addEventListener('touchend', () => {
    preview.classList.add('hidden');
  });
});

function openTitle(id) {
  window.location.href = `title${id}.html`;
}
