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