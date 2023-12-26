const navbar = document.querySelector('.navbar');
const menuButton = document.getElementById('menu-button');
const menuToggleLeft = document.querySelector('.menu-toggle-left');
const menuToggleRight = document.querySelectorAll('.menu-toggle-right');
const menuClose = document.querySelector('.close-btn');
const shoppingClose = document.querySelectorAll('.cart-btn.close-btn');
const listsMenu = document.querySelectorAll('.list-menu');
const men = document.querySelector('.men');
const aboutUs = document.querySelector('.about-us');
const search = document.querySelector('.search');
const shoppingBag = document.getElementById('shopping-bag');
const shoppingBagFull = document.getElementById('shopping-bag-full');

// Carousel set up
const prev = document.getElementById('prev-btn');
const next = document.getElementById('next-btn');
const list = document.getElementById('item-list');
const img = document.querySelectorAll('.item');
const itemWidth = img[0].offsetWidth;

// Allow to make the sub-menu buttons toggle 
function makeToggle(event) {
  const toggleList = document.querySelector('.nav-list');
  const subList = event.target.nextElementSibling


  // Allowing to make the toggle instantly and change the height of the menu selection
  function subListShow(event) {
    const hasWomen = event.target.classList.contains('women');
    const hasMen = event.target.classList.contains('men');
    const hasAboutUs = event.target.classList.contains('about-us');

    // Making the toggle instantly
    toggleList.style.transform = 'translateX(-100%)';

    subList.classList.remove('not-visible');
    subList.classList.add('visible');

    if (hasWomen || hasMen) {
      toggleList.style.height = '124px';
    } else if (hasAboutUs) {
      toggleList.style.height = '220px';
    }
  }

  // Slide instantly back to the main menu buttons
  function subListHidden() {
    const returnList = document.querySelectorAll('.return');

    returnList.forEach(element => {
      element.addEventListener('click', () => {
        toggleList.style.transform = 'translateX(0)';
        subList.classList.remove('visible');
        subList.classList.add('not-visible');
        toggleList.style.height = '156px';
      })
    })
  }

  subListShow(event);
  subListHidden();
}

function closeNavbar(event) {
  const menuToggleRightArray = Array.from(menuToggleRight).some(element => {
    element.classList.contains('menu-toggled');
  });

  shoppingBag.removeEventListener('click', makeMenuToggle)
  menuButton.removeEventListener('click', makeMenuToggle)

  if (!navbar.contains(event.target)) {

    menuToggleLeft.classList.remove('menu-toggled');
    menuToggleRight.forEach(element => {
      element.classList.remove('menu-toggled');
    })
  }

  if (!menuToggleLeft.classList.contains('menu-toggled') && !menuToggleRightArray) {
    shoppingBag.addEventListener('click', makeMenuToggle);
    menuButton.addEventListener('click', makeMenuToggle);
  }
}

function makeMenuToggle(event) {
  if (event.target.id.includes('menu-button')) {
    menuToggleLeft.classList.add('menu-toggled');
  } else if (event.target.id.includes('shopping-bag') || event.target.id.includes('shopping-bag-full')) {
    menuToggleRight.forEach(element => {
      element.classList.add('menu-toggled');
    })
  }
}

function makeFixed() { 
  if (document.documentElement.scrollTop > 0) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Menu and Shopping bag toggle
  menuButton.addEventListener('click', makeMenuToggle)
  shoppingBag.addEventListener('click', makeMenuToggle)
  shoppingBagFull.addEventListener('click', makeMenuToggle)

  // Menu and Shopping bag close
  menuClose.addEventListener('click', () => {
    menuToggleLeft.classList.remove('menu-toggled');
  })

  // Loop is need because there is not only one close button. One for mobile and desktop.
  shoppingClose.forEach(element => {
    element.addEventListener('click', () => {
      menuToggleRight.forEach(element => {
        element.classList.remove('menu-toggled');
      })
    })
  })

  document.addEventListener('click', closeNavbar)

  // Making toggle the list buttons.
  listsMenu.forEach(element => {
    element.addEventListener('click', makeToggle)
  });

  // Making Navbar fixed when scrolling
  window.addEventListener("scroll", makeFixed);

  // Making carousel live
  prev.addEventListener('click', () => {
    list.scrollLeft -= (itemWidth);
  })

  next.addEventListener('click', () => {
    list.scrollLeft += (itemWidth);
  })
});