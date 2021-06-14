    <footer class="main-footer py-4">
        <!-- <div class="float-right d-none d-sm-block">
            Developed By: <b>Ganesh Bhatta</b>
        </div> -->
        <div class="container py-2 justifiy-content-around">
            <div class="m-auto text-center text-black text-lg">
                <a href="{{ route('contact') }}" class="p-2 text-gray-dark" style = "font-size : 14px;"></i>Contact</a>
                <a href="{{ route('about') }}" class="p-2 text-gray-dark  " style = "font-size : 14px;"></i>About</a>
                <a href="{{ route('faq') }}" class="p-2 text-gray-dark" style = "font-size : 14px;">FAQs</i></a>
                <a href="#" class="p-2 text-gray-dark " style = "font-size : 14px;"></i>Terms</a>
                <a href="#" class="p-2 text-gray-dark " style = "font-size : 14px;"></i>Privacy</a>
                <a href="" class="p-2 text-gray-dark " style = "font-size : 14px;">Blog</a>
                <a href="{{ route('chatbot') }}" data-turbolinks="false" class="p-2 text-gray-dark" style = "font-size : 14px;">Chatbot</a>
                <a href="" class="p-2 text-gray-dark " style = "font-size : 14px;">Posts</a>
                <a href="{{ route('voiceChatbot') }}" class="p-2 {{(request()->getRequestUri() == '/voice_chatbot') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">Voice Chatbot</a>
                <a href="{{ route('team') }}" class="p-2 text-gray-dark " style = "font-size : 14px;">Team</a>
            </div>
        </div>
        <div class="text-center d-none d-sm-block">
            <strong>Copyright &copy; {{ date('Y') }} <a href="#">vbes.com</a>.</strong> All rights reserved.
        </div>
         <!-- <strong>Copyright &copy; {{ date('Y') }} <a href="#">vbes.com</a>.</strong> All rights reserved. -->
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
    <div id="sidebar-overlay"></div>
</div>
<div id="player" class=""></div>

<!-- ./wrapper -->

<!-- jQuery -->

@include('dashboard.partials.scripts')
<!-- <script src="{{ mix('js/app.js') }}"></script> -->
<script>
/* general purpose functions for frontend */
function fillFormField(wildcard,id){
        let get_elem = document.getElementById(id);
        get_elem.value = wildcard;
}
function resetFormField(id){
    let get_elem = document.getElementById(id);
    get_elem.value = '';
}
function readFormField(id){
    let get_elem = document.getElementById(id);
    play(get_elem.value);
}
function addCommands(command_list){
    for( var i = 0; i <= command_list.length -1; i++ ){
        annyang.addCommands(command_list[i]);
    }
}

function firstIntro(pageName){
    if("{{ is_connected() }}"){
        var path = "{{ request()->getRequestUri() }}";
        var path= path.split("/");
        if(((/^[1-9][0-9]*$/.test(path[path.length -1 ]))) == false){
            pageName = path[path.length-1];
            pageName = pageName.split("?");
            pageName = pageName[0];
            console.log(pageName);
        }else{
            pageName = path[path.length-2];
        }
        countapi.hit('vbes.test', pageName).then((result) => {
            let txt = "";
            if(result.value == 1){
                if(pageName == 'imp'){
                    txt = "You are in important label page";
                }else if((/^[1-9][0-9]*$/.test(path[path.length -1 ])) == true){
                    txt = "you are reading email in "+path[path.length-2]+" page";
                }
                else{
                    txt = "You are in "+pageName+" page";
                }
                play(txt);
            }
        });
    }
}

firstIntro();

