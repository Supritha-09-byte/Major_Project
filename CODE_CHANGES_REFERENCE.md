# Code Changes Reference - Frontend Redesign

## Quick Reference Guide for Key Changes

---

## 1. COLOR SYSTEM

### Before (globals.css)
```css
:root {
  --background: 0 0% 100%;           /* White */
  --foreground: 0 0% 3.9%;           /* Near Black */
  --primary: 0 0% 9%;                 /* Dark Gray */
  --primary-foreground: 0 0% 98%;     /* Light Gray */
  --secondary: 0 0% 96.1%;            /* Light Gray */
  --accent: 0 0% 96.1%;               /* Light Gray */
  --radius: 0.5rem;
}

.gradient {
  @apply bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600;
}
```

### After (globals.css)
```css
:root {
  --background: 220 25% 97%;          /* Soft Blue-White */
  --foreground: 240 20% 10%;          /* Dark Blue-Gray */
  --primary: 262 83% 58%;             /* Vibrant Purple */
  --primary-foreground: 0 0% 100%;    /* White */
  --secondary: 210 100% 66%;          /* Bright Blue */
  --accent: 280 100% 70%;             /* Hot Pink/Magenta */
  --gradient-start: 262 83% 58%;      /* Purple */
  --gradient-mid: 210 100% 66%;       /* Blue */
  --gradient-end: 180 100% 50%;       /* Cyan */
  --radius: 1rem;
}

.gradient-primary {
  background: linear-gradient(135deg, 
    hsl(var(--gradient-start)) 0%, 
    hsl(var(--gradient-mid)) 50%, 
    hsl(var(--gradient-end)) 100%);
}
```

---

## 2. BUTTON COMPONENT

### Before (button.jsx)
```jsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
      },
    },
  }
)
```

### After (button.jsx)
```jsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 hover:scale-105",
        outline: "border-2 border-primary/30 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-primary/5 hover:border-primary hover:shadow-md hover:scale-105",
        gradient: "bg-gradient-primary text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 hover:scale-105",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        lg: "h-13 rounded-xl px-8 text-base",
      },
    },
  }
)
```

**Key Changes:**
- `rounded-md` → `rounded-xl`
- `font-medium` → `font-semibold`
- `transition-colors` → `transition-all duration-300`
- Added `active:scale-95`
- Gradient backgrounds
- Colored shadows with opacity
- Scale transforms on hover

---

## 3. CARD COMPONENT

### Before (card.jsx)
```jsx
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
```

### After (card.jsx)
```jsx
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1",
      className
    )}
    {...props} />
))
```

**Key Changes:**
- `rounded-xl` → `rounded-2xl`
- Added `border-border/50` (semi-transparent)
- Added `bg-card/50` (semi-transparent)
- Added `backdrop-blur-sm`
- Added hover effects (shadow, border, transform)
- Added `transition-all duration-300`

---

## 4. HERO SECTION

### Before (hero.jsx)
```jsx
return (
  <section className="w-full pt-36 md:pt-48 pb-10">
    <div className="space-y-6 text-center">
      <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
        Your AI Career Coach for
        <br />
        Professional Success
      </h1>
      <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
        Advance your career with personalized guidance, interview prep, and
        AI-powered tools for job success.
      </p>
      <div className="flex justify-center space-x-4">
        <Button size="lg" className="px-8">Get Started</Button>
        <Button size="lg" variant="outline" className="px-8">Watch Demo</Button>
      </div>
    </div>
  </section>
);
```

### After (hero.jsx)
```jsx
return (
  <section className="hero-section relative w-full pt-32 md:pt-44 pb-16 overflow-hidden">
    {/* Floating Background Elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl floating-element"></div>
    <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl floating-element" 
         style={{ animationDelay: '2s' }}></div>
    <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl floating-element" 
         style={{ animationDelay: '4s' }}></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="space-y-8">
        {/* Badge/Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-gradient">AI-Powered Career Intelligence</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl font-black md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
          Transform Your Career
          <br />
          <span className="relative inline-block">
            With AI Superpowers
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
          </span>
        </h1>

        {/* Enhanced Buttons */}
        <Button size="lg" className="px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 hover:scale-105 transition-all duration-300 group">
          Start Your Journey
          <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  </section>
);
```

