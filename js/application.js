

$(function () {
  var setBackground = function () {
    var width = $('body').innerWidth();
    var height = $('body').innerHeight();
    var landscape = (width > height);
    var pics = landscape ? 26 : 30;
    var pic = Math.ceil(Math.random() * pics);
    var prefix = (pic < 10) ? '0' : '';
    var folder;

    if (landscape) {
      if (height > 1200) folder = 'landscape';
      else if (height > 1050) folder = 'x1200';
      else if (height > 800) folder = 'x1050';
      else if (height > 640) folder = 'x800';
      else if (height > 480) folder = 'x640';
      else if (height > 320) folder = 'x480';
      else if (height > 240) folder = 'x320';
      else folder = 'x240';
    } else {
      if (width > 1280) folder = 'portrait';
      else if (width > 800) folder = '1280x';
      else if (width > 640) folder = '800x';
      else if (width > 480) folder = '640x';
      else if (width > 320) folder = '480x';
      else if (width > 240) folder = '320x';
      else folder = '240x';
    }

    $('body').attr('style','background: black url("/images/backgrounds/' + folder + '/' + prefix + pic + '.jpg") no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;');
  };

  setBackground();

  $(window).on('resize', setBackground);

  var showSidebar = function () {
    $('#sidebar').fadeIn(500);
    if ($(window).width() > 719) {
      $('#loweye').hide();
      $('#sidebar nav').show();
    } else {
      $('#loweye').fadeIn(500);
      $('#sidebar nav').hide();
    }
  };

  var hideSidebar = function () {
    $('#loweye').hide();
    if ($(window).width() > 719) {
      $('#sidebar').fadeOut(500);
    } else {
      $('#sidebar').hide();
    }
  };

  var closeZigZagGallery = function () {
    if ($(window).width() > 719) { showSidebar(); }
  };

  var openZigZagGallery = function (e) {
    var width = $(window).width() - 80;
    var height = $(window).height() - 80;

    $(".slideshow").colorbox({
      rel: 'slideshow',
      slideshow: true,
      maxHeight: height,
      maxWidth: width,
      slideshowStart: 'start',
      slideshowStop: 'stop!',
      slideshowSpeed: 3000,
      opacity: 0.7,
      current: "{current} of {total} by <a href='http://amandaringstad.com'>Amanda Ringstad</a>",
      onCleanup: closeZigZagGallery
    }).eq(0).click();
  };

  var changePage = function (rel) {
    $.colorbox.close();

    switch (rel) {
    case 'gallery':
      hideSidebar();
      openZigZagGallery();
      $('#map').css('left', -5000);
      $('.maplink').removeClass('invert');
      $('#info').hide();
      $('.infolink').removeClass('invert');
      $('.gallerylink').addClass('invert');
      $('#gallery').fadeIn(500);
      break;
    case 'map':
      hideSidebar();
      $('#info').hide();
      $('#gallery').hide();
      $('.infolink').removeClass('invert');
      $('.gallerylink').removeClass('invert');
      $('.maplink').addClass('invert');
      $('#navtop').show();
      $('#map').hide();
      $('#map').css('left', 0);
      $('#map').fadeIn(500);
      google.maps.event.trigger(map, 'resize');
      break;
    default:
      showSidebar();
      $('#map').css('left', -5000);
      $('#gallery').hide();
      $('#info').fadeIn(500);
      $('.infolink').addClass('invert');
      $('.gallerylink').removeClass('invert');
      $('.maplink').removeClass('invert');
    }
  };

  $('.nav').click(function (e) {
    changePage(e.currentTarget.rel, e.currentTarget);
    // e.preventDefault();
  });

  $('#return').click(function (e) {
    changePage();
  });

  initialize();

});