export type CategorySlug = 'all' | 'engagement-rings' | 'wedding-bands' | 'fashion-rings' | 'custom-design';

export interface MetalOption {
  id: string;
  name: string;
  colorHex: string;
  image?: string;
}

export interface ProductFeature {
  title: string;
  subtitle: string;
  image: string;
}

export interface ProductSpecs {
  metal: string;
  diamondWeight: string;
  diamondClarity: string;
  diamondCut: string;
  certification: string;
  grossWeight?: string;
  settingType?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collectionName: string;
  category: 'engagement-rings' | 'wedding-bands' | 'fashion-rings' | 'custom-design';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  gallery: string[];
  metalOptions: MetalOption[];
  availableSizes: number[];
  specs: ProductSpecs;
  features: ProductFeature[];
  isBestseller?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CategoryCardData {
  id: string;
  slug: CategorySlug;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface BrandPromise {
  id: string;
  title: string;
  description: string;
  iconName: 'diamond' | 'botanical' | 'sparkle' | 'heart';
}