**Key Changes:**
- Added floating background orbs
- Added badge pill with icons
- Changed title text and styling
- Added gradient underline
- Enhanced button styling
- Added animated icons
- Mouse-tracking parallax
- Decorative elements around image

---

## 5. HEADER COMPONENT

### Before (header.jsx)
```jsx
<header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
  <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
    <Link href="/">
      <Image src={"/logo.png"} alt="Sensai Logo" width={200} height={60} 
             className="h-12 py-1 w-auto object-contain" />
    </Link>
    <Button className="flex items-center gap-2">
      <StarsIcon className="h-4 w-4" />
      <span className="hidden md:block">Growth Tools</span>
    </Button>
  </nav>
</header>
```

### After (header.jsx)
```jsx
<header className="fixed top-0 w-full z-50">
  <div className="absolute inset-0 glass-panel border-b border-white/10"></div>
  <nav className="container mx-auto px-4 h-20 flex items-center justify-between relative z-10">
    <Link href="/" className="group flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <Image src={"/logo.png"} alt="Sensai Logo" width={200} height={60}
               className="h-14 py-1 w-auto object-contain relative z-10 drop-shadow-2xl" />
      </div>
    </Link>
    <Button className="relative flex items-center gap-2 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-primary opacity-100 group-hover:opacity-90 transition-opacity"></div>
      <div className="relative flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        <span className="hidden md:block">Growth Tools</span>
      </div>
    </Button>
  </nav>
</header>
```

**Key Changes:**
- Height increased: `h-16` → `h-20`
- Glass panel effect
- Logo glow effect on hover
- Button with gradient overlay
- Enhanced shadows and borders
- Rounded-xl styling

---

## 6. TAILWIND CONFIG

### Before (tailwind.config.mjs)
```javascript
theme: {
  extend: {
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    keyframes: {
      'accordion-down': { /* ... */ },
      'accordion-up': { /* ... */ }
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out'
    }
  }
}
```

### After (tailwind.config.mjs)
```javascript
theme: {
  extend: {
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    keyframes: {
      'accordion-down': { /* ... */ },
      'accordion-up': { /* ... */ },
      'fade-in': {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' }
      },
      'slide-in-from-top': {
        '0%': { transform: 'translateY(-100px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
      },
      'zoom-in': {
        '0%': { transform: 'scale(0.8)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' }
      },
      'shimmer': {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' }
      }
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'fade-in': 'fade-in 0.6s ease-out',
      'slide-in-from-top': 'slide-in-from-top 0.8s ease-out',
      'zoom-in': 'zoom-in 0.6s ease-out',
      'shimmer': 'shimmer 3s linear infinite'
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Space Grotesk', 'system-ui', 'sans-serif']
    }
  }
}
```

**Key Changes:**
- Added custom keyframes (fade-in, slide-in, zoom-in, shimmer)
- Added custom animations
- Added custom font families

---

## 7. BACKGROUND IMPLEMENTATION

### Before (page.js)
```jsx
export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>
      {/* Rest of content */}
    </>
  );
}

// In globals.css
.grid-background {
  position: fixed;
  background: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

### After (page.js)
```jsx
export default function LandingPage() {
  return (
    <>
      <div className="cosmic-background"></div>
      <div className="mesh-background"></div>
      {/* Rest of content */}
    </>
  );
}

// In globals.css
.cosmic-background {
  position: fixed;
  background: radial-gradient(ellipse at top, hsl(var(--primary) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at bottom, hsl(var(--secondary) / 0.15) 0%, transparent 50%);
}

.cosmic-background::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, hsl(var(--primary) / 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, hsl(var(--secondary) / 0.3), transparent);
  animation: cosmic-drift 60s linear infinite;
}

