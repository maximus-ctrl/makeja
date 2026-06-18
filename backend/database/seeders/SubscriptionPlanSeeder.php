<?php
namespace Database\Seeders;
use App\Models\SubscriptionPlan; use Illuminate\Database\Seeder;
class SubscriptionPlanSeeder extends Seeder { public function run(): void { SubscriptionPlan::firstOrCreate(['slug'=>'makeja-managed-basic'], ['name'=>'Makeja Managed Basic','price'=>0,'billing_cycle'=>'monthly','unit_limit'=>10,'features'=>['units','availability','rent_status','maintenance'],'is_active'=>false]); } }
