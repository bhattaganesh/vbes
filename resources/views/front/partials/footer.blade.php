 <!-- ======= Footer ======= -->
  <footer id="footer">

    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-contact">
            <h3>VBES</h3>
            <p>
              Attariya -02, Godawari <br>
              Kailali, Nepal <br><br>
              <strong>Phone:</strong> +977-9848979669<br>
              <strong>Email:</strong> bhattaganesh05@gmail.com<br>
            </p>
          </div>
          <div class="col-lg-1 col-md-3"></div>
          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="javascript:;">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Contact us</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>
          <div class="col-lg-1 col-md-3"></div>
          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Subscribe Us</h4>
            <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="Subscribe">
            </form>
{{--             {{ Form::open(['url' => ''])}}
              {{ Form::textarea('review','',['id'=>'review','rows'=>1,'style'=>'resize:none;border: 0;padding: 4px 8px;
              width: calc(100% - 100px);','placeholder' => 'write review','class' => 'bg-secondary m-auto']) }}
                  <div id="rateYo"></div>
                  {{ Form::input('hidden','rate','',['id'=>'rate']) }}
                  <input type="submit" value="Submit" style="width: 120px; height: 40px; margin-top: 40px;">
            {{ Form::close() }} --}}
          </div>

        </div>
      </div>
    </div>

    <div class="container d-md-flex py-4">

      <div class="mr-md-auto text-center text-md-left">
        <div class="copyright">
            &copy; Copyright {{ date('Y') }} <strong>VBES</strong>. All Rights Reserved
        </div>
        <div class="credits">
            Developed by <a href="javascript:;" id="myProfile"><b>Ganesh Bhatta</b></a>
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"></script>
<script>
$('#myProfile').on('mouseenter',function(){
  $('#myModal').modal('show');
});

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'go to home page': function() {
      window.location = "/";
    },
    'go back': function() {
      history.back();
    },
    'go to :page_name page': function(page_name) {
      window.location = "/"+page_name;
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
</script>
@yield('scripts')
  <div class="modal fade" id="myModal">
    <div class="modal-dialog  modal-">
      <div class="modal-content team card ">
        <!-- Modal body -->
        <div class="card-" style="margin-bottom: -20px; margin-top: 0px; padding-bottom: 0px;">
        <button type="button" class="close d-inline float-right" style="padding: 5px; padding-bottom: 8px; padding-top: 0px;" data-dismiss="modal">&times;</button>
        </div>
          <div class="col-lg-12 mt-4 mt-lg-0 card-body">
            <div class="member aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
              <div class="pic"><img src="{{asset('img/myProfile/myImage.jpg')}}" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Ganesh Bhatta</h4>
                <span>Jr. Laravel Developer</span>
                <p>Aut maiores voluptates amet et quis praesentium qui senda para</p>
                <div class="social">
                  <a href="" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"><i class="ri-twitter-fill"></i></a>
                  <a href="" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"><i class="ri-facebook-fill"></i></a>
                  <a href="" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"><i class="ri-instagram-fill"></i></a>
                  <a href="" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>
        <!-- Modal footer -->
      </div>
    </div>
  </div>
</body>
</htm