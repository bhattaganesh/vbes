<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Outbox extends Model
{
    use HasFactory;
    // use SoftDeletes;
    // protected $fillable = ['mail_id','sender_id','user_id'];
    protected $fillable = ['mail_id','user_id'];


    public function mail(){
    	return $this->belongsTo('App\Models\Mail','mail_id','id');
    }


    public function userByOutbox(){
        return $this->belongsTo('App\Models\User','user_id','id');
    }
}
