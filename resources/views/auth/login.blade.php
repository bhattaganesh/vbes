@extends('layouts.front')
@section('title','Login')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('chat/css/adminlte.min.css') }}">
@endsection
@section('main')
    <!-- ======= Sign In Section ======= -->
    <section id="signin" class="contact" style = "margin-bottom : -50px !important;">
      <div class="container">
            @if($msg = Session::get('changePasswordSuccess'))
              <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-check"></i> Alert!</h5>
                {{$msg}}
              </div>
            @endif
          <div class="col-lg-5 col-md-6 col-sm-8 m-auto" style = "margin-top:-30px !important;" data-aos="fade-up" data-aos-delay="100">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">

                    <a href="#javascript:;" class="h3" onclick = "history.back();">
                    <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b style = "color:#00805c;">BES</b></a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Sign in to start your session</p>
                    <form method="POST" action="{{ route('login') }}" class="login100" name = "login-form">
                        @csrf
                        <div class = "mb-2 text-center">
                            @error('email')
                                <span class="invalid-feedbac text-danger alert" role="alert">
                                    <strong>{{ $message }}</strong><br>
                                </span>
                            @enderror
                            @error('password')
                                <span class="invalid-feedbac text-danger alert" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" type="text" name="email" required="true" placeholder="Email" id="email" value = "{{ old('email') }}">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" type="password" name="password" required="true" placeholder="Password"style = "width:100%;" id="password" value = "{{ old('password') }}">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            <span class="symbol-password100" style=" text-align:right; padding-right: 5rem;">
                                <i class="fa fa-eye-slash" id="showPassword" style="cursor: pointer;
                                padding: 5px; background: #e6e6e6; margin-right: 40px;"></i>
                            </span>
                        </div>
                        <div class="text-left">
                            <div class="custom-control  custom-checkbox">
                                <input type="checkbox" name = "remember_me" class="custom-control-input" id="remember" {{ old('remember_me') ? 'checked' : '' }}>
                                <label class="custom-control-label" for="remember">{{ __('Remember Me') }}
                                </label>
                            </div>
                        </div>

                        <div class="text-right">
                            <span class="txt1">
                                Forgot
                            </span>
                            <a class="txt2" href="{{ route('password.request') }}" id="forgot_password">
                                Password?
                            </a>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn">
                                Login
                            </button>
                        </div>

                        <div class="text-center p-t-12">
                            <a class="txt2" href="{{route('register')}}">
                                Create your Account
                                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section><!-- End Sign In Section -->
@endsection
@section('scripts')
<script>
if (annyang) {
    var emailCommand =  {
            'enter email *tag' : writeEmail , 'write email *tag' : writeEmail ,
            'write user name *tag' : writeEmail , 'write username *tag' : writeEmail
        };
    var resetFormCommand = { 'reset form' : resetForm };
    var passwordCommand =  {
        'write password *tag' : writePassword,'enter password *tag': writePassword,
        "write pass board *tag" : writePassword,"enter pass word *tag" : writePassword,
        "write passboard *tag" : writePassword,"write passport *tag" : writePassword,
        "write pass word *tag" : writePassword,"enter pass board *tag" : writePassword,
        "enter passport *tag" : writePassword
    };

    var submitCommand =  {
        'submit form' : submitForm,'login' : submitForm,'submit' : submitForm,
        'send login form' : submitForm,'submit login form' : submitForm,"submit sign in form" : submitForm,
        "submit signin form" : submitForm,"send form" : submitForm
    };

    var rememberMeCommand = {
        "check remember me" : checkRememberMe,"tick remember me" : checkRememberMe,
        "select remember me" : checkRememberMe
    }

    var rememberMeUncheckCommand = {
        "uncheck remember me" : uncheckRememberMe,"untick remember me" : uncheckRememberMe,
        "unselect remember me" : uncheckRememberMe,"deselect remember me" : uncheckRememberMe
    }

    var forgotPasswordCommand = {
        "i forgot my password" : clickOnForgotPassword,"forgot password" : clickOnForgotPassword,
        "i haven been forgot my password" : clickOnForgotPassword,
        "click on forgot password" : clickOnForgotPassword
    }

    var resetPasswordCommand = {
        "reset password" : resetPassword,"reset password field" : resetPassword,
        "make empty password field" : resetPassword
    }

    var resetEmailCommand = {
        "reset email" : resetEmail,"reset email field" : resetEmail,
        "make empty email field" : resetEmail
    }

    var readEmailCommand = {
        "read email" : readEmail,"read email field" : readEmail,
        "what is value of email field" : readEmail
    }
    var fillFormCommand = {'fill the form': fillForm, 'fill the login form': fillForm, 'fill login form' : fillForm};

    /* functions   */
    function fillForm(){
        lang = "UK English Female";
        function voiceEndCallback() {

            function firstConfirmCallback(){
                annyang.addCommands({
                    ' *tag ' : function(tag){
                        if((tag == 'yes') || (tag == 'yes, i am ready')){
                            play("");
                            setTimeout(play("What is your user name?"),1500);
                        }
                    }
                });
            }
            var parameters = {
                onend: firstConfirmCallback
            }
            playWithParam("This is login form. Are you ready to login",parameters);
        }

        var parameters = {
            onend: voiceEndCallback
        }

    }
    function writeEmail(variable){
        let idForField = 'email';
        let wildcard = variable;
        wildcard = wildcard.replace("atthe rate", "@");
        wildcard = wildcard.replace("at the rate", "@");
        wildcard = wildcard.toLowerCase();
        // wildcard = wildcard.replace(" ", "");
        wildcard = wildcard.split(" ").join("");
        fillFormField(wildcard,idForField);
    }

    function writePassword(variable){
        let idForField = 'password';
        let wildcard = variable;
        fillFormField(wildcard,idForField);
    }

    function checkRememberMe(){
        if($("#remember").is(":not(:checked)")){
            $("#remember").click();
        }
    }

    function uncheckRememberMe(){
        if($("#remember").is(":checked")){
            $("#remember").click();
        }
    }

    function clickOnForgotPassword(){
        let get_elem = document.getElementById("forgot_password");
        get_elem.click();
    }

    function resetForm(){
        /* document.getElementById("email").value = '';
        document.getElementById("password").value = ''; */
        $('form').trigger("reset");
    }

    function submitForm(){
        $('form').submit();
    }

    function resetPassword(){
        let idForField = 'password';
        resetFormField(idForField);
    }

    function resetEmail(){
        let idForField = 'email';
        resetFormField(idForField);
    }

    function readEmail(){
        console.log("this is email field");
        let idForField = 'email';
        readFormField(idForField);
    }
  // Add our commands to annyang
addCommands([
    emailCommand,passwordCommand,submitCommand,rememberMeCommand,
    rememberMeUncheckCommand,forgotPasswordCommand,resetFormCommand,
    resetPasswordCommand,resetEmailCommand,readEmailCommand,fillFormCommand
]);
  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
</script>
@endsection
