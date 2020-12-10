    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="{{route('landing')}}" class="nav-link">Home</a>
            </li>
        </ul>

    <div class="form-inline">
        <div class="input-group input-group-sm search-box">
          <input class="form-control form-control-navbar" type="search" placeholder="Search"  name="query" id="search_navbar">
          <div class="input-group-append">
            <button type="button" id="search_navbar_btn" class="btn btn-navbar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
        <div class="sidebar-search-result" style="position: absolute; top:45px;">
            <div class="list-group" id="navbar_search_result">
            </div>
        </div>
    </div>
{{-- 
    <div class="sidebar-search-results">
        <div class="list-group">
            <a href="../charts/chartjs.html" class="list-group-item">
                <div class="search-title">
                  <b class="text-light">Char</b>tJS
                </div>
                <div class="search-path">
                  Charts
                </div>
            </a>
        </div>
    </div>


    <div class="sidebar-search-results">
        <div class="list-group">
            <a href="#" class="list-group-item">
                <div class="search-title">
                  No element found!
                </div>
                <div class="search-path">
                  
                </div>
            </a>
        </div>
    </div> --}}

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <!-- Messages Dropdown Menu -->
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-envelope"></i>
                    @if(auth()->user()->unReadNotifications->count() > 0)
                        <span class="badge badge-danger navbar-badge">
                            {{auth()->user()->unReadNotifications->count()}}
                        </span>
                    @endif
                </a>
                @if(auth()->user()->Notifications->count() > 0)
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    @foreach(auth()->user()->notifications as $key => $notification)
                    <a href="{{route('inbox.show',$notification->data['inbox_id'])}}" data-inbox_not_id = "{{$notification->id}}"
                     data-inbox_id = "{{ $notification->data['inbox_id'] }}" class="dropdown-item inbox_not">
                        <!-- Message Start -->
                        @if($key < 3)
                        <div class="media">
                            @php 
                                $email = $notification->data['sender_id']; 
                                $user_id = DB::table('users')->where('email',$email)->value('id');
                                $photo = DB::table('user_infos')->where('user_id',$user_id)->value('photo');  
                            @endphp
                            <img src="{{ ($photo != null) ? asset('/uploads/user/'.$photo) : asset('img/avatar.png')  }}" alt="User Avatar" class="img-size-50 mr-3 img-circle" style="width: 50px; height: 50px;">
                            <div class="media-body">
                                <h3 class="dropdown-item-title">
                                    {{$notification->data['sender_id']}}
                                </h3>
                                <p class="text-sm">{{ Illuminate\Support\Str::limit($notification->data['subject'],25,'...')}}</p>
                                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 
                                    {{ $notification->created_at->diffForHumans() }} 
            
                                    {!!($notification->read_at == NULL) ? '' : '<i class = "fa fa-check float-right" title = "seen"></i>' !!} 
                                </p>
                            </div>
                        </div>
                        @endif
                        <!-- Message End -->
                    </a>
                    <div class="dropdown-divider"></div>
                    @endforeach
                    @if(auth()->user()->Notifications->count() > 0)
                    <a href="{{route('inbox.index')}}" class="dropdown-item dropdown-footer">See All Mails</a>
                    @endif
                </div>
                @endif
            </li>
            <!-- Notifications Dropdown Menu -->
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-bell"></i>
                    <span class="badge badge-warning navbar-badge">15</span>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span class="dropdown-item dropdown-header">15 Notifications</span>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-envelope mr-2"></i> 4 new messages
                        <span class="float-right text-muted text-sm">3 mins</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-users mr-2"></i> 8 friend requests
                        <span class="float-right text-muted text-sm">12 hours</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-file mr-2"></i> 3 new reports
                        <span class="float-right text-muted text-sm">2 days</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                    <i class="fas fa-th-large"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" title = "Logout"  href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" role="button">
                    <i class="fas fa-power-off"></i>
                    {{ Form::open(['url'=>route('logout'),'id'=>'logout-form', 'class' => 'd-none']) }}
                    {{ Form::close() }}
                </a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->