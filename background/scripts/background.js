function generateStars() {
  const starFields = document.querySelectorAll('.stars, .stars2, .stars3');
  const densities = [1700, 700, 200];
  
  starFields.forEach((field, index) => {
      let stars = '';
      for(let i = 0; i < densities[index]; i++) {
          const x = Math.random() * 2560;
          const y = Math.random() * 2560;
          stars += `${x}px ${y}px #FFF,`;
      }
      field.style.boxShadow = stars.slice(0, -1);
  });
}

document.addEventListener('DOMContentLoaded', generateStars);