if (annyang) {
    goToPageCommand = {
        'go to :tag (page)' : goToPage,'go :tag (page)' : goToPage
        ,'go to in :tag (page)' : goToPage
    }
    function goToPage(tag){
        play("sure, Going to "+tag);
        if(tag == 'important'){
            window.location = "/mail/imp";
        }else if(tag == 'draft' || tag == 'draught'){
            window.location = "/mail/draft";
        }else if(tag == 'trash'){
            window.location = "/mail/trash";
        }else if(tag == 'sent' || tag == 'cent' || tag == 'outbox'){
            window.location = "/mail/sent";
        }else if(tag == 'inbox'){
            window.location = "/mail/inbox";
        }else if(tag == 'back'){
            history.back();
        }else if(tag == 'dashboard'){
            window.location = "/dashboard";
        }else{
            window.location = "/mail/"+tag;
        }
    }

    listeningCommand = {
        'hey are you listening me' : listen,'are you listening me' : listen
    }
    function listen(){
        play("yes i am listening you. You can give me command");
    }

    goBackCommand = {
        'go back' : goBack,'go to previous (page)' : goBack
    }

    function goBack(){
        play("going to back");
        history.back();
    }

    whoAmICommand = {
        'who am i' : whoAmI,'what is my name' : whoAmI,
        'do you know me' : whoAmI,'can you tell me what is my name' : whoAmI,
        'please tell me my name' : whoAmI
    }
    function whoAmI(){
        let name = "{{ @(auth()->user()->name) }}";
        let txt = "";
        if(name != null){
            txt = "you are anonymous for me";
        }else{
            txt = "you are "+name;
        }
        play(txt);
    }

    whatTimeCommand = {
        'what time it is' : whatTime,'what is time now' : whatTime
    }

    function whatTime(){
        let txt = "{{ "it is ".date('H i  a') }}";
        play(txt);
    }

    pauseCommand = {
        'pause reading' : pause, 'pause playing the speech' : pause,
        'please pause reading' :  pause, 'please pause your speeach' : pause,
        'puase your speech' : pause
    }
    function pause() {
        play("pausing the reading");
      responsiveVoice.pause();
    }

    resumeCommand = {
        'resume reading' : resume, 'resume the speech' : resume,
        'please resume reading' :  resume, 'please resume your speeach' : resume,
        'resume your speech' : resume, 'resume speech' : resume
    }
    function resume() {
        play("resuming the reading");

      responsiveVoice.resume();
    }

    cancelCommand = {
        'cancel reading' : cancel, 'cancel the speech' : cancel,
        'please cancel reading' :  cancel, 'please cancel your speeach' : cancel,
        'cancel your speech' : cancel, 'cancel speech' : cancel
    }
    function cancel() {
        play("canceling the reading");

      responsiveVoice.cancel();
    }

    var whereAmICommand = {
        'where am i' : whereAmI,'i am in which page ' : whereAmI,
        'now i am in which page' : whereAmI,'what is my current page' : whereAmI,
        'what is name of this page' : whereAmI
    }
    function whereAmI(){
        var path = "{{ request()->getRequestUri() }}";
        var path= path.split("/");
        if(((/^[1-9][0-9]*$/.test(path[path.length -1 ]))) == false){
            pageName = path[path.length-1];
        }else{
            pageName = path[path.length-2];
        }
        let txt = "";
        if(pageName == 'imp'){
            txt = "You are in important label page";
        }else if((/^[1-9][0-9]*$/.test(path[path.length -1 ])) == true){
            txt = "you are reading email in "+path[path.length-2]+" page";
        }
        else{
            txt = "You are in "+pageName+" page";
        }
        play(txt);

    }

    var noOfTimesVisitedCommand = {
        'how many times i have visited this page' : noOfTimesVisited,'how many times this page is visited ' : noOfTimesVisited,
    }
    function noOfTimesVisited(){
        var path = "{{ request()->getRequestUri() }}";
        var pageName = path.split("/");
        pageName = pageName[1];
        countapi.hit('vbes.test', pageName).then((result) => {
            play("you have visited this  "+ result.value+" times");
        });
    }

    var readMailCommand = {
        'read :word email' : readMail,'read :word mail' : readMail, 'view :word email' : readMail,
        'view :word mail' : readMail,'lets read :word email' : readMail,'let us read :word mail' : readMail,
        'lets read :word mail' : readMail,'lets view :word email' : readMail
    }

    function readMail(word){
        var view_click_elem = $('[data-view_click_id="'+wordToDigit(word)+'"]');
        if(view_click_elem[0]){
            var _href = view_click_elem.attr("href");
            view_click_elem.attr("href", _href + '?read=loud');
            view_click_elem[0].click();
        }else{
            play("mail not found.")
        }
    }

    var selectMailCommand = {
        'select :word email' : selectMail,'select :word mail' : selectMail,
        'lets select :word email' : selectMail,'let us select :word mail' : selectMail
    }

    function selectMail(word){
        var select_elem = "";
        if(word == '4th' || word == 'force' || word == 'forth'){
            select_elem = $('[data-select_id=4]');
        }else{
            select_elem = $('[data-select_id="'+wordToDigit(word)+'"]');
        }
        if(select_elem[0]){
            if(!select_elem.prev().is(":checked")){
                status = select_elem[0].click();
                play(word+" mail selected successfully");
            }
        }else{
            play("mail not found.")
        }
    }

    var selectAllCommand = {
        'select all email' : selectAll,'select all mail' : selectAll,
        'lets select all email' : selectAll,'let us select all mail' : selectAll
    }

    function selectAll(){
        if(!$('.fa-square').is(":checked")){
            status = $('.fa-square').click();
            play(" All mail selected successfully");
        }
    }

    var deSelectAllCommand = {
        'select all email' : deSelectAll,'select all mail' : deSelectAll,
        'lets select all email' : deSelectAll,'let us select all mail' : deSelectAll
    }

    function deSelectAll(){
        if($('.fa-square').is(":checked")){
            status = $('.fa-square').click();
            play(" All mail selected successfully");
        }
    }

    var deSelectMailCommand = {
        'deselect :word email' : deSelectMail,'deselect :word mail' : deSelectMail,
        'unselect :word email' : deSelectMail,'un select :word mail' : deSelectMail,
        'lets deselect :word email' : deSelectMail,'let us deselect :word mail' : deSelectMail
    }

    function deSelectMail(word){
        var select_elem = "";
        if(word == '4th' || word == 'force' || word == 'forth'){
            select_elem = $('[data-select_id=4]');
        }else{
            select_elem = $('[data-select_id="'+wordToDigit(word)+'"]');
        }
        if(select_elem[0]){
            if(select_elem.prev().is(":checked")){
                select_elem[0].click();
                play(word+" mail deselected successfully");
            }
        }else{
            play("mail not found.")
        }
    }

    var deleteSelectedMailCommand = {
        'delete selected email' : deleteSelectedMail,'delete selected mail' : deleteSelectedMail,
        'lets delete selected email' : deleteSelectedMail,'let us delete selected mail' : deleteSelectedMail
    }

    function deleteSelectedMail(){
        alert("delete selected mail");
        var del_btn = $('.btn-delete');
        del_btn.attr({
            "data-system_click": true,
        });
        $('.btn-delete').click();
    }

    var deleteMailCommand = {
        'delete :word email' : deleteMail,'delete :word mail' : deleteMail,
        'lets delete :word email' : deleteMail,'let us delete :word mail' : deleteMail
    }

    function deleteMail(word){
        var select_elem = "";
        if(word == '4th' || word == 'force' || word == 'forth'){
            select_elem = $('[data-select_id=4]');
        }else{
            select_elem = $('[data-select_id="'+wordToDigit(word)+'"]');
        }
        if(select_elem[0]){
            if(!select_elem.prev().is(":checked")){
                select_elem[0].click();
                var del_btn = $('.btn-delete');
                del_btn.attr({
                    "data-system_click": true,
                });
                $('.btn-delete').click();
            }
        }else{
            play("mail not found.");
        }
    }

    var impMailCommand = {
        'make :word mail as important' : impMail,'make :word email as important' : impMail,
        'make :word mail  important' : impMail,'let us :word mail marked as important' : impMail
    }

    function impMail(word){
        if(word == '4th' || word == 'force' || word == 'forth'){
            word = "fourth";
        }
        var select_elem = $('[data-imp_make_id="'+wordToDigit(word)+'"]');
        if(select_elem[0]){
            if(select_elem.find('i').hasClass(".text-warning")){
                play("it has been already marked as important");
            }else{
                select_elem[0].click();
                // console.log(select_elem.find('i').hasClass(".fas, .fa-star, .text-warning"));
            }
        }else{
            play("mail not found.");
        }
    }

    var replyMailCommand = {
        'reply *toThsese mail' : replyMail
    }
    function replyMail(toThese){
        $('.btn-reply').click();
    }

    var logoutCommand = {
        'logout' : logout,'logout me' : logout,'log out' : logout,'log out me' : logout
    }
    function logout(toThese){
        $('.fa-power-off').click();
    }
    var paginateNextCommand = {
        'paginate Next' : paginateNext
    }
    function paginateNext(toThese){
        $('.fa-chevron-right').click();
    }
    var paginateBackCommand = {
        'paginate back' : paginateBack
    }
    function paginateBack(toThese){
        $('.fa-chevron-left').click();
    }
    addCommands([
        goToPageCommand,listeningCommand,goBackCommand,whoAmICommand,
        whatTimeCommand,pauseCommand,resumeCommand,cancelCommand,whereAmICommand,
        noOfTimesVisitedCommand,readMailCommand,selectMailCommand,deSelectMailCommand,
        deleteSelectedMailCommand,deleteMailCommand,impMailCommand,replyMailCommand,logoutCommand,selectAllCommand,deSelectAllCommand,paginateNextCommand,paginateBackCommand
    ]);
    annyang.start();
}
</script>

