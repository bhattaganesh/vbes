  @if($data->count())
          {{ dd($data) }}
            <!-- /.card-header -->
            <div class="card-body p-0">
              <div class="mailbox-controls">
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
{{Form::open(['url' => route('inbox.delete'),'class' => 'delete-record-form'])}}
@php $view_click_id = 0; @endphp
                  @foreach($data as $record)
                  @php $view_click_id++; @endphp
                  <tr>
                    <td>
                      <div class="icheck-primary">
                        {{Form::checkbox('del_record[]',$record->id,false,['id' => $record->id,'class' => 'checkbox-record','data-mail_id' => @$record->mail_id,'data-mail_type' => 'in'])}}
                        <label for="{{ $record->id }}" data-select_id = "{{$view_click_id}}"></label>
                      </div>
                    </td>
                    <td class="mailbox-name">{{ $record->sender_id }}
                    </td>
                      <td class="mailbox-subject"><b>
                        @if($record->mail->subject != null)
                        {{ Illuminate\Support\Str::limit($record->subject,80,'...') }}
                        @else
                        {!! Illuminate\Support\Str::words($record->message,2,'...') !!}
                        @endif
                      </b>
                      </td>
                      <td class="mailbox-attachment">                        
                        @if($attachments->count() > 0)
                        <i class="fas fa-paperclip"></i>
                        @endif
                      </td>
                      <td>
                        <a href="{{route('inbox.show',$record->id)}}" data-view_click_id = "{{$view_click_id}}" title = "Read Mail">
                        <i class="fas fa-eye"></i></a>
                      </td>
                    <td class="mailbox-date">{{$record->created_at->diffForHumans()}}</td>
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