export const WHOLESALE_TIERS = [
  {
    tier: 'Tier 1: Starter Retailer',
    minQty: 5,
    maxQty: 11,
    discountPercent: 35,
    tagline: 'Ideal for Instagram & TikTok shops starting out',
    features: [
      'Standard wholesale prices on all single products',
      'Mix and match any sizes and available colors',
      'Same-day pickup at Diamond Plaza or Seven Sunday',
      'Free high-resolution product photos & videos for marketing'
    ]
  },
  {
    tier: 'Tier 2: Established Boutique',
    minQty: 12,
    maxQty: 29,
    discountPercent: 45,
    tagline: 'Best for physical boutique owners in Nairobi, Eldoret & major towns',
    recommended: true,
    features: [
      'Extra 10% discount below standard wholesale price',
      'Priority parcel dispatch via Easy Coach, Guardian or Wells Fargo',
      'Direct WhatsApp access to senior branch wholesale manager',
      'Free replacement for any defective factory piece'
    ]
  },
  {
    tier: 'Tier 3: Mega Bulk & Wholesalers',
    minQty: 30,
    maxQty: 'Unlimited',
    discountPercent: 55,
    tagline: 'For regional stockists and major distributors across East Africa',
    features: [
      'Maximum tier factory-direct import pricing',
      'Custom pre-order from international shipments',
      'Free doorstep courier delivery to any county in Kenya',
      'Dedicated account manager & flexible restocking terms'
    ]
  }
];

export const WHOLESALE_PACKAGES = [
  {
    id: 'bale-buggy-plain',
    title: 'Plain Buggy Jeans Retailer Lot (20 Pcs)',
    tag: 'NEW 2026 TOP SELLER',
    price: 19000,
    regularValue: 29000,
    resalePotential: 'KES 29,000 (KES 1,450 / pc)',
    profitEstimate: 'KES 10,000 Net Profit',
    image: '/products-img/Buggy Jeans (4).jpeg',
    breakdown: 'Plain wide-leg buggy denim (Washed Onyx, Vintage Black, Classic Blue, Indigo, Mud Acid)',
    sizesIncluded: 'Waist 30 to 40',
    moq: '1 Bundle (20 items)'
  },
  {
    id: 'bale-buggy-patterned',
    title: 'Patterned & Graphic Buggy Jeans Lot (20 Pcs)',
    tag: 'STREETWEAR VIRAL HIT',
    price: 20000,
    regularValue: 30000,
    resalePotential: 'KES 30,000 (KES 1,500 / pc)',
    profitEstimate: 'KES 10,000 Net Profit',
    image: '/products-img/Buggy Jeans (2).jpeg',
    breakdown: 'Designer graphic, monogram, lightning bolt, crosshatch & acid wash buggy jeans with belts',
    sizesIncluded: 'Waist 30 to 40',
    moq: '1 Bundle (20 items)'
  },
  {
    id: 'bale-tees',
    title: 'Streetwear Graphic Tee Lot (30 Pcs)',
    tag: 'FASTEST SELLING',
    price: 17500,
    regularValue: 28500,
    resalePotential: 'KES 28,000 - 36,000',
    profitEstimate: 'KES 10,500 - 18,500 Profit',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    breakdown: 'Chrome Hearts, Graphic Tees, Heavyweight vintage washes',
    sizesIncluded: 'M, L, XL, 2XL',
    moq: '1 Bundle (30 items)'
  },
  {
    id: 'bale-khakis',
    title: 'Stretch Executive Khaki Bundle (20 Pcs)',
    tag: 'HIGH PROFIT MARGIN',
    price: 19800,
    regularValue: 32000,
    resalePotential: 'KES 32,000 - 40,000',
    profitEstimate: 'KES 12,200 - 20,200 Profit',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    breakdown: 'Classic Khaki, Jet Black, Navy, Olive Green',
    sizesIncluded: 'Waist 30 to 38',
    moq: '1 Bundle (20 items)'
  },
  {
    id: 'bale-sets',
    title: 'Waffle Knit 2-Piece Sets (15 Sets)',
    tag: 'HOT TREND 2026',
    price: 19500,
    regularValue: 33000,
    resalePotential: 'KES 33,000 - 37,500',
    profitEstimate: 'KES 13,500 - 18,000 Profit',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    breakdown: 'Matching short-sleeve shirt + drawstring shorts set',
    sizesIncluded: 'M, L, XL, 2XL',
    moq: '1 Bundle (15 sets)'
  }
];