<script>
$('.fa-share').parent().addClass('d-none');
$('#updateProfileBtn').on('click',function(e){
    e.preventDefault();
    $('#updateProfile').modal('show');
});

$('#changePasswordBtn').on('click',function(e){
    e.preventDefault();
    $('#changePassword-modal').modal('show');
});
$('#deleteAccountBtn').on('click',function(e){
    e.preventDefault();
    $('#deleteAccount-modal').modal('show');
});


$(document).ready(function(){
    $(".input_name").keyup(function(){
        // Getting the current value of textarea
        var currentText = $(this).val();

        // Setting the Div content
        $(".output_name").text(currentText);

      if(!$('.input_name').val()){
        var text = "<?php echo auth()->user()->name ?>";
        $(".output_name").text(text);
      }
    });
});

// navbar user  search

    var timeOut = null,
        myXHR = null;
    $(document).ready(function(){
    $('#search_navbar').keyup(function(){
        // It will clear the setTimeOut activity if valid.
        if(timeOut) clearTimeout(timeOut);
        var search = $(this).val();
        if(search.length >= 11){
        timeOut = setTimeout(function(){
            // Cancel the last request if valid
            if(myXHR) myXHR.abort();
            myXHR = $.ajax({
            url: "{{ route('navbar-search') }}",
            type: "get",
            datatype: "json",
            data: {
                'search': search
            }
            }).done(function(response){
            if(typeof(response) != "object"){
                response = JSON.parse(response);
            }
            var search_result = "";
            if(response.status){
                if(response.data[0]){
                search_result += "<a href='/mail/"+response.data[0].id+"/compose' class='list-group-item'>";
                search_result += "<div class='search-title'>";
                search_result += "<b class='text-gray-dark'>"+response.data[0].name+"</b>";
                search_result += "</div>";
                search_result += "<div class='search-path'>";
                search_result += response.data[0].email;
                search_result += "</div>";
                search_result += "</a>";
                }
            }else{
                search_result += "<a class='list-group-item'>";
                search_result += "<div class='search-title'>";
                search_result += "<b class='text-gray-dark'>No user found!</b>";
                search_result += "</div>";
                search_result += "</a>";
                }
            $('#navbar_search_result').html(search_result);
            });
        }, 250);// wait for quarter second.
        }
    });
    });

    /*
    $('#search_navbar_btn').on('click',function(){
        var value=$("#search_navbar").val();
        $.ajax({
            {{-- url: "{{ route('navbar-search') }}",  --}}
            type: "get",
            datatype: "json",
            data: {
                'search': value
            },
            success: function (response) {
            if(typeof(response) != "object"){
                response = JSON.parse(response);
            }
            var search_result = "";
            if(response.status){
                if(response.data[0]){
                search_result += "<a href='/mail/"+response.data[0].id+"/compose' class='list-group-item'>";
                search_result += "<div class='search-title'>";
                search_result += "<b class='text-gray-dark'>"+response.data[0].name+"</b>";
                search_result += "</div>";
                search_result += "<div class='search-path'>";
                search_result += response.data[0].email;
                search_result += "</div>";
                search_result += "</a>";
                }
            }else{
                search_result += "<a class='list-group-item'>";
                search_result += "<div class='search-title'>";
                search_result += "<b class='text-gray-dark'>No user found!</b>";
                search_result += "</div>";
                search_result += "</a>";
                }
            $('#navbar_search_result').html(search_result);
            }
        });
    });*/

