@extends('layouts.front')

@section('main')
    <section id="breadcrumbs" class="breadcrumbs">
    </section><!-- End Breadcrumbs -->
    <section id="passwordReset" class="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-4" data-aos="fade-right">
            <div class="section-title">
              <h2>Password Reset</h2>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-8" data-aos="fade-up" data-aos-delay="100">
                    <div class="text p-1">{{ __('Please confirm your password before continuing.') }} </div>   
                    <form method="POST" action="{{ route('password.confirm') }}">
                        @csrf

                    <div class="wrap-input100 validate-input">
                        <input class="input100" id="password" type="password" class="form-control 
                        @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                        @error('password')
                            <span class="invalid-feedbac text-danger" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-md-8" style="float: right !important;">
                            @if (Route::has('password.request'))
                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            @endif
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-md-8 offset-md-2">
                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn">
                                    {{ __('Confirm Password') }}
                                </button>
                            </div>
                        </div>
                    </div>
                    </form>
        </div>
    </div>
    </div>
    </section>
@endsection
