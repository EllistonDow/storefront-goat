# 🎬 Framer Motion 光效卡片指南

## ⚡ **Framer Motion 动画库**

### **安装依赖**
```bash
npm install framer-motion
```

## 🎯 **动画效果类型**

### 1. **磁力效果 (Magnetic)** ⭐⭐⭐⭐⭐
```tsx
<FramerMotionGlowCard product={product} animationType="magnetic" />
```
**特点**：
- 🧲 3D鼠标跟踪
- 📐 实时旋转和缩放
- 🎯 高精度位置检测
- 🎮 游戏化交互体验

### 2. **粒子效果 (Particle)** ⭐⭐⭐⭐
```tsx
<FramerMotionGlowCard product={product} animationType="particle" />
```
**特点**：
- ✨ 动态粒子动画
- 🎆 随机位置和延迟
- 🌟 梦幻视觉效果
- 🎨 可自定义粒子样式

### 3. **火焰效果 (Fire)** ⭐⭐⭐⭐
```tsx
<FramerMotionGlowCard product={product} animationType="fire" />
```
**特点**：
- 🔥 动态火焰动画
- 🌡️ 温度渐变效果
- 💥 激情氛围营造
- 🎭 戏剧性视觉冲击

### 4. **波浪效果 (Wave)** ⭐⭐⭐⭐
```tsx
<FramerMotionGlowCard product={product} animationType="wave" />
```
**特点**：
- 🌊 多层波浪边框
- 🎨 彩虹色彩渐变
- 💫 流动视觉效果
- 🌀 无限循环动画

### 5. **浮动效果 (Floating)** ⭐⭐⭐⭐
```tsx
<FloatingCard product={product} />
```
**特点**：
- 🎈 轻盈浮动动画
- 💨 呼吸般光效
- 🌸 优雅的视觉体验
- 🕊️ 自然运动轨迹

### 6. **变形效果 (Morphing)** ⭐⭐⭐⭐
```tsx
<MorphingCard product={product} />
```
**特点**：
- 🔄 形状变化动画
- 🎯 方形到圆形转换
- 🌈 颜色渐变过渡
- 🎪 有趣的视觉变化

## 🎨 **核心动画技术**

### **1. 鼠标跟踪**
```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
const scale = useTransform(mouseX, [-300, 300], [0.95, 1.05]);

const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
const springScale = useSpring(scale, { stiffness: 300, damping: 30 });
```

### **2. 动画变体**
```tsx
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -15,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  },
  hover: {
    y: -20,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};
```

### **3. 交错动画**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

### **4. 粒子动画**
```tsx
const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 0.5
}));

{particles.map((particle) => (
  <motion.div
    key={particle.id}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -40, -60],
      x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
    }}
    transition={{
      duration: 2,
      delay: particle.delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
))}
```

## 🎬 **高级动画技巧**

### **1. 手势识别**
```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
  onDragEnd={(event, info) => {
    // 处理拖拽结束
  }}
>
```

### **2. 布局动画**
```tsx
<motion.div
  layout
  layoutId="unique-id"
  transition={{ duration: 0.3 }}
>
```

### **3. 共享元素过渡**
```tsx
<motion.div
  layoutId="shared-element"
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
```

### **4. 滚动触发动画**
```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<motion.div
  ref={ref}
  animate={isInView ? "visible" : "hidden"}
  variants={variants}
>
```

## 🎯 **性能优化**

### **1. 硬件加速**
```css
.motion-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### **2. 动画优化**
```tsx
// 使用 useMemo 缓存动画配置
const animationConfig = useMemo(() => ({
  stiffness: 300,
  damping: 30
}), []);

// 使用 useCallback 缓存事件处理
const handleMouseMove = useCallback((event) => {
  // 处理鼠标移动
}, []);
```

### **3. 条件渲染**
```tsx
{isHovered && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* 复杂动画内容 */}
  </motion.div>
)}
```

## 🎨 **自定义动画**

### **1. 创建自定义变体**
```tsx
const customVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.5,
    rotate: -180
  },
  visible: { 
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};
```

### **2. 复杂动画序列**
```tsx
const sequenceVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};
```

### **3. 动态动画参数**
```tsx
const getAnimationConfig = (type: string) => {
  const configs = {
    bounce: { type: "spring", stiffness: 300, damping: 10 },
    smooth: { type: "tween", duration: 0.3, ease: "easeOut" },
    elastic: { type: "spring", stiffness: 400, damping: 25 }
  };
  return configs[type] || configs.smooth;
};
```

## 🚀 **快速集成**

### **1. 安装依赖**
```bash
npm install framer-motion
```

### **2. 导入组件**
```tsx
import { FramerMotionGlowCard, FloatingCard, MorphingCard } from "@/ui/components/FramerMotionGlowCard";
```

### **3. 使用组件**
```tsx
export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => {
        const animationTypes = ["magnetic", "particle", "fire", "wave"];
        return (
          <FramerMotionGlowCard 
            key={product.id} 
            product={product} 
            animationType={animationTypes[index % 4]} 
          />
        );
      })}
    </div>
  );
}
```

## 🎯 **使用建议**

### **选择动画类型**
- 🧲 **磁力效果**：适合科技、互动类产品
- ✨ **粒子效果**：适合创意、艺术类产品
- 🔥 **火焰效果**：适合激情、运动类产品
- 🌊 **波浪效果**：适合流动、自然类产品
- 🎈 **浮动效果**：适合轻盈、优雅类产品
- 🔄 **变形效果**：适合变化、创新类产品

### **性能考虑**
- ⚡ 避免同时使用过多复杂动画
- 🎯 在移动端使用较轻量的效果
- 🔧 根据设备性能调整动画复杂度
- 📱 考虑电池消耗和发热问题

## 🔗 **相关资源**

- [Framer Motion 官方文档](https://www.framer.com/motion/)
- [动画原理指南](https://www.framer.com/motion/guide/)
- [性能优化技巧](https://www.framer.com/motion/performance/)
- [手势和交互](https://www.framer.com/motion/gestures/)

---

**体验强大的 Framer Motion 动画，让产品展示更加生动！** 🎬✨
