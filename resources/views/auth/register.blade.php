@extends('layouts.front')

@section('main')
    <section id="breadcrumbs" class="breadcrumbs">
    </section><!-- End Breadcrumbs -->
    <!-- ======= Sign In Section ======= -->
    <section id="signup" class="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-2" data-aos="fade-right">
            <div class="section-title">
              <h2>Sign Up</h2>
            </div>
          </div>

          <div class="col-lg-6 col-md-8 offset-md-2 col-sm-12" data-aos="fade-up" data-aos-delay="100">
                <form method="POST" action="{{ route('register') }}" class="login100-form  form">
                    @csrf
                    <span class="login100-form-title" style="margin-bottom: -25px;">
                        User Registration
                    </span>

                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" name="name"  placeholder="Full Name">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>
                    @error('name')
                        <span class="invalid-feedbac text-danger" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" name="email"  placeholder="Email">
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
                        <input class="input100" type="password" name="password" placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    @error('password')
                        <span class="invalid-feedbac text-danger" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="password" name="password_confirmation" placeholder="Confirm Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    @error('password_confirmation')
                        <span class="invalid-feedbac text-danger" role="alert">
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
    </section><!-- End Sign In Section -->
@endsection
