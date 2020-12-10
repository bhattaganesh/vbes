    <footer class="main-footer">      
        <div class="float-right d-none d-sm-block">
            Developed By: <b>Ganesh Bhatta</b>
        </div>
        <strong>Copyright &copy; {{ date('Y') }} <a href="#">vbes.com</a>.</strong> All rights reserved.        
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

<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/dashboard.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
{{-- <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"></script> --}}
<script>
if (annyang) {
  var commands = {
    'go to home page': function() {
      window.location = "/";
    },
    'are you listening me ?': function() {
      play("yes i am listening you");
    },
    'go back': function() {
      history.back();
    },
    'go to :tag page': function(page_name) {
      window.location = "/"+page_name;
    },
    'who am i': function() {
        let txt = "{{ "You are ".auth()->user()->name }}";
        play(txt);
    },
    'what time it is': function() {
        let txt = "{{ "it is ".date('H i  a') }}";
        play(txt);
    },
    'go to important': function() {
      window.location = "/mail/imp";
    },
    'go to :folder': function(folder) {
      window.location = "/mail/"+folder;
    },    
    'pause reading': function() {
      responsiveVoice.pause();
    },
    'resume reading': function() {
      responsiveVoice.resume();
    },
    'cancel reading': function() {
      responsiveVoice.cancel();
    },
    'read :word mail': function(word) {
      var view_click_elem = $('[data-view_click_id="'+wordToDigit(word)+'"]');
      if(view_click_elem[0]){
        var _href = $('[data-view_click_id="1"]').attr("href"); 
        $('[data-view_click_id="1"]').attr("href", _href + '?read=loud');
        view_click_elem[0].click();
      }else{
        play("mail not found.")
      }
    },
    'select :word mail': function(word) {
      var select_elem = $('[data-select_id="'+wordToDigit(word)+'"]');
      if(select_elem[0]){
        if(!select_elem.prev().is(":checked")){
          status = select_elem[0].click();
          play(word+" mail selected successfully");
        }
      }else{
        play("mail not found.")
      }
    },
    'deselect :word mail': function(word) {
      var select_elem = $('[data-select_id="'+wordToDigit(word)+'"]');
      if(select_elem[0]){
        if(select_elem.prev().is(":checked")){
          select_elem[0].click();
          play(word+" mail deselected successfully");
        }
      }else{
        play("mail not found.")
      }
    },
    'delete selected mail': function() {
      var del_btn = $('.btn-delete');
      del_btn.attr({
        "data-system_click": true,
      });
      $('.btn-delete').click();
    },
    'delete :word mail': function(word) {
      var select_elem = $('[data-select_id="'+wordToDigit(word)+'"]');
      if(select_elem[0]){
        if(!select_elem.prev().is(":checked")){
          select_elem[0].click();
      $(".delete-record-form").find('delete-method').html('<input type="hidden" name="_method" value="delete">');
          var del_btn = $('.btn-delete');
          del_btn.attr({
            "data-system_click": true,
          });
          if(del_btn.get(0).hasAttribute('data-system_click')){
            var play_status = '';
            play_status = play("Are you sure you want to delete ?");
            if(play_status != null){
              if(annyang) {
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
              }
            }
          }else{
            var confirmed = confirm("Are you sure you want to delete.");
            if(confirmed){
              $('.delete-record-form').submit();
            }
          }
        }
      }else{
        play("mail not found.");
      }
    },
    'reply *toThsese mail': function() {
        $('.btn-reply').click();
    },
    'make :word mail as important': function(word) {
      var select_elem = $('[data-imp_make_id="'+wordToDigit(word)+'"]');
      console.log(select_elem[0]);
      if(select_elem[0]){
        select_elem[0].click();
      }else{
        play("mail not found.");
      }
    },
    'where am i': function() {
      let location = "{{request()->getRequestUri()}}";
      let temp_loc_arr = location.split('/');
      var txt;
      if(location == '/dashboard'){
        txt = "you are in dashboard page";
      }else if(location == '/mail/imp'){
        txt = "you are in important label page";
      }else if(temp_loc_arr.length == 4 &&
        (/^[1-9][0-9]*$/.test(temp_loc_arr[temp_loc_arr.length -1 ])) == true){
        txt = "you are reading "+temp_loc_arr[temp_loc_arr.length-2]+" mail";
      }else{
        location  = location.split('/');
        location = location[location.length - 1];
        txt = "you are in "+ location +" page";
      }
/*      responsiveVoice.setDefaultVoice("US English Female");
      responsiveVoice.speak("hello world", "UK English Male", {onstart: StartCallback, onend: EndCallback});
      // play(txt);*/
    }
  };
  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
</script>
<script>
$('#updateProfileBtn').on('click',function(e){
    e.preventDefault();
    $('#updateProfile').modal('show');
});

$('#changePasswordBtn').on('click',function(e){
    e.preventDefault();
    $('#changePassword-modal').modal('show');
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
                      if(data.status){
                        $('.pass-chng-msg').removeClass('alert-danger');
                        $('.pass-chng-msg').addClass('alert-success');
                      }
                      $('.error-message').
                      html('<div class="alert alert-danger alert-dismissible pass-chng-msg"><button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button><strong>'
                        +data.msg+'</strong></div>');
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
    var table_html = '';
    console.log(response);
    if(response.data.data.length > 0){
      $('.pagination-link').html(response.pagination);
      table_html += '<table class="table table-hover table-striped data-table"><tbody>';
      table_html += '{{Form::open(['url' => route('trash.delete'),'class' => 'delete-record-form'])}}';
      table_html += '<input type="hidden" name="mtype" id = "mail_type" value="out">';
      var view_click_id = 0;
      var isImp = '';
      var impRoute = '';
      var impView = '';
      var viewRoute = '';
      var isImpColor = '';
      $.each(response.data.data,function(key,record){ 
        var routes = routeMaker(record.id);
        console.log(routes);
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
        console.log(impView);
        if(record.show_email == null){
          record.show_email = "* no-username *";
        }
        view_click_id++;
        table_html += '<tr><td><div class="icheck-primary">';
        table_html += '<input id="'+record.id+'" class="checkbox-record" data-mail_id="'+record.id+'" data-mail_type="'+record.mail_type+'" name="del_record[]" type="checkbox" value="'+record.id+'">';
        table_html += '<label for="'+record.id+'" data-select_id = "'+
        view_click_id+'"></label></div></td>';
        table_html += impView;
        table_html += '<td class="mailbox-name">';
        table_html += record.show_email;
        table_html += '</td><td class="mailbox-subject"><b>';
        table_html += record.subject;
        table_html += '</b></td><td class="mailbox-attachment">';
        if(record.attachments){
          table_html += '<i class="fas fa-paperclip"></i>';
        }
        table_html +=  "</td><td>";
        table_html +=  '<a class= "viewRoute" href="'+viewRoute+'" title = "Read Mail"><i class="fas fa-eye"></i></a></td><td class="mailbox-date created_at">'+record.diffForHumans+'</td></tr>';
      });
      table_html += "{{Form::close()}}</tbody></table>";
    }else{
      $('.search-pagination-part').html('');
      table_html += '<div class="card-body p-0"><div class="mailbox-controls"><div class="table-responsive mailbox-messages"><div class="bg-info text-center p-5"><h1>result not found</h1></div></div></div></div>';
    }
    $('.mailbox-messages').html(table_html);
  }
  function fetch_data(page){
  var table_name = $('.table-name').text();
    $.ajax({
    url: "{{route('mail-search')}}",
    method:"get",
    data:{page:page,table_name: table_name},
     success:function(response)
     {
      printData(response);
     }
    });
  }
  $(document).on('click', '.page-get', function(event){
    event.preventDefault(); 
    var page = $(this).attr('href').split('page=')[1];
    fetch_data(page);
  });
        });
      }, 250);// wait for quarter second.
    }
  });
});