//Delete Account - process
    $(document).ready(function() {
        $(".delete-account-submit").click(function(e){
            e.preventDefault();
            var _token = $('#delete-account-form').find("input[name='_token']").val();
            var _method = $('#delete-account-form').find("input[name='_method']").val();
            var password = $('#delete-account-form').find("input[name='password']").val();
             $.ajax({
                url: "{{route('delete-account')}}",
                type:'post',
                data: {
                  _token:_token,
                  _method:_method,
                 password:password
                 },
                success: function(data) {
                  if(typeof(data) != 'object'){
                    data = JSON.parse(data);
                  }
                    if($.isEmptyObject(data.errors)){
                      $('#delete-account-form').find("input[name='password']").val('');
                      $(".error-message").html('');
                      $(".error-message").css('display','block');
                      $('.error-message').
                      html('<div class="alert alert-danger alert-dismissible pass-chng-msg"><button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button><strong>'
                        +data.msg+'</strong></div>');
                    if(data.status){
                        $(".error-message").find('.pass-chng-msg').removeClass('alert-danger');
                        $(".error-message").find('.pass-chng-msg').addClass('alert-success');
                    }
                        setTimeout(() =>{
                          $('.error-message').slideUp();
                          if(data.status){
                            window.location = "{{route('register')}}";

                          }
                          },3000);
                    }else{
                        printErrorMsg(data.errors);
                    }
                }
            });
        });
        function printErrorMsg (msg) {
          $(".error-message").html('');
          $(".error-message").css('display','block');
          $.each( msg, function( key, value ) {
              $(".error-message").append('<div class = "single-message alert alert-danger"><span class = "fa fa-circle"></span> '+value+'</div>');
          });
          setTimeout(() =>{
            $('.error-message').slideUp();
            },4000);
        }
    });



