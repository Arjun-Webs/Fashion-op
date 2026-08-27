export type UserRole = 'Customer' | 'Influencer' | 'Admin';

export type InfluencerTier = 'Micro' | 'Macro' | 'Style Leader' | 'Celebrity';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar: string;
  role: UserRole;
  influencerTier?: InfluencerTier;
  communityId: string;
  followersCount: number;
  followingCount: number;
  pageRankScore: number;
  betweennessCentrality: number;
  bio: string;
  isVerified: boolean;
}

export type Category = 
  | 'Streetwear' 
  | 'Ethnic Fusion' 
  | 'Quiet Luxury' 
  | 'Techwear' 
  | 'Retro Y2K' 
  | 'Minimal' 
  | 'Sustainable' 
  | 'Sneakers'
  | 'Men'
  | 'Women'
  | 'Accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number; // in INR (₹)
  originalPrice?: number;
  category: Category;
  communityId: string;
  image: string;
  secondaryImages: string[];
  description: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isLimitedDrop?: boolean;
  sustainabilityScore: number; // 0 to 100
  trendTier: 'Trending Hot' | 'Rising Fast' | 'Popular Classic' | 'New Drop';
  graphConnectionsCount: number;
  sizes: string[];
  colors: string[];
  productLink?: string;
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  imageUrl: string;
  videoUrl?: string;
  caption: string;
  taggedProductIds: string[];
  taggedProducts: Product[];
  hashtags: string[];
  communityId: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viralityScore: number; // 0 to 100
  createdAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface SocialStory {
  id: string;
  userId: string;
  user: User;
  mediaUrl: string;
  title: string;
  taggedProductId?: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  membersCount: number;
  topInfluencers: User[];
  topProducts: Product[];
  growthRate: number; // percentage
  modularityScore: number;
}

export type NodeType = 'User' | 'Product' | 'Post' | 'Brand' | 'Hashtag' | 'Community';
export type EdgeType = 'FOLLOWS' | 'LIKED' | 'TAGGED_IN' | 'BELONGS_TO' | 'CO_PURCHASED' | 'MENTIONS';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  communityId?: string;
  avatar?: string;
  image?: string;
  degree?: number;
  pageRank?: number;
  betweenness?: number;
  meta?: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface TrendCascade {
  id: string;
  hashtag: string;
  title: string;
  originUserId: string;
  originUser: User;
  startDate: string;
  currentStage: 'Origin Seed' | 'Early Trend' | 'Peak Popularity' | 'Mainstream' | 'Declining';
  viralityCoefficient: number;
  adoptionSpeed: number; // users / day
  geoSpread: { region: string; density: number }[];
  timeline: { day: number; activeNodes: number; totalShares: number }[];
  seedProduct: Product;
}

export interface ViralityPredictionInput {
  caption: string;
  hashtags: string[];
  communityId: string;
  taggedProductCount: number;
  authorFollowers: number;
}

export interface ViralityPredictionResult {
  predictedLikes: number;
  predictedShares: number;
  predictedViralityIndex: number;
  confidenceScore: number;
  recommendations: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  trackingNumber: string;
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: string;
  paymentMethod?: string;
}

export interface SystemStats {
  totalRevenue: number;
  activeUsers: number;
  graphNodesCount: number;
  graphEdgesCount: number;
  modularityIndex: number;
  viralityRate: number;
}
