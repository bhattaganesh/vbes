@extends('layouts.dashboard')
@section('title','Chage Pasword Form')
@section('content-header')
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1>User Manager</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Change Password Form</li>
            </ol>
        </div>
    </div>
</div><!-- /.container-fluid -->
@endsection
@section('content')
<div class="container-fluid">
    <div class="row">
        <!-- /.col -->
        <div class="col-md-12">
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">User Password Change Form Form</h3>
                    <a href="{{ route('user.index') }}" title="List All User" class="btn btn-info btn-sm btn-circle float-right"><i class="fa fa-eye"></i></a>
                </div>
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all()  as $key => $error)
                                @if($key == 0)
                                <li>{{ $error }}</li>
                                {!! readLoud($error) !!}
                                @endif
                            @endforeach
                        </ul>
                    </div>
                @endif
                <!-- /.card-header -->
                <div class="card-body">
                    {{ Form::open(['url'=>route('user-update-password',$user_data->id) ,'class'=>'form']) }}
                        @method('patch')
                        <div class="form-group row">
                            {{ Form::label('password','New Password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::password('password',['class'=>'form-control form-control-sm','id'=>'password','required'=>true,'placeholder'=>'Enter  password']) }}
                                @error('password')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            {{ Form::label('confirmation_password','Re-type New password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::password('password_confirmation',['class'=>'form-control form-control-sm','id'=>'confirmation_password','required'=>true,'placeholder'=>'Re-enter  password ']) }}
                                @error('confirmation_password')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12 col-md-7 offset-md-5">
                                <button type="submit" class="btn btn-success btn-block btn-sm" >Update Password</button>
                            </div>
                        </div>
                    {{ Form::close() }}
                </div>
            </div>
        </div>
    </div>
@endsection

