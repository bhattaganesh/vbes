@include('dashboard.partials.header')
<div class="wrapper">

@include('dashboard.partials.top-bar')

@include('dashboard.partials.sidebar')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            @yield('content-header')
        </section>
        <div class="alert alert-danger js-error" style="display: none;"></div>
            @if(@$errors->changePassword->count() > 0)
                @if($errors->changePassword->first('current_password'))
                    <div class="alert alert-danger alert-dismissible">
                      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                      <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                        {{$errors->changePassword->first('current_password')}}
                    </div>
                @else
                    <div class="alert alert-danger alert-dismissible">
                      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                      <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                        {{$errors->changePassword->first('password')}}
                    </div>
                @endif
            @endif
        @include('dashboard.partials.notify')
        <!-- Main content -->
        <section class="content">
            @yield('content')
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@include('dashboard.partials.footer')
