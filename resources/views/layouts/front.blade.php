@include('front.partials.header')
<main id="main">
@yield('main')
</main>
 <!-- ======= Footer ======= -->
<footer id="footer">
    <div class="container py-2 justifiy-content-around">
        <div class="m-auto text-center text-black text-lg">
            <a href="{{ route('contact') }}" class="p-2 {{(request()->getRequestUri() == '/contact') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;"></i>Contact</a>
            <a href="{{ route('about') }}" class="p-2  {{(request()->getRequestUri() == '/about') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;"></i>About</a>
            <a href="{{ route('faq') }}" class="p-2 {{(request()->getRequestUri() == '/faq') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">FAQs</i></a>
            <a href="javascript:;" class="p-2 text-gray " style = "font-size : 14px;"></i>Terms</a>
            <a href="javascript:;" class="p-2 text-gray " style = "font-size : 14px;"></i>Privacy</a>
            <a href="" class="p-2 text-gray " style = "font-size : 14px;">Blog</a>
            <a href="{{ route('chatbot') }}" data-turbolinks="false" class="p-2 {{(request()->getRequestUri() == '/chatbot') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">Chatbot</a>
            <a href="javascript:;" class="p-2 text-gray " style = "font-size : 14px;">Posts</a>
            <a href="{{ route('voiceChatbot') }}" class="p-2 {{(request()->getRequestUri() == '/voice_chatbot') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">Voice Chatbot</a>
            <a href="{{ route('team') }}" class="p-2 {{(request()->getRequestUri() == '/team') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">Team</a>
            @guest
            <!-- <a href="{{ route('login') }}" class="p-2 {{(request()->getRequestUri() == '/login') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">Login</a>
            <a href="{{ route('register') }}" class="p-2 {{(request()->getRequestUri() == '/register') ? 'text-primary' : 'text-gray'}}" style = "font-size : 14px;">Register</a>-->
            @endguest

        </div>
    </div>
@include('front.partials.footer')


