<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
// use Illuminate\Validation\Validator; // sending error "call undefined method"
use App\Models\User;
use App\Models\UserInfo;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Trash;
use Validator;
// use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $user;
    protected $user_info;
    protected $inbox;
    protected $outbox;
    protected $trash;
    public function __construct(User $user,UserInfo $user_info,Inbox $inbox,Outbox $outbox,Trash $trash)
    {
        $this->user = $user;
        $this->user_info = $user_info;
        $this->trash = $trash;
        $this->inbox = $inbox;
        $this->outbox = $outbox;
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return redirect()->route(request()->user()->role);
    }
    public function admin()
    {
        return view('admin.dashboard');
    }

    public function user()
    {
        return view('dashboard.dashboard');
    }

    public function changePassword(Request $request){
        $this->user = auth()->user();
        $data = $request->all();
        $validator = Validator::make($data,$this->user->getUpdatePassword());
        // if ($validator->fails()) {
        //     return Redirect::back()->withErrors($validator,'changePassword');
        // }
        if ($validator->fails()) {
            return response()->json([
                'errors'=>$validator->errors()->all()
            ]);
        }
        if(Hash::check($data['current_password'], auth()->user()->password)){
            $this->user->password = bcrypt($data['password']);
                $status = $this->user->save();
                if($status){
                   Auth::logout();
                    return response()->json([
                        'msg'=>'Password updated successfully',
                        'status'=>true
                    ]);
/*                    $request->session()->flash('success','Password updated successfully. Please login to continue');
                    return redirect()->route('login')->with('changePasswordSuccess','Please, login first. To continue');*/
                }else{
                    /*$request->session()->flash('error','Sorry!, error while updating password');
                    return redirect()->back();*/
                    return response()->json([
                        'msg'=>'Sorry!, error while updating password',
                        'status'=>false
                    ]);
                }
        }else{
            // $request->session()->flash('error','Sorry!, your this current password does not match');
            // return redirect()->back();
            return response()->json([
                'msg'=>'Sorry!, your this current password does not match',
                'status'=>false
            ]);
        }
    }

    public  function  updateMe(Request $request){
        // dd($request->all());
        $this->user = $request->user();
        $validator = Validator::make($request->all(),$this->user->getUpdateRule());
        if ($validator->fails()) {
            // return Redirect::back()->withErrors($validator);
            return response()->json([
                'errors'=>$validator->errors()->all()
            ]);
        }
        $data = $request->except('photo');
        if($request->photo){
            $file_name = imageUpload($request->photo,'user',env('PROFILE_IMG_SIZE','200x200'));
            if($file_name){
                if((request()->user()->userInfo['photo'])){
                    deleteImage(request()->user()->userInfo['photo'],'user');
                }
                $data['photo'] = $file_name;
            }
        }
        // dd($data);
        $this->user->fill($data);
        $status = $this->user->save();
        if($status){
            $this->user_info = $this->user_info->where('user_id',$this->user->id)->first();
            if(!$this->user_info){
                $this->user_info = new UserInfo();
            }
            $data['user_id'] = auth()->user()->id;
            $this->user_info->fill($data);
            $this->user_info->save();
            // $request->session()->flash('success','User updated successfully');
            // return redirect()->back();
            return response()->json([
                'msg'=>'User updated successfully.',
                'status'=>true
            ]);
        }else{
            // $request->session()->flash('error','Sorry!, error while updating this user.');
            // return redirect()->back();
            return response()->json([
                'msg'=>'Sorry!, error while updating this user.',
                'status'=>false
            ]);
        }
    }

    public function deleteAccount(Request $request){
        $this->user = auth()->user();
        $data = $request->all();
        $validator = Validator::make($data,[
            'password' => ['required','string','min:8']
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors'=>$validator->errors()->all()
            ]);
        }
        if(Hash::check($data['password'], auth()->user()->password)){
            $this->user = $this->user->find(auth()->user()->id);
                $status = $this->user->delete();
                if($status){
                   Auth::logout();
                    return response()->json([
                        'msg'=>'Your account deleted successfully',
                        'status'=>true
                    ]);
                }else{
                    return response()->json([
                        'msg'=>'Sorry!, error while deleting account',
                        'status'=>false
                    ]);
                }
        }else{
            return response()->json([
                'msg'=>'Sorry!, this password does not match',
                'status'=>false
            ]);
        }
    }
/* Screen - lock process */
    public function screenLock(Request $request){
        if($request->lockout_time > 0 && $request->lockout_time < 90){
            $this->user = auth()->user();
            $data['lockout_time'] = (int) $request->lockout_time;
            $this->user->fill($data);
            $status = $this->user->save();
            if ($request->user()->getLockoutTime() > 0) {
                session(['lock-expires-at' => now()->addMinutes($request->user()->getLockoutTime())]);
            } 
            if($status){
                $request->session()->flash('success','Screen will be locked after '. $request->lockout_time." ".Str::plural('minute',$request->lockout_time));
                return redirect()->back();
            }else{
                $request->session()->flash('error','Sorry!!, error while setting time to lock screen.');
                return redirect()->back();
            }
        }elseif($request->lockout_time >= 0){
            $this->user = auth()->user();
            $data['lockout_time'] = (int) $request->lockout_time;
            $this->user->fill($data);
            $status = $this->user->save();
            if($status){
                $request->session()->flash('success','Screen lock time locked is removed successfully ');
                return redirect()->back();
            }else{
                $request->session()->flash('error','Sorry!!, error while removing time to lock screen.');
                return redirect()->back();
            }
        }
        else{
            $request->session()->flash('error','Sorry!!, invalid input');
            return redirect()->back();
        }
    }


}
