@extends('layouts.front')
@section('title','Email Verfication')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('chat/css/adminlte.min.css') }}">
@endsection
@section('main')
<section id="emailVerfication" class="contact">
    <div class="container">
        <div class="col-lg-5 col-md-6 col-sm-8 m-auto"  data-aos="fade-up" data-aos-delay="100">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <a href="#javascript:;" class="h3" onclick = "history.back();">
                    <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b style = "color:#00805c;">BES</b></a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">{{ __('Before proceeding, please check your email for a verification link.') }}
                    {{ __('If you did not receive the email') }},</p>
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('A fresh verification link has been sent to your email address.') }}
                        </div>
                    @endif
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('click here to request another') }}</button>.
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
@endsection
@section('scripts')
<script>
if (annyang) {
    var emailCommand =  {
            'enter email *tag' : writeEmail , 'write email *tag' : writeEmail ,
            'write user name *tag' : writeEmail , 'write username *tag' : writeEmail
        };
    var submitCommand =  {
            'submit form' : submitForm,'submit' : submitForm,
            "send form" : submitForm
        };
    function writeEmail(variable){
        let idForField = 'email';
        let wildcard = variable;
        wildcard = wildcard.replace("atthe rate", "@");
        wildcard = wildcard.replace("at the rate", "@");
        wildcard = wildcard.split(" ").join("");
        fillFormField(wildcard,idForField);
    }
    function submitForm(){
        $('form').submit();
    }

    addCommands([
        emailCommand,submitCommand
    ]);
}
</script>
@endsection
