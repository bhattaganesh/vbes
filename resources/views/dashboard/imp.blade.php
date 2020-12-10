@extends('layouts.dashboard')
@section('title','Important')
@section('content-header')
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Important</h1>
      </div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active">Important</li>
        </ol>
      </div>
    </div>
  </div><!-- /.container-fluid -->
@endsection
@section('content')
      <div class="row">
        <div class="col-md-3">
          
          @include('dashboard.partials.folder')

        </div>
        <!-- /.col -->
        <div class="col-md-9">
          <div class="card card-primary card-outline">
          @if($data->count())
            <div class="card-header">
              <h3 class="card-title table-name">Important</h3>

              <div class="card-tools">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control mail-search-input" placeholder="Search Mail">
                  <div class="input-group-append">
                    <div class="btn btn-primary">
                      <i class="fas fa-search"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-tools -->
            </div>
            <!-- /.card-header -->
            <div class="card-body p-0 search-pagination-part">
              <div class="mailbox-controls ">
                <!-- Check all button -->
                <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="far fa-square"></i>
                </button>
                <div class="btn-group">
                  <a href="javascript:;" title = "Trash" class="btn btn-default btn-sm btn-delete">
                    <i class="far fa-trash-alt"></i>
                  </a>
                  <a href="javascript:;" title = "Reply" class="btn btn-default btn-sm btn-main-reply">
                    <i class="fas fa-reply"></i>
                  </a>
                  <a href="#" title = "Share" class="btn btn-default btn-sm">
                    <i class="fas fa-share"></i>
                  </a>
                </div>
                <!-- /.btn-group -->
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-sync-alt"></i>
                </button>
                <div class="float-right pagination-link">
                  {{ $data->links() }}
                  </div>
                  <!-- /.btn-group -->
                </div>
                <!-- /.float-right -->
              </div>
              <div class="table-responsive mailbox-messages">
                <table class="table table-hover table-striped">
                  <tbody>
{{Form::open(['url' => route('imp.delete'),'class' => 'delete-record-form'])}}
    @php $view_click_id = 0; @endphp
                  @foreach($data as $key => $record)
                  @php $view_click_id++; @endphp
                  <tr>
                    <td>
                    @php
                      if($record->trash_id != null){
                        $imp_data = DB::table('mails')->where('id',$record->trash->mail_id)->first();
                        $user_name =  ($record->trash->isInbox == 'yes') ? $imp_data->sender_id : $imp_data->receiver_id ;
                        $mail_type = ($record->trash->isInbox == 'yes') ? 'in' : 'out';
                      }
                      if ($record->draft_id != null) {
                        $imp_data = DB::table('mails')->where('id',$record->draft->mail_id)->first();
                        $user_name = $imp_data->receiver_id;
                        $mail_type = 'out';

                      }
                      if ($record->inbox_id != null) {
                        $imp_data = DB::table('mails')->where('id',$record->inbox->mail_id)->first();
                        $user_name = $imp_data->sender_id;
                        $mail_type = 'in';
                      }
                      if ($record->outbox_id != null) {
                        $imp_data = DB::table('mails')->where('id',$record->outbox->mail_id)->first();
                        $user_name = $imp_data->receiver_id;
                        $mail_type = 'out';
                      }
                     @endphp
                      <div class="icheck-primary">
                        {{Form::checkbox('del_record[]',$record->id,false,['id' => $record->id,'class' => 'checkbox-record','data-mail_id' => $imp_data->id,'data-mail_type' => $mail_type])}}
                        <label for="{{ $record->id }}" data-select_id = "{{$view_click_id}}"></label>
                      </div>
                    </td>
                    <td class="mailbox-name">
                      {{ $user_name ?? "*__ no-user-name __*" }}
                    </td>
                      <td class="mailbox-subject"><b>
                        @if($imp_data->subject != null)
                        {{ Illuminate\Support\Str::limit($imp_data->subject,80,'...') }}
                        @else
                        {!! Illuminate\Support\Str::words($imp_data->message,2,'...') !!}
                        @endif
                        </b>
                      </td>
                      <td class="mailbox-attachment">
{{--                         @if($attachments->count() > 0)
                        <i class="fas fa-paperclip"></i>
                        @endif --}}
                        @if(count($attachments[$key]) > 0)
                        <i class="fas fa-paperclip"></i>
                        @endif
                      </td>
                      <td>
                        <a href="{{route('imp.show',$record->id)}}" data-view_click_id = "{{$view_click_id}}" title = "Read Mail">
                        <i class="fas fa-eye"></i></a>
                      </td>
                    <td class="mailbox-date">{{Carbon\Carbon::parse($imp_data->created_at)->diffForHumans()}}</td>
                  </tr>
                  @endforeach
{{Form::close()}}

                  </tbody>
                </table>
                <!-- /.table -->
              </div>
              <!-- /.mail-box-messages -->
            </div>
            <!-- /.card-body -->
            <div class="card-footer p-0">
              <div class="mailbox-controls">
                <!-- Check all button -->
                <button type="button" class="btn btn-default btn-sm checkbox-toggle">
                  <i class="far fa-square"></i>
                </button>
                <div class="btn-group">
                  <a href="javascript:;" title = "Trash" class="btn btn-default btn-sm btn-delete">
                    <i class="far fa-trash-alt"></i>
                  </a>
                  <a href="#" title = "Reply" class="btn btn-default btn-sm btn-main-reply">
                    <i class="fas fa-reply"></i>
                  </a>
                  <a href="#" title = "Share" class="btn btn-default btn-sm">
                    <i class="fas fa-share"></i>
                  </a>
                </div>
                <!-- /.btn-group -->
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-sync-alt"></i>
                </button>
                <div class="float-right pagination-link">
                  {{ $data->links() }}
                  <!-- /.btn-group -->
                </div>
                <!-- /.float-right -->
              </div>
            </div>
          @else
            <div class="card-body p-0">
              <div class="mailbox-controls">
                <div class="table-responsive mailbox-messages">
                  <div class="bg-info text-center p-5">
                      <h1>Empty</h1>
                  </div>
                </div>
              </div>
            </div>
          @endif
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
@endsection
