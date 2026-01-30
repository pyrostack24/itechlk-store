# Performance Optimization Guide for iTechLK Store

## Current Metrics (Needs Improvement)
- Real Experience Score: 66/100
- LCP: 3.98s (Target: < 2.5s)
- CLS: 0.34 (Target: < 0.1)

## Optimizations Applied

### 1. Image Optimization ✅
- Fixed Header logo dimensions (225x225 → 48x48)
- Added AVIF and WebP format support
- Configured proper device sizes and image sizes
- Added minimum cache TTL

### 2. Font Optimization ✅
- Added `display: 'swap'` to Inter font
- Enabled font preloading
- Prevents layout shifts during font loading

### 3. Build Optimization ✅
- Remove console.logs in production
- Better tree-shaking

## Additional Recommendations

### High Priority
1. **Optimize Product Images**
   - Use proper sizes prop on all Image components
   - Add priority to above-the-fold images
   - Consider using placeholder="blur" for better UX

2. **Reduce Layout Shifts**
   - Add explicit width/height to all images
   - Reserve space for dynamic content
   - Use CSS aspect-ratio for responsive images

3. **Code Splitting**
   - Lazy load components below the fold
   - Use dynamic imports for heavy components
   - Split vendor bundles

### Medium Priority
4. **Caching Strategy**
   - Add proper Cache-Control headers
   - Implement ISR (Incremental Static Regeneration)
   - Use SWR for data fetching

5. **Bundle Size**
   - Analyze bundle with `npm run build`
   - Remove unused dependencies
   - Use tree-shakeable imports

### Low Priority
6. **Third-party Scripts**
   - Defer non-critical scripts
   - Use next/script with strategy="lazyOnload"

## Quick Wins to Implement

```tsx
// 1. Add sizes to product images
<Image
  src={product.image}
  alt={product.name}
  width={80}
  height={80}
  sizes="(max-width: 768px) 80px, 80px"
  loading="lazy"
/>

// 2. Add priority to hero images
<Image
  src="/hero.png"
  priority
  loading="eager"
/>

// 3. Use dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
```

## Expected Improvements
- LCP: 3.98s → ~2.0s (50% improvement)
- CLS: 0.34 → ~0.05 (85% improvement)
- RES: 66 → ~85+ (29% improvement)

## Monitor After Deploy
Check Speed Insights after these changes deploy to see improvements.
