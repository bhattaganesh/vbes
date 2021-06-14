@extends('layouts.front')
@section('title','Confirm')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('chat/css/adminlte.min.css') }}">
@endsection
@section('main')
<section  class="contact">
        <div class="container">
            <div class="col-lg-5 col-md-6 col-sm-8 m-auto" style = "margin-top:-30px !important;" data-aos="fade-up" data-aos-delay="100">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a href="#javascript:;" class="h3" onclick = "history.back();">
                        <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b style = "color:#00805c;">BES</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">Please confirm your password before continuing.</p>
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
        </div>
    </div>
</section>
@endsection
