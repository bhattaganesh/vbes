@extends('layouts.dashboard')
@section('title','Admin Dashboard')
@section('content-header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Admin Dashboard</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{ route('admin') }}">Home</a></li>
                    <li class="breadcrumb-item active">Admin Dashboard</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
@endsection
@section('content')
        <!-- Small boxes (Stat box) -->
        <div class="row">
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3>
                            @php
                $mails = DB::table('inboxes')
                     ->where('user_id',auth()->user()->id)
                     ->count();
                     echo $mails;
                            @endphp
                        </h3>
                        <p>Inbox</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    <a href="{{ route('inbox.index') }}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                    <h3>
                        @php
                        $mails = DB::table('outboxes')
                            ->where('user_id',auth()->user()->id)
                            ->count();
                        echo $mails;
                        @endphp
                    </h3>

                        <p>Sent</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                    </div>
                    <a href="{{ route('sent.index') }}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                    <h3>
                        @php
                        $mails = DB::table('drafts')
                            ->where('user_id',auth()->user()->id)
                            ->count();
                        echo $mails;
                        @endphp
                    </h3>

                        <p>Draft</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="{{route('draft.index')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                    <h3>
                        @php
                        $mails = DB::table('trashes')
                            ->where('user_id',auth()->user()->id)
                            ->count();
                        echo $mails;
                        @endphp
                    </h3>

                        <p>Trash</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="{{route('trash.index')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
        <!-- /.row -->
        </div>




        <div class="row">
            <div class="col-lg-3 col-6">
                <div class="small-box bg-info">
                    <div class="inner">
                        <i class="fa fa-user-plus float-right fa-3x"></i>
                        <h3>
                            @php
                            $users = DB::table('users')
                                ->where('role','user')
                                ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-1 days')))
                                ->count();
                            echo $users;
                            @endphp
                        </h3>
                        <p>New Users</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="{{route('user.index')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <i class="fa fa-users float-right fa-3x"></i>
                        <h3>
                            @php
                            $users = DB::table('users')
                                ->where('role','user')
                                ->where('status','active')
                                ->count();
                            echo $users;
                            @endphp
                        </h3>

                        <p>Active Users</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="{{route('user.index')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <i class="fa fa-users float-right fa-3x"></i>
                        <h3>
                            @php
                            $users = DB::table('users')
                                ->where('role','user')
                                ->where('status','inactive')
                                ->count();
                            echo $users;
                            @endphp
                        </h3>

                        <p>Deactivate Users</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="{{route('user.index')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <i class="fa fa-users float-right fa-3x"></i>
                        <h3>
                            @php
                            $users = DB::table('users')
                                ->where('role','user')
                                ->count();
                            echo $users;
                            @endphp
                        </h3>

                        <p>Total Users</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="{{route('user.index')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>
@endsection

