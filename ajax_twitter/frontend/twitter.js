const FollowToggle = require('./follow_toggle');
const UserSearch = require('./users_search')

$(() => {
  $('.follow-toggle').each((idx,el) => {
    new FollowToggle($(el));
  })
  
  
  $('.users').children().each((idx, el) => {
    new UserSearch($(el));
  })
})



