global.$=global.jQuery=require('jquery');
require("../templates/front/Bethany/assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
require("../templates/front/Bethany/assets/vendor/jquery.easing/jquery.easing.min.js");
require("../templates/front/Bethany/assets/vendor/php-email-form/validate.js");
require("../templates/front/Bethany/assets/vendor/waypoints/jquery.waypoints.min.js");
require("../templates/front/Bethany/assets/vendor/counterup/counterup.min.js");
global.isotope=require("isotope-layout/dist/isotope.pkgd.min");
require("../templates/front/Bethany/assets/vendor/venobox/venobox.min.js");
require("../templates/front/Bethany/assets/vendor/owl.carousel/owl.carousel.min.js");
global.AOS=require("../templates/front/Bethany/assets/vendor/aos/aos.js");
require("../templates/front/Bethany/assets/js/main.js");
require("../templates/front/Bethany/Login_v1/vendor/select2/select2.min.js");
require("../templates/front/Bethany/Login_v1/vendor/tilt/tilt.jquery.min.js");
require("../plugins/scorllbar/js/OverlayScrollbars.js");
// import countapi from 'countapi-js';
global.countapi = require('countapi-js');

// global.rateYo=require('rateyo/lib/cjs/rateyo.js');

// global.annyang = require("../plugins/annyang/annyang.min.js");
$('.js-tilt').tilt({
	scale: 1.1
});
require("../templates/front/Bethany/Login_v1/js/main.js");

setTimeout(() =>{
    $('.alert').slideUp();
    },5000);

 $('#showPassword').on('click',function(e){

    if($(this).hasClass('fa-eye-slash')){

      $(this).removeClass('fa-eye-slash');

      $(this).addClass('fa-eye');

      $('#password').attr('type','text');

    }else{

      $(this).removeClass('fa-eye');

      $(this).addClass('fa-eye-slash');

      $('#password').attr('type','password');
    }
 });
/*
$(function () {

  $("#rateYo").rateYo({
    rating: 4,
    fullStar: true
  });

});

$(function () {
  $("#rateYo").rateYo().on("rateyo.change", function (e, data) {
    var rating = data.rating;
      $(this).next().val(rating);
  });
}); */

global.scroll = function(){
    OverlayScrollbars(document.querySelectorAll("body"), { });
}
scroll();

$("iframe").scrollTop(100);

global.getAudio = function (txt){
    jQuery.ajax({
      url: "/read-aloud",
      type: 'get',
      data: {
        txt
      },
      success: function (response) {
        if(typeof(response) != "object"){
          response = JSON.parse(response);
        }
        if(response.status){
          if(response.data){
            $('#player').html(response.data);
          }
        }
      }
    });
  }

  global.play = function(txt){
    responsiveVoice.clickEvent();
    responsiveVoice.setTextReplacements([{
      searchvalue: "@gmail.com",
      newvalue: "at the rate gmail dot com"
    }]);
    responsiveVoice.setDefaultVoice("US English Female");
    function EndCallback(){
      annyang.start();
    }
    function StartCallback(){
      annyang.abort();
    }
    responsiveVoice.speak(txt,"US English Female",{onstart: StartCallback, onend: EndCallback});
    console.clear();
  }

  global.offLinePlay = function(txt){
    responsiveVoice.clickEvent();
    responsiveVoice.setTextReplacements([{
        searchvalue: "@gmail.com",
        newvalue: "at the rate gmail dot com"
    }]);
    function EndCallback(){
        // annyang.start();
    }
    function StartCallback(){
      annyang.abort();
    }
    // var lang = window.navigator.languages ? window.navigator.languages[0] : null;
    // lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
    // var lang = "en-US";
    responsiveVoice.speak(txt,"US English Female",{onstart: StartCallback, onend: EndCallback});
    console.clear();
  }

  global.playWithLang = function(txt,lang = "US English Female"){
    responsiveVoice.clickEvent();
    responsiveVoice.setTextReplacements([{
        searchvalue: "@gmail.com",
        newvalue: "at the rate gmail dot com"
    }]);
    responsiveVoice.speak(txt,"US English Female");
  }

  global.playWithParam = function(txt,parameters = null){
    responsiveVoice.clickEvent();
    responsiveVoice.setTextReplacements([{
        searchvalue: "@gmail.com",
        newvalue: "at the rate gmail dot com"
    }]);
    lang = "US English Female";
    if(parameters !== null){
        responsiveVoice.speak(txt,lang,parameters);
    }else{
        responsiveVoice.speak(txt,lang);
    }
  }

  global.playWithLangParam = function(txt,lang = "US English Female",parameters = null){
    responsiveVoice.clickEvent();
    responsiveVoice.setTextReplacements([{
        searchvalue: "@gmail.com",
        newvalue: "at the rate gmail dot com"
    }]);
    if(parameters !== null){
        responsiveVoice.speak(txt,lang,parameters);
    }else{
        responsiveVoice.speak(txt,lang);
    }
  }


