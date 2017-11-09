const APIUtil = require('./api_util')
const FollowToggle = require('./follow_toggle');


class UsersSearch {
  constructor ($el) {
    this.$el = $el;
    this.$ul = $('.users')
    this.$input = $('.search-input')
    this.handleInput();
  }
  
  handleInput(){
    this.$input.keyup((el) => {
      const that = this;
      var queryVal = this.$input.val() + String.fromCharCode(el.charCode);
      // console.log(queryVal);
      
      if (queryVal !== "\u0000") {
        APIUtil.searchUsers(queryVal,(res) => {
          // console.log(res);
          that.$ul.empty();
          res.forEach((userObj) => {
            let $li = $('<li></li>');
            $li.text(`@${userObj.username}`)
            that.$ul.append($li);
            // debugger;
            // let $button = $('<button></button>')
            // debugger
            // $button.data('user-id', userObj.id)
            // $button.data('initial-follow-state', userObj.followed)
            // new FollowToggle($button)
            // $li.append($button)
            // $button.data('initial-follow-state')
          })
        })
      } else {
        that.$ul.empty();
        
      }
    
    })
  }
}

module.exports = UsersSearch;