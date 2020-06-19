const characterCount = function() {
  $('#tweet-text').on('keyup', function() {
    const counter = $(this).closest('form').find('.counter')
    const count = 140 - this.value.length
    counter.val(count)
    if (count < 0) {
      counter.addClass('red')
    } else {
      counter.removeClass('red')
    }
  })
}

const toggleForm = () => {
  $(".toggle-button").click(function() {
    $(".form-hidden").slideToggle();
  })
}

const scroll = function() {
  $(window).on('scroll', function() {
    scrollPosition = $(this).scrollTop();
    if (scrollPosition > 0) {
      $('#scroll-up').fadeIn()
      $('.toggle-button').animate({opacity: 0}, 0)
    } else {
      $('#scroll-up').fadeOut()
      $('.toggle-button').animate({opacity: 1})
    }
  });
}

const scrollToForm = function() {
  $("#scroll-up").click(function() {
      $('html, body').animate({
          scrollTop: $("body")
      }, 0);
      $(".form-hidden").slideDown();
      $("#tweet-text").focus()
  });
}

$(document).ready(function() {
  toggleForm();
  characterCount()
  scroll()
  scrollToForm()
});