//change - password process
    $(document).ready(function() {
        $(".change-password-submit").click(function(e){
            e.preventDefault();
            var _token = $('#change-password-form').find("input[name='_token']").val();
            var _method = $('#change-password-form').find("input[name='_method']").val();
            var current_password = $('#change-password-form').find("input[name='current_password']").val();
            var password = $('#change-password-form').find("input[name='password']").val();
            var password_confirmation = $('#change-password-form').find("input[name='password_confirmation']").val();
            $.ajax({
                url: "{{route('change-password')}}",
                type:'post',
                data: {
                  _token:_token,
                  _method:_method,
                 current_password:current_password,
                 password:password,
                 password_confirmation:password_confirmation},
                success: function(data) {
                  if(typeof(data) != 'object'){
                    data = JSON.parse(data);
                  }
                    if($.isEmptyObject(data.errors)){
                      $('#change-password-form').find("input[name='current_password']").val('');
                      $('#change-password-form').find("input[name='password']").val('');
                       $('#change-password-form').find("input[name='password_confirmation']").val('');
                      $(".error-message").html('');
                      $(".error-message").css('display','block');
                      $('.error-message').
                      html('<div class="alert alert-danger alert-dismissible pass-chng-msg"><button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button><strong>'
                        +data.msg+'</strong></div>');
                    if(data.status){
                        $(".error-message").find('.pass-chng-msg').removeClass('alert-danger');
                        $(".error-message").find('.pass-chng-msg').addClass('alert-success');
                    }
                      // $('.error-message').slideUp(4000);
                        setTimeout(() =>{
                          $('.error-message').slideUp();
                          if(data.status){
                            window.location = "{{route('login')}}";
                          }
                          },3000);
                    }else{
                        printErrorMsg(data.errors);
                    }
                }
            });
        });
        function printErrorMsg (msg) {
          $(".error-message").html('');
          $(".error-message").css('display','block');
          $.each( msg, function( key, value ) {
              $(".error-message").append('<div class = "single-message alert alert-danger"><span class = "fa fa-circle"></span> '+value+'</div>');
          });
          setTimeout(() =>{
            $('.error-message').slideUp();
            },4000);
        }
    });

// update-profile process
  $(document).ready(function() {
          $(".update-profile-submit").click(function(e){
              e.preventDefault();
              var fd = new FormData();
              var _token = $('#profile-update-form').find("input[name='_token']").val();
              var _method = $('#profile-update-form').find("input[name='_method']").val();
              var name = $('#profile-update-form').find("input[name='name']").val();
              var dob = $('#profile-update-form').find("input[name='dob']").val();
              var gender =
              $('#profile-update-form').find("select[name='gender'] option:selected").val();
              // var photo = $('#profile-update-form').find("input[name='photo']")[0].files[0];
              var files = $('#profile-update-form').find("input[name='photo']")[0].files;
              fd.append('_token',_token);
              fd.append('_method',_method);
              fd.append('name',name);
              fd.append('dob',dob);
              fd.append('gender',gender);
              if(files.length > 0){
                fd.append('photo',files[0]);
              }
              $.ajax({
                  url: "{{route('update-me')}}",
                  type:'post',
  /*                data: {
                    _token:_token,
                    _method:_method,
                   name:name,
                   dob:dob,
                   gender:gender,
                   photo:photo
                 },*/
                 data: fd,
                 contentType: false,
                 processData: false,
                  success: function(data) {
                    if(typeof(data) != 'object'){
                      data = JSON.parse(data);
                      console.log(data);
                    }
                      if($.isEmptyObject(data.errors)){
                        $(".error-message").html('');
                        $(".error-message").css('display','block');
                        $('.error-message').
                        html('<div class="alert alert-danger alert-dismissible update-profile-msg"><button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button><strong>'
                          +data.msg+'</strong></div>');
                          if(data.status){
                            $('.update-profile-msg').removeClass('alert-danger');
                            $('.update-profile-msg').addClass('alert-success');
                          }
                        // $('.error-message').slideUp(4000);
                          setTimeout(() =>{
                            $('.error-message').slideUp();
                            },3000);
                      }else{
                          printErrorMsg(data.errors);
                      }
                  }
              });
          });
          function printErrorMsg (msg) {
            $(".error-message").html('');
            $(".error-message").css('display','block');
            $.each( msg, function( key, value ) {
                $(".error-message").append('<div class = "single-message alert alert-danger"><span class = "fa fa-circle"></span> '+value+'</div>');
            });
            setTimeout(() =>{
              $('.error-message').slideUp();
              },4000);
          }
      });

