<?php
namespace App\Enums;

enum ListingTrustStatus: string
{
    case CommunityAdded = 'community_added';
    case OwnerClaimed = 'owner_claimed';
    case AdminApproved = 'admin_approved';
    case MakejaManaged = 'makeja_managed';
}
