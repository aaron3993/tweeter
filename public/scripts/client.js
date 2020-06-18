/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  let $tweet = $(`<article class="tweet">
  <header>
    <div class="profile-display">
      <img src=${tweet.user.avatars}>
      <h4>${tweet.user.name}</h4>
    </div>
    <div class="profile">${tweet.user.handle}</div>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <p>${moment(tweet.created_at, "").fromNow()}</p>
    <div class="logos">
      <i class="fa fa-flag"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </div>
  </footer>
</article>`);
  return $tweet;
};

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(".tweets").prepend(createTweetElement(tweet));
    console.log(createTweetElement(tweet));
  }
};

const validation = () => {
  const tweetValue = $("#tweet-text").val();
  if (tweetValue === "" || tweetValue === null) {
    $("#error-message").text("The input is empty")
    $("#error").slideDown();
    return false;
  } else if (tweetValue.length > 140) {
    $("#error").slideDown();
    $("#error-message").text("You have exceed the maximum character count")
    return false;
  }
  return true;
};

const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON",
  }).then(function(response) {
    $(".tweets").empty()
    renderTweets(response);
  });
};

$(document).ready(function () {
  // Toggle form
  $(".toggle-button").click(function() {
    // alert('hi')
    $(".form-hidden").slideDown();
  })

  // POST tweets to server
  $("#add-tweet").on("submit", function (event) {
    event.preventDefault();
      if (validation()) {
        $("#error").slideUp();
      $.ajax({
        url: "/tweets",
        data: $(this).serialize(),
        method: "POST",
      }).then((response) => {
        loadTweets();
      });
    }
  });
  loadTweets();
});
