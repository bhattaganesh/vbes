@extends('layouts.front')

@section('main')
    <section id="breadcrumbs" class="breadcrumbs">
    </section><!-- End Breadcrumbs -->
    <!-- ======= Sign In Section ======= -->
    <section id="signin" class="contact">
      <div class="container">
            @if($msg = Session::get('changePasswordSuccess'))
              <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-check"></i> Alert!</h5>
                {{$msg}}
              </div>
            @endif
        <div class="row">
          <div class="col-lg-2" data-aos="fade-right">
            <div class="section-title">
              <h2>Sign In</h2>
            </div>
          </div>
          <div class="col-lg-6 col-md-8 offset-md-2 col-sm-12" data-aos="fade-up" data-aos-delay="100">
                <form method="POST" action="{{ route('login') }}" class="login100-form  form">
                    @csrf
                    <span class="login100-form-title" style="margin-bottom: -25px;">
                        User Login
                    </span>

                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" name="email" placeholder="Email" id="email">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>
                    @error('email')
                        <span class="invalid-feedbac text-danger" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="password" name="password" placeholder="Password"style = "width:100%;" id="password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                        <span class="symbol-password100" style=" text-align:right; padding-right: 5rem;">
                            <i class="fa fa-eye-slash" id="showPassword" style="cursor: pointer;
                            padding: 5px; background: #e6e6e6; margin-right: 40px;"></i>
                        </span>
                    </div>
                    @error('password')
                        <span class="invalid-feedbac text-danger" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <div class="text-left">
                        <div class="custom-control  custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="remember" {{ old('remember') ? 'checked' : '' }}>
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
    </section><!-- End Sign In Section -->
@endsection
@section('scripts')
<script>
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'write email *tag': function(variable) {
        let get_elem = document.getElementById("email");
        get_elem.value = variable.split(" ").join("");
    },
    'write password *tag': function(variable) {
        let get_elem = document.getElementById("password");
        get_elem.value = variable;
    },
    'check remember me': function() {
        let get_elem = document.getElementById("remember");
        get_elem.click();
    },
    'i forgot my password': function() {
        let get_elem = document.getElementById("forgot_password");
        get_elem.click();
    },
    'reset form': function() {
    document.getElementById("email").value = '';
    document.getElementById("passwords").value = '';
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
</script>
@endsection
