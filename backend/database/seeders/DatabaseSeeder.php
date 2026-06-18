<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder { public function run(): void { $this->call([AdminUserSeeder::class, PropertyTaxonomySeeder::class, FeatureFlagSeeder::class, SubscriptionPlanSeeder::class, DemoListingSeeder::class]); } }