// mail search
    var timeOut = null,
        myXHR = null;
    $(document).ready(function(){
      function routeMaker(id){
          var table_name = ($('.table-name').text()).toLowerCase();
          if(table_name == 'trash'){
          impRoute = "/mail/trash/"+id+"/make-imp";
          viewRoute = "/mail/trash/"+id;
          }else if(table_name == 'inbox'){
          impRoute = "/mail/inbox/"+id+"/make-imp";
          viewRoute = "/mail/inbox/"+id;
          }else if(table_name == 'sent'){
          impRoute = "/mail/sent/"+id+"/make-imp";
          viewRoute = "/mail/sent/"+id;
          }else if(table_name == 'draft'){
          impRoute = "/mail/draft/"+id+"/make-imp";
          viewRoute = "/mail/draft/"+id;
          }else if(table_name == 'important'){
          viewRoute = "";
          impRoute = "javascript:;"
          } else{
          impRoute = "javascript:;";
          viewRoute = "javascript:;";
          }
          var routes = [impRoute,viewRoute];
          return routes;
      }
      function deleteRouteMaker(){
          var table_name = ($('.table-name').text()).toLowerCase();
          var deleteRoute = "";
          if(table_name == 'trash'){
              deleteRoute = "{{ route('trash.delete') }}";
          }else if(table_name == 'inbox'){
              deleteRoute = "{{ route('inbox.delete') }}";
          }else if(table_name == 'sent'){
              deleteRoute = "{{ route('sent.delete') }}";
          }else if(table_name == 'draft'){
              deleteRoute = "{{ route('draft.delete') }}";
          }else if(table_name == 'important'){
              deleteRoute = "{{ route('imp.delete') }}";
          }else{
              deleteRoute = "javascript:;"
          }
          return deleteRoute;
      }
      var table_name = $('.table-name').text();
      $('.mail-search-input').keyup(function(){
          // It will clear the setTimeOut activity if valid.
          if(timeOut) clearTimeout(timeOut);
          var search = $(this).val();
          if(search.length >= 3){
            timeOut = setTimeout(function(){
                // Cancel the last request if valid
                if(myXHR) myXHR.abort();
                myXHR = $.ajax({
                type: "GET",
                url: "{{route('mail-search')}}",
                dataType: 'JSON',
                data: {data: search, table_name : table_name }
                }).done(function(response){
                if(typeof(response) != 'object'){
                    response = JSON.parse(response);
                }
                printData(response)
                function printData(response){
                    console.log(response);
                    var table_html = '';
                    var table_data = '';
                    if(response.data.data.length > 0){
                    // $('.pagination-link').html(response.pagination);
                    var deleteRoute = deleteRouteMaker();
                    table_html += '<table class="table table-hover table-striped data-table"><tbody></tbody></table>';
                    var view_click_id = 0;
                    var isImp = '';
                    var impRoute = '';
                    var impView = '';
                    var viewRoute = '';
                    var isImpColor = '';
                    $.each(response.data.data,function(key,record){
                        console.log((response.data.data).length);
                        var routes = routeMaker(record.id);
                        impRoute = routes[0];
                        viewRoute = routes[1];
                        if(viewRoute == ""){
                        viewRoute = record.viewRoute;
                        }
                        if(record.isImp){
                        if(record.isImp == 'yes'){
                            isImp = 'Remove from important';
                            isImpColor = 'warning';
                        }else{
                            isImp = 'Add to important';
                            isImpColor = 'gray-dark';
                        }
                        impView = '<td class="mailbox"><a href="'+impRoute+'" class= "imp-star" title = "'+isImp+'" data-imp_make_id = "'+view_click_id+'"><i class="fas fa-star text-'+isImpColor+'"></i></a></td>';
                        }
                        if(record.show_email == null){
                        record.show_email = "no user name";
                        }
                        view_click_id++;
                        table_data += '<tr><td><div class="icheck-primary">';
                        table_data += '<input id="'+record.id+'" class="checkbox-record" data-mail_id="'+record.mail_id+'" data-mail_type="'+record.mail_type+'" name="del_record[]" type="checkbox" value="'+record.id+'">';
                        table_data += '<label for="'+record.id+'" data-select_id = "'+
                        view_click_id+'"></label></div></td>';
                        table_data += impView;
                        table_data += '<td class="mailbox-name">';
                        table_data += record.show_email;
                        table_data += '</td><td class="mailbox-subject"><b>';
                        table_data += record.subject;
                        table_data += '</b></td><td class="mailbox-attachment">';
                        if(record.attachments){
                            table_data += '<i class="fas fa-paperclip"></i>';
                        }
                        table_data +=  "</td><td>";
                        table_data +=  '<a class= "viewRoute" href="'+viewRoute+'" title = "Read Mail"><i class="fas fa-eye"></i></a></td><td class="mailbox-date created_at">'+record.diffForHumans+'</td></tr>';
                    });
                    }else{
                        $('.search-pagination-part').html('');
                        table_html += '<div class="card-body p-0"><div class="mailbox-controls"><div class="table-responsive mailbox-messages"><div class="bg-info text-center p-5"><h1>result not found</h1></div></div></div></div>';
                    }
                    $('.mailbox-messages').html(table_html);
                    $('.data-table').html(table_data);
                    $('.search-pagination-part').append('<form method="POST" action="'+deleteRoute+'"  class="delete-record-form"></form>');
                    $(".delete-record-form").prepend('<input type="hidden" name="_token" value="{{ csrf_token() }}">');
                    $('.checkbox-record').change(function(){
                        var checked = $(this).is(':checked');
                        if(checked){
                            $(this).clone(true,true).appendTo(".delete-record-form").hide();
                        }else{
                            var $div = $('.delete-record-from').find((".checkbox-record[data-mail_id='+current_mail_id+']"));
                            // $div.remove();
                            // console.log($div); // code not working properyly
                        }
                    });
                    $('.mailbox-controls').find('.float-right').addClass('ajaxPagi');
                    $('.ajaxPagi').html(response.pagination);
                }
                function fetch_data(page){
                    var table_name = $('.table-name').text();
                    $.ajax({
                        type: "GET",
                        url: "{{route('mail-search')}}",
                        dataType: 'JSON',
                        data:{
                            page: page,
                            table_name: table_name,
                            data: search
                            },
                        success:function(response){
                            printData(response);
                        }
                    });
                }
                $(document).on('click', '.page-get', function(e){
                    e.preventDefault();
                    var page = $(this).attr('href').split('page=')[1];
                    fetch_data(page);
                });
                });
            }, 250);// wait for quarter second.
          }
      });
    });

    $('body').on('click', function(event) {
        if($('.sidebar-search-result').find('.list-group-item').css('display','block')){
            $('.sidebar-search-result').find('.list-group-item').css('display','none');
        }
    });



