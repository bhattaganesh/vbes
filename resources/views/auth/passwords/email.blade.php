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
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                    <div class="wrap-input100 validate-input">
                        <input class="input100" id="email" type="email" name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                        @error('email')
                            <span class="invalid-feedbac text-danger" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-2">
                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn">
                                        {{'Send Password Reset Link'}}
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
