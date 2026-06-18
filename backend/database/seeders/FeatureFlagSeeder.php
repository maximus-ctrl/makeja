<?php
namespace Database\Seeders;
use App\Models\FeatureFlag; use Illuminate\Database\Seeder;
class FeatureFlagSeeder extends Seeder { public function run(): void { foreach(config('features') as $key=>$enabled){ FeatureFlag::updateOrCreate(['key'=>$key], ['name'=>str($key)->replace('_',' ')->title(), 'is_enabled'=>(bool)$enabled]); } } }
