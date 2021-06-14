@extends('layouts.dashboard')
@section('title','Read Mail')
@section('content-header')
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Read Mail</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">VBES</a></li>
              <li class="breadcrumb-item active">Read Mail</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
@endsection
@section('content')
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            @include('dashboard.partials.folder')
          </div>
          <!-- /.col -->
        <div class="col-md-9">
          <div class="card card-primary card-outline">
            <div class="card-header">
              <h3 class="card-title">Read Mail</h3>

              <div class="card-tools">
                {{--<a href="#" class="btn btn-tool" title="Previous"><i class="fas fa-chevron-left"></i></a>
                <a href="#" class="btn btn-tool" title="Next"><i class="fas fa-chevron-right"></i></a>--}}
              </div>
            </div>
            <!-- /.card-header -->
            @if($data->count())
            <div class="card-body p-0">
              <div class="mailbox-read-info mail-box-print-view">
                <h5>{{$data->mail->subject}}</h5>
                <h6>
                  <span class="from_to">{{$user_name}}</span>
                  <span class="mailbox-read-time float-right at_date_time">
                    {{Carbon\Carbon::parse($data->mail->created_at)->format('d'.' '.'M.'.' '.'Y'.' '.'H:i A')}}
                  </span></h6>
              </div>
              <!-- /.mailbox-read-info -->
              <div class="mailbox-controls with-border text-center">
                <div class="btn-group">
                  <a href="javascript:;" title="Delete" class="btn btn-default btn-sm btn-read-delete">
                    <i class="far fa-trash-alt"></i>
                  </a>
                    {{Form::open(['url'=>
                      $route =
                      (
                        ($folder_name == 'outbox') ?
                       route('sent.delete',$data->id) :
                       (
                        ($folder_name == 'inbox') ?
                        route('inbox.delete',$data->id) :
                        (
                          ($folder_name == 'draft') ?
                          route('draft.delete',$data->id) :
                          (
                            ($folder_name == 'trash') ?
                            route('trash.delete',$data->id) :
                            (
                              ($folder_name == 'important') ?
                              route('imp.delete',$record_id) : ''
                            )
                          )
                        )
                       )
                     )
                      ,
                    'id'=>'delete-read-form'])}}
                    @method('delete')
                    {{Form::close()}}
                    @php
                $mail_type =
                      (
                        ($folder_name == 'outbox') ?
                        'out'  :
                       (
                        ($folder_name == 'inbox') ?
                         'in' :
                        (
                          ($folder_name == 'draft') ?
                           'out' :
                          (
                            ($folder_name == 'trash') ?
                            (($data->isInbox == 'yes') ? 'in' : 'out') :
                            (
                              ($folder_name == 'important') ?
                              $imp_type : ''
                            )
                          )
                        )
                       )
                     );
                     @endphp
                  <a href="{{ route('mail.reply',['mail_id' =>($folder_name == 'impportant') ? $imp_mail_id :$data->mail_id,'mail_type' => $mail_type])}}" title = "Reply" class="btn btn-default btn-sm btn-reply">
                    <i class="fas fa-reply"></i>
                  </a>
                  <a href="#" title = "Forward" class="btn btn-default btn-sm">
                    <i class="fas fa-share"></i>
                  </a>
                </div>
                <!-- /.btn-group -->
                <button type="button" onclick = "printContent('mail-box-print-view');" class="btn btn-default btn-sm" title="Print">
                  <i class="fas fa-print"></i>
                </button>
              </div>
              <!-- /.mailbox-controls -->
              <div class="mailbox-read-message mail-box-print-view"> {!! $data->mail->message !!}
              </div>
              <!-- /.mailbox-read-message -->
            </div>
            <!-- /.card-body -->
            <div class="card-footer bg-white mail-box-print-view">
              <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                @if(isset($attachments))
                  @if($attachments->count() > 0)
                    @foreach($attachments as $attachment)
                      <li>
                        <span class="mailbox-attachment-icon">
                          {{ filePreview($attachment->attachment) }}
                        </span>
                          @php
                           $size = filesize((public_path('attachments/'.$attachment->attachment)));
                           $size = $size/1024;
                           $size = number_format($size,2);
                           $file_info = pathinfo((public_path('attachments/'.$attachment->attachment)));
                           $file_name = $file_info['basename'];
                           $full_name = explode('/'.$file_name,$attachment->attachment);
                           $dir  = $full_name[0];
                          @endphp
                        <div class="mailbox-attachment-info">
                          <a href="{{ route('display-attach',['dir' => $dir,'file_name' => $file_name]) }}" class="mailbox-attachment-name"><i class="fas fa-paperclip"></i>
                            <span class="attachment_name">{{$file_name}}</span></a>
                              <span class="mailbox-attachment-size clearfix mt-1">
                                <span> {{ $size }}  KB</span>
                                <a href="{{route('download-attach',['dir' => $dir,'file_name' => $file_name])}}" class="btn btn-default btn-sm float-right" title="download"><i class="fas fa-cloud-download-alt"></i></a>
                              </span>
                        </div>
                      </li>
                    @endforeach
                  @endif
                @endif
              </ul>
            </div>
            <!-- /.card-footer -->
            <div class="card-footer">
              <div class="float-right">
                <a href="javascript:;" title="Delete" class="btn btn-default btn-sm btn-read-delete">
                  <i class="far fa-trash-alt"></i>
                </a>
                <button type="button" class="btn btn-default"><i class="fas fa-share"></i> Forward</button>
              </div>
              <a href="javascript:;" title="Delete" class="btn btn-default btn-sm btn-read-delete">
                <i class="far fa-trash-alt"></i>
              </a>
              <button type="button" onclick = "printContent('mail-box-print-view');" class="btn btn-default"><i class="fas fa-print"></i> Print</button>
            </div>
            @endif
            <!-- /.card-footer -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
