$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<div class="message" data-id="${ message.id }">
                  <div class="upper-info">
                    <p class="upper-info__user">${message.user_name}</p>
                    <p class="upper-info__date">${message.created_at}</p>
                  </div>`
    if(message.content != ""){
      var html = html + `<p class="message__text">${message.content}</p>`
    }
    if(message.image_url != null){
      var html = html + `<img src=${message.image_url}>`
    }
    var html = html + `</div>`
    return html;
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージの保存に失敗しました');
    })
    .always(() => {
      $('.form__submit').removeAttr('disabled');
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("id");
    var url = `/groups/${ group_id }/api/messages`;
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML  = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
      });
      $(".messages").append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
  };

  setInterval(reloadMessages, 5000);
});