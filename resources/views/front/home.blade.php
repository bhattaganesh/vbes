@extends('layouts.front')
@section('title','Gallary')
{{-- @include('front.partials.top-header') --}}
@section('main')
    <!-- ======= Portfolio Details Section ======= -->
    <section id="portfolio-details" class="portfolio-details" style = "margin-bottom : -50px !important;">
      <div class="container">
        <div class="portfolio-details-container col-lg-8 m-auto" data-aos="fade-up" data-aos-delay="100" style = "margin-top:-30px !important;">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <a href="#javascript:;" class="h3" onclick = "history.back();">
                    <img src="{{ asset('img/favicon.png') }}" alt="" height = "45px;"><b>VBES</b></a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Galary</p>
                    <div class="owl-carousel portfolio-details-carousel">
                        <img src="/img/portfolio/portfolio-details-1.jpg" class="img-fluid" alt="">
                        <img src="/img/portfolio/portfolio-details-2.jpg" class="img-fluid" alt="">
                        <img src="/img/portfolio/portfolio-details-3.jpg" class="img-fluid" alt="">
                    </div>

                    <div class="portfolio-info">
                        <h3>Project information</h3>
                        <ul>
                        <li><strong>Category</strong>: Web App</li>
                        <li><strong>College</strong>: Siddhanath Science Campus</li>
                        <li><strong>Project date</strong>: 01 March, 2021</li>
                        <li><strong>Project URL</strong>: <a href="#">https://vbes.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <div class="portfolio-description">
          <h2>This is an example of portfolio detail</h2>
          <p>
            Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
          </p>
        </div>

      </div>
    </section><!-- End Portfolio Details Section -->
@endsection
