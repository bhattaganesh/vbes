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
$admin = [
                    [
                        'name' => 'Ganesh Bhatta',
                        'email' => 'bhattaganesh05@gmail.com',
                        'password' => Hash::make('40028008'), //bcrypt
                        'role' => 'admin',
                        'status' => 'active'
                    ],
                    [
                        'name' => 'GP Bhatta',
                        'email' => 'gpbhatta01@gmail.com',
                        'password' => bcrypt('40028008'), //bcrypt
                        'role' => 'user',
                        'status' => 'active'
                    ]
                ];
        foreach ($admin as $user) {
            if(User::where('email',$user['email'])->count() <= 0){
                User::create($user);
            }
        }

    }
}
