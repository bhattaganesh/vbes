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
                <li class="breadcrumb-item"><a href="#">Home</a></li>
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
// document.getElementById('compose-textarea').value = "asklfjasldfkjdalfdjaslfkjk";

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'write email *tag': function(variable) {
      let get_elem = document.getElementById('to');
      get_elem.value = variable.split(" ").join("");
    },
    'write subject *tag': function(variable) {
        // $('#subject').val(variable);
      let get_elem = document.getElementById('subject');
      get_elem.value = variable;
    },
    'write message *tag': function(variable) {
      let get_elem = $('#compose-textarea');
      get_elem.summernote('code',variable);
    },
    'continue message *tag': function(variable) {
      let get_elem = $('#compose-textarea');
      get_elem.summernote('insertText'," "+variable);
    },
    'reset message': function() {
      let get_elem = $('#compose-textarea');
      get_elem.summernote('code','');
    },
    'save as draft': function() {
      let get_elem = $('#draft');
      get_elem.click();
    },
    'send email': function(variable) {
      let get_elem = $('#submit_email');
      get_elem.click();
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
/*
    "use strict";
    
    $(document).ready(function() {

        var isRecording = false;                        // create var to track recording state          

        // first we make sure annyang started succesfully
        if (annyang) {          

            // function to speak a response
            var speakText = function(response) {
                
                // setup synthesis
                var msg = new SpeechSynthesisUtterance();
                var voices = window.speechSynthesis.getVoices();
                msg.voice = voices[2];                  // Note: some voices don't support altering params
                msg.voiceURI = 'native';
                msg.volume = 1;                         // 0 to 1
                msg.rate = 1;                           // 0.1 to 10
                msg.pitch = 2;                          // 0 to 2
                msg.text = response;
                msg.lang = 'en-US';
                
                speechSynthesis.speak(msg);
            }
            

            annyang.debug();                                // turn on debugging (console messages)

            // Add voice commands to respond to
            annyang.addCommands(commands);

        } else {
            $("#status").text('Sorry, browser not supported.');
        }
    });
*/
/*$(function () {
  try {
    var recognition = new webkitSpeechRecognition();
  } catch (e) {
    var recognition = Object;
  }
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = function (event) {
    var txtRec = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      txtRec += event.results[i][0].transcript;
    }
    $('#compose-textarea').val(txtRec);
  };
  $('#startRecognition').click(function () {
    $('#compose-textarea').focus();
    recognition.start();
  });
  $('#stopRecognition').click(function () {
    recognition.stop();
  });
});
*/
</script>
@endsection
