$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<div class="message">
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
});