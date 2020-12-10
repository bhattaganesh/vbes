  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container">
      <div class="header-container d-flex align-items-center">
        <div class="logo mr-auto">
          <h1 class="text-light"><a href="{{ route('landing') }}"><span>VBES</span></a></h1>
          <!-- Uncomment below if you prefer to use an image logo -->
          <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
        </div>

        <nav class="nav-menu d-none d-lg-block">
          <ul>
            <li class="{{(request()->getRequestUri() == '/') ? 'active' : ''}}"><a href="{{route('landing')}}">Home</a></li>
            <li class="{{(request()->getRequestUri() == '/about') ? 'active' : ''}}"><a href="{{route('about')}}">About</a></li>
            <li class = "{{(request()->getRequestUri() == '/team') ? 'active' : ''}}"><a href="{{route('team')}}">Team</a></li>
            <li class = "{{(request()->getRequestUri() == '/contact') ? 'active' : ''}}"><a href="{{route('contact')}}">Contact</a></li>
            @auth
            <li class="get-started "><a href="{{ route('dashboard')}} ">Dashboard</a></li>
            <li class="get-started ">
              <a title = "Logout" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" role="button">
                    <i class="fas fa-power-off"></i>
                    {{-- <i class="fas fa-sign-out-alt fa-2x"></i> --}}
                    {{ Form::open(['url'=>route('logout'),'id'=>'logout-form']) }}
                    {{ Form::close() }}
                </a>
            </li>
            @else
            <li class="get-started 
            {{(request()->getRequestUri() == '/login') ? 'get-started-active' : ''}}">
            <a href="{{route('login')}}" id="login">
            Sign In</a></li>
            <li class="get-started gs2 
            {{(request()->getRequestUri() == '/register') ? 'get-started-active' : ''}}">
            <a href="{{route('register')}}">
            Sign Up</a></li>
            @endauth
          </ul>
        </nav><!-- .nav-menu -->
      </div><!-- End Header Container -->
    </div>
  </header><!-- End Header -->