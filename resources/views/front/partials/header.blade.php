<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VBES | @yield('title')</title>
    {{-- <meta content="" name="descriptison">
    <meta content="" name="keywords">--}}

    <!-- Favicons -->
    <link href="{{ asset('img/favicon.png') }}" rel="icon">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    @yield('styles')
	<script src="https://code.responsivevoice.org/responsivevoice.js?key=auvTMQpf"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
    @if(!is_connected())
    <script src="{{ asset('js/annyangJS/annyang.min.js') }}" class = 'voiceEnabled'></script>
    <script src="{{ asset('js/responsiveVoice/responsiveVoice.js') }}"></script>
    @endif
    <script src="{{ asset('js/turbo.js') }}" data-turbolinks-suppress-warning></script>
</head>

<body class="skin-blue fixed sidebar-mini">
