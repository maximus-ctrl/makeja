<?php
namespace Database\Seeders;
use App\Models\User; use Illuminate\Database\Seeder; use Illuminate\Support\Facades\Hash;
class AdminUserSeeder extends Seeder { public function run(): void { User::firstOrCreate(['email'=>'admin@makeja.test'], ['name'=>'Makeja Admin','phone'=>'0700000000','password'=>Hash::make('password'),'role'=>'super_admin','is_active'=>true]); } }
