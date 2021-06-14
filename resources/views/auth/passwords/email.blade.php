@extends('layouts.front')
@section('title','Email')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('chat/css/adminlte.min.css') }}">
@endsection
@section('main')
    <section  class="contact">
        <div class="container">
            <div class="col-lg-5 col-md-6 col-sm-8 m-auto"  data-aos="fade-up" data-aos-delay="100">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a href="#javascript:;" class="h3" onclick = "history.back();">
                        <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b style = "color:#00805c;">BES</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">Send Password Reset Link</p>
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                         @endif
                        <form method="POST" action="{{ route('password.email') }}">
                            @csrf
                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="email" type="email" name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email">
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
                                            {{'Send'}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
