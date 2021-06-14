<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\LockableTrait;
class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use LockableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'lockout_time','role','status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getUpdatePassword(){
        return [
            'current_password' => ['required','string','min:8'],
            'password' => ['required','string','min:8','confirmed']
        ];
    }

    public  function getUpdateRule(){
        return [
            'name' => 'required|string|max:50',
            'dob' => 'nullable|date',
            'photo' => 'sometimes|image|max:5000',
            'gender' => 'sometimes|in:male,female,other'
        ];
    }

    public function userInfo(){
        return $this->hasOne('\App\Models\UserInfo','user_id','id');
    }

    public function getRules(){
        return [
            'name' => 'required|string|max:50',
            'email' =>'required|email|unique:users,email',
            'password' => ['required','string','min:8','confirmed'],
//            'user_id'=>'required|exists:users,id',
            'dob' => 'nullable|date',
            'photo' => 'sometimes|image|max:5000',
            'gender' => 'sometimes|in:male,female,other',
            'role' => 'required|in:user',
            'status' => 'required|in:active,inactive'
        ];
    }
}
