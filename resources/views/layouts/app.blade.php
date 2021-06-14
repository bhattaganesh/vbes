@include('front.partials.header')
@include('front.partials.top-header')
<main id="main">
<!-- ======= Breadcrumbs ======= --><section class="breadcrumbs"></section><!-- End Breadcrumbs -->
@yield('main')
</main>
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
                <li class = "{{(request()->getRequestUri() == '/faq') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('faq')}}">FAQs</a></li>
                <li class = "{{(request()->getRequestUri() == '/terms') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('landing')}}">Terms</a></li>
                <li class = "{{(request()->getRequestUri() == '/privacy') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('landing')}}">Privacy</a></li>
                <li class = "{{(request()->getRequestUri() == '/blog') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('blog')}}">Blog</a></li>
                <li class = "{{(request()->getRequestUri() == '/post') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('landing')}}">Posts</a></li>
                <li class = "{{(request()->getRequestUri() == '/about') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('about')}}">About</a></li>
                <li class = "{{(request()->getRequestUri() == '/contact') ? 'active' : ''}}"><i class="bx bx-chevron-right"></i> <a href="{{route('contact')}}">Contact</a></li>
                </ul>
            </div>
            <div class="col-lg-1 col-md-3"></div>
            <div class="col-lg-4 col-md-6 footer-newsletter">
                <h4>Subscribe Us</h4>
                <form action="" method="post">
                <input type="email" name="email"><input type="submit" value="Subscribe">
                </form>
            </div>

            </div>
        </div>
    </div>
@include('front.partials.footer')

