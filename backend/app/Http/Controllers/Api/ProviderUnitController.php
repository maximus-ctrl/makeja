<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Http\Request;

class ProviderUnitController extends Controller
{
    public function index(Request $request)
    {
        $provider = $request->user()->providerProfile;
        $propertyIds = $provider?->properties()->pluck('id') ?? collect();
        return response()->json(Unit::whereIn('property_id',$propertyIds)->with('property')->latest()->paginate(20));
    }
    public function store(Request $request, Property $property)
    {
        $data = $request->validate([
            'unit_name'=>['required','string','max:80'], 'unit_type'=>['required','string','max:80'],
            'bedrooms'=>['nullable','integer','min:0'], 'bathrooms'=>['nullable','integer','min:0'],
            'rent_amount'=>['nullable','numeric','min:0'], 'sale_amount'=>['nullable','numeric','min:0'], 'deposit_amount'=>['nullable','numeric','min:0'],
            'status'=>['nullable','in:available,occupied,reserved,maintenance,hidden'], 'notes'=>['nullable','string']
        ]);
        $unit = $property->units()->create($data + ['status'=>$data['status'] ?? 'available']);
        return response()->json(['unit'=>$unit], 201);
    }
    public function update(Request $request, Unit $unit)
    {
        $data = $request->validate(['unit_name'=>['sometimes','string','max:80'],'status'=>['sometimes','in:available,occupied,reserved,maintenance,hidden'],'rent_amount'=>['nullable','numeric','min:0'],'deposit_amount'=>['nullable','numeric','min:0'],'notes'=>['nullable','string']]);
        $unit->update($data); return response()->json(['unit'=>$unit->fresh()]);
    }
}
