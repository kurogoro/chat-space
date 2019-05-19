$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");
  var preword;

  function appendSearchUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendMember(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user.id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user.id }'>
                  <p class='chat-group-user__name'>${ user.name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }

  function getAddUser(element) {
    var user = {
      id : element.data("user-id"),
      name : element.data("user-name")
    };
    return user;
  }

  function getRemoveMember(element) {
    var user = {
      id : element.siblings('input').prop('value'),
      name : element.siblings('p').text()
    };
    return user;
  }

  function getMemberIds() {
    var member_ids = [];
    member_list.children(".chat-group-user").each(function() {
      var user_id = $(this).children("input").prop("value");
      member_ids.push(user_id);
    });
    return member_ids;
  }

  function searchUser(eventClick) {
    var input = $("#user-search-field").val().replace(/\s+/g, "");
    var member_ids = getMemberIds();

    if (input !== preword || eventClick === true) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, member_ids: member_ids },
        dataType: 'json'
      })

      .done(function(users) {
        search_list.empty();
        if  (users.length !== 0 && input.length !== 0) {
          users.forEach(function(user){
            appendSearchUser(user);
          });
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    }
    preword = input;
  }

  $("#user-search-field").on("keyup", function() {
    searchUser(false);
  });

  search_list.on("click", ".user-search-add", function() {
    var user = getAddUser($(this));
    $(`[data-user-id="${ user.id }"]`).parent().remove();
    appendMember(user);
  });

  member_list.on("click", ".user-search-remove", function() {
    var user = getRemoveMember($(this));
    $(`#chat-group-user-${ user.id }`).remove();
    searchUser(true);
  });
});