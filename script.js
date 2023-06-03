const slides = document.getElementsByClassName('slides');
const dots = document.getElementsByClassName('dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const navItems = document.querySelectorAll('nav ul li');
const header = document.querySelector('header');
const discordUsername = document.getElementById('discord-username');
const tooltip = document.querySelector('.tooltip');

//Handle the styling for active nav element
navItems.forEach((item) => {
  item.addEventListener('click', () => handleNavigation(item));
});

function handleNavigation(item) {
  navItems.forEach((item) => {
    if (item.querySelector('a').classList.contains('active')) {
      item.querySelector('a').classList.remove('active');
    }
  });
  item.querySelector('a').classList.add('active');
}

// Change the slideshow of pictures
let slideIndex = 1;
showSlides(slideIndex);

prev.addEventListener('click', () => {
  changeSlide(-1)
})

next.addEventListener('click', () => {
  changeSlide(1)
})

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  if (n > slides.length) {
    slideIndex = 1
  } else if (n < 1) {
    slideIndex = slides.length
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace('active', '');
  }

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

//Tool tip for discord username
discordUsername.addEventListener('mouseenter', () => {
  tooltip.classList.add('show');
});

discordUsername.addEventListener('mouseleave', () => {
  tooltip.classList.remove('show');
});

discordUsername.addEventListener('click', () => {
  const textToCopy = discordUsername.innerText;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log('Discord username copied to clipboard:', textToCopy);
      tooltip.textContent = 'Copied!';
      tooltip.classList.add('show');

      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 2000);
    })
    .catch((error) => {
      tooltip.textContent = 'Failed to copy:' + error;
      tooltip.classList.add('show');
      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 2000);
    });
});