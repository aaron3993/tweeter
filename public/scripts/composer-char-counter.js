$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const counter = $(this).closest('form').find('.counter')
    const count = 140 - this.value.length
    counter.val(count)
    switch (true) {
      case count < 0:
        counter.addClass('red')

      case count > 0:
        counter.removeClass('red')
      // case count === 140:
      //   counter.addClass('button:disabled')
    }
    // if (count < 0) {
      
    // } else {
      
    // }
  })
});