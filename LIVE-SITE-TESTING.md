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
- [ ] **All images load** properly (including portfolio screenshot)
- [ ] **Fonts load** correctly (Inter font)
- [ ] **Loading time** under 3 seconds
- [ ] **Dashboard data loads** with real-time metrics

### **2. Navigation Testing**
- [ ] **Desktop navigation** - all links work smoothly
- [ ] **Mobile hamburger menu** opens/closes properly
- [ ] **Mobile menu fits** within screen bounds (no horizontal scroll)
- [ ] **Smooth scrolling** between sections
- [ ] **Active section highlighting** works
- [ ] **Dashboard link** opens in new tab
- [ ] **Social icons** display correctly (GitHub, LinkedIn, Dashboard)

### **3. Theme & Responsiveness**
- [ ] **Dark/Light theme toggle** works immediately (no refresh needed)
- [ ] **Theme icon updates** instantly (moon/sun icon changes)
- [ ] **Theme persists** on page refresh
- [ ] **Mobile responsive** (test different screen sizes)
- [ ] **Tablet responsive** (768px - 1024px)
- [ ] **Desktop responsive** (1024px+)
- [ ] **Hero stats align** properly on mobile (numbers with text)

### **4. Hero Section**
- [ ] **Typewriter effect** for name
- [ ] **Rotating titles** display correctly
- [ ] **Profile image** loads and displays
- [ ] **"Get In Touch" button** scrolls to contact
- [ ] **"Download Resume" button** downloads PDF
- [ ] **Statistics display** with proper mobile alignment:
  - [ ] "1+ Years Experience" (aligned on mobile)
  - [ ] "10+ Projects Completed" (aligned on mobile)
  - [ ] "25+ Technologies" (aligned on mobile)

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
- [ ] **Project cards** display with consistent heights
- [ ] **Portfolio Website** appears as featured project
- [ ] **Portfolio screenshot** loads correctly
- [ ] **Project images** load properly
- [ ] **Project links** work (live URL and GitHub)
- [ ] **Project descriptions** are optimized and concise
- [ ] **Technologies listed** include testing frameworks
- [ ] **Featured project** stays in proper position

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
- [ ] **Real-time data** updates automatically
- [ ] **Coverage charts** display with proper Y-axis scaling
- [ ] **Test metrics** show current values
- [ ] **Code quality** metrics display
- [ ] **Security score** shows
- [ ] **CI/CD status** updates dynamically
- [ ] **Chart labels persist** after theme changes
- [ ] **Y-axis auto-scales** for values > 400
- [ ] **Simple coverage message** displays (no repetitive metrics)
- [ ] **Theme toggle** works immediately on dashboard
- [ ] **Chart data updates** every 30 seconds

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
5. **Toggle theme** button (verify immediate icon change)
6. **Open dashboard** link
7. **Test all buttons** and interactions
8. **Check project cards** for consistent layout

### **Mobile Testing:**
1. **Open mobile browser**
2. **Visit the same URL**
3. **Test hamburger menu** (verify it fits within screen)
4. **Scroll through sections**
5. **Test touch interactions**
6. **Check responsive design**
7. **Verify hero stats alignment**
8. **Test theme toggle** on mobile

### **Developer Tools Testing:**
1. **Press F12** to open dev tools
2. **Check Console** for any errors
3. **Test responsive** design (mobile/tablet views)
4. **Check Network** tab for loading issues
5. **Run Lighthouse** audit
6. **Test theme toggle** in responsive mode

### **Dashboard Specific Testing:**
1. **Open dashboard** URL
2. **Wait for data** to load
3. **Toggle theme** and verify charts update
4. **Check Y-axis scaling** for high values
5. **Verify real-time updates** (wait 30 seconds)
6. **Test chart interactions** (hover, zoom)

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

### **If Mobile Menu Cuts Off:**
- **Check**: Screen width and menu container
- **Solution**: Verify `left-0 right-0 px-4` classes applied

### **If Chart Values Go Off Screen:**
- **Check**: Y-axis scaling configuration
- **Solution**: Verify `suggestedMax` function is working

### **If Dashboard Data Doesn't Update:**
- **Check**: Network connectivity
- **Solution**: Refresh page and wait for data fetch

## 📊 **Performance Benchmarks**

### **Target Metrics:**
- **Lighthouse Score**: > 90
- **Load Time**: < 3 seconds
- **Bundle Size**: < 500KB
- **First Paint**: < 1.5s
- **Interactive**: < 3s
- **Dashboard Load**: < 2s
- **Chart Rendering**: < 1s

### **How to Check:**
1. **Open Dev Tools** (F12)
2. **Go to Lighthouse** tab
3. **Run audit** for Performance
4. **Check scores** and recommendations
5. **Test dashboard** performance separately

## 🎉 **Success Criteria**

Your portfolio is working correctly if:
- ✅ **All sections load** without errors
- ✅ **Navigation works** smoothly
- ✅ **Theme toggle** functions immediately
- ✅ **Mobile responsive** design (no horizontal scroll)
- ✅ **Dashboard accessible** and functional with real-time data
- ✅ **All links work** correctly
- ✅ **Performance** is good
- ✅ **No console errors**
- ✅ **Charts display** with proper scaling
- ✅ **Hero stats align** properly on mobile
- ✅ **Project cards** have consistent heights
- ✅ **Portfolio screenshot** loads correctly

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

## 🆕 **Recent Upgrades & Features**

### **Dashboard Enhancements:**
- ✅ **Real-time data updates** every 30 seconds
- ✅ **Dynamic Y-axis scaling** for chart values > 400
- ✅ **Immediate theme toggle** without page refresh
- ✅ **Persistent chart labels** after theme changes
- ✅ **Simple coverage messaging** (no repetitive metrics)
- ✅ **Automated CI/CD status** updates
- ✅ **Enhanced error handling** and logging

### **Portfolio Improvements:**
- ✅ **Fixed mobile navigation** (no horizontal scroll)
- ✅ **Improved hero stats alignment** on mobile
- ✅ **Enhanced theme toggle** with Lucide icons
- ✅ **Updated portfolio project** with screenshot
- ✅ **Optimized project descriptions** and technologies
- ✅ **Consistent card heights** for projects
- ✅ **Better mobile responsiveness** overall

### **Technical Improvements:**
- ✅ **Increased test coverage** to >85%
- ✅ **Enhanced error handling** throughout
- ✅ **Improved performance** and loading times
- ✅ **Better code organization** and modularity
- ✅ **Comprehensive testing** for all components

---

**Your portfolio is now fully upgraded and ready to share!** 🚀 