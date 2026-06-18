<?php
namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingImage;
use App\Models\Location;
use App\Models\Property;
use App\Models\PropertyCategory;
use App\Models\PropertyType;
use App\Models\ProviderProfile;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoListingSeeder extends Seeder
{
    public function run(): void
    {
        $providerUser = User::firstOrCreate(
            ['email' => 'provider@makeja.test'],
            ['name' => 'John Maina', 'phone' => '0712345678', 'password' => Hash::make('password'), 'role' => 'provider', 'is_active' => true]
        );

        $provider = ProviderProfile::firstOrCreate(
            ['user_id' => $providerUser->id],
            ['provider_type' => 'owner', 'business_name' => 'Maina Properties', 'contact_phone' => '0712345678', 'whatsapp_phone' => '0712345678', 'verification_status' => 'verified', 'is_makeja_managed' => true]
        );

        $rows = [
            ['category'=>'Homes','type'=>'2 Bedroom','title'=>'2 Bedroom Apartment','unit'=>'B4','address'=>'Kilimani, Nairobi','town'=>'Nairobi','estate'=>'Kilimani','lat'=>-1.2921,'lng'=>36.7872,'intent'=>'rent','price'=>35000,'deposit'=>35000,'trust'=>'owner_claimed','image'=>'/assets/demo/apartment.svg','description'=>'Modern 2 bedroom apartment with parking, balcony, reliable water and secure entry.'],
            ['category'=>'Homes','type'=>'Bedsitter','title'=>'Bedsitter Ready','unit'=>'S12','address'=>'South B, Nairobi','town'=>'Nairobi','estate'=>'South B','lat'=>-1.315,'lng'=>36.842,'intent'=>'rent','price'=>8000,'deposit'=>8000,'trust'=>'admin_approved','image'=>'/assets/demo/bedsitter.svg','description'=>'Clean bedsitter with water 24/7, token meter and easy access to public transport.'],
            ['category'=>'Business Spaces','type'=>'Shop','title'=>'Retail Shop Space','unit'=>'G11','address'=>'Moi Avenue, Nairobi CBD','town'=>'Nairobi','estate'=>'CBD','lat'=>-1.284,'lng'=>36.823,'intent'=>'lease','price'=>25000,'deposit'=>50000,'trust'=>'makeja_managed','image'=>'/assets/demo/shop.svg','description'=>'Ground floor shop with strong foot traffic and ample frontage for a service business.'],
            ['category'=>'Land','type'=>'Plot','title'=>'1/8 Acre Residential Plot','unit'=>null,'address'=>'Kangundo Road, Machakos','town'=>'Machakos','estate'=>'Kangundo Road','lat'=>-1.303,'lng'=>37.012,'intent'=>'buy','price'=>450000,'deposit'=>0,'trust'=>'admin_approved','image'=>'/assets/demo/land.svg','description'=>'Prime residential plot with access road and nearby utilities. Suitable for a family home or investment.'],
        ];

        foreach ($rows as $row) {
            $category = PropertyCategory::where('name', $row['category'])->first();
            $type = PropertyType::where('name', $row['type'])->first();
            $location = Location::firstOrCreate(
                ['country'=>'Kenya','county'=>'Nairobi','town'=>$row['town'],'estate'=>$row['estate']],
                ['latitude'=>$row['lat'],'longitude'=>$row['lng']]
            );
            $property = Property::firstOrCreate(
                ['title'=>$row['title'], 'address'=>$row['address']],
                ['provider_id'=>$provider->id,'property_category_id'=>$category?->id,'property_type_id'=>$type?->id,'location_id'=>$location->id,'description'=>$row['description'],'ownership_status'=>'owner_claimed','claim_status'=>'approved','latitude'=>$row['lat'],'longitude'=>$row['lng'],'is_active'=>true]
            );
            $unit = null;
            if ($row['unit']) {
                $unit = Unit::firstOrCreate(
                    ['property_id'=>$property->id,'unit_name'=>$row['unit']],
                    ['unit_type'=>$row['type'],'bedrooms'=>str_contains($row['type'], '2') ? 2 : null,'bathrooms'=>str_contains($row['type'], '2') ? 2 : 1,'rent_amount'=>$row['intent']==='rent' ? $row['price'] : null,'deposit_amount'=>$row['deposit'],'status'=>'available','notes'=>'Demo unit']
                );
            }
            $listing = Listing::firstOrCreate(
                ['title'=>$row['title'], 'property_id'=>$property->id],
                ['unit_id'=>$unit?->id,'created_by'=>$providerUser->id,'description'=>$row['description'],'listing_intent'=>$row['intent'],'price'=>$row['price'],'deposit'=>$row['deposit'],'currency'=>'KES','status'=>'published','trust_status'=>$row['trust'],'contact_name'=>'John Maina','contact_phone'=>'0712345678','contact_whatsapp'=>'0712345678','is_featured'=>true]
            );
            ListingImage::firstOrCreate(
                ['listing_id'=>$listing->id,'url'=>$row['image']],
                ['disk'=>'public','path'=>$row['image'],'caption'=>$row['title'],'sort_order'=>1,'is_cover'=>true]
            );
        }
    }
}