@endsection
@if(isset(request()->read) &&  !empty(request()->read == 'loud'))
@section('scripts')
<script>
/*var function1Completed = false;
var function2Completed = false;

  function function1(){
    var txt = 'Hello , i am going to read this mail, listen carefully';
    txt += " Subject is "+$('.mailbox-read-info').find('h5').text();
    txt += " And for respected user ";
    txt += $('.mailbox-read-info').find('.from_to').text();
    getAudio(txt);
    return function2();
    // function1Completed = true;
  }

  function function2(){
    var txt = "date time is ";
    txt += $('.mailbox-read-info').find(".at_date_time").text();
    getAudio(txt);
    return function3();
    // function2Completed = true;
  }

  function function3(){
    var txt = "message is ";
    txt += $(".mailbox-read-message").text();
    if($(".attachment_name").text()){
      txt += "and attachment is"+$(".attachment_name").text();
    }
    getAudio(txt);
  }*/

  function function1(){
    var subject = $('.mailbox-read-info').find('h5').text();
    if(subject != ''){
      subject = 'not mentioned.'
    }else{
      subject += '.';
    }
    var respect = $('.mailbox-read-info').find('.from_to').text();
    respect = respect.split(":");
    if(respect[0] == 'To'){
      respect = "mail sent to. "+respect[1];
    }else{
      respect = "mail sent by. "+respect[1];
    }
    var txt = 'Hello {{ auth()->user()->name }}, i am going to read this mail, listen carefully.';
    txt += " Subject is "+subject;
    txt += respect;
    txt += ".Date time is.";
    txt += $('.mailbox-read-info').find(".at_date_time").text();
    txt += ".Message is.";
    txt += $(".mailbox-read-message").text();
    if($(".attachment_name").text()){
      txt += ".And attachment is ."+$(".attachment_name").text();
    }
    play(txt);
  }

var something = (function() {
    var executed = false;
    return function() {
        if (!executed) {
          executed = true;
          function1();
        }
    };
})();
something();

if (annyang) {
  var commands = {
    'read this mail again': function() {
      function1();
    }
  };
  annyang.addCommands(commands);
  annyang.start();
}

</script>
@endsection
@endif
@section('scripts')
<script>
  function function1(){
    var subject = $('.mailbox-read-info').find('h5').text();
    if(subject != ''){
      subject = 'not mentioned.'
    }else{
      subject += '.';
    }
    var respect = $('.mailbox-read-info').find('.from_to').text();
    respect = respect.split(":");
    if(respect[0] == 'To'){
      respect = "mail sent to. "+respect[1];
    }else{
      respect = "mail sent by. "+respect[1];
    }
    var txt = 'Hello {{ auth()->user()->name }}, i am going to read this mail, listen carefully.';
    txt += " Subject is "+subject;
    txt += respect;
    txt += ".Date time is ";
    txt += $('.mailbox-read-info').find(".at_date_time").text();
    txt += ".Message is ";
    txt += $(".mailbox-read-message").text();
    if($(".attachment_name").text()){
      txt += ".And attachment is"+$(".attachment_name").text();
    }
    play(txt);
  }
  // function1();
if (annyang) {
  var commands = {
    'read this mail': function() {
      function1();
    },
    'read this mail again': function() {
      function1();
    }
  };
  annyang.addCommands(commands);
  annyang.start();
}
</script>
@endsection
