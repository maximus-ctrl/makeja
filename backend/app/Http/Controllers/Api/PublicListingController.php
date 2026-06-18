<?php
namespace App\Http\Controllers\Api;

use App\Enums\ListingStatus;
use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Property;
use App\Models\ReportedListing;
use App\Services\Listings\ListingTrustService;
use Illuminate\Http\Request;

class PublicListingController extends Controller
{
    public function index(Request $request)
    {
        $q = Listing::query()->with(['property.location','images','unit'])
            ->where('status', ListingStatus::Published->value);

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $q->where(function($sub) use ($search){
                $sub->where('title','ilike',"%$search%")
                    ->orWhere('description','ilike',"%$search%");
            });
        }
        if ($request->filled('intent')) $q->where('listing_intent', $request->intent);
        if ($request->filled('min_price')) $q->where('price', '>=', $request->min_price);
        if ($request->filled('max_price')) $q->where('price', '<=', $request->max_price);

        return response()->json($q->latest()->paginate(12));
    }

    public function show(Listing $listing)
    {
        if ($listing->status !== ListingStatus::Published->value) abort(404);
        $listing->increment('views_count');
        return response()->json(['listing'=>$listing->load(['property.location','images','unit'])]);
    }

    public function communityStore(Request $request, ListingTrustService $trust)
    {
        if (!config('features.community_listings')) return response()->json(['message'=>'Community listings disabled.'],403);
        $data = $request->validate([
            'title'=>['required','string','max:180'], 'description'=>['nullable','string'],
            'price'=>['required','numeric','min:0'], 'deposit'=>['nullable','numeric','min:0'],
            'listing_intent'=>['required','in:rent,buy,short_stay,lease'],
            'contact_name'=>['required','string','max:120'], 'contact_phone'=>['required','string','max:30'],
            'county'=>['nullable','string','max:80'], 'town'=>['nullable','string','max:80'], 'estate'=>['nullable','string','max:80'],
            'latitude'=>['nullable','numeric'], 'longitude'=>['nullable','numeric'],
        ]);
        $property = Property::create([
            'title'=>$data['title'], 'description'=>$data['description'] ?? null,
            'address'=>trim(($data['county'] ?? '').' '.($data['town'] ?? '').' '.($data['estate'] ?? '')),
            'latitude'=>$data['latitude'] ?? null, 'longitude'=>$data['longitude'] ?? null,
            'ownership_status'=>'community_added','claim_status'=>'unclaimed','is_active'=>true,
        ]);
        $listing = Listing::create([
            'property_id'=>$property->id, 'created_by'=>$request->user()?->id,
            'title'=>$data['title'], 'description'=>$data['description'] ?? null,
            'listing_intent'=>$data['listing_intent'], 'price'=>$data['price'], 'deposit'=>$data['deposit'] ?? 0,
            'currency'=>'KES', 'contact_name'=>$data['contact_name'], 'contact_phone'=>$data['contact_phone'],
        ]);
        $trust->markCommunityAdded($listing);
        return response()->json(['listing'=>$listing->fresh()], 201);
    }

    public function report(Request $request, Listing $listing)
    {
        $data = $request->validate(['reason'=>['required','string','max:120'], 'details'=>['nullable','string']]);
        $report = ReportedListing::create(['listing_id'=>$listing->id,'user_id'=>$request->user()?->id,'reason'=>$data['reason'],'details'=>$data['details'] ?? null,'status'=>'open']);
        return response()->json(['report'=>$report], 201);
    }
}
