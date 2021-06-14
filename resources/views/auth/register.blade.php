@extends('layouts.front')
@section('title','Register')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('chat/css/adminlte.min.css') }}">
@endsection
@section('main')
    <!-- ======= Sign In Section ======= -->
    <section id="signup" class="contact" style = "margin-bottom : -50px !important;">
      <div class="container">
            <div class="col-lg-5 col-md-6 col-sm-8 m-auto" style = "margin-top:-30px !important;" data-aos="fade-up" data-aos-delay="100">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a href="#javascript:;" class="h3" onclick = "history.back();">
                        <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b style = "color:#00805c;">BES</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">Create a new account</p>
                        <form method="POST" action="{{ route('register') }}" class="login100">
                            @csrf
                            <div class="wrap-input100 validate-input">
                                <input class="input100" type="text" name="name"  id = "name" value = "{{ old('name') }}" required="true" placeholder="Full Name">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>
                            @error('name')
                                <span class="invalid-feedbac text-danger alert" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="wrap-input100 validate-input">
                                <input class="input100" type="text" id = "email" name="email" value = "{{ old('email') }}" required="true" placeholder="Email">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            @error('email')
                                <span class="invalid-feedbac text-danger alert" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="wrap-input100 validate-input">
                                <input class="input100" type="password" id = "password" name="password"  required="true" placeholder="Password">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            @error('password')
                                <span class="invalid-feedbac text-danger alert" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="wrap-input100 validate-input">
                                <input class="input100" type="password" id = "cpassword" name="password_confirmation" required="true" placeholder="Confirm Password">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            @error('password_confirmation')
                                <span class="invalid-feedbac text-danger alert" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn">
                                    Register
                                </button>
                            </div>

                            <div class="text-center p-t-12">
                                <a class="txt2" href="{{route('login')}}">
                                    Login
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

    var nameCommand =  {
        'write name *tag' : writeName,'enter name *tag' : writeName
    };

    var emailCommand =  {
        'enter email *tag' : writeEmail , 'write email *tag' : writeEmail ,
        'write user name *tag' : writeEmail , 'write username *tag' : writeEmail
    };

    var passwordCommand =  {
        'write password *tag' : writePassword,'enter password *tag': writePassword,
        "write pass board *tag" : writePassword,"enter pass word *tag" : writePassword,
        "write passboard *tag" : writePassword,"write passport *tag" : writePassword,
        "write pass word *tag" : writePassword,"enter pass board *tag" : writePassword,
        "enter passport *tag" : writePassword
    };

    var confirmPasswordCommand =  {
        'write confirm password *tag' : writeConfirmPassword,'enter confirm password *tag': writeConfirmPassword,
        "write confirm pass board *tag" : writeConfirmPassword,"enter confirm pass word *tag" : writeConfirmPassword,
        "write confirm passboard *tag" : writeConfirmPassword,"write confirm passport *tag" : writeConfirmPassword,
        "write confirm pass word *tag" : writeConfirmPassword,"enter confirm pass board *tag" : writeConfirmPassword,
        "enter confirm passport *tag" : writeConfirmPassword
    };

    var submitCommand =  {
        'submit form' : submitForm,'register' : submitForm,'submit' : submitForm,
        'send register form' : submitForm,'submit register form' : submitForm,
        "submit registration form" : submitForm,"submit sign up form" : submitForm,
        "submit signup form" : submitForm,"send form" : submitForm
    };

    var resetFormCommand = { 'reset form' : resetForm };

    var resetPasswordCommand = {
        "reset password" : resetPassword,"reset password field" : resetPassword,
        "make empty password field" : resetPassword
    }

    var resetConfirmPasswordCommand = {
        "reset confirm password" : resetConfirmPassword,"reset confirm password field" : resetConfirmPassword,
        "make empty confirm password field" : resetConfirmPassword
    }

    var resetEmailCommand = {
        "reset email" : resetPassword,"reset email field" : resetPassword,
        "make empty email field" : resetPassword
    }

    var resetNameCommand = {
        "reset anme" : resetName,"reset anme field" : resetName,
        "make empty anme field" : resetName
    }
    /* functions   */

    function writeName(variable){
        let wildcard = variable;
        let idForField = 'name';
        fillFormField(wildcard,idForField);
    }

    function writeEmail(variable){
        let idForField = 'email';
        let wildcard = variable;
        wildcard = wildcard.replace("atthe rate", "@");
        wildcard = wildcard.replace("at the rate", "@");
        // wildcard = wildcard.replace(" ", "");
        wildcard = wildcard.toLowerCase();
        wildcard = wildcard.split(" ").join("");
        fillFormField(wildcard,idForField);
    }

    function writePassword(variable){
        let idForField = 'password';
        let wildcard = variable;
        fillFormField(wildcard,idForField);
    }

    function writeConfirmPassword(variable){
        let idForField = 'cpassword';
        let wildcard = variable;
        fillFormField(wildcard,idForField);
    }

    function resetForm(){
        $('form').trigger("reset");
    }

    function resetName(){
        let idForField = 'name';
        resetFormField(idForField);
    }

    function resetEmail(){
        let idForField = 'email';
        resetFormField(idForField);
    }

    function resetPassword(){
        let idForField = 'password';
        resetFormField(idForField);
    }

    function resetConfirmPassword(){
        let idForField = 'cpassword';
        resetFormField(idForField);
    }

    function submitForm(){
        $('form').submit();
    }

/* commands  */

  // Add our commands to annyang
addCommands([
    nameCommand,emailCommand,passwordCommand,confirmPasswordCommand,
    resetFormCommand,resetNameCommand,resetEmailCommand,
    resetPasswordCommand,resetConfirmPasswordCommand,submitCommand
]);
  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
// offLinePlay("hello guys");
</script>
@endsection
