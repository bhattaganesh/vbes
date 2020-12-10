@extends('layouts.search_result')
@section('title','Mail Search')
@section('content-header')
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Mail Search</h1>
      </div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active">Mail Search</li>
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
            <div class="card-header">
              <h3 class="card-title">Search Result</h3>
              <!-- /.card-tools -->
            </div>
          @include('search_result_preview')
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
@endsection
@section('scripts')
<script type="text/javascript">
    $(window).on('hashchange', function() {
        if (window.location.hash) {
            var page = window.location.hash.replace('#', '');
            if (page == Number.NaN || page <= 0) {
                return false;
            }else{
                getData(page);
            }
        }
    });
    
    $(document).ready(function()
    {
        $(document).on('click', '.pagination a',function(event)
        {
            event.preventDefault();
  
            $('li').removeClass('active');
            $(this).parent('li').addClass('active');
  
            var myurl = $(this).attr('href');
            var page=$(this).attr('href').split('page=')[1];
  
            getData(page);
        });
  
    });
  
    function getData(page){
        $.ajax(
        {
            url: '?page=' + page,
            type: "get",
            datatype: "html"
        }).done(function(data){
            $("#tag_container").empty().html(data);
            location.hash = page;
        }).fail(function(jqXHR, ajaxOptions, thrownError){
              alert('No response from server');
        });
    }
</script>
@endsection