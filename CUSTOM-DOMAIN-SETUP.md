# Custom Domain Setup for GitHub Pages

## Why Use a Custom Domain?

- **Professional Branding**: `harshshah.dev` looks more professional than `username.github.io`
- **SEO Benefits**: Better for search engine optimization
- **Brand Recognition**: Easier to remember and share
- **Portfolio Credibility**: Shows attention to detail

## Step-by-Step Setup

### 1. Purchase a Domain
**Recommended Domain Registrars:**
- **Namecheap** - Good prices, easy setup
- **Google Domains** - Simple integration
- **GoDaddy** - Popular choice
- **Cloudflare** - Free privacy protection

**Domain Suggestions:**
- `harshshah.dev`
- `harshshah.tech`
- `harshshah.io`
- `harshshah.com`

### 2. Configure DNS Records

#### Option A: Using CNAME (Recommended)
1. **Add CNAME Record:**
   ```
   Name: @ (or leave empty)
   Value: shahharsh06.github.io
   TTL: 3600 (or default)
   ```

2. **Add CNAME for www:**
   ```
   Name: www
   Value: harshshah.dev (your domain)
   TTL: 3600
   ```

#### Option B: Using A Records
1. **Add A Records:**
   ```
   Name: @
   Value: 185.199.108.153
   TTL: 3600
   ```
   ```
   Name: @
   Value: 185.199.109.153
   TTL: 3600
   ```
   ```
   Name: @
   Value: 185.199.110.153
   TTL: 3600
   ```
   ```
   Name: @
   Value: 185.199.111.153
   TTL: 3600
   ```

### 3. Configure GitHub Pages

1. **Go to your repository settings**
2. **Scroll to "Pages" section**
3. **Under "Custom domain" enter your domain**
4. **Check "Enforce HTTPS"**
5. **Click "Save"**

### 4. Create CNAME File

GitHub will create a `CNAME` file in your repository root:

```
harshshah.dev
```

### 5. Update Portfolio Links

Update your portfolio to use the new domain:

```typescript
// src/lib/constants.ts
export const SITE_CONFIG = {
  url: 'https://harshshah.dev',
  title: 'Harsh Shah - Portfolio',
  // ... other config
}
```

## DNS Propagation

- **Time**: 24-48 hours for full propagation
- **Testing**: Use tools like `whatsmydns.net`
- **Check**: `nslookup harshshah.dev`

## SSL Certificate

- **Automatic**: GitHub provides free SSL
- **Time**: 24 hours after DNS setup
- **Check**: Visit `https://harshshah.dev`

## Troubleshooting

### Common Issues:

1. **Domain Not Working**
   - Check DNS propagation
   - Verify CNAME/A records
   - Wait 24-48 hours

2. **SSL Not Working**
   - Ensure "Enforce HTTPS" is checked
   - Wait 24 hours for certificate
   - Check DNS propagation

3. **www vs non-www**
   - Set up redirects in domain registrar
   - Use CNAME for www subdomain

## Best Practices

1. **Use CNAME** instead of A records when possible
2. **Enable HTTPS** enforcement
3. **Set up www redirect** to non-www (or vice versa)
4. **Test thoroughly** before sharing
5. **Monitor DNS** propagation

## Cost Breakdown

- **Domain**: $10-15/year
- **SSL**: Free (GitHub provides)
- **Hosting**: Free (GitHub Pages)
- **Total**: ~$10-15/year

## Alternative: Free Subdomain

If you don't want to buy a domain:
- **Vercel**: `harsh-portfolio.vercel.app`
- **Netlify**: `harsh-portfolio.netlify.app`
- **Firebase**: `harsh-portfolio.web.app`

---

**Note**: Your current GitHub Pages setup is excellent and professional. A custom domain is optional but adds a nice touch to your portfolio! 