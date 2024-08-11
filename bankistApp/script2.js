'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
});


// event delegation
// 1. add event listener to common parent element
// 2. determine what element originated the event
// matching
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();
    if(e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});    }
});

// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
    // const clicked = e.target.parentElement;
    const clicked = e.target.closest('.operations__tab');  

    console.log(clicked); 
    
    if(!clicked) return;
    
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))
    
    clicked.classList.add('operations__tab--active');

    // active content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});



/////////////////////////////////////////////////
// PRACTICE 
const allbtns = document.getElementsByTagName('button');
const classbtn = document.getElementsByClassName('btn');

// creating and inserting
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = "We use cookied for improved functionality and analytics";
message.innerHTML = 'We use cookied for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
// mesaj header'ın üst kısmında görünür
header.prepend(message);
// alt kısmında görünür
// header.append(message);
// header.before(message);
// header.after(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
    // message.remove();
    message.parentElement.removeChild(message);
});

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// elemntin istenilen özelliğini basar
console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orengered');


const logo = document.querySelector('.nav__logo');
// logonun dosya konumunu basar
logo.getAttribute('src');






/////////////////////////////////////////////////
// PRACTICE

/* btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();
    // kaydıracağımız yerin kordinat bilgileri
    console.log(s1coords);
    // btnScrollTo kordinat bilgileri
    // console.log(e.target.getBoundingClientRect());

    // console.log("height/width viewport", document.documentElement.clientHeight,
    // document.documentElement.clientWidth);

    // scrolling
    // window.pageXOffset, window.pageYOffset 'leri butona basıldığında tekrar yukarı kayıyordu
    // bunu önlemek için yazdık
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset, 
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'});
    
    // modern browser'larda calısır
    section1.scrollIntoView({behavior: 'smooth'});
}); */


/////////////////////////////////////////////////
// PRACTICE

// random renkler üretmek için
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;


// document.querySelector('.nav__link').addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();

    // features'a basınca diğer linkler ve nav'ın da rengi değişiyor
    // bunu önlemek için;
    // e.stopPropagation()
// });
// document
//     .querySelector('.nav__links')
//     .addEventListener('click', function(e) {
//         this.style.backgroundColor = randomColor();
//     });

// document
    // .querySelector('.nav')
    // .addEventListener('click', function(e) {});




/////////////////////////////////////////////////
// PRACTICE (DOM traversing)
const h1 = document.querySelector('h1');
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.parentNode);

// closest() querySelector, querySelectorAll gibi elemente erişmemizi sağlar
// özellikle evetnt delegationda kullanacağız
// h1.closest('.header').style.backgroundColor = 'vaf (--gradient-secondary)';

// console.log(h1.nextElementSibling);
// console.log(h1.previousElementSibling);

// console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el) {
    if(el!==h1) el.style.transform = 'scale(0.5)';
});  