.mesh-background {
  position: fixed;
  background: 
    radial-gradient(at 27% 37%, hsla(262, 83%, 58%, 0.12) 0px, transparent 50%),
    radial-gradient(at 97% 21%, hsla(210, 100%, 66%, 0.12) 0px, transparent 50%),
    radial-gradient(at 52% 99%, hsla(280, 100%, 70%, 0.12) 0px, transparent 50%);
}
```

**Key Changes:**
- Grid → Animated starfield (cosmic-background)
- Added multi-layered mesh gradient
- Animated particle drift
- Color-based backgrounds

---

## 8. FEATURE CARDS

### Before (page.js)
```jsx
<Card className="border-2 hover:border-primary transition-colors duration-300">
  <CardContent className="pt-6 text-center flex flex-col items-center">
    {feature.icon}
    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
    <p className="text-muted-foreground">{feature.description}</p>
  </CardContent>
</Card>
```

### After (page.js)
```jsx
<Card className="group relative overflow-hidden border-2 hover:border-primary/50">
  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
  <CardContent className="pt-8 text-center flex flex-col items-center relative z-10">
    <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300">
      <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
        {React.cloneElement(feature.icon, { className: "w-8 h-8 text-primary" })}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
  </CardContent>
</Card>
```

**Key Changes:**
- Added gradient background on hover
- Icon wrapped in gradient-bordered container
- Scale animation on icon
- Enhanced spacing and typography

---

## 9. CTA SECTION

### Before (page.js)
```jsx
<section className="w-full">
  <div className="mx-auto py-24 gradient rounded-lg">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-3xl font-bold text-primary-foreground">
        Ready to Accelerate Your Career?
      </h2>
      <p className="text-primary-foreground/80 md:text-xl">
        Join thousands of professionals
      </p>
      <Button size="lg" variant="secondary" className="h-11 mt-5 animate-bounce">
        Start Your Journey Today <ArrowRight />
      </Button>
    </div>
  </div>
</section>
```

### After (page.js)
```jsx
<section className="w-full py-20 md:py-32">
  <div className="container mx-auto px-4 md:px-6">
    <div className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 py-24 px-6">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
          Ready to Transform Your Career?
        </h2>
        <p className="text-xl text-white/90">
          Join thousands of professionals who are advancing their careers
        </p>
        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold mt-6 shadow-2xl group">
          Start Your Journey Today 
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Button>
        <div className="flex items-center gap-8 pt-8">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Free Trial Available</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Key Changes:**
- Added decorative icon
- Animated background orbs
- Enhanced typography (larger, bolder)
- Added trust badges
- Enhanced button styling
- Animated arrow icon
- Rounded-3xl container

---

## 10. USAGE EXAMPLES

### Using New Gradient Utilities

```jsx
// Gradient text
<h1 className="gradient-title">Your Title Here</h1>

// Gradient background
<div className="bg-gradient-primary">Content</div>

// Inline gradient text
<span className="text-gradient">Highlighted Text</span>

// Glass panel effect
<div className="glass-panel">Glassmorphic Container</div>
```

### Using New Animations

```jsx
// Fade in animation
<div className="animate-fade-in">Content</div>

// Slide in from top
<div className="animate-slide-in-from-top">Content</div>

// Zoom in
<div className="animate-zoom-in">Content</div>

// Custom delay
<div className="animate-fade-in" style={{ animationDelay: '200ms' }}>Content</div>
```

### Using New Button Variants

```jsx
// Gradient button
<Button variant="gradient">Action</Button>

// Enhanced outline
<Button variant="outline">Secondary Action</Button>

// Large with custom styling
<Button size="lg" className="shadow-lg shadow-primary/50 hover:scale-105">
  Get Started
</Button>
```

---

## QUICK MIGRATION CHECKLIST

When applying this redesign to other pages:

- [ ] Replace `grid-background` with `cosmic-background` and `mesh-background`
- [ ] Update button variants to use gradients
- [ ] Wrap card icons in gradient containers
- [ ] Add glass-panel effect to floating elements
- [ ] Use gradient-title for main headings
- [ ] Add hover effects (scale, shadow, translate)
- [ ] Update border-radius (md → xl, lg → 2xl)
- [ ] Add section badges with icons
- [ ] Implement entrance animations
- [ ] Add decorative floating elements
- [ ] Update color references (grayscale → vibrant)
- [ ] Enhance spacing (py-12 → py-20)

---

**This reference guide provides the exact code changes needed to transform each component from the old design to the new vibrant, modern design system.**
