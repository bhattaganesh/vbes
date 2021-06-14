<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest')->except('logout');
        $this->middleware('guest')->except([
            'logout',
            'locked',
            'unlock'
        ]);
    }
    protected function loggedOut() {

        return redirect()->route('login');

    }

    protected function credentials(Request $request)
    {
        $email = str_replace(' ','',$request->email);
        $password = myCustomFunction($request->password);
        return ['email' => $email, 'password' => $password , 'status' => 'active'];

    }

    public function verify(Request $request){
        $credential = [
            'email' => $request->email,
            'password' => $request->password,
            'status' => 'active'
        ];

        $remember_me  = ( !empty( $request->remember_me ) )? TRUE : FALSE;

        if(Auth::attempt($credential)){
            $user = User::where(["email" => $credential['email']])->first();

            Auth::login($user, $remember_me);
            return redirect(route('dashboard'));
        }
    }
    public function locked()
    {
        if(!session('lock-expires-at')){
            return redirect('/');
        }

        if(session('lock-expires-at') > now()){
            return redirect('/');
        }

        return view('auth.locked');
    }

    public function unlock(Request $request)
    {
        $check = Hash::check($request->password, $request->user()->password);

/*         if(!$check){
            return redirect()->route('login.locked')->withErrors([
                'Your password does not match your profile.'
            ]);
        } */

        if (!$check) {
            return response()->json([
            'msg'=>'Sorry!!, password does not match',
            'status'=>false
            ]);
        }else{
            session(['lock-expires-at' => now()->addMinutes($request->user()->getLockoutTime())]);
            // return redirect()->route('dashboard');
            return response()->json([
                'msg'=>'Welcome again',
                'route' => redirect()->back(),
                'status'=>true
                ]);
        }

    }
}
