global.$=global.jQuery=require('jquery');
// require('./bootstrap');
require("../templates/front/Bethany/assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
require("../templates/front/Bethany/assets/vendor/jquery.easing/jquery.easing.min.js");
require("../templates/front/Bethany/assets/vendor/php-email-form/validate.js");
require("../templates/front/Bethany/assets/vendor/waypoints/jquery.waypoints.min.js");
require("../templates/front/Bethany/assets/vendor/counterup/counterup.min.js");
global.isotope = require("../templates/front/Bethany/assets/vendor/isotope-layout/isotope.pkgd.min.js");
// global.isotope=require("isotope-layout/dist/isotope.pkgd.min");
require("../templates/front/Bethany/assets/vendor/venobox/venobox.min.js");
require("../templates/front/Bethany/assets/vendor/owl.carousel/owl.carousel.min.js");
global.AOS=require("../templates/front/Bethany/assets/vendor/aos/aos.js");
require("../templates/front/Bethany/assets/js/main.js");
require("../templates/front/Bethany/Login_v1/vendor/select2/select2.min.js");
require("../templates/front/Bethany/Login_v1/vendor/tilt/tilt.jquery.min.js");
global.rateYo=require('rateyo/lib/cjs/rateyo.js');

// global.annyang = require("../plugins/annyang/annyang.min.js");
$('.js-tilt').tilt({
	scale: 1.1
});
require("../templates/front/Bethany/Login_v1/js/main.js");

setTimeout(() =>{
    $('.alert').slideUp();
    },3000);

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
});

