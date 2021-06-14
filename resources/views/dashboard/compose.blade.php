@extends('layouts.dashboard')
@section('title','Compose')
@section('content-header')
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1>Compose</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">VBES</a></li>
                <li class="breadcrumb-item active">Compose</li>
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
                    <h3 class="card-title">Compose New Message</h3>
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all()  as $key => $error)
                                    @if($key == 0)
                                    <li>{{ $error }}</li>
                                  {!! readLoud($error) !!}
                                    @endif
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>
                <!-- /.card-header -->
                {{Form::open(['url'=>route('mail.store'),'id'=>'mail_form','files'=>true])}}
                    <div class="card-body">
                        <div class="form-group">
                            <input class="form-control" id="to" placeholder="To:" name="receiver_id" value="{{ old('receiver_id') ?? (@$search_data ?? (@$draft_data->mail->receiver_id ?? ((@$out_data != null) ? @$out_data->receiver_id : @$in_data->sender_id))) }}">
                        </div>
                        <div class="form-group">
                            <input class="form-control" id="subject" placeholder="Subject:" name="subject" value="{{ old('subject') ?? (@$draft_data->mail->subject ?? ((@$out_data != null) ? @$out_data->subject : @$in_data->subject)) }}">
                        </div>
                        <div class="form-group">
                            <textarea id="compose-textarea" name="message"  class="form-control summernote">
                                {{ old('message') ?? @$draft_data->mail->message}}
                            </textarea>
                        </div>
                        <div class="form-group">
                                <input type="file" name="attachment" id="filer_input" multiple="multiple">
                          <div class="alert alert-danger compose-file-error" style="display: none;"></div>
                            <p class="help-block">Max. 32MB</p>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <div class="float-right">
                            <div class="d-none for_draft"></div>
                            <button type="button" id="draft"  class="btn btn-default"><i class="fas fa-pencil-alt"></i> Draft</button>
                            <button type="submit" id= "submit_email" class="btn btn-primary"><i class="far fa-envelope"></i> Send</button>
                        </div>
                        <button type="reset"  class="btn btn-default"><i class="fas fa-times"></i> Discard</button>
                    </div>
                    <!-- /.card-footer -->
                {{Form::close()}}
            </div>
            <!-- /.card -->
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->
</div><!-- /.container-fluid -->
@endsection
@section('scripts')
<script>
if (annyang) {
  var commands = {
    'write email *tag': function(variable) {
      let get_elem = document.getElementById('to');
      get_elem.value = variable.split(" ").join("");
    },
    'write user name *tag': function(variable) {
      let get_elem = document.getElementById('to');
      get_elem.value = variable.split(" ").join("");
    },
    'write receiver\'s email address *tag': function(variable) {
      let get_elem = document.getElementById('to');
      get_elem.value = variable.split(" ").join("");
    },
    'write subject *tag': function(variable) {
      let get_elem = document.getElementById('subject');
      get_elem.value = variable;
    },
    'write message': function() {
        play("Now you can say your message");
      annyang.addCallback('result', function(phrases) {
        if((phrases[0] == "let's finish my message")|| (phrases[0] == "finish my message") || (phrases[0] == "finish") || (phrases[0] == "save my message") || (phrases[0] == "save message") || (phrases[0] == "finish message")){
            play("you finished your message");
            annyang.removeCallback("result");
            $('#compose-textarea').trigger("focusout");
            $('#compose-textarea').summernote('enable');
        }else{
            let get_elem = $('#compose-textarea');
            get_elem.summernote('disable');
            console.log(phrases[0]);
            let phrase = phrases[0]+". ";
            console.log(phrase);
            get_elem.summernote('insertText',phrase);
        }
      });
    },
    'continue message *tag': function(variable) {
      let get_elem = $('#compose-textarea');
      get_elem.summernote('insertText'," "+variable);
    },
    'continue subject *tag': function(variable) {
      document.getElementById('subject').value += " "+variable;
    },
    'reset message': function() {
      let get_elem = $('#compose-textarea');
      get_elem.summernote('code','');
    },
    'reset subject': function() {
      let get_elem = $('#subject');
      get_elem.val("");
    },
    'reset email address': function() {
      let get_elem = $('#to');
      get_elem.val("");
    },
    'reset mail address': function() {
      let get_elem = $('#to');
      get_elem.val("");
    },
    'reset receiver\'s email address': function() {
      let get_elem = $('#to');
      get_elem.val("");
    },
    'reset user name': function() {
      let get_elem = $('#to');
      get_elem.val("");
    },
    'read message': function() {
      let get_elem = $('#compose-textarea');
      play(get_elem.val());
    },
    'read subject': function() {
      let get_elem = document.getElementById('subject');
      play(get_elem.value);
    },
    'read mail address': function() {
      let get_elem = document.getElementById('to');
      play(get_elem.value);
    },
    'read email address': function() {
      let get_elem = document.getElementById('to');
      play(get_elem.value);
    },
    'read receiver\'s email address': function() {
      let get_elem = document.getElementById('to');
      play(get_elem.value);
    },
    'save as draft': function() {
      let get_elem = $('#draft');
      get_elem.click();
    },
    'send email': function(variable) {
      let get_elem = $('#submit_email');
      get_elem.click();
    },
    'send mail': function(variable) {
      let get_elem = $('#submit_email');
      get_elem.click();
    },
    'send form': function(variable) {
      let get_elem = $('#submit_email');
      get_elem.click();
    },
    'submit form': function(variable) {
      let get_elem = $('#submit_email');
      get_elem.click();
    },

  };
  annyang.addCommands(commands);
  annyang.start();
}
</script>
@endsection
