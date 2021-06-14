global.$=global.jQuery=require('jquery');
// require('bootstrap/dist/js/bootstrap');
require('../templates/dashboard/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js');
require('../templates/dashboard/AdminLTE/dist/js/adminlte');
require('../templates/dashboard/AdminLTE/dist/js/demo');
require('../templates/dashboard/AdminLTE/plugins/summernote/summernote');
// require('moment/dist/moment');
// require('../templates/dashboard/AdminLTE/plugins/daterangepicker/daterangepicker');
require("../plugins/jQuery.filer/js/jquery.filer");
require("../plugins/scorllbar/js/OverlayScrollbars.js");
require("../plugins/scorllbar/js/OverlayScrollbars.js");
// global.annyang = require("../plugins/annyang/annyang.min.js");
require('lightbox2/dist/js/lightbox.min');
require('datatables.net-dt/js/dataTables.dataTables.min');
require('../plugins/Thumbnail-Generator/jquery-thumbnail-cut');
global.countapi = require('countapi-js');
$(function () {
    //Add text editor
    $('.summernote').summernote({
        // height: 150,
        minHeight: 150,
        maxHeight: 600,
    });
});

function createDraftElement(){
    $(this).parent().find('.for_draft').html('<input name="isDraft" value="yes">');
    $('#mail_form').submit();
}
$('#draft').on('click',createDraftElement);

$(document).ready(function() {
    $('#filer_input').filer({
        showThumbs: true,
        addMore: true,
        allowDuplicates: false
    });
});

setTimeout(() =>{
    $('.alert').slideUp();
    },4000);

  $(".delete-record-form").prepend('<div class = "delete-method"></div>');
  $(".btn-delete").one( "click", function() {
    $(".delete-record-form").prepend('<input type="hidden" name="_method" value="delete">');
  });
/* for delete action in admin  panel */
  $('.delete-btn').click(function (e) {
    e.preventDefault();
    var confirmed = confirm("Are you sure you want to delete this data?");
    if(confirmed){
        $(this).parent().find('form').submit();
    }
    });

/* for deleting mails */
  $('.btn-delete').on('click',function(e){
    e.preventDefault();
    var arr = $('.delete-record-form').serialize().toString();
    if(arr.indexOf("del_record") < 0){
        e.preventDefault();
        play("You must select atleast one mail.");
        jsError("You must select atleast one mail.");
    }else{
        if($(this).get(0).hasAttribute("data-system_click")){
          // var play_status = '';
          // play_status = play("Are you sure you want to delete ?");
          playWithParam("Are you sure you want to delete ?",{onstart:voiceStartCallback});
          // if(play_status != null){
            function voiceStartCallback(){
              if(annyang) {
                var commands = {
                  'yes *tag': function() {
                    $('.delete-record-form').submit();
                  }
                };
                annyang.addCommands(commands);
                annyang.start();
              }
            }
/*            if(annyang) {
              var commands = {
                'yes *tag': function() {
                  var something = (function() {
                      var executed = false;
                      return function() {
                        if (!executed) {
                            executed = true;
                            $('.delete-record-form').submit();
                        }
                      };
                  })();
                  something();
                }
              };
              annyang.addCommands(commands);
              annyang.start();
            }*/
          // }
        }else{
            var confirmed = confirm("Are you sure you want to delete.");
            if(confirmed){
                $('.delete-record-form').submit();
            }
        }
    }
  });

/* for replying mails */
  $('.btn-main-reply').on('click',function(e){
    e.preventDefault();
    if($('.mailbox-messages').find('input[type=checkbox]:checked').length !== 1){
        play("You must select at least and at most one mail");
        jsError("You must select at least and at most one mail");
    }else{
        var mail_id = $('.mailbox-messages').find('input[type=checkbox]:checked').data('mail_id');
        var mail_type = $('.mailbox-messages').find('input[type=checkbox]:checked').data('mail_type');
        var route = '/mail/'+mail_id+'/'+mail_type+'/reply';
        // $(this).attr('href',route);
        window.location.href = route;
        // $(this).click();
    }
  });

