<?php

return [
    'community_listings' => env('FEATURE_COMMUNITY_LISTINGS', true),
    'owner_claiming' => env('FEATURE_OWNER_CLAIMING', true),
    'admin_approval' => env('FEATURE_ADMIN_APPROVAL', true),
    'property_management' => env('FEATURE_PROPERTY_MANAGEMENT', true),
    'google_maps' => env('FEATURE_GOOGLE_MAPS', true),
    'mpesa_stk' => env('FEATURE_MPESA_STK', true),
    'subscriptions' => env('FEATURE_SUBSCRIPTIONS', false),
    'blue_tick' => env('FEATURE_BLUE_TICK', false),
    'sms_notifications' => env('FEATURE_SMS_NOTIFICATIONS', false),
    'email_notifications' => env('FEATURE_EMAIL_NOTIFICATIONS', true),
    'whatsapp_contact' => env('FEATURE_WHATSAPP_CONTACT', true),
];
