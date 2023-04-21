var height = Math.round($('#Streekbierenboekje').offset().top);

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > height) {
    $('.c-button_floating').fadeOut();
  } else {
    $('.c-button_floating').fadeIn();
  }
});


function scrollToSection() {
  // Scroll to top logic
  var rootElement = document.documentElement
  rootElement.scrollTo({
    top: height,
    behavior: "smooth"
  })
}

const init = () => {
  height = Math.round($('#Streekbierenboekje').offset().top);
	var scrollToSectionBtn = document.getElementById("c-button_section")
  scrollToSectionBtn.addEventListener("click", scrollToSection)
};

document.addEventListener('DOMContentLoaded', function () {
  // console.log("DOM content Loaded");
init();
});