@if ($paginator->hasPages())
        {{ $paginator->currentPage()."/".$paginator->lastPage() }}
        {{-- Previous Page Link --}}
        <div class="btn-group">
            @if ($paginator->onFirstPage())
                <button type="button" class="btn btn-default btn-sm disabled">
                      <i class="fas fa-chevron-left"></i>
                </button>
            @else
                <a class="btn btn-default btn-sm page-get" href="{{ $paginator->previousPageUrl() }}" rel="prev" aria-label="@lang('pagination.previous')">
                        <i class="fas fa-chevron-left"></i>
                </a>
            @endif
            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <a class="btn btn-default btn-sm page-get" href="{{ $paginator->nextPageUrl() }}" rel="next" aria-label="@lang('pagination.next')">
                      <i class="fas fa-chevron-right"></i>
                </a>
            @else
                <button type="button" class="btn btn-default btn-sm disabled">
              <i class="fas fa-chevron-right"></i>
                </button>
            @endif
        </div>
@endif

