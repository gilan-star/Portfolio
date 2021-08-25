"use strict";

// Make "navbar transparent" when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Show navbar menu when the "toggle button" is clicked
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make "home slowly fade" to transparent as the window scrolls down
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "Arrow Up Button" when scrolling down
const arrowUpBtn = document.querySelector(".arrowUpBtn");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUpBtn.classList.add("visible");
  } else {
    arrowUpBtn.classList.remove("visible");
  }
});

// Handle click on the arrow up button
arrowUpBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Project filtering when categories are clicked
const workBtnContainer = document.querySelector(".mywork__categories");
const projectContainer = document.querySelector(".mywork__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#mywork',
  '#testimonials',
  '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
};

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index +1;
      } else {
        selectedNavIndex = index -1;
      }
    };
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// Language changing button
const LangFirstBtn = document.querySelector('.lang.first');
const Testi1 = document.querySelector('.testi1');
LangFirstBtn.addEventListener('click', () => {
  if (LangFirstBtn.innerHTML === '한국어로 보기') {
    LangFirstBtn.innerHTML = 'In English';
    Testi1.innerHTML = '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세';
  } else {
    LangFirstBtn.innerHTML = '한국어로 보기';
    Testi1.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, atque ex sequi nobis, adipiscicupiditate fuga, error est nemo dicta quis architecto corrupti assumenda totam optio modi quidem animi minus?';
  }
});

const LangSecondBtn = document.querySelector('.lang.second');
const Testi2 = document.querySelector('.testi2');
LangSecondBtn.addEventListener('click', () => {
  if (LangSecondBtn.innerHTML === '한국어로 보기') {
    LangSecondBtn.innerHTML = 'In English';
    Testi2.innerHTML = '저는 질문을 잘하는 사람이 개발을 잘 할 수 있다고 생각합니다. 제가 봐 온 기란님은 질문을 잘하는 사람입니다. 늘 질문하기에 앞서 자신이 할 수 있는 많은 다양한 시도를 거치고, 문제점을 파악한 후, 피드백을 요청합니다. 단순히 질문을 많이 하는 것이 아니라, 시행착오 끝에 문제를 파악한 후 질문합니다. 문제에 대한 호기심, 그것을 해결하고자 하는 끈기를 가진 기란님은 앞으로 개발자로서 잘 성장할 것이라고 믿습니다. 성장 가능성이 넘치는 개발자, 기란님을 추천합니다.';
  } else {
    LangSecondBtn.innerHTML = '한국어로 보기';
    Testi2.innerHTML = 'I think that a person who has good questioning skill can be a good developer. Gilan is a good questioner. Before asking a question, she tries as many different things as she can to figure out a problem, and then ask someone for feedbacks. Gilan, who is curious about problems and has the perseverance to solve them, I believe that she will be a fast growing developer in the future. I recommend Gilan, a developer full of growth potential.';
  }
});
