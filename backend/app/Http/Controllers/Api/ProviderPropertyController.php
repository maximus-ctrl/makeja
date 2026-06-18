<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class ProviderPropertyController extends Controller
{
    public function index(Request $request)
    {
        $provider = $request->user()->providerProfile;
        return response()->json($provider?->properties()->with(['units','listings'])->latest()->paginate(12) ?? []);
    }
    public function store(Request $request)
    {
        $provider = $request->user()->providerProfile;
        if (!$provider) return response()->json(['message'=>'Provider profile missing.'], 422);
        $data = $request->validate([
            'title'=>['required','string','max:180'], 'description'=>['nullable','string'],
            'address'=>['nullable','string','max:255'], 'latitude'=>['nullable','numeric'], 'longitude'=>['nullable','numeric'],
            'property_category_id'=>['nullable','integer'], 'property_type_id'=>['nullable','integer'],
        ]);
        $property = Property::create($data + ['provider_id'=>$provider->id,'ownership_status'=>'owner_added','claim_status'=>'claimed','is_active'=>true]);
        return response()->json(['property'=>$property], 201);
    }
    public function show(Property $property){ return response()->json(['property'=>$property->load(['units','listings.images'])]); }
    public function update(Request $request, Property $property)
    {
        $data = $request->validate(['title'=>['sometimes','string','max:180'],'description'=>['nullable','string'],'address'=>['nullable','string','max:255'],'latitude'=>['nullable','numeric'],'longitude'=>['nullable','numeric'],'is_active'=>['sometimes','boolean']]);
        $property->update($data); return response()->json(['property'=>$property->fresh()]);
    }
    public function destroy(Property $property){ $property->update(['is_active'=>false]); return response()->json(['message'=>'Property archived']); }
}
