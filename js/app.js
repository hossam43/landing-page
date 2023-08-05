//Easy Console
function p(print) {
  console.log(print);
}

const ul = document.getElementById("navbar__list");
const sections = document.querySelectorAll("h2");
const sectionsArray = Array.prototype.slice.call(sections);
// p(sections);
const fragment = document.createDocumentFragment();
// p(fragment);
let counter = 1;
//p(`First time Counter ${counter}`);
sectionsArray.forEach((element) => {
  // p(element);
  const liTage = document.createElement("li");
  const aTag = document.createElement("a");
  let aTagName = element.textContent;
  //p(aTagName);
  aTag.textContent = aTagName;
  //p(aTag);
  //make it apply for all sections
  aTag.setAttribute("data-nav", `section${counter}`);

  aTag.setAttribute("href", `#section${counter}`);
  aTag.setAttribute("class", "menu__link");
  liTage.insertAdjacentElement("afterbegin", aTag);
  fragment.append(liTage);
  counter++;
  // p(`${counter},after the ++ counter`);
});
ul.appendChild(fragment);

//ADD SMOOTH SCROLL WHEN SECTION CLICKED

//select the a tag
const smoothLinks = document.querySelectorAll("li a");
//converte the node list into an array
const smoothLinksArray = Array.prototype.slice.call(smoothLinks);
//get each a element individually by looping over the an array
for (let smoothLink of smoothLinksArray) {
  smoothLink.addEventListener("click", (e) => {
    e.preventDefault();
    //onClick return the section hash using the hash property
    let link = smoothLink.hash;
    sec = document.querySelector(link);
    sec.scrollIntoView({
      behavior: "smooth",
    });
  });
}

let allSections = document.querySelectorAll("section");
let activeClass = document.getElementsByClassName("your-active-class");

//observer.observe(sectionOne);
const option = {
  root: null,
  //when 60% or more of the section is in the viewPort add the active calss
  threshold: 0.6,
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    // p(entry.target.id);
    // p(entry.boundingClientRect.width);

    // aTag  data-nav = entry.target.id (the value of the section) --> now you are standing on viewPort Section
    //use the viewed section Attrbuites to select the Element you want to change it's style
    let activeATag = ul.querySelector(`[data-nav=${entry.target.id}]`);

    if (entry.isIntersecting) {
      entry.target.classList.add("your-active-class");
      activeATag.classList.add("highlighted");
    } else {
      entry.target.classList.remove("your-active-class");
      activeATag.classList.remove("highlighted");
    }
  });
}, option);

//to apply the observer over all sections
allSections.forEach((element) => {
  observer.observe(element);
});

//Up button
let upButton = document.querySelector(".up");

window.onscroll = function () {
  this.scrollY >= 1000
    ? upButton.classList.add("show")
    : upButton.classList.remove("show");
};

upButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Add background to the nav when it scroll down

let header = document.querySelector(".page__header"); // Select the header element

window.onscroll = function () {
  this.scrollY >= 600
    ? header.classList.add("scroll-effect")
    : header.classList.remove("scroll-effect");
};
