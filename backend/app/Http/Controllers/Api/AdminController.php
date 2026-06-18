<?php
namespace App\Http\Controllers\Api;

use App\Enums\ListingStatus;
use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Property;
use App\Models\User;
use App\Services\Listings\ListingTrustService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'users'=>User::count(),
            'providers'=>User::where('role','provider')->count(),
            'properties'=>Property::count(),
            'published_listings'=>Listing::where('status','published')->count(),
            'pending_listings'=>Listing::where('status','pending_approval')->count(),
        ]);
    }
    public function pendingListings()
    {
        return response()->json(Listing::with(['property','unit','creator'])->where('status',ListingStatus::PendingApproval->value)->latest()->paginate(20));
    }
    public function approve(Listing $listing, ListingTrustService $trust)
    {
        return response()->json(['listing'=>$trust->approve($listing)]);
    }
    public function reject(Request $request, Listing $listing)
    {
        $data = $request->validate(['reason'=>['nullable','string','max:255']]);
        $listing->update(['status'=>ListingStatus::Rejected->value]);
        return response()->json(['message'=>'Listing rejected','reason'=>$data['reason'] ?? null]);
    }
}
