# Deployment Guide - TobaMart

এই প্রজেক্ট Next.js 16 দিয়ে তৈরি এবং Vercel-এ deploy করার জন্য প্রস্তুত।

## ১. Supabase Setup (যদি এখনো না করা থাকে)

### Supabase প্রজেক্ট তৈরি করুন:

1. **Supabase-এ যান**: [https://supabase.com](https://supabase.com)
2. **নতুন প্রজেক্ট তৈরি করুন**:
   - Organization select করুন
   - Project name দিন (উদাহরণ: `tobamart`)
   - Database password সেট করুন (এটি সেভ করে রাখুন)
   - Region select করুন (যত কাছে তত ভালো)

3. **Database Schema তৈরি করুন**:
   - Supabase Dashboard → SQL Editor-এ যান
   - নিচের tables তৈরি করতে SQL রান করুন:

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for products (public read)
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Policies for orders (user can only see their own)
CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policies for order_items
CREATE POLICY "Users can view their own order items" 
ON order_items FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));
```

4. **API Keys নিন**:
   - Dashboard → Settings → API-এ যান
   - `Project URL` কপি করুন
   - `anon` `public` key কপি করুন

---

## ২. Environment Variables Setup

### Local Development (.env.local তৈরি করুন):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

---

## ৩. Vercel Deployment

### Option A: GitHub থেকে Deploy (সুপারিশকৃত)

1. **GitHub Repository Push করুন**:
   ```bash
   git add .
   git commit -m "Convert to Next.js"
   git push origin main
   ```

2. **Vercel-এ যান**: [https://vercel.com](https://vercel.com)

3. **Import Project**:
   - "Add New" → "Project" ক্লিক করুন
   - GitHub repository select করুন
   - Framework Preset: **Next.js** (auto-detect হবে)

4. **Environment Variables যোগ করুন**:
   - `NEXT_PUBLIC_SUPABASE_URL` → আপনার Supabase URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` → আপনার Supabase anon key

5. **Deploy ক্লিক করুন** ✅

### Option B: CLI দিয়ে Deploy

```bash
# Vercel CLI install করুন
npm i -g vercel

# Deploy করুন
vercel

# Environment variables add করুন
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

# Production deploy
vercel --prod
```

---

## ৪. Deploy করার আগে Check করুন

- ✅ `package.json`-এ Next.js dependencies আছে
- ✅ `next.config.ts` ফাইল আছে
- ✅ `app/layout.tsx` এবং `app/page.tsx` আছে
- ✅ Supabase credentials সঠিক
- ✅ `.env.local` ফাইল gitignore-এ আছে (security)

---

## ৫. Post-Deployment

### Supabase Authentication Setup (যদি প্রয়োজন হয়):

1. Supabase Dashboard → Authentication → URL Configuration
2. **Site URL** যোগ করুন: `https://your-app.vercel.app`
3. **Redirect URLs** যোগ করুন:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (local testing)

### Custom Domain (Optional):

1. Vercel Dashboard → Settings → Domains
2. আপনার custom domain যোগ করুন
3. DNS settings update করুন

---

## Troubleshooting

### ❌ "Supabase client error" দেখলে:
- Environment variables সঠিক কিনা চেক করুন
- Vercel-এ redeploy করুন: `vercel --prod`

### ❌ Build error হলে:
```bash
# Locally test করুন
npm run build
npm run start
```

### ❌ Module not found error:
```bash
# Dependencies reinstall করুন
rm -rf node_modules package-lock.json
npm install
```

---

## সাহায্যের জন্য

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
