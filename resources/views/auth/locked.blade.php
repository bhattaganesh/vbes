@extends('layouts.front')
@section('title','Screen Lock')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('chat/css/adminlte.min.css') }}">
@endsection
@section('main')
    <!-- ======= Sign In Section ======= -->
<section id="signin" class="contact">
    <div class="col-lg-5 col-md-6 col-sm-8 m-auto"   data-aos="fade-up" data-aos-delay="100">
        <div class="card card-outline card-primary" style = "background:#eef !important;">
            <div class="card-header text-center">
                <a href="#javascript:;" class="h3" onclick = "history.back();">
                <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b style = "color:#00805c;">BES</b></a>
            </div>
            <div class="card-body">
                <!-- Automatic element centering -->
                <div class="lockscreen-wrapper">
                    <!-- User name -->
                    <div class="lockscreen-name text-center">{{ auth()->user()->name }}</div>

                    <!-- START LOCK SCREEN ITEM -->
                    <div class="lockscreen-item">
                        <!-- lockscreen image -->
                        <div class="lockscreen-image">
                            <!-- <img src="{{ asset('img/avatar.png') }}" alt="User Image"> -->
                            @if(isset(request()->user()->userInfo['photo']) && !empty(request()->user()->userInfo['photo']))
                                <img src="{{asset('uploads/user/'.request()->user()->userInfo['photo'])}}"  alt="User Image"/>
                            @else
                                <img src="{{asset('img/avatar.png')}}"   alt="User Image" />
                            @endif
                        </div>
                        <!-- /.lockscreen-image -->

                        <!-- lockscreen credentials (contains the form) -->
                        <form class="lockscreen-credentials" id = "lockScreenForm"  method="POST" action="{{ route('login.unlock') }}" aria-label="{{ __('Locked') }}">
                            @csrf
                        <div class="input-group">
                            <input type="password" name = "password" class="form-control {{ $errors->has('password') ? ' is-invalid' : '' }}" placeholder="password">
                            <div class="input-group-append">
                            <button type="button" class="btn">
                                <!-- <a href="javascript:;" onclick="document.getElementById('#lockScreenForm').submit();"></a> -->
                                <i class="fas fa-arrow-right text-muted" id = "lockScreenSubmitBtn"></i>
                            </button>
                            </div>
                        </div>
                        </form>
                        <!-- /.lockscreen credentials -->

                    </div>
                    <div class = "error-message"></div>
                    <!-- /.lockscreen-item -->
                    <div class="help-block text-center py-4">
                        Enter your password to retrieve your session
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
@endsection
@section('scripts')
<script>
//Screen unlock - process
    var timeOut = null,
        myXHR = null;
    $(document).ready(function(){
        $('#lockScreenForm').find("input[name='password']").keyup(function(){
        // It will clear the setTimeOut activity if valid.
        if(timeOut) clearTimeout(timeOut);
        var password = $(this).val();
        var _token = $('#lockScreenForm').find("input[name='_token']").val();
        if(password.length >= 8){
        timeOut = setTimeout(function(){
            // Cancel the last request if valid
            if(myXHR) myXHR.abort();
            myXHR = $.ajax({
                url: "{{ route('login.unlock') }}",
                type:'post',
                data: {
                  _token:_token,
                 password:password
                 },
            }).done(function(response){
                if(typeof(response) != "object"){
                    response = JSON.parse(response);
                }
                if(response.status){
                     window.location = "{{route('dashboard')}}";
                }else{
                    $(".error-message").html('');
                    $(".error-message").css('display','block');
                    $('.error-message').
                        html('<div class="alert alert-danger alert-dismissible pass-chng-msg"><button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button><strong>'
                        +response.msg+'  &#128542</strong></div>');
                    setTimeout(() =>{
                        $('.error-message').slideUp();
                    },3000);
                }
            });
        }, 250);// wait for quarter second.
        }
    });
    });
</script>
@endsection

