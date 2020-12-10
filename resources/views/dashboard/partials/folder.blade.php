          @if(request()->getRequestUri() == '/mail/compose')
            <a href="{{ route('inbox.index') }}" class="btn btn-primary btn-block mb-3">Back to Inbox</a>
          @else
          <a href="{{ route('mail.compose') }}" class="btn btn-primary btn-block mb-3">Compose</a>
          @endif
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Folders</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                  <a href="{{ route('inbox.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/inbox') ? 'text-primary' : ''}}">
                    <i class="fas fa-inbox"></i> Inbox
                    @if(auth()->user()->unReadNotifications->count())
                      <span class="badge bg-primary float-right">{{auth()->user()->unReadNotifications->count()}}</span>
                    @endif
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('sent.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/sent') ? 'text-primary' : ''}}">
                    <i class="far fa-envelope"></i> Sent
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('draft.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/draft') ? 'text-primary' : ''}}">
                    <i class="far fa-file-alt"></i> Drafts
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('trash.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/trash') ? 'text-primary' : ''}}">
                    <i class="far fa-trash-alt"></i> Trash
                  </a>
                </li>
              </ul>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Label</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                  <a href="{{ route('imp.index') }}" class="nav-link {{(request()->getRequestUri() == '/mail/imp') ? 'text-primary' : ''}}">
                    <i class="far fa-circle text-danger"></i>
                    Important
                  </a>
                </li>
              </ul>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->