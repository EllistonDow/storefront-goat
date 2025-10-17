# ✨ 产品卡片光效效果指南

## 🎯 **光效效果类型**

### 1. **Framer Motion版本** (推荐) ⭐⭐⭐⭐⭐
```bash
npm install framer-motion
```

**特点**：
- 🎬 流畅的动画效果
- 🎯 高度可定制
- 📱 移动端优化
- 🔧 丰富的交互效果

**使用**：
```tsx
import { GlowProductCard } from "@/ui/components/GlowProductCard";

<GlowProductCard 
  product={product} 
  glowColor="#3b82f6" 
  glowIntensity={0.8} 
/>
```

### 2. **纯CSS版本** (轻量级) ⭐⭐⭐⭐
**特点**：
- ⚡ 无需额外依赖
- 🎨 纯CSS实现
- 📱 性能优秀
- 🔧 易于定制

**使用**：
```tsx
import { CSSGlowCard } from "@/ui/components/CSSGlowCard";

<CSSGlowCard product={product} glowType="blue" />
```

## 🌈 **光效颜色选项**

### **基础颜色**
- `blue` - 蓝色光效 (#3b82f6)
- `red` - 红色光效 (#ef4444)
- `green` - 绿色光效 (#10b981)
- `purple` - 紫色光效 (#8b5cf6)

### **特殊效果**
- `rainbow` - 彩虹光效
- `pulse` - 脉冲光效
- `gradient` - 渐变光效

## 🎨 **效果展示**

### **1. 基础发光效果**
```tsx
<CSSGlowCard product={product} glowType="blue" />
```
- 悬停时蓝色边框发光
- 多层阴影效果
- 平滑过渡动画

### **2. 彩虹边框**
```tsx
<RainbowBorderCard product={product} />
```
- 动态彩虹边框
- 流动的渐变效果
- 吸引眼球的设计

### **3. 脉冲光效**
```tsx
<PulseGlowCard product={product} />
```
- 持续的脉冲动画
- 多色渐变效果
- 科技感十足

### **4. 随机颜色**
```tsx
<RainbowGlowCard product={product} />
```
- 悬停时随机选择颜色
- 每次都有不同体验
- 增加趣味性

## 🔧 **自定义配置**

### **Framer Motion版本**
```tsx
<GlowProductCard 
  product={product}
  glowColor="#ff6b6b"        // 自定义颜色
  glowIntensity={1.2}        // 光效强度
/>
```

### **CSS版本**
```tsx
<CSSGlowCard 
  product={product}
  glowType="purple"          // 预设颜色类型
/>
```

## 📱 **响应式支持**

所有光效组件都支持：
- 📱 移动端触摸
- 💻 桌面端鼠标
- 🎯 键盘导航
- 🌙 暗色模式

## ⚡ **性能优化**

### **CSS版本优势**
- ✅ 无JavaScript依赖
- ✅ 硬件加速
- ✅ 低CPU使用率
- ✅ 快速加载

### **Framer Motion优势**
- ✅ 更丰富的动画
- ✅ 手势支持
- ✅ 复杂交互
- ✅ 更好的用户体验

## 🎯 **使用建议**

### **选择CSS版本如果**：
- 🎯 追求最佳性能
- 📱 移动端为主
- ⚡ 快速加载需求
- 🔧 简单光效即可

### **选择Framer Motion如果**：
- 🎬 需要复杂动画
- 🎯 追求最佳体验
- 📱 桌面端为主
- 🔧 高度定制需求

## 🚀 **快速集成**

### **1. 安装依赖** (仅Framer Motion版本需要)
```bash
npm install framer-motion
```

### **2. 导入组件**
```tsx
import { CSSGlowCard } from "@/ui/components/CSSGlowCard";
// 或
import { GlowProductCard } from "@/ui/components/GlowProductCard";
```

### **3. 使用组件**
```tsx
export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <CSSGlowCard 
          key={product.id} 
          product={product} 
          glowType="blue" 
        />
      ))}
    </div>
  );
}
```

## 🎨 **样式定制**

### **自定义颜色**
```css
.custom-glow {
  --glow-color: #ff6b6b;
  --glow-intensity: 0.8;
}

.custom-glow:hover {
  box-shadow: 
    0 0 20px var(--glow-color),
    0 0 40px var(--glow-color),
    0 0 60px var(--glow-color);
}
```

### **自定义动画**
```css
@keyframes custom-pulse {
  0% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 107, 107, 0.6); }
  100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.3); }
}
```

## 🔗 **相关资源**

- [Framer Motion文档](https://www.framer.com/motion/)
- [CSS Box Shadow生成器](https://cssgenerator.org/box-shadow-css-generator.html)
- [CSS动画教程](https://css-tricks.com/almanac/properties/a/animation/)
- [React动画最佳实践](https://react.dev/learn/animations)

---

**选择适合您项目的光效方案，让产品卡片更加吸引人！** ✨
