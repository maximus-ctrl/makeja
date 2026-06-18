<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void {
Schema::create('system_settings', function(Blueprint $t){$t->id();$t->string('key')->unique();$t->text('value')->nullable();$t->string('type')->default('string');$t->string('group')->default('general');$t->timestamps();});
Schema::create('feature_flags', function(Blueprint $t){$t->id();$t->string('key')->unique();$t->string('name');$t->text('description')->nullable();$t->boolean('is_enabled')->default(false);$t->timestamps();});
Schema::create('audit_logs', function(Blueprint $t){$t->id();$t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();$t->string('action');$t->nullableMorphs('auditable');$t->json('old_values')->nullable();$t->json('new_values')->nullable();$t->string('ip_address')->nullable();$t->text('user_agent')->nullable();$t->timestamps();});
} public function down(): void { Schema::dropIfExists('audit_logs'); Schema::dropIfExists('feature_flags'); Schema::dropIfExists('system_settings'); } };
