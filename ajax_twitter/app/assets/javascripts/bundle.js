/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UserSearch = __webpack_require__(3)

$(() => {
  $('.follow-toggle').each((idx,el) => {
    new FollowToggle($(el));
  })
  
  
  $('.users').children().each((idx, el) => {
    new UserSearch($(el));
  })
})





/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)


class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = (this.$el.data('user-id') || options.userId);
    this.followState = (this.$el.data('initial-follow-state') || options.followState);
    this.render();
    // this.handleClick();
    this.$el.on('click', this.handleClick.bind(this));
  }
  
  render() {
    if (this.followState === "followed") {
      this.$el.text("unfollow")
    } else {
      this.$el.text("follow")
    }
  }
  
  
  successCallback(followState) {
    return () => {
      this.followState = followState;
      this.$el.prop("disabled", false);
      this.render();
    }

  }
  
  handleClick(event) {
    
      event.preventDefault();
      if (this.followState === "followed") {  // request to unfollow, destroy
        this.$el.text("unfollowing...");
        this.$el.prop("disabled", true);
        APIUtil.followUser(this.userId)
            .then(this.successCallback("unfollowed"))
        
        // hard code successCallback into then (   
        //   () => {
        //   this.followState = "unfollowed";
        //   this.$el.prop("disabled", false);
        //   this.render();
        // }) ;
        
        // hard code api_util
        // $.ajax({
        //   url: `/users/${this.userId}/follow`,
        //   method: "DELETE",
        //   dataType: 'json'
        // })
      } else {                                      // request to follow, create
        this.$el.text("following...");
        this.$el.prop("disabled", true);
        APIUtil.unfollowUser(this.userId)
            .then(this.successCallback("followed"))
          
        // hard code successCallback into then ( 
        //   () => {
        //   this.followState = "followed";
        //   this.$el.prop("disabled", false);
        //   this.render()
        // });
        
        // hard code api_util
        // $.ajax({
        //   url: `/users/${this.userId}/follow`,
        //   method: 'POST',
        //   dataType: 'json'
        // })
      }
    // })
  }
  
}

module.exports = FollowToggle;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: "DELETE",
      dataType: 'json'
    })
  },

  unfollowUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: 'json'
    })
  },
  
  searchUsers: function(queryVal, success1) {
    return $.ajax({
      url: '/users/search',
      method: 'GET',
      dataType: 'json',
      data: {query: queryVal},
      success: success1
    })
  }
  
  
}

module.exports = APIUtil;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)
const FollowToggle = __webpack_require__(1);


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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map