
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4  sidebar-dark navbar-navy">
        <!-- Brand Logo -->
        <a href="{{ route('dashboard') }}" class="brand-link navbar-navy">
            <img src="{{ asset('img/favicon.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: 1; size : 45px;">
            <span class="brand-text font-weight-bold" style = "color:#228855; opacity : 1; margin-left : -6px;text-size : 25px;">BES</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="pull-left image">
                @if(isset(request()->user()->userInfo['photo']) && !empty(request()->user()->userInfo['photo']))
                    <img src="{{asset('uploads/user/'.request()->user()->userInfo['photo'])}}" class="img-circle elevation-2" alt="User Image" style="height: 45px; width: 45px;"/>
                @else
                    <img src="{{asset('img/avatar.png')}}"  class="img-circle elevation-2" alt="User Image" style="height: 60px; width: 60px;"/>
                @endif
                </div>
                <div class="pull-left info">
                    <a href="javascript:;" class="d-block"> {{ request()->user()->name   }}</a>
                    @if(is_connected())
                        <a href="javascript:;" class = "text-xs"><i class="fa fa-circle text-success"></i> Online</a>
                    @else
                        <a href="javascript:;" class = "text-xs"><i class="fa fa-circle text-secondary"></i> Offline</a>
                    @endif
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2 flex-column nav-compact">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                         with font-awesome or any other icon font library -->
                    <li class="nav-item">
                        <a href="{{ route('dashboard') }}" title = "Dashboard" class="nav-link {{(request()->getRequestUri() == '/dashboard') ? 'active' : ''}}">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                            </p>
                        </a>
                    </li>
                    <li class="nav-item menu-open">
                        <a href="Javascript:;" title = "Mail" class="nav-link ">
                            <i class="nav-icon far fa-envelope"></i>
                            <p> Mail
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('mail.compose') }}" data-turbolinks="false" title = "Compose" class="nav-link {{(request()->getRequestUri() == '/mail/create') ? 'active' : ''}}">
                                    <i class="far fa-edit nav-icon"></i>
                                    <p>Compose</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('inbox.index') }}" title = "Inbox" class="nav-link {{(request()->getRequestUri() == '/mail/inbox') ? 'active' : ''}}">
                                    <i class="fas fa-inbox nav-icon"></i>
                                    <p>Inbox</p>
                                    @if(auth()->user()->unReadNotifications()->where('data->notification_for','user')->count())
                                <span class="badge badge-info right">
                            {{auth()->user()->unReadNotifications()->where('data->notification_for','user')->count()}}</span>
                            @endif
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('sent.index') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'active' : ''}}">
                                    <i class="far fa-paper-plane nav-icon"></i>
                                    <p>Sent</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:;" title = "More" class="nav-link nav_more_btn">
                                    <i class="fa fa-caret-down nav-icon"></i>
                                    <p> More
                                        <i class="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview d-none to_be_toggle">
                                    <li class="nav-item">
                                        <a href="{{ route('draft.index') }}" title = "Draft" class="nav-link {{(request()->getRequestUri() == '/mail/draft') ? 'active' : ''}}">
                                            <i class="far fa-file-alt nav-icon"></i>
                                            <p>Draft</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('trash.index') }}" title = "Trash" class="nav-link {{(request()->getRequestUri() == '/mail/trash') ? 'active' : ''}}">
                                            <i class="far fa-trash-alt nav-icon"></i>
                                            <p>Trash</p>
                                        </a>
                                    </li>
                                    <li class="nav-header mt-1 pt-0">Label</li>
                                    <li class="nav-item">
                                        <a href="{{ route('imp.index') }}" title = "Important Mails" class="nav-link {{(request()->getRequestUri() == '/mail/imp') ? 'active' : ''}}">
                                            <i class="far fa-star nav-icon"></i>
                                            <p>Important</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    @if(auth()->user()->role == 'admin')
                    <li class="nav-header mt-1 pt-0">Manager</li>
                    <li class="nav-item">
                        <a href="Javascript:;" title = "User Manager" class="nav-link ">
                            <i class="nav-icon fa fa-users"></i>
                            <p> User Manager
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('user.create') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/admin/user/create') ? 'active' : ''}}">
                                    <i class="fas fa-user-plus nav-icon"></i>
                                    <p>Add User</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('user.index') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/admin/user') ? 'active' : ''}}">
                                    <i class="far fa-eye nav-icon"></i>
                                    <p>List User</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {{-- <li class="nav-item">
                        <a href="Javascript:;" title = "User Manager" class="nav-link ">
                            <i class="nav-icon fas fa-blog"></i>
                            <p> Blog Manager
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('sent.index') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Add Blog</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('sent.index') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>List Blog</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="Javascript:;" title = "User Manager" class="nav-link ">
                            <i class="nav-icon fa fa-file"></i>
                            <p> Page Manager
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('sent.index') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Add Page</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('sent.index') }}" title = "Sent" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>List Page</p>
                                </a>
                            </li>
                        </ul>
                    </li> --}}
                    @endif
                    <li class="nav-header">Profile</li>
                    <li class="nav-item">
                        <a href="javascript:;" title = "Update Profile" class="nav-link" id="updateProfileBtn">
                            <i class="nav-icon fas fa-user-edit"></i>
                            <p>
                                Update Profile
                            </p>
                        </a>
                    </li>
                    <li class="nav-header">Settings</li>
                    <li class="nav-item">
                        <a href="javascript:;" title ="Change Password" class="nav-link" id="changePasswordBtn">
                            <i class="nav-icon far fa-edit"></i>
                            <p>
                                Change Password
                            </p>
                        </a>
                    </li>
                    @if(auth()->user()->role == 'user')
                    <li class="nav-item">
                        <a href="javascript:;" title = "Delete Account" class="nav-link" id="deleteAccountBtn">
                            <i class="nav-icon fas fa-user-minus"></i>
                            <p>
                                Delete Account
                            </p>
                        </a>
                    </li>
                    @endif
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
