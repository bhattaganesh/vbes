  <!-- ====== Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container">
      <div class="header-container d-flex align-items-center">
        <div class="logo mr-auto">
          <a href="{{ route('login') }}"><img src="{{ asset('img/favicon.png') }}" alt="" style = "margin-top: -10px;">&nbsp;<h1  style = " color : #00805c;display:inline;">BES</h1></a>
        </div>
        <nav class="nav-menu d-none d-lg-block">
          <ul>
            <li class="{{request()->getRequestUri() == '/voice_chatbot' ? 'active' : ''}}">
              <a href="{{route('voiceChatbot')}}" data-turbolinks="false">Voice Chatbot</a>
            </li>
            <li class="{{request()->getRequestUri() == '/post' ? 'active' : ''}}">
              <a href="{{route('landing')}}" data-turbolinks="true">Posts</a>
            </li>
            <li class="{{request()->getRequestUri() == '/chatbot' ? 'active' : ''}}">
              <a href="{{ route('chatbot') }}" data-turbolinks="false">Chatbot</a>
            </li>
            <li class="{{request()->getRequestUri() == '/blog' ? 'active' : ''}}">
              <a href="{{route('blog')}}" data-turbolinks="true">Blog</a>
            </li>
            <li class="{{request()->getRequestUri() == '/about' ? 'active' : ''}}">
              <a href="{{route('about')}}" data-turbolinks="true">About</a>
            </li>
            <li class = "{{request()->getRequestUri() == '/team' ? 'active' : ''}}">
              <a href="{{route('team')}}" data-turbolinks="true">Team</a>
            </li>
            <li class = "{{request()->getRequestUri() == '/contact' ? 'active' : ''}}">
              <a href="{{route('contact')}}" data-turbolinks="true">Contact</a>
            </li>
            @auth
            <li class="get-started "><a href="{{ route('dashboard')}} " data-turbolinks="false">Dashboard</a></li>
            {{--<li class="get-started ">
              <a title = "Logout" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" role="button">
                    <i class="fas fa-power-off"></i>
                    {{ Form::open(['url'=>route('logout'),'id'=>'logout-form']) }}
                    {{ Form::close() }}
                </a>
            </li>--}}
            @else
            <li class="get-started
            {{request()->getRequestUri() == '/login' ? 'get-started-active' : ''}}">
            <a href="{{route('login')}}"  >
            Home</a></li>
<!--             <li class="get-started gs2
            {{request()->getRequestUri() == '/register' ? 'get-started-active' : ''}}">
            <a href="{{route('register')}}">
            Sign Up</a></li> -->
            @endauth
          </ul>
        </nav><!-- .nav-menu -->
      </div><!-- End Header Container -->
    </div>
  </header><!-- End Header -->
