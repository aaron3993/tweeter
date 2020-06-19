const characterCount = function() {
  $('#tweet-text').on('keyup', function() {
    const counter = $(this).closest('form').find('.counter');
    const count = 140 - this.value.length;
    counter.val(count);
    if (count < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
};

$(document).ready(function() {
  characterCount();
});