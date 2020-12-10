@include('front.partials.header')
@include('front.partials.top-header')
<main id="main">
    <section id="breadcrumbs" class="breadcrumbs">
    </section><!-- End Breadcrumbs -->
    <!-- ======= Team Section ======= -->
    <section id="team" class="team contact">
      <div class="container">

        <div class="row">
          <div class="col-lg-12">
            <div class="row">
            	<div class="col-lg-1"></div>
              <div class="col-lg-6 ">
            <form action="{{route('contact-post')}}" method="post" role="form" class="contact-message-form mt-0 " style="border-radius: 10px;">
              @csrf
              <div class="mb-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message"></div>
              </div>
              <div class="form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Name to whom you want to wish" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div class="validate"></div>
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

              <div class="col-lg-4">
                <div class="member" data-aos="zoom-in" data-aos-delay="100">
                  <div class="pic"><img src="{{ asset('img/myProfile/myImage1.jpg') }}" class="img-fluid" alt=""></div>
                  <div class="member-info">
                    <h4>Ganesh Bhatta</h4>
                    <span>Backend Developer</span>
                    <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
                    <div class="social">
                      <a href=""><i class="ri-twitter-fill"></i></a>
                      <a href=""><i class="ri-facebook-fill"></i></a>
                      <a href=""><i class="ri-instagram-fill"></i></a>
                      <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section><!-- End Team Section -->
</main>
@include('front.partials.footer')
