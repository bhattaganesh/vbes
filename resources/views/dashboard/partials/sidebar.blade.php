    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="{{ route('dashboard') }}" class="brand-link">
            <img src="{{ asset('img/AdminLTELogo.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">VBES</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="{{ ((request()->user()->userInfo['photo']) != null) ? asset('uploads/user/'.request()->user()->userInfo['photo']) : asset('img/avatar.png') }}" class="img-circle elevation-2" alt="User Image" style="height: 45px; width: 45px;">
                </div>
                <div class="info">
                    <a href="#" class="d-block">{{ request()->user()->name }}</a>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                         with font-awesome or any other icon font library -->
                    <li class="nav-item">
                        <a href="{{ route('dashboard') }}" class="nav-link {{(request()->getRequestUri() == '/dashboard') ? 'active' : ''}}">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                            </p>
                        </a>
                    </li>
                    <li class="nav-item menu-open">
                        <a href="#" class="nav-link ">
                            <i class="nav-icon far fa-envelope"></i>
                            <p> Mail
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="{{ route('mail.compose') }}" class="nav-link {{(request()->getRequestUri() == '/mail/create') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Compose</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('inbox.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/inbox') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Inbox</p>
                                    @if(auth()->user()->unReadNotifications->count())
                                <span class="badge badge-info right">
                            {{auth()->user()->unReadNotifications->count()}}</span>
                            @endif
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('sent.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'active' : ''}}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Sent</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link nav_more_btn">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p> More
                                        <i class="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview d-none to_be_toggle">
                                    <li class="nav-item">
                                        <a href="{{ route('draft.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/draft') ? 'active' : ''}}">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Draft</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('trash.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/trash') ? 'active' : ''}}">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Trash</p>
                                        </a>
                                    </li>
                                    <li class="nav-header mt-1 pt-0">Label</li>
                                    <li class="nav-item">
                                        <a href="{{ route('imp.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/imp') ? 'active' : ''}}">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Important</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-header">Profile</li>
                    <li class="nav-item">
                        <a href="javascript:;" class="nav-link" id="updateProfileBtn">
                            <i class="nav-icon far fa-calendar-alt"></i>
                            <p>
                                Update Profile
                            </p>
                        </a>
                    </li>
                    <li class="nav-header">Setting</li>
                    <li class="nav-item">
                        <a href="javascript:;" class="nav-link" id="changePasswordBtn">
                            <i class="nav-icon far fa-calendar-alt"></i>
                            <p>
                                Change Password
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
