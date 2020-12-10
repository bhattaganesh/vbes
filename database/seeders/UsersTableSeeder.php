<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = array(
            'name' => 'Ganesh Bhatta',
            'email' => 'bhattaganesh05@gmail.com',
            'password' => Hash::make('40028008')
        );
        if(User::where('email',$admin['email'])->count() <= 0){
            User::create($admin);
        }
    }
}
