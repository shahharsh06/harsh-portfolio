# Live Site Testing Guide

## 🎯 **Your Live Portfolio URLs**

### **Main Portfolio:**
```
https://shahharsh06.github.io/harsh-portfolio/
```

### **Dashboard:**
```
https://shahharsh06.github.io/harsh-portfolio/dashboard.html
```

## ✅ **Testing Checklist**

### **1. Initial Load Test**
- [ ] **Page loads** without blank screen
- [ ] **No console errors** (F12 → Console tab)
- [ ] **All images load** properly
- [ ] **Fonts load** correctly (Inter font)
- [ ] **Loading time** under 3 seconds

### **2. Navigation Testing**
- [ ] **Desktop navigation** - all links work
- [ ] **Mobile hamburger menu** opens/closes
- [ ] **Smooth scrolling** between sections
- [ ] **Active section highlighting**
- [ ] **Dashboard link** opens in new tab

### **3. Theme & Responsiveness**
- [ ] **Dark/Light theme toggle** works
- [ ] **Theme persists** on page refresh
- [ ] **Mobile responsive** (test different screen sizes)
- [ ] **Tablet responsive** (768px - 1024px)
- [ ] **Desktop responsive** (1024px+)

### **4. Hero Section**
- [ ] **Typewriter effect** for name
- [ ] **Rotating titles** display correctly
- [ ] **Profile image** loads and displays
- [ ] **"Get In Touch" button** scrolls to contact
- [ ] **"Download Resume" button** downloads PDF
- [ ] **Statistics** display (1+ Years, 10+ Projects, 25+ Technologies)

### **5. About Section**
- [ ] **Content displays** correctly
- [ ] **Skill tags** show properly
- [ ] **Highlight cards** with icons
- [ ] **Responsive layout** on mobile

### **6. Skills Section**
- [ ] **Skill categories** display
- [ ] **Skill tags** are interactive
- [ ] **Progress bars** show (if any)
- [ ] **Responsive grid** layout

### **7. Career & Education**
- [ ] **Timeline displays** correctly
- [ ] **Education details** show
- [ ] **Experience details** show
- [ ] **Responsive timeline** on mobile

### **8. Projects Section**
- [ ] **Project cards** display
- [ ] **Project images** load
- [ ] **Project links** work
- [ ] **Filtering** works (if implemented)
- [ ] **Carousel/slider** works (if implemented)

### **9. Contact Section**
- [ ] **Contact form** displays
- [ ] **Form validation** works
- [ ] **Social links** work
- [ ] **Email link** opens mail client
- [ ] **GitHub/LinkedIn** links open correctly

### **10. Footer**
- [ ] **Footer content** displays
- [ ] **Copyright** information
- [ ] **Social links** work
- [ ] **Back to top** button works

### **11. Dashboard Testing**
- [ ] **Dashboard loads** at correct URL
- [ ] **Coverage charts** display
- [ ] **Test metrics** show
- [ ] **Code quality** metrics display
- [ ] **Security score** shows
- **Real-time data** updates (if configured)

### **12. Performance Testing**
- [ ] **Lighthouse score** > 90
- [ ] **First Contentful Paint** < 1.5s
- [ ] **Largest Contentful Paint** < 2.5s
- [ ] **Cumulative Layout Shift** < 0.1
- [ ] **First Input Delay** < 100ms

## 🛠️ **How to Test**

### **Desktop Testing:**
1. **Open Chrome/Firefox/Safari**
2. **Visit**: `https://shahharsh06.github.io/harsh-portfolio/`
3. **Test all sections** by scrolling
4. **Click navigation** links
5. **Toggle theme** button
6. **Open dashboard** link
7. **Test all buttons** and interactions

### **Mobile Testing:**
1. **Open mobile browser**
2. **Visit the same URL**
3. **Test hamburger menu**
4. **Scroll through sections**
5. **Test touch interactions**
6. **Check responsive design**

### **Developer Tools Testing:**
1. **Press F12** to open dev tools
2. **Check Console** for any errors
3. **Test responsive** design (mobile/tablet views)
4. **Check Network** tab for loading issues
5. **Run Lighthouse** audit

## 🚨 **Common Issues & Solutions**

### **If Portfolio Shows Blank Screen:**
- **Check**: Browser console for errors
- **Solution**: Clear cache (Ctrl+F5)
- **Wait**: 5-10 minutes for deployment

### **If Dashboard Shows 404:**
- **Check**: Use correct URL `/harsh-portfolio/dashboard.html`
- **Solution**: Wait for deployment to complete

### **If Navigation Doesn't Work:**
- **Check**: HashRouter implementation
- **Solution**: Refresh page and try again

### **If Images Don't Load:**
- **Check**: Network tab in dev tools
- **Solution**: Wait for assets to load

### **If Theme Toggle Doesn't Work:**
- **Check**: Local storage permissions
- **Solution**: Clear browser data

## 📊 **Performance Benchmarks**

### **Target Metrics:**
- **Lighthouse Score**: > 90
- **Load Time**: < 3 seconds
- **Bundle Size**: < 500KB
- **First Paint**: < 1.5s
- **Interactive**: < 3s

### **How to Check:**
1. **Open Dev Tools** (F12)
2. **Go to Lighthouse** tab
3. **Run audit** for Performance
4. **Check scores** and recommendations

## 🎉 **Success Criteria**

Your portfolio is working correctly if:
- ✅ **All sections load** without errors
- ✅ **Navigation works** smoothly
- ✅ **Theme toggle** functions
- ✅ **Mobile responsive** design
- ✅ **Dashboard accessible** and functional
- ✅ **All links work** correctly
- ✅ **Performance** is good
- ✅ **No console errors**

## 📱 **Browser Compatibility**

### **Tested Browsers:**
- ✅ **Chrome** (latest)
- ✅ **Firefox** (latest)
- ✅ **Safari** (latest)
- ✅ **Edge** (latest)

### **Mobile Browsers:**
- ✅ **Chrome Mobile**
- ✅ **Safari Mobile**
- ✅ **Firefox Mobile**

---

**Your portfolio should now be fully functional and ready to share!** 🚀 