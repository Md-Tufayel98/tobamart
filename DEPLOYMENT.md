# 🚀 Deployment Guide - TobaMart

## ✅ সব Setup সম্পূর্ণ! এখন শুধু Deploy করুন

আপনার প্রজেক্ট সম্পূর্ণভাবে প্রস্তুত:
- ✅ React থেকে Next.js 16-এ কনভার্ট সম্পূর্ণ
- ✅ Supabase database সম্পূর্ণভাবে configured
- ✅ সব tables তৈরি (profiles, categories, products, orders, addresses, user_roles, chat_messages, etc.)
- ✅ Row Level Security policies সেটআপ
- ✅ Categories এবং product data seeded
- ✅ Environment variables configured (.env.local তৈরি)

---

## 🎯 এখন যা করতে হবে

### ১. Supabase Setup (ইতিমধ্যে সম্পূর্ণ - শুধু confirm করুন)

**আপনার Supabase database ইতিমধ্যে সেটআপ হয়ে গেছে:**
- ✅ Project: wajtjamrkxonrvgtquer.supabase.co
- ✅ সব tables তৈরি হয়ে গেছে
- ✅ Categories seeded (Honey, Ghee, Oil, Dates, Nuts, Masala)

**Database Tables:**

- ✅ profiles (user profiles)
- ✅ categories (product categories)
- ✅ products (products with variants)
- ✅ product_variants (weight/size options)
- ✅ orders (customer orders)
- ✅ order_items (order line items)
- ✅ addresses (shipping addresses)
- ✅ user_roles (admin/staff permissions)
- ✅ chat_messages (live chat)
- ✅ chat_sessions (chat sessions)

**কোন SQL run করার দরকার নেই - সব কিছু ready!**

---

## ২. Environment Variables (✅ ইতিমধ্যে সেটআপ)

আপনার `.env.local` ফাইল ইতিমধ্যে তৈরি হয়ে গেছে সঠিক credentials সহ:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wajtjamrkxonrvgtquer.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_gPF-DEoFhDBsPLxRysddwQ_XdONJVn3
```

**Local test করতে চাইলে:**
```bash
npm install
npm run dev
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
