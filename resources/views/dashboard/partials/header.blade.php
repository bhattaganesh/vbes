<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VBES | @yield('title')</title>
    <link href="{{ asset('img/favicon.png') }}" rel="icon">
    @if(is_connected())
    <script src="{{ asset('js/annyangJS/annyang.min.js') }}" class = 'voiceEnabled'></script>
    @endif
	<script src="https://code.responsivevoice.org/responsivevoice.js?key=auvTMQpf"></script> 

    <!-- <script src="{{ asset('js/responsiveVoice/responsiveVoice.js') }}"></script> -->
    {{-- <script src="{{ asset('js/turbo.js') }}" data-turbolinks-suppress-warning></script> --}}
    <link rel="stylesheet" href="{{ mix('css/dashboard.css') }}">
    @yield('styles')
</head>

