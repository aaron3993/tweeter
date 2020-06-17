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
    <p>${tweet.created_at}</p>
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
    // $("#error").slideDown();
    $("#error").text("The input is empty")
    return false;
  } else if (tweetValue.length > 140) {
    $("#error").text("You have exceed the maximum character count")
    return false;
  }
  return true;
};

const loadTweets = () => {
  console.log("Button clicked, performing ajax call...");
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON",
  }).then(function (tweets) {
    console.log("Success: ", tweets);
    renderTweets(tweets);
  });
};

$(document).ready(function () {
  $("#add-tweet").on("submit", function (event) {
    event.preventDefault();
    if (validation()) {
      $.ajax({
        url: "/tweets",
        data: $(this).serialize(),
        method: "POST",
      }).then((response) => {
        console.log("response");
        loadTweets();
      });
    }
  });
  loadTweets();
});
