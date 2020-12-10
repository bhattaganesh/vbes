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
        <!-- Main content -->
        <section class="content">
            @yield('content')
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@include('dashboard.partials.footer')