/*
$(".inbox_not").on('click', function(e) {
  e.preventDefault();
  var inbox_not_id = $(this).data('inbox_not_id');
  var inbox_id = $(this).data('inbox_id');
  var route = "/mail/inbox/"+inbox_id;
  $.ajax({
    url: "/mail/inbox/"+inbox_id,
    type: "get",
    datatype: "json",
    data: {
      'inbox_not_id': inbox_not_id,
    },
    success: function(response){
      if(typeof(response) != "object"){
        response = JSON.parse(response);
      }
      if(response.status){
        // if(response.data[0]){
          $(this).attr('href',route);
          window.location.href = route;
          $(this).click();
        // }
      }
    }
  });
});*/


 $('.nav_more_btn').on('click',function(e){
    $('.to_be_toggle').toggleClass('d-none');
 });

   $('.btn-read-delete').on('click',function(e){
    e.preventDefault();
    var confirmed = confirm("Are you sure you want to delete this email.");
    if(confirmed){
        $('#delete-read-form').submit();
    }
  });

  /* for refreshing the page content */
$('.fa-sync-alt').on('click',function(e){
        window.location.reload(true);
});


/* document.addEventListener("DOMContentLoaded", function() {
    OverlayScrollbars(document.querySelectorAll("body"), { });
}); */
global.scroll = function(){
    OverlayScrollbars(document.querySelectorAll("body"), { });
    // OverlayScrollbars(document.getElementsByClassName("sidebar"), { });
}
scroll();

/* for playing or speakint text using google transalte api */
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

/* for playing or speakint text using ResponsiveVoice js */
global.play = function(txt){
  responsiveVoice.clickEvent();
  responsiveVoice.setTextReplacements([{
      searchvalue: "@gmail.com",
      newvalue: "at the rate gmail dot com"
  }]);
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.speak(txt);
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


/* for displaying errors using javascript */
global.jsError = function(txt){
    $(".js-error").html('');
    $(".js-error").css('display','block');
    setTimeout(() => {
        $(".js-error").slideUp();
    },4000);
    $(".js-error").append('<button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button>'+txt);

}

/* for converting one to 1 like upto 5 , it can be used like voice command
    "delete first mail or select first mail"
 */
global.wordToDigit = function wordToDigit(word){
    var words = ['first','second','third','fourth','fifth'];
    var digits = [1,2,3,4,5];
    var pos =  words.indexOf(word);
    return digits[pos];
}


$(function () {
    //Enable check and uncheck all functionality
    $('.checkbox-toggle').click(function () {
        var clicks = $(this).data('clicks')
        if (clicks) {
            //Uncheck all checkboxes
            $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false)
            $('.checkbox-toggle .far.fa-check-square').removeClass('fa-check-square').addClass('fa-square')
        } else {
            //Check all checkboxes
            $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true)
            $('.checkbox-toggle .far.fa-square').removeClass('fa-square').addClass('fa-check-square')
        }
        $(this).data('clicks', !clicks)
    })

    //Handle starring for font awesome
    $('.mailbox-star').click(function (e) {
        e.preventDefault()
        //detect type
        var $this = $(this).find('a > i')
        var fa    = $this.hasClass('fa')

        //Switch states
        if (fa) {
            $this.toggleClass('fa-star')
            $this.toggleClass('fa-star-o')
        }
    })
});


/* for printing specific page of content. it used for printing email */
global.printContent = function printContent(el){
    printDiv = "."+el; // id of the div you want to print
    $("*").addClass("no-print");
    $(printDiv+" *").removeClass("no-print");
    $(printDiv).removeClass("no-print");

    parent =  $(printDiv).parent();
    while($(parent).length)
    {
        $(parent).removeClass("no-print");
        parent =  $(parent).parent();
    }
    window.print();

}
