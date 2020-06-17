/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = tweet => {
  let $tweet = $(`<article class="tweet">
  <header>
    <div class="profile-display">
      <img src=${tweet.user.avatars}>
      <h4>${tweet.user.name}</h4>
    </div>
    <div class="profile">${tweet.user.handle}</div>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <p>${tweet.created_at}</p>
    <div class="logos">
      <i class="fa fa-flag"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </div>
  </footer>
</article>`)
return $tweet
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    console.log(createTweetElement(tweet))
    $('.tweets').append(createTweetElement(tweet))
  }
}

$(document).ready(function() {
  $('#add-tweet').on('submit', function(event) {
    console.log('test')
    event.preventDefault()
    $.ajax({
      url: '/tweets',
      data: $(this).serialize(),
      method: 'POST'})
      // or .then
    .done(response => {
      console.log('response')
    })
  })
  const loadTweets = function() {
    $('#add-tweet').on('submit', function () {
      console.log('Button clicked, performing ajax call...');
      $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets)
        console.log($('#text-tweet'.value).length)
      });
    });
  };
  // if ('#text-tweet'.value)
  loadTweets()
})
