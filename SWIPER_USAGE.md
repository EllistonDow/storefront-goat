# 🎠 Swiper Slider 组件使用指南

## 📦 已安装的组件

✅ **Swiper.js v11.2.10** - 功能强大的轮播组件
✅ **ProductSlider** - 产品轮播组件
✅ **HeroSlider** - 英雄横幅轮播组件

## 🚀 快速开始

### 1. 产品轮播组件

```tsx
import { ProductSlider } from "@/ui/components/ProductSlider";

<ProductSlider
  products={products}
  title="Featured Products"
  showNavigation={true}
  showPagination={true}
  autoplay={true}
  slidesPerView={3}
  spaceBetween={30}
  effect="slide"
/>
```

### 2. 英雄横幅轮播

```tsx
import { HeroSlider } from "@/ui/components/ProductSlider";

const heroSlides = [
  {
    id: "1",
    title: "Discover Amazing Products",
    subtitle: "Shop the latest trends",
    image: "/hero-1.jpg",
    ctaText: "Shop Now",
    ctaLink: "/products",
    badge: "New Collection"
  }
];

<HeroSlider slides={heroSlides} />
```

## ⚙️ 配置选项

### ProductSlider 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `products` | `ProductListItemFragment[]` | - | 产品数据数组 |
| `title` | `string` | "Featured Products" | 轮播标题 |
| `showNavigation` | `boolean` | `true` | 显示左右导航按钮 |
| `showPagination` | `boolean` | `true` | 显示分页指示器 |
| `autoplay` | `boolean` | `true` | 自动播放 |
| `slidesPerView` | `number` | `3` | 每页显示幻灯片数量 |
| `spaceBetween` | `number` | `30` | 幻灯片间距 |
| `effect` | `'slide' \| 'fade' \| 'cube' \| 'coverflow' \| 'flip'` | `'slide'` | 切换效果 |

### HeroSlider 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `slides` | `Array<SlideData>` | 幻灯片数据数组 |

#### SlideData 结构

```tsx
interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}
```

## 📱 响应式设计

组件自动支持响应式设计：

- **手机** (320px+): 1个幻灯片
- **平板** (768px+): 2个幻灯片  
- **桌面** (1024px+): 配置的幻灯片数量

## 🎨 样式定制

组件包含内置的暗色模式支持，会自动适应当前主题。

### 自定义样式

```css
/* 导航按钮 */
.product-swiper .swiper-button-next,
.product-swiper .swiper-button-prev {
  /* 自定义样式 */
}

/* 分页指示器 */
.product-swiper .swiper-pagination-bullet {
  /* 自定义样式 */
}
```

## 🔧 高级功能

### 1. 多种切换效果

```tsx
// 淡入淡出效果
<ProductSlider effect="fade" />

// 立方体效果
<ProductSlider effect="cube" />

// 封面流效果
<ProductSlider effect="coverflow" />
```

### 2. 自定义自动播放

```tsx
<ProductSlider
  autoplay={true}
  // Swiper会自动使用默认的3秒延迟
/>
```

### 3. 禁用某些功能

```tsx
<ProductSlider
  showNavigation={false}  // 隐藏导航按钮
  showPagination={false}  // 隐藏分页指示器
  autoplay={false}        // 禁用自动播放
/>
```

## 📋 使用示例

### 完整的首页示例

```tsx
import { ProductSlider, HeroSlider } from "@/ui/components/ProductSlider";

export default function HomePage() {
  return (
    <>
      {/* 英雄横幅 */}
      <HeroSlider slides={heroSlides} />
      
      {/* 特色产品 */}
      <ProductSlider
        products={featuredProducts}
        title="Featured Products"
        slidesPerView={3}
      />
      
      {/* 新品上市 */}
      <ProductSlider
        products={newProducts}
        title="New Arrivals"
        slidesPerView={4}
        showPagination={false}
      />
      
      {/* 热销商品 */}
      <ProductSlider
        products={bestSellers}
        title="Best Sellers"
        slidesPerView={2}
        showNavigation={false}
        autoplay={false}
      />
    </>
  );
}
```

## 🎯 优势

✅ **无需开发** - 直接使用，无需自己开发
✅ **功能强大** - 支持所有常见的轮播功能
✅ **性能优秀** - 轻量级，加载快速
✅ **移动端优化** - 完美支持触摸操作
✅ **高度可定制** - 丰富的配置选项
✅ **TypeScript支持** - 完整的类型定义
✅ **暗色模式** - 自动适应主题

## 🔗 相关链接

- [Swiper.js 官方文档](https://swiperjs.com/)
- [Swiper.js React 组件](https://swiperjs.com/react)
- [Swiper.js 示例](https://swiperjs.com/demos)
