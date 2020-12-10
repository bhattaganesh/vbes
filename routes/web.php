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

Route::get('/', [App\Http\Controllers\FrontController::class,'index'])->name('landing');
Route::get('about', [App\Http\Controllers\FrontController::class,'about'])->name('about');
Route::get('team', [App\Http\Controllers\FrontController::class,'team'])->name('team');
Route::get('/contact', [App\Http\Controllers\FrontController::class,'contact'])->name('contact');
Route::post('/contact', [App\Http\Controllers\FrontController::class,'contactStore'])->name('contact-post');
Route::get('/read-aloud', [App\Http\Controllers\FrontController::class,'readAloud'])->name('read-aloud');



Route::group(['prefix'=>'/','middleware'=>['auth'],'namespace'=>'App\Http\Controllers'],function(){
Route::get('/dashboard', function () {
    return view('dashboard.dashboard');
})->name('dashboard');

Route::patch('/change-pwd','HomeController@changePassword')->name('change-password');
Route::patch('/update-me','HomeController@updateMe')->name('update-me');

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

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/bday_hack', function () {
    return view('layouts.bday_hack');
})->name('bday_hack');

