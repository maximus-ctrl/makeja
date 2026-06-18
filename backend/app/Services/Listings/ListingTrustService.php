<?php
namespace App\Services\Listings;

use App\Enums\ListingStatus;
use App\Enums\ListingTrustStatus;
use App\Models\Listing;

class ListingTrustService
{
    public function markCommunityAdded(Listing $listing): Listing
    {
        $listing->update([
            'trust_status' => ListingTrustStatus::CommunityAdded->value,
            'status' => config('features.admin_approval') ? ListingStatus::PendingApproval->value : ListingStatus::Published->value,
        ]);
        return $listing;
    }

    public function markOwnerClaimed(Listing $listing): Listing
    {
        $listing->update(['trust_status' => ListingTrustStatus::OwnerClaimed->value]);
        return $listing;
    }

    public function approve(Listing $listing): Listing
    {
        $listing->update([
            'status' => ListingStatus::Published->value,
            'trust_status' => ListingTrustStatus::AdminApproved->value,
        ]);
        return $listing;
    }

    public function markMakejaManaged(Listing $listing): Listing
    {
        $listing->update(['trust_status' => ListingTrustStatus::MakejaManaged->value]);
        return $listing;
    }
}
