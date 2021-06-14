@extends('layouts.dashboard')
@section('title',isset($user) ? $user : 'User List')
@section('content-header')
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1>User Manager</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">{{ isset($user) ? $user : 'User List' }}</li>
            </ol>
        </div>
    </div>
</div><!-- /.container-fluid -->
@endsection
@section('content')
    <div class="row">
        <!-- /.col -->
        <div class="col-md-12">
        <div class="card card-primary card-outline">
                <div class="card-header">
                    <h1 class="card-title">{{ isset($user) ? $user : 'All User List' }}</h1>
                    @if(isset($user))
                    <a href="{{ route('user.index') }}" title="Add User" class=" float-right btn btn-success btn-circle"><i class="fa fa-eye"></i></a>
                    @else
                    <a href="{{ route('user.create') }}" title="Add User" class=" float-right btn btn-success btn-circle"><i class="fa fa-plus"></i></a>
                    @endif
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="container-fluid">

                        <table class="table table-striped table-hover data-table">
                            <thead class="thead-dark">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            @if(isset($is_all))
                            <th>Role</th>
                            @endif
                                <th>Image</th>
                                <th>Status</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                            @if($all_users->count())
                                @foreach($all_users as $data)
                                <tr>
                                    <td>{{$data->name}}</td>
                                    <td>{{$data->email}}</td>
                                    <td>{{ @$data->userInfo->gender }}</td>
                            @if(isset($is_all))
                                    <td>
                                        {{ $data->role }}
                                    </td>
                                @endif
                                    <td>
                                    @if($data->userInfo)
                                        <a href="{{ asset('uploads/user/'.$data->userInfo->photo) }}" data-lightbox = "image-{{ $data->id }}" data-title = {{ $data->title }}>
                                            <div class="thumb"><img src="{{ asset('uploads/user/'.$data->userInfo->photo) }}" width = "40" height = "40" ></div>
                                        </a>
                                    @endif
                                    </td>
                                    <td>
                                        <a href="{{ route('user-change-status',[$data->id,$data->status]) }}" class="badge badge-{{ $data->status == 'active' ? 'success' : 'danger' }}">{{ $data->status == 'active' ? 'Active' : 'Inactive' }}</a>
                                    </td>
                                    <td>
                                        <a href="{{ route('change-pwd',$data->id) }}" title="Update Password" class="btn btn-secondary btn-sm btn-circle">
                                            <i class="fa fa-key"></i>
                                        </a>
                                        <a href="{{ route('user.edit',$data->id) }}" title="Edit this user" class="btn btn-primary btn-sm btn-circle">
                                            <i class="fa fa-pen"></i>
                                        </a>
                                        <a href="javascript:;" title="Delete this user" class="btn btn-warning btn-sm btn-circle delete-btn">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                        {{ Form::open(['url' => route('user.destroy',$data->id) , 'class' => 'delete-form' ]) }}
                                            @method('delete')
                                        {{ Form::close() }}
                                    </td>
                                </tr>
                                @endforeach
                            @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
@endsection
@section('scripts')
<script type="text/javascript">
$(document).ready( function () {
    $('.data-table').DataTable();
} ); 
</script>
@endsection