<?php
namespace App\Enums;

enum ListingStatus: string
{
    case Draft = 'draft';
    case PendingApproval = 'pending_approval';
    case Published = 'published';
    case Rejected = 'rejected';
    case Expired = 'expired';
    case Archived = 'archived';
}
