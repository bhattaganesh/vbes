<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Inbox extends Model
{
	// use SoftDeletes;
    use HasFactory;
    // protected $fillable = ['mail_id','receiver_id','user_id'];
    protected $fillable = ['mail_id','user_id'];


    public function mail(){
    	return $this->belongsTo('App\Models\Mail','mail_id','id');
    }

    public function userByInbox(){
        return $this->belongsTo('App\Models\User','user_id','id');
    }

}
