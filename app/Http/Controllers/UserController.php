<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $user,$userInfo;
    public function __construct(User $user,UserInfo $userInfo)
    {
        $this->user = $user;
        $this->userInfo = $userInfo;
    }
    private function validateId($id){
        $this->user = $this->user->find($id);
        if(!$this->user){
            request()->session()->flash('error','Sorry!, user does not exists');
            return  redirect()-route('user.index');
        }
    }
    public function index()
    {
        $all_users = $this->user->where('id','!=',request()->user()->id)->orderBy('id','DESC')->get();
        $role = 'user';
        return view('admin.user.index')
        ->with('role',$role)
        ->with('all_users',$all_users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.user.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate($this->user->getRules());
//        dd($request->all());
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $this->user->fill($data);
        $status = $this->user->save($data);
        if($status){
            $data['user_id'] = $this->user->id;
            if($request->photo){
                $file_name = imageUpload($request->photo,'user',env('PROFILE_IMG_SIZE','200x200'));
                if($image_name){
                    $data['photo'] = $file_name;
                }
            }
            $this->userInfo->fill($data);
            $this->userInfo->save();
            $request->session()->flash('success','User Created successfully.');
        }else{
            $request->session()->flash('error','Sorry!, error while creating user');

        }
//         dd($this->user);
        return redirect()->back();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        if ($user == 'returnBack') {
            $notifications = auth()->user()->notifications()
            ->where('data->notification_for','admin')
                    ->get();
            if($notifications->count()){
                foreach ($notifications as $notification) {
                    $notification->markAsRead();
                }
            }
            $request->session()->flash('success','All notifications mark as read successfully.');
            return redirect()->back();
        }else{
            $all_users = $this->user->where('email',$user)->get();
            $user = $this->user->where('email',$user)->first();
            $role = 'admin';
            $notification = auth()->user()->notifications()->where('data->notification_for','admin')->where('data->email',$user->email)
            ->first();
            if($notification){
                $notification->markAsRead();
            }
            return view('admin.user.index')
            ->with('role',$role)
            ->with('user',$user->name)
            ->with('all_users',$all_users);  
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->validateId($id);
        return view('admin.user.form')->with('user_detail',$this->user);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validateId($id);
        $request->validate($this->user->getUpdateRule());
        $data = $request->all();
        $this->user->fill($data);
        $status = $this->user->save();
        if($status){
            if($request->photo){
                $image_name = imageUpload($request->photo,'user',env('UserImageSize','200x200'));
                if($image_name){
                    if (isset($this->user->userInfo->image) && $this->user->userInfo->image != null) {
                        deleteImage($this->user->userInfo->image,'user');
                    }
                    $data['photo'] = $image_name;
                }
            }
            if($this->user->userInfo == null){
                $data['user_id'] = $this->user->id;
                $this->user->userInfo = new UserInfo();

            }
            $this->user->userInfo->fill($data);
            $this->user->userInfo->save();
            $request->session()->flash('success','User updated successfully.');
        }else{
            $request->session()->flash('error','Sorry!, error while updating user');

        }
        // return redirect()->route('user.show',$this->user->role);
        return redirect()->route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->validateId($id);
        $image = $this->userInfo->image;
        $status = $this->user->delete();
        if($status){
            if($image != null){
                deleteImage($image->image, 'user');
            }
            request()->session()->flash('success','user successfully deleted');
        }else{
            request()->session()->flash('error','Sorry!, user does not exists');
        }
        return redirect()->back();
    }

    public function changeStatus(Request $request){
        $this->validateId($request->id);
        if($this->user->status == 'active') {
            $this->user->status = 'inactive';
        }else{
            $this->user->status = 'active';
        }
        $status = $this->user->save();
        if($status){
            $request->session()->flash('success','user status changed successfully.');
        }else{
            $request->session()->flash('error','Sorry!, error while changing user status');
        }
            return redirect()->back();
    }

    public function showPasswordChangeForm($id){
        $this->validateId($id);
        return view('admin.user.password-change')->with('user_data',$this->user);
    }
    public function updatePassword(Request $request,$id){
        $this->validateId($id);
        $request->validate(
            ['password'=>'required|confirmed|string|min:8']
        );
//        dd($request->all());
        $this->user->password = Hash::make($request->passowrd);
        $status = $this->user->save();
        if($status){
            $request->session()->flash('success','user password updated successfully.');
        }else{
            $request->session()->flash('error','Sorry!, error while updating user password');
        }
        return redirect()->back();
    }

}
