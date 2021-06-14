<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    use HasFactory;
    // protected $fillable = ['mail_id','sender_id','user_id'];
    protected $fillable = ['mail_id','user_id'];


    public function mail(){
    	return $this->belongsTo('App\Models\Mail','mail_id','id');
    }

    public function userByDraft(){
        return $this->belongsTo('App\Models\User','user_id','id');
    }
}
