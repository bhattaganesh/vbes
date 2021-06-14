@extends('layouts.dashboard')
@section('title','User Form')
@section('content-header')
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1>User Manager</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">User Form</li>
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
                    <h1 class="card-title">User Form</h1>
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
                @if(isset($user_detail))
                        {{ Form::open(['url'=>route('user.update',$user_detail->id) ,'class'=>'form','files'=>true]) }}
                        @method('patch')
                    @else
                        {{ Form::open(['url'=>route('user.store') ,'class'=>'form','files'=>true]) }}
                    @endif
                        <div class="form-group row">
                            {{ Form::label('name','Name',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::text('name',@$user_detail->name,['class'=>'form-control form-control-sm','id'=>'name','required'=>true,'placeholder'=>'Enter your name']) }}
                                @error('name')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        @if(!isset($user_detail))
                        <div class="form-group row">
                            {{ Form::label('email','Email Address',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::text('email',@$user_detail->email,['class'=>'form-control form-control-sm','id'=>'email','required'=>true,'placeholder'=>'Enter user email address']) }}
                                @error('email')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            {{ Form::label('password','Password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::password('password',['class'=>'form-control form-control-sm','id'=>'password','required'=>true,'placeholder'=>'Enter  password']) }}
                                @error('password')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            {{ Form::label('confirmation_password','Re-password',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::password('password_confirmation',['class'=>'form-control form-control-sm','id'=>'confirmation_password','required'=>true,'placeholder'=>'Re-enter  password ']) }}
                                @error('confirmation_password')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        @endif
                    <div class="form-group row">
                        {{ Form::label('address','DOB',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                        <div class="col-sm-12 col-md-7">
                            {{ Form::date('dob',@$user_detail->userInfo->dob,['class'=>'form-control form-control-sm','id'=>'dob','required'=>false,'placeholder'=>'Enter your dob']) }}
                            @error('dob')
                            <span class="alert alert-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                        <div class="form-group row">
                            {{ Form::label('role','User',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::select('role',['user'=>"User"],@$user_detail->role,['class'=>'form-control form-control-sm','id'=>'role','required'=>true]) }}
                                @error('role')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            {{ Form::label('gender','Gender',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::select('gender',['male'=>"Male",'female'=>"Female",'other' => "Other"],@$user_detail->gender,['class'=>'form-control form-control-sm','id'=>'gender','required'=>true]) }}
                                @error('gender')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            {{ Form::label('status','Status',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                            <div class="col-sm-12 col-md-7">
                                {{ Form::select('status',['active'=>"Active",'inactive'=>"Inactive"],@$user_detail->status,['class'=>'form-control form-control-sm','id'=>'status','required'=>true]) }}
                                @error('status')
                                <span class="alert alert-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    <div class="form-group row">
                        {{ Form::label('image_update','PP',['class'=>'col-sm-12 col-md-5 text-md-right']) }}
                        <div class="col-sm-12 col-md-4">
                            {{ Form::file('photo',['id'=>'image_update','required'=>(isset($user_detail) ? false : true),'accept'=>"image/*",'onchange'=>"readURL(this,'thumb')"]) }}
                            @error('photo')
                            <span class="alert alert-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="col-md-3">
                            @if(isset($user_detail) && !empty($user_detail->userInfo->photo))
                                <img src="{{ asset("uploads/user/".$user_detail->userInfo->photo) }}" alt="" id="thumb" class="img-fluid img-thumbnail">
                            @else
                                <img src="" alt="" id="thumb" class="img-fluid img-thumbnail">
                            @endif
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 col-md-7 offset-md-5">
                            <button type="submit" class="btn btn-success btn-block btn-sm" >Submit</button>
                        </div>
                    </div>
                    {{ Form::close() }}
            </div>
            <!-- /.card -->
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->
@endsection

@section('scripts')
<script>
readURL= function(input,image_id){
    if(input.files && input.files[0]){
        var reader  = new FileReader();
        reader.onload = function (e){
            $('#'+image_id)
                .attr('src',e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
</script>
@endsection

