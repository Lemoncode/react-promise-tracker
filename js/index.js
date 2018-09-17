$(function () {
  $('#navigation').sidr({
    name: 'sidr-right',
    side: 'right',
  });
  $(document).on('click', ':not(#sidr-right)', function (event) {
    event.stopPropagation();
    $.sidr('close', 'sidr-right');
  });
});
