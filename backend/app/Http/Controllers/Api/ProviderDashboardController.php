<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProviderDashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $provider = $request->user()->providerProfile;
        return response()->json([
            'properties' => $provider?->properties()->count() ?? 0,
            'units' => $provider?->properties()->withCount('units')->get()->sum('units_count') ?? 0,
            'available_units' => $provider?->properties()->with('units')->get()->flatMap->units->where('status','available')->count() ?? 0,
        ]);
    }
}
