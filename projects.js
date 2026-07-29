function filterProjects(category) {
      const cards = document.querySelectorAll('.project-card');
      const buttons = document.querySelectorAll('.filter-btn');

      // Update active button
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    }