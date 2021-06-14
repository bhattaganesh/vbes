
 <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-dark navbar-navy">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="javascript:;" role="button"><i class="fas fa-bars"></i></a>
            </li>
            {{--<li class="nav-item d-none d-sm-inline-block">

                <a href="{{ (auth()->user()->role == 'admin') ? route('admin') : route('landing') }}" title = "Home Page" class="nav-link" data-turbolinks="false" >Home</a>
            </li>--}}
        </ul>

    <div class="form-inline">
        <div class="input-group input-group-sm search-box" title = "Search User by Email Address">
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
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <!-- Messages Dropdown Menu -->
            <li class="nav-item dropdown">
                <a class="nav-link nav-email_notif" data-toggle="dropdown" href="javascript:;">
                    <i class="far fa-envelope"></i>
                    @if(auth()->user()->unReadNotifications()->where('data->notification_for','user')->count() > 0)
                        <span class="badge badge-danger navbar-badge">
                            {{auth()->user()->unReadNotifications()->where('data->notification_for','user')->count()}}
                        </span>
                    @endif
                </a>
                @if(auth()->user()->notifications()->where('data->notification_for','user')->count() > 0)
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <p class = "p-1 ml-2">You have 
                    {{ auth()->user()->unReadNotifications()->where('data->notification_for','user')->count() }} messages </p>
                    <div class="dropdown-divider"></div>
                    @foreach(auth()->user()->notifications()->where('data->notification_for','user')->get() as $key => $notification)
                        <!-- Message Start -->
                        @if($key < 3)
                        <a href="{{route('inbox.show',$notification->data['inbox_id'])}}" 
                        data-inbox_not_id = "{{$notification->id}}"
                        data-inbox_id = "{{ $notification->data['inbox_id'] }}" class="dropdown-item inbox_not">
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
                        </a>
                        <div class="dropdown-divider"></div>
                        @endif
                        <!-- Message End -->
                    @endforeach
                    @if(auth()->user()->Notifications()->where('data->notification_for','user')->count() > 0)
                    <a href="{{route('inbox.index')}}" class="dropdown-item dropdown-footer">See All Mails</a>
                    @endif
                </div>
                @else
                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <h4 class = 'text-center text-danger'>Empty</h4>
                </div>
                @endif

            </li>
            <!-- Notifications Dropdown Menu -->
            <li class="nav-item dropdown">
                @if(auth()->user()->role == "admin")
                    <a class="nav-link nav-notif" data-toggle="dropdown" href="javascript:;">
                        <i class="far fa-bell"></i>
                    @if(auth()->user()->unReadNotifications()->where('data->notification_for','admin')->count() > 0)
                        <span class="badge badge-warning navbar-badge">
                            {{ auth()->user()->unReadNotifications()->where('data->notification_for','admin')->count() }}
                        </span>
                    @endif
                    </a>
                @endif
                @if(auth()->user()->notifications()->where('data->notification_for','admin')->count() > 0)
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    @if(auth()->user()->role == "admin")
                        @if(auth()->user()->unReadNotifications()->where('data->notification_for','admin')->count() > 0)
                            <span class="dropdown-item dropdown-header">
                                {{ auth()->user()->unReadNotifications()->where('data->notification_for','admin')->count() }}
                                Notifications
                            </span>
                        @endif
                        @foreach(auth()->user()->notifications()->where('data->notification_for','admin')->get() as $key => $notification)
                        @if($key < 3)
                        <div class="dropdown-divider"></div>
                            <a href="{{ route('user.show', $notification->data['email']) }}" class="dropdown-item">
                                <i class="fa fa-user-plus mr-2"></i> 1 new user
                                <span class="float-right text-muted text-sm">{{ $notification->created_at->diffForHumans() }}</span>
                            </a>
                        @endif
                        @endforeach
                        <div class="dropdown-divider"></div>
                        <a href="{{ route('user.index') }}" class="dropdown-item dropdown-footer">See All users</a>
                        @if(auth()->user()->unReadNotifications()->where('data->notification_for','admin')->count() > 0)
                            <div class="dropdown-divider"></div>
                            <a href="{{ route('user.show', 'returnBack')}}"  class="dropdown-item dropdown-footer">Mark all as read</a>
                        @endif
                    @else
                        @if(auth()->user()->notifications()->where('data->notification_for','user')->count() > 0)
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item dropdown-footer">See All notifications</a>
                        @endif
                    @endif
                </div>
                {{--
                    @elseif(auth()->user()->notifications()->where('data->notification_for','user')->count() > 0)
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    @if(auth()->user()->role == "user")
                        @if(auth()->user()->unReadNotifications()->where('data->notification_for','user')->count() > 0)
                            <span class="dropdown-item dropdown-header">
                                {{ auth()->user()->unReadNotifications()->where('data->notification_for','user')->count() }}
                                Notifications
                            </span>
                        @endif
                    @endif
                    @if(auth()->user()->role == "user")
                        @if(auth()->user()->notifications()->where('data->notification_for','user')->count() > 0)
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item dropdown-footer">See All notifications</a>
                        @endif
                    @endif
                </div> --}}
                @else
                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <h4 class = 'text-center text-danger'>Empty</h4>
                </div>
                @endif
            </li>
            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen"  href="javascript:;" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li>
            @if(auth()->user()->role == 'user')
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                <i class="fa fa-lock"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right p-0">
                    <p style = "font-size : 12px;" class = "text-center p-1">Lock Screen after (in Minutes)</p>
                    <form action="{{ route('screenLock') }}" method="post" id = "screenLockForm">
                        @csrf
                        @method('patch')
                        <div class="form-group">
                            <input type="number" name="lockout_time" id="" class = "form-control" min = "1" max = "90" placeholder = "Enter Minutes" required>
                        </div>
                    </form>
                    <input type="button" value="Lock" class = "btn btn-primary btn-block" onclick = "document.getElementById('screenLockForm').submit();">
                </div>
            </li>
            @endif
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
