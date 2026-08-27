import { Product, Post, User, ViralityPredictionInput, ViralityPredictionResult } from '../types';

export class AIEngine {
  /**
   * Hybrid Product Recommendation Engine
   */
  public getRecommendations(
    userId: string,
    products: Product[],
    posts: Post[],
    mode: 'Collaborative' | 'Content-Based' | 'Graph-Based' | 'Hybrid' = 'Hybrid'
  ): Product[] {
    const scoredProducts = products.map(product => {
      let score = 0;

      // Base popularity score
      score += (product.rating / 5) * 20;
      score += (product.reviewsCount / 300) * 15;
      score += (product.sustainabilityScore / 100) * 15;

      if (mode === 'Collaborative' || mode === 'Hybrid') {
        // Boost products tagged in high-virality posts
        const productPosts = posts.filter(p => p.taggedProductIds.includes(product.id));
        const avgVirality = productPosts.length > 0 
          ? productPosts.reduce((acc, p) => acc + p.viralityScore, 0) / productPosts.length 
          : 50;
        score += (avgVirality / 100) * 25;
      }

      if (mode === 'Content-Based' || mode === 'Hybrid') {
        // Boost trending tier products
        if (product.trendTier === 'Trending Hot') score += 25;
        else if (product.trendTier === 'Rising Fast') score += 18;
      }

      if (mode === 'Graph-Based' || mode === 'Hybrid') {
        // Boost products with high graph connectivity
        score += Math.min(product.graphConnectionsCount, 50) * 0.5;
      }

      return { product, score };
    });

    // Sort descending by score
    scoredProducts.sort((a, b) => b.score - a.score);
    return scoredProducts.map(sp => sp.product);
  }

  /**
   * Post Virality Predictor Model (Regression Simulation)
   */
  public predictPostVirality(input: ViralityPredictionInput): ViralityPredictionResult {
    const hashtagBonus = input.hashtags.length * 8.5;
    const taggedBonus = input.taggedProductCount * 12.0;
    const followerFactor = Math.log10(Math.max(input.authorFollowers, 100)) * 14.0;
    const captionLengthFactor = input.caption.length > 30 ? 15 : 5;

    const rawViralityScore = Math.min(
      Math.round(hashtagBonus + taggedBonus + followerFactor + captionLengthFactor),
      99
    );

    const predictedLikes = Math.round(rawViralityScore * 185 + input.authorFollowers * 0.015);
    const predictedShares = Math.round(predictedLikes * 0.12);
    const confidenceScore = parseFloat((0.85 + Math.random() * 0.1).toFixed(2));

    const recommendations: string[] = [];
    if (input.hashtags.length < 3) {
      recommendations.push('Add 2+ high-volume fashion hashtags (#QuietLuxury, #Streetwear) to increase reach by 35%.');
    }
    if (input.taggedProductCount === 0) {
      recommendations.push('Tag catalog products in your outfit photo to trigger graph co-purchase recommendations.');
    }
    if (input.caption.length < 40) {
      recommendations.push('Extend caption length with story-telling editorial text for higher engagement rate.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Post structure is optimal! High probability of reaching trending explore page.');
    }

    return {
      predictedLikes,
      predictedShares,
      predictedViralityIndex: rawViralityScore,
      confidenceScore,
      recommendations,
    };
  }

  /**
   * Customer Purchase Propensity Predictor
   */
  public predictPurchasePropensity(user: User, product: Product): { propensityScore: number; tier: string } {
    let score = 50;

    // Community alignment
    if (user.communityId === product.communityId) {
      score += 25;
    }

    // Influencer PageRank multiplier
    score += (user.pageRankScore * 200);

    // Product rating factor
    score += (product.rating - 4.0) * 20;

    const finalScore = Math.min(Math.round(score), 98);
    let tier = 'Moderate Intent';
    if (finalScore >= 80) tier = 'High Purchase Probability';
    else if (finalScore >= 65) tier = 'Warm Lead';
    else tier = 'Low Intent';

    return { propensityScore: finalScore, tier };
  }
}

export const aiEngine = new AIEngine();
