# 🚀 物理效果光效卡片指南

## ⚡ **React Spring 物理效果**

### **安装依赖**
```bash
npm install @react-spring/web
```

## 🎯 **物理效果类型**

### 1. **弹跳效果 (Bounce)** ⭐⭐⭐⭐⭐
```tsx
<PhysicsGlowCard product={product} physicsType="bounce" />
```
**特点**：
- 🏀 真实的弹跳物理效果
- ⚡ 高张力，低摩擦力
- 🎯 适合活泼的产品展示

### 2. **弹性效果 (Elastic)** ⭐⭐⭐⭐
```tsx
<PhysicsGlowCard product={product} physicsType="elastic" />
```
**特点**：
- 🎈 橡皮筋般的弹性
- 🔄 回弹动画
- 🎯 适合高端产品

### 3. **摇摆效果 (Wobble)** ⭐⭐⭐⭐
```tsx
<PhysicsGlowCard product={product} physicsType="wobble" />
```
**特点**：
- 🌊 波浪般的摇摆
- 🎭 有趣的视觉效果
- 🎯 适合创意产品

### 4. **磁力效果 (Magnetic)** ⭐⭐⭐⭐⭐
```tsx
<PhysicsGlowCard product={product} physicsType="magnetic" />
```
**特点**：
- 🧲 跟随鼠标移动
- 🎯 高互动性
- 🎮 游戏化体验

### 5. **重力效果 (Gravity)** ⭐⭐⭐⭐
```tsx
<GravityCard product={product} />
```
**特点**：
- 🌍 真实的重力感
- 📐 3D旋转效果
- 🎯 适合科技产品

## 🎨 **特殊效果组件**

### **重力卡片**
```tsx
import { GravityCard } from "@/ui/components/PhysicsGlowCard";

<GravityCard product={product} />
```
- 🌍 3D重力效果
- 📐 立体旋转
- 💫 深度阴影

### **弹性卡片**
```tsx
import { ElasticCard } from "@/ui/components/PhysicsGlowCard";

<ElasticCard product={product} />
```
- 🎈 弹性变形
- 🔄 回弹动画
- ⚡ 快速响应

## ⚙️ **物理参数配置**

### **弹跳效果**
```javascript
const bounceConfig = {
  tension: 300,    // 张力：控制弹跳强度
  friction: 10     // 摩擦力：控制阻尼
};
```

### **弹性效果**
```javascript
const elasticConfig = {
  tension: 400,     // 高张力
  friction: 25     // 中等摩擦力
};
```

### **摇摆效果**
```javascript
const wobbleConfig = {
  tension: 200,     // 低张力
  friction: 8      // 低摩擦力
};
```

### **磁力效果**
```javascript
const magneticConfig = {
  tension: 500,     // 极高张力
  friction: 30     // 高摩擦力
};
```

### **重力效果**
```javascript
const gravityConfig = {
  tension: 100,     // 低张力
  friction: 20     // 中等摩擦力
};
```

## 🎬 **动画效果详解**

### **1. 主卡片动画**
```tsx
const cardSpring = useSpring({
  transform: isHovered 
    ? "translateY(-12px) scale(1.05) rotateX(5deg)" 
    : "translateY(0px) scale(1) rotateX(0deg)",
  boxShadow: isHovered
    ? "0 20px 40px rgba(59, 130, 246, 0.3)"
    : "0 4px 6px rgba(0, 0, 0, 0.1)",
  config: physicsConfigs[physicsType]
});
```

### **2. 图片缩放动画**
```tsx
const imageSpring = useSpring({
  transform: isHovered 
    ? "scale(1.15) rotate(2deg)" 
    : "scale(1) rotate(0deg)",
  filter: isHovered 
    ? "brightness(1.1) contrast(1.1)" 
    : "brightness(1) contrast(1)",
  config: physicsConfigs[physicsType]
});
```

### **3. 发光效果动画**
```tsx
const glowSpring = useSpring({
  opacity: isHovered ? 1 : 0,
  transform: isHovered ? "scale(1.1)" : "scale(0.8)",
  config: { tension: 400, friction: 20 }
});
```

### **4. 按钮序列动画**
```tsx
const buttonTrail = useTrail(3, {
  opacity: isHovered ? 1 : 0,
  transform: isHovered 
    ? "translateY(0px) scale(1)" 
    : "translateY(20px) scale(0.8)",
  config: physicsConfigs[physicsType]
});
```

## 🎯 **磁力效果实现**

### **鼠标跟踪**
```tsx
const handleMouseMove = (e: React.MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  setMousePosition({ x, y });
};

const magneticSpring = useSpring({
  transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
  config: physicsConfigs.magnetic
});
```

## 🌟 **光粒子效果**

### **动态光粒子**
```tsx
{isHovered && (
  <div className="absolute inset-0">
    {[...Array(6)].map((_, i) => (
      <animated.div
        key={i}
        className="absolute w-2 h-2 bg-blue-400 rounded-full"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`,
          opacity: glowSpring.opacity,
          transform: glowSpring.transform,
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </div>
)}
```

## 🎨 **自定义物理效果**

### **创建自定义配置**
```tsx
const customPhysicsConfig = {
  tension: 350,     // 自定义张力
  friction: 15,     // 自定义摩擦力
  mass: 1,          // 质量
  precision: 0.01   // 精度
};

const customSpring = useSpring({
  transform: isHovered ? "scale(1.1)" : "scale(1)",
  config: customPhysicsConfig
});
```

### **组合多个效果**
```tsx
const combinedSpring = useSpring({
  transform: isHovered 
    ? "translateY(-10px) scale(1.05) rotateZ(2deg)" 
    : "translateY(0px) scale(1) rotateZ(0deg)",
  boxShadow: isHovered
    ? "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)"
    : "0 4px 6px rgba(0, 0, 0, 0.1)",
  config: { tension: 300, friction: 20 }
});
```

## 📱 **性能优化**

### **硬件加速**
```css
.physics-card {
  will-change: transform, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### **动画优化**
```tsx
// 使用 useMemo 缓存配置
const physicsConfig = useMemo(() => ({
  tension: 300,
  friction: 10
}), []);

// 使用 useCallback 缓存事件处理
const handleMouseEnter = useCallback(() => {
  setIsHovered(true);
}, []);
```

## 🚀 **快速集成**

### **1. 安装依赖**
```bash
npm install @react-spring/web
```

### **2. 导入组件**
```tsx
import { PhysicsGlowCard, GravityCard, ElasticCard } from "@/ui/components/PhysicsGlowCard";
```

### **3. 使用组件**
```tsx
export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => {
        const physicsTypes = ["bounce", "elastic", "wobble"];
        return (
          <PhysicsGlowCard 
            key={product.id} 
            product={product} 
            physicsType={physicsTypes[index % 3]} 
          />
        );
      })}
    </div>
  );
}
```

## 🎯 **使用建议**

### **选择物理效果**
- 🏀 **弹跳效果**：适合运动、游戏类产品
- 🎈 **弹性效果**：适合高端、奢侈品
- 🌊 **摇摆效果**：适合创意、艺术类产品
- 🧲 **磁力效果**：适合科技、互动类产品
- 🌍 **重力效果**：适合3C、科技类产品

### **性能考虑**
- ⚡ 避免同时使用过多物理效果
- 🎯 在移动端使用较轻量的效果
- 🔧 根据设备性能调整动画复杂度

---

**体验真实的物理效果，让产品卡片更加生动！** 🚀✨
