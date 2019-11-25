/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navBarList = document.querySelector('#navbar__list');
const sections = document.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//get array of nav links
function getNavbarLinkArray() {
  'use strict';
  const navlinks = document.querySelectorAll('.nav-link');
  const navlinksArray = [].slice.call(navlinks);
  return navlinksArray;
}


//isInViewport is inspired from "https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/"
function isInViewport (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildTheNav () {
	'use strict';
	 for (var i = 0; i < sections.length; i++) {

	 	const  navBarItems = document.createElement('li');
	 	navBarList.appendChild(navBarItems);

	 	const navBarLinks = document.createElement("a");	 	
	 	let navBarTitle = sections[i].getAttribute('data-nav');
	 	let sectionID = '#' + sections[i].getAttribute("id");

	 	navBarItems.appendChild(navBarLinks);
	 	navBarLinks.setAttribute("href", sectionID);
	 	navBarLinks.classList.add("nav-link");

	 	navBarLinks.appendChild(document.createTextNode(navBarTitle));

	 }
}

// Add class 'active' to section when near top of viewport

function addActiveClass() {
  'use strict';

   document.addEventListener('scroll', function(event) {

   	event.preventDefault();

   	for (var i = 0; i < sections.length; i++) {

   		if(isInViewport(sections[i]) === true) {
   			sections[i].classList.add("section-active-class");
   		} else {
   		    sections[i].classList.remove("section-active-class");
   		} 
	 }	 
  });
}



//Add an active state to your navigation items when a section is in the viewport.
function addNavitemActiveClass() {

  'use strict';
	const navlist = document.getElementsByTagName('li');

   document.addEventListener('scroll', function(event) {

   	event.preventDefault();

   	for (var i = 0; i < sections.length; i++) {

   		if(isInViewport(sections[i]) === true) {
   			navlist[i].classList.add("navlink-active-class")
   		} else {
   			navlist[i].classList.remove("navlink-active-class")
   		} 
	 }	 
  });
}


// Scroll to anchor ID using scrollTO event
function addNavClickHandler(navlink) {
  navlink.addEventListener('click', function (event) {

    event.preventDefault();

    sectionID = navlink.getAttribute("href").slice(1);
    document.getElementById(sectionID).scrollIntoView({
              behavior: 'smooth'
    });

  });
}


/**
 * End Main Functions
 

 * Begin Events
 * 
*/

//initializevents
function initializeEvents() {
  'use strict';
  
  // Build menu 
  buildTheNav()

  //Scroll to section on link click
  const navlinks = getNavbarLinkArray();
  navlinks.forEach(addNavClickHandler);

  //Set sections as active
  addActiveClass()

  //set navlinks as active
  addNavitemActiveClass()
}

document.addEventListener('DOMContentLoaded', initializeEvents);

