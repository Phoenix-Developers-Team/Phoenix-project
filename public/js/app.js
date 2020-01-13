// Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 100 && $(window).width() > 960) {
        $('.main_header').addClass('sticky');
    } else {
        $('.main_header').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_header').hasClass('open-nav')) {
        $('.main_header').removeClass('open-nav');
    } else {
        $('.main_header').addClass('open-nav');
    }
});

$('.main_header li a').click(function() {
    if ($('.main_header').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_header').removeClass('open-nav');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.headerX').hasClass('open-nav')) {
        $('.headerX').removeClass('open-nav');
    } else {
        $('.headerX').addClass('open-nav');
    }
});

$('.headerX li a').click(function() {
    if ($('.headerX').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.headerX').removeClass('open-nav');
    }
});

// navigation scroll
$('nav a').click(function(event) {
    var id = $(this).attr("href");
    var offset = 0;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});
/* Scroll-to-Top Button */
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
});

$('.scrollup').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});
/* WORK IN PROGRESS
   NAVIGATION ACTIVE STATE IN SECTION AREA
*/
var sections = $('section'), nav = $('nav'), nav_height = nav.outerHeight();
 
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
 
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
 
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
 
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

/////////////////slideshow////////////////////

const items = document.querySelectorAll('.item'),
controls = document.querySelectorAll('.control'),
headerItems = document.querySelectorAll('.item-header'),
descriptionItems = document.querySelectorAll('.item-description'),
activeDelay = .76,
interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', e => {slider.clickedControl(e);}));
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: () => {// Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: e => {// Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
    dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => {
      if (index === dataIndex) {// Add active class to corresponding slide
        item.classList.add('active');
      }
    });
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => {// Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: items => {// Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;

    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
      delay;

      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => {// iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      });
    });
  } };


let intervalF = setInterval(slider.nextSlide, interval);
slider.init();

/////////////// sec04 images //////////////////////////
function openCity(cityName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(cityName).style.display = "block";
    elmnt.style.backgroundColor = color;
  
  }
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  //////////////