@extends('layouts.dashboard')
@section('title','Sent')
@section('content-header')
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Sent</h1>
      </div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">VBES</a></li>
          <li class="breadcrumb-item active">Sent</li>
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
              <h3 class="card-title table-name">Sent</h3>

              <form class="card-tools">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control mail-search-input" name="mail-search" placeholder="Search Mail">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <!-- /.card-tools -->
            </div>
            <!-- /.card-header -->
            <div class="card-body p-0">
              <div class="mailbox-controls">
                <!-- Check all button -->
                <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="far fa-square"></i>
                </button>
                <div class="btn-group">
                  <a href="javascript:;" title = "Delete" class="btn btn-default btn-sm btn-delete">
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
                <div class="float-right">

                                      {{ $data->links() }}
                  </div>
                  <!-- /.btn-group -->
                </div>
                <!-- /.float-right -->
              </div>
              <div class="table-responsive mailbox-messages">
                <table class="table table-hover table-striped">
                  <tbody>
{{Form::open(['url' => route('sent.delete'),'class' => 'delete-record-form'])}}
@php $view_click_id = 0; @endphp
                  @foreach($data as $key => $record)
                  @php $view_click_id++; @endphp

                  <tr>
                    <td>
                      <div class="icheck-primary">
                        {{Form::checkbox('del_record[]',$record->id,false,['id' => $record->id,'class' => 'checkbox-record','data-mail_id' => $record->mail_id,'data-mail_type' => 'out'])}}
                        <label for="{{ $record->id }}" data-select_id = "{{$view_click_id}}"></label>
                      </div>
                    </td>
                    <td class="mailbox"><a href="{{ route('sent.imp',$record->id) }}"
                    data-imp_make_id = "{{$view_click_id}}" title = "{{ $record->isImp == 'yes' ? 'Remove from important' : 'Add to important' }}">
                      <i class="fas fa-star text-{{ $record->isImp == 'yes' ? 'warning' : 'gray-dark' }}"></i></a>
                    </td>
                    <td class="mailbox-name">{{ $record->mail->receiver_id }}
                    </td>
                      <td class="mailbox-subject"><b>
                        @if($record->mail->subject != null)
                        {{ Illuminate\Support\Str::limit($record->mail->subject,30,'...') }}
                        @else
                        {!! Illuminate\Support\Str::words($record->mail->message,2,'...') !!}
                        @endif
                        </b>
                      </td>
                      <td class="mailbox-attachment">
                        @if(count($attachments[$key]) > 0)
                        <i class="fas fa-paperclip"></i>
                        @endif
                      </td>
                      <td>
                        <a href="{{route('sent.show',$record->id)}}" data-view_click_id = "{{$view_click_id}}" title = "Read Mail">
                        <i class="fas fa-eye"></i></a>
                      </td>
                    <td class="mailbox-date">{{$record->mail->created_at->diffForHumans()}}</td>
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
                  <a href="#" title = "Reply" class="btn btn-default btn-sm">
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
                <div class="float-right">
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