/*    dTable = $('.data-table').DataTable({
        "bLengthChange": false, // this gives option for changing the number of records shown in the UI table
        "lengthMenu": [4], // 4 records will be shown in the table
        "columnDefs": [{
                "className": "dt-center",
                "targets": "_all"
            } //columnDefs for align text to center
        ],
        "dom": "lrtip" //to hide default searchbox but search feature is not disabled hence customised searchbox can be made.
    });
 
    $('.mail-search-input').keyup(function() {
        dTable.search($(this).val()).draw(); // this  is for customized searchbox with datatable search feature.
    })*/

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
                <img class="img-circle  elevation-2 " id="blah" src="{{ ((request()->user()->userInfo['photo']) != null) ? asset('uploads/user/'.request()->user()->userInfo['photo']) : asset('img/avatar.png') }}" alt="User Avatar" style="width: 110px; height: 110px; border: 3px solid white;">
              <i class="fas fa-camera text-gray-dark bg-white elevation-2 rounded-circle p-1" id="profile_upload_btn" onclick="document.getElementById('profile-photo').click();" style = "margin-left:-18px; margin-top: -25px; z-index: 888; cursor: pointer;"></i>
              </div>

              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">
                        @php
                        $mails = DB::table('inboxes')
                            ->where('receiver_id',auth()->user()->email)
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
                            ->where('sender_id',auth()->user()->email)
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
                           ->where('receiver_id',auth()->user()->email)
                           ->count();
                        $out_mails = DB::table('outboxes')
                            ->where('sender_id',auth()->user()->email)
                            ->count();
                        $draft_mails = DB::table('drafts')
                            ->where('sender_id',auth()->user()->email)
                            ->count();
                        $trash_mails = DB::table('trashes')
                            ->where('user_name',auth()->user()->email)
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