</script>
@yield('scripts')
</body>
</html>


<!-- The  User Profile Update Modal -->
    <div class="modal" id="updateProfile">
    <div class="modal-dialog">
        <div class="modal-content">
        <!-- Modal body -->
        {{-- <div class="modal-body"> --}}
                <div class="card card-widget widget-user shadow">
                <!-- Add the bg color to the header using any of the bg-* classes -->
                <div class="widget-user-header bg-info">
                    <h3 class="widget-user-username output_name mt-4">{{auth()->user()->name}}</h3>
                </div>
                <div class="widget-user-image">
                    @if(isset(request()->user()->userInfo['photo']) && !empty(request()->user()->userInfo['photo']))
                        <img class="img-circle  elevation-2 " id="blah" src="{{asset('uploads/user/'.request()->user()->userInfo['photo'])}}"  alt="User Avatar" style="width: 110px; height: 110px; border: 3px solid white;"/>
                    @else
                        <img class="img-circle  elevation-2 " id="blah" src="{{asset('img/avatar.png')}}"   alt="User Avatar" style="width: 110px; height: 110px; border: 3px solid white;" />
                    @endif
                <i class="fas fa-camera text-gray-dark bg-white elevation-2 rounded-circle p-1" id="profile_upload_btn" onclick="document.getElementById('profile-photo').click();" style = "margin-left:-18px; margin-top: -25px; z-index: 888; cursor: pointer;"></i>
                </div>

                <div class="card-footer">
                    <div class="row">
                    <div class="col-sm-4 border-right">
                        <div class="description-block">
                        <h5 class="description-header">
                            @php
                            $mails = DB::table('inboxes')
                                ->where('user_id',auth()->user()->id)
                                ->count();
                            echo $mails;
                            @endphp
                        </h5>
                        <span class="description-text">Inbox</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4 border-right">
                        <div class="description-block">
                        <h5 class="description-header">
                                @php
                    $mails = DB::table('outboxes')
                                ->where('user_id',auth()->user()->id)
                        ->count();
                        echo $mails;
                                @endphp
                        </h5>
                        <span class="description-text">Sent</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4">
                        <div class="description-block">
                        <h5 class="description-header">
                                @php
                            $in_mails = DB::table('inboxes')
                            ->where('user_id',auth()->user()->id)
                            ->count();
                            $out_mails = DB::table('outboxes')
                                ->where('user_id',auth()->user()->id)
                                ->count();
                            $draft_mails = DB::table('drafts')
                                ->where('user_id',auth()->user()->id)
                                ->count();
                            $trash_mails = DB::table('trashes')
                                ->where('user_id',auth()->user()->id)
                                ->count();
                            $all_mails = $in_mails + $out_mails + $draft_mails + $trash_mails;
                            echo $all_mails;
                                @endphp
                        </h5>
                        <span class="description-text">All Mails</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    </div>
                    <!-- /.row -->
                <div class="error-message">

                </div>
                {{ Form::open(['url'=>route('update-me') ,'class'=>'form' ,'id' => 'profile-update-form','files' => true]) }}
                @method('patch')
                <br>
                    <div class="form-group row">
                        {{ Form::label('profile_name','Full Name',['class'=>'col-sm-12 col-md-3 text-md-right']) }}
                        <div class="col-sm-12 col-md-9">
                            {{ Form::text('name',auth()->user()->name,['class'=>'form-control input_name','id'=>'profile_name' ,'required' => true]) }}
                        </div>
                    </div>

                    <div class="form-group row">
                        {{ Form::label('dob','Birth Date',['class'=>'col-sm-12 col-md-3 text-md-right']) }}
                        <div class="col-sm-12 col-md-9">
                            {{ Form::date('dob',@(request()->user()->userInfo->dob),['class'=>'form-control','id'=>'dob','placeholder'=>'Enter your Birth Date']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('gender','Gender',['class'=>'col-sm-12 col-md-3 text-md-right']) }}
                        <div class="col-sm-12 col-md-9">

                        {{Form::select('gender', ['male' => 'Male', 'female' => 'female','other' => 'other'],@(request()->user()->userInfo->gender),['class' => 'form-control select2 select2-hidden-accessible'] )}}
                        </div>
                    </div>
                    {{Form::file('photo',['id' => 'profile-photo','class' => 'd-none','onchange'=>"document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])",'accept' => 'image/*'])}}
                {{Form::close()}}
                </div>
                </div>
        {{-- </div> --}}

        <!-- Modal footer -->
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info update-profile-submit">Update</button>
            </div>

        </div>
    </div>
    </div>

<!-- The  Change Password Modal -->
    <div class="modal" id="changePassword-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="card  card-info">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            <div class="card-header">
                <h3 class="card-title">Change Password</h3>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="card-body shadow">
                {{ Form::open(['url'=>route('change-password') ,'class'=>'form ','id' => 'change-password-form']) }}
                @method('patch')
                <div class="error-message">

                </div>
                    <div class="form-group row">
                        {{ Form::label('current_password','Current Password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                        <div class="col-sm-12 col-md-7">
                            {{ Form::password('current_password',['class'=>'form-control form-control-sm','id'=>'current_password','required'=>true,'placeholder'=>'Enter your current password']) }}
                        </div>
                    </div>

                    <div class="form-group row">
                        {{ Form::label('password','New Password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                        <div class="col-sm-12 col-md-7">
                            {{ Form::password('password',['class'=>'form-control form-control-sm','id'=>'password','required'=>true,'placeholder'=>'Enter your new password']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('confirmation_password','Confirmation Password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                        <div class="col-sm-12 col-md-7">
                            {{ Form::password('password_confirmation',['class'=>'form-control form-control-sm','id'=>'confirmation_password','required'=>true,'placeholder'=>'Re-enter your new password ']) }}
                        </div>
                    </div>
                {{Form::close()}}
            </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info change-password-submit">Change Password</button>
            </div>
        </div>
    </div>
    </div>

<!-- The  Delete Account Modal -->
    <div class="modal" id="deleteAccount-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="card  card-info">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            <div class="card-header">
                <h3 class="card-title">Delete Account</h3>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <p class = "p-3"> Are you sure you want to delete your account? Once your account is deleted, all of its
            resources and data will be permanently deleted. Please enter your password to
            confirm you would like to permanently delete your account.
            </p>
            <div class="card-body shadow">
                {{ Form::open(['url'=>route('delete-account') ,'class'=>'form ','id' => 'delete-account-form']) }}
                @method('patch')
                <div class="error-message">

                </div>
                    <div class="form-group row">
                        {{ Form::label('dpassword','Password',['class'=>'col-sm-5 col-md-3 text-md-right']) }}
                        <div class="col-sm-7 col-md-9">
                            {{ Form::password('password',['class'=>'form-control form-control-sm','id'=>'dpassword','required'=>true,'placeholder'=>'Enter your Password']) }}
                        </div>
                    </div>
                {{Form::close()}}
            </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">NEVERMIND</button>
                <button type="button" class="btn btn-info delete-account-submit">DELETE ACCOUNT</button>
            </div>
        </div>
    </div>
    </div>
