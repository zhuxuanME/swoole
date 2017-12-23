$(function() {
  var $dialogContent = $('.dialog-content'),
      $contnetBox = $('.content-box');
  // 发送消息
  $('.input-box').on('keypress',function(e) {
    var e = e || window.event;
    var tpl = `<div class="msg-box clearfix">
        <div class="avatar pull-right">
          <img src="./images/cat.png" alt="用户头像" width="30" height="30" />
        </div>
        <p class="msg-content pull-right">{{msg}}</p>
      </div>`;
    var msgContent = $(this).val().trim();
    if (e.keyCode === 13 && !e.ctrlKey) {
      // 去除 enter 后的换行
      e.preventDefault()
      if(msgContent.length === 0) {
        alert('你输入的消息不能为空!!!');
        return;
      }
      // alert(msgContent)
      tpl = tpl.replace(/{{\s*msg\s*}}/,msgContent);
      $('.msg-box').last().after(tpl);
      $(this).val('');
      var scrollX = $contnetBox.height() + 40 + 2 - $dialogContent.height(); // 2 header inputbox border
      $dialogContent.scrollTop(scrollX);
    }

  });
  // 拖动窗口
  var down = false;
  $('.dialog-header').on('mousedown',function(e) {
    var e = e || window.event,
        $dialogWrapper = $('.dialog-wrapper');
    down = true;
    var clickX = e.pageX,
        clickY = e.pageY,
        initX = $dialogWrapper.css("left"),
        initY = $dialogWrapper.css("top"),
        outerX = window.innerWidth- $dialogWrapper.outerWidth(),
        outerY = window.innerHeight- $dialogWrapper.outerHeight();
      $(this).on('mousemove',function(e) {
        if(!down) return;
      var e = e || window.event;
      var tempX = parseInt(e.pageX) - parseInt(clickX) + parseInt(initX),
          tempY = parseInt(e.pageY) - parseInt(clickY) + parseInt(initY);

      tempX = tempX <= 0 ? 0 : tempX;
      tempX = tempX - outerX >= 0 ? outerX : tempX;
      tempY = tempY <= 0 ? 0 : tempY;
      tempY = tempY - outerY>=  0? outerY : tempY;


      $dialogWrapper.css("left", tempX).css("top", tempY);
    })
  })
  $(document).on('mouseup',function() {
    down = false;
  });
  // 关闭窗口
  $('.close').click(function() {
    $('.dialog-wrapper').fadeOut().delay(1000).fadeIn()
  });
});