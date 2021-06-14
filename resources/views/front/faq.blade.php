@extends('layouts.app')
@section('title','FAQs')
@section('main')
    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-4" data-aos="fade-right">
            <div class="section-title">
              <h2>FAQs</h2>
              <p>A FAQ page, short for Frequently Asked Questions, is a page of VBES   where important information about a VBES is shared.</p>
            </div>
          </div> 
          <div class="col-lg-8" data-aos="fade-up" data-aos-delay="100"><div class="card card-outline card-success">
                    <div class="card-header text-center">
                        <a href="#javascript:;" class="h3">
                        <b>Frequently Asked Questions</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg"></p>
                    <div class=" m-auto pt-4 pt-lg-0" data-aos="fade-left" data-aos-delay="200">
                        <div class="col-12" id="accordion">
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            1. What is VBES?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                    <div class="card-body">
                                        VBES means Voice Based Email System by using which you can send/receive messages using voice commands.
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapset">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            2. How do i login using voice commands?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapset" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        In Login Page, you must have fill your login credentials to form field
                                        (email or username field and password field). 
                                        You can fill email field by using command "write email `email address`".
                                        You can fill password field by using command "write password `password`".
                                        You can can also check or uncheck "remember me" checkbox by using "check or uncheck remember me".
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse3">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            3. How do i create new account using voice commands?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse3" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For creating new account you must have fill register form which contains name, email, password and confirm password field. you can fill each field using "write" command.
                                        general syntax for write commands is "write field_name field_value".
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse4">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                    4. How to navigate to another pages by using voice commands?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse4" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For navigating pages you can use "go to page_name or go page_name".
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse5">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            5. How do i back to previous page?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse5" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For going to previous page simply you can use "go back" command.
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse6">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            6. How do i know in which page i am?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse6" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        "where am i" command will tell you in which page you are.
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse7">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            7. How do i know what time time it is?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse7" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        "what time it is" command will tell you current time.
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse8">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            8. how do i compose mail?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse8" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For composing mail, you have to fill receiver's email address, subject and message field.
                                        You can fill each field using "write" command.
                                        general syntax for write command is "write field_name field_value".
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse9">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            9. how do i send form?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse9" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For sending form, you can use simply 'send form or submit form or send `form_name`' command .
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse10">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            10. how do i logout?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse10" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For logout, you can use 'logout or logout me' command.
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse11">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            11. how do i read/delete mail using voice command?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse11" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        Each folder contains at most 5 mails per paginate.
                                        So we can say first mail, second mail , third mail upto fifth.
                                        For deleting ," delete first mail" command can be used.
                                        For reading ," read first mail" command can be used.
                                        Here folder means inbox, outbox or sent, trash, draft and important.
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <a class="d-block w-100" data-toggle="collapse" href="#collapse12">
                                    <div class="card-header">
                                        <h4 class="card-title w-100">
                                            12. how do i paginate?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapse12" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        For paginating, you can use "paginate next or paginate back " command.
                                    </div>
                                </div>
                            </div>
                            </div>
                            <p class = "py-3 text-center font-weight-bold" style = "font-size:16px;">Contact us, if you found not the right anwser or you have a other question?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section><!-- End About Section -->
@endsection
