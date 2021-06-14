@extends('layouts.app')
@section('title','Contact')
@section('main')
    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-4" data-aos="fade-right">
            <div class="section-title">
              <h2>Contact</h2>
              <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
            </div>
          </div>

          <div class="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                        <iframe style="border:0; width: 100%; height: 270px;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2577.9550664069484!2d80.5578896!3d28.8151333!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a191573b4e00db%3A0x4b86058d676dd6c6!2sAttariya%2010900!5e1!3m2!1sen!2snp!4v1611224513652!5m2!1sen!2snp" width="600" height="450" frameborder="0"></iframe>
                        <div class="info mt-4">
                        <i class="icofont-google-map"></i>
                        <h4>Location:</h4>
                        <p>Attariya Campus Road, Godawari -02,  Kailali</p>
                        </div>
                        <div class="row">
                        <div class="col-lg-6 mt-4">
                            <div class="info">
                            <i class="icofont-envelope"></i>
                            <h4>Email:</h4>
                            <p>bhattaganesh05@gmail.com</p>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="info w-100 mt-4">
                            <i class="icofont-phone"></i>
                            <h4>Call:</h4>
                            <p>+977 9848 979 669</p>
                            </div>
                        </div>
                        </div>
                    <form action="{{route('contact-post')}}" method="post" role="form" class="contact-message-form mt-4">
                        @csrf
                        <div class="mb-3">
                            <div class="loading">Loading</div>
                            <div class="error-message"></div>
                            <div class="sent-message"></div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-6 form-group">
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                            <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div class="validate"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                            <div class="validate"></div>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                            <div class="validate"></div>
                        </div>
                        <div class="text-center"><button type="submit" class="btn-submit">Send Message</button></div>
                </form>
          </div>
        </div>

      </div>
    </section><!-- End Contact Section -->
@endsection
@section('scripts')
<script type="text/javascript">
    $(document).ready(function() {
        $(".btn-submit").click(function(e){
            e.preventDefault();


            var _token = $("input[name='_token']").val();
            var name = $("input[name='name']").val();
            var email = $("input[name='email']").val();
            var subject = $("input[name='subject']").val();
            var message = $("textarea[name='message']").val();


            $.ajax({
                url: "{{route('contact-post')}}",
                type:'POST',
                data: {_token:_token, name:name, email:email, subject:subject, message:message},
                success: function(data) {
                    if($.isEmptyObject(data.error)){
                      $("input[name='name']").val('');
                      $("input[name='email']").val('');
                      $("input[name='subject']").val('');
                      $("textarea[name='message']").val('');
                      $(".sent-message").html('');
                      $(".sent-message").css('display','block');
                      $('.sent-message').html('<button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button>'+data.success);
                      // $('.sent-message').slideUp(3000);
                      setTimeout(() =>{
                        $('.sent-message').slideUp();
                        },3000);
                    }else{
                        printErrorMsg(data.error);
                    }
                }
            });
        });

        function printErrorMsg (msg) {
            $(".error-message").html('');
            $(".error-message").css('display','block');
            $('.error-message').html('<button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button>');
            // var speed = 0;
            $.each( msg, function( key, value ) {
              // speed += 3000;
                $(".error-message").append('<span class = "single-message"><span class = "fa fa-circle"></span> '+value+'</span>');
                $(".error-message").append('<br>');
            });
            // $(".error-message").slideUp(speed);
            setTimeout(() =>{
                $('.error-message').slideUp();
                },4000);

        }
    });


</script>
@endsection
