<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    use HasFactory;
    protected $fillable = ['mail_id','sender_id'];

    public function mail(){
    	return $this->belongsTo('App\Models\Mail','mail_id','id');
    }
    
}
