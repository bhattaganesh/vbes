<?php

use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/',function(){ 
    return redirect()->route('login');
})
->name('landing');
Route::get('/chatbox',function(){
    return view('front.chatBox');
})->name('chatbox');
// Route::post('/botman', [App\Http\Controllers\BotManController::class,'handle']);
Route::match(['get', 'post'], '/botman', [App\Http\Controllers\BotManController::class,'handle'])->name('botman');

Route::get('login/locked', [App\Http\Controllers\Auth\LoginController::class,'locked'])->middleware('auth')->name('login.locked');
Route::post('login/locked', [App\Http\Controllers\Auth\LoginController::class,'unlock'])->name('login.unlock');

// Route::get('/', [App\Http\Controllers\FrontController::class,'index'])->name('landing');
Route::get('about', [App\Http\Controllers\FrontController::class,'about'])->name('about');
Route::get('team', [App\Http\Controllers\FrontController::class,'team'])->name('team');
Route::get('/service', [App\Http\Controllers\FrontController::class,'service'])->name('service');
Route::get('/chatbot', [App\Http\Controllers\FrontController::class,'chatbot'])->name('chatbot');
Route::get('/voice_chatbot', [App\Http\Controllers\FrontController::class,'voiceChatbot'])->name('voiceChatbot');
Route::get('/contact', [App\Http\Controllers\FrontController::class,'contact'])->name('contact');
Route::get('/faq', [App\Http\Controllers\FrontController::class,'faq'])->name('faq');
Route::get('/blog', [App\Http\Controllers\FrontController::class,'blog'])->name('blog');
Route::get('/blog_detail', [App\Http\Controllers\FrontController::class,'blogDetail'])->name('blogDetail');
Route::get('/privacy', [App\Http\Controllers\FrontController::class,'privacy'])->name('privacy');
Route::get('/terms', [App\Http\Controllers\FrontController::class,'terms'])->name('terms');
Route::post('/contact', [App\Http\Controllers\FrontController::class,'contactStore'])->name('contact-post');
Route::get('/read-aloud', [App\Http\Controllers\FrontController::class,'readAloud'])->name('read-aloud');



Route::group(['prefix'=>'/','middleware'=>['auth'],'namespace'=>'App\Http\Controllers'],function(){
/* Route::get('/dashboard', function () {
    return view('dashboard.dashboard');
})->name('dashboard'); */

Route::patch('/change-pwd','HomeController@changePassword')->name('change-password');
Route::patch('/delete-account','HomeController@deleteAccount')->name('delete-account');
Route::patch('/update-me','HomeController@updateMe')->name('update-me');
Route::patch('/screen-lock','HomeController@screenLock')->name('screenLock');// screen-lock

Route::group(['prefix'=>'mail'],function(){
Route::resource('inbox','InboxController')->only(['index','show']);
Route::resource('sent','OutboxController')->only(['index','show']);
Route::resource('draft','DraftController')->only(['index','show']);
Route::resource('trash','TrashController')->only(['index','show']);
Route::resource('imp','ImportantController')->only(['index','show']);
Route::resource('/','MailController',
	['names' => array(
		// 'show' => 'mail.show',
		'edit' => 'mail.edit',
		'store' => 'mail.store')])
->except(['update','destroy','index','create','show']);
Route::get('/compose','MailController@compose')->name('mail.compose');
Route::delete('inbox/delete/{id?}','InboxController@deleteRecord')->name('inbox.delete');
Route::delete('sent/delete/{id?}','OutboxController@deleteRecord')->name('sent.delete');
Route::delete('trash/delete{id?}','TrashController@deleteRecord')->name('trash.delete');
Route::delete('draft/delete/{id?}','DraftController@deleteRecord')->name('draft.delete');
Route::delete('imp/delete/{id?}','ImportantController@deleteRecord')->name('imp.delete');
Route::get('trash/{id}/make-imp','TrashController@makeItImp')->name('trash.imp');
Route::get('draft/{id}/make-imp','DraftController@makeItImp')->name('draft.imp');
Route::get('inbox/{id}/make-imp','InboxController@makeItImp')->name('inbox.imp');
Route::get('sent/{id}/make-imp','OutboxController@makeItImp')->name('sent.imp');
Route::get('mail/{dir}/{file_name}/dowload-attachment','MailController@attachDownload')->name('download-attach');
Route::get('mail/{dir}/{file_name}/display-attachment','MailController@attachDisplay')->name('display-attach');
Route::get('{mail_id}/{mail_type}/reply','MailController@reply')->name('mail.reply');
Route::get('mail-user/search', 'MailController@mailUserSearch')->name('navbar-search');
Route::get('/search', 'MailController@mailSearch')->name('mail-search');
Route::get('{user_id}/compose','MailController@mailSendBySearch')->name('mail-Send-by-search');
Route::get('/created_at', 'MailController@createDiffForHumans')->name('created_at');
Route::get('/attachment', 'MailController@attachmentsByMailId')->name('isExistsAttachment');
Route::get('subject/create', 'MailController@subjectCreate')->name('subjectCreate');
});
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//for admin
Route::group(['prefix' => 'admin','middleware' => ['auth','admin'],'namespace' => 'App\Http\Controllers'], function () {
    Route::get('/dashboard', 'Homecontroller@admin')->name('admin');
    Route::resource('user', 'UserController');// for user manager
    Route::get('/user/{id}/change-password','UserController@showPasswordChangeForm')->name('change-pwd');
    Route::patch('/user/{id}/change-password','UserController@updatePassword')->name('user-update-password');
    Route::get('/user/status-change/{id}/{status}','UserController@changeStatus')->name('user-change-status');
});

//for normal user
Route::group(['prefix' => '/','middleware' => ['auth','user'],'namespace' => 'App\Http\Controllers'], function () {
    Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'user'])->middleware('auth.lock')->name('user');
    Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'user'])->middleware('auth.lock')->name('dashboard');
});

// for chatbot

// Route::match(['get', 'post'], '/chatbot/botman', [App\Http\Controllers\BotManController::class, 'handle']);
/* Route::post('/chatbot/botman',function(){
    app('botman')->listen();
}); */
