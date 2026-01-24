document.addEventListener('DOMContentLoaded', () => {

  const introModal = document.getElementById('introModal');
  const closeIntro = document.getElementById('closeIntro');
  const avatarTrigger = document.querySelector('.avatar-trigger');

  if (!introModal || !closeIntro) return;

  // First visit
  if (!localStorage.getItem('introSeen')) {
    introModal.classList.add('active');
  }

  // Close
  closeIntro.addEventListener('click', () => {
    introModal.classList.remove('active');
    localStorage.setItem('introSeen', 'true');
  });

  // Open again via avatar
  if (avatarTrigger) {
    avatarTrigger.addEventListener('click', () => {
      introModal.classList.add('active');
    });
  }

});
