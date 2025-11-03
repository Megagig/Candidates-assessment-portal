# Navigation Quick Guide

## Where to Find the Logout Button

### Option 1: User Menu (Header)
1. Look at the top-right corner
2. Click on your avatar/name
3. Click "Logout" in the dropdown

### Option 2: Sidebar (Desktop)
1. Look at the left sidebar
2. Scroll to the bottom
3. Click the red "Logout" button

### Option 3: Mobile Menu
1. Click the hamburger menu (☰) in top-left
2. Sidebar opens
3. Scroll to bottom
4. Click the red "Logout" button

## Navigation Structure

```
┌─────────────────────────────────────────────────────────┐
│ ☰  🎯 MegaHub              👤 John Doe ▼               │ ← Header
│     Admin Portal              Administrator             │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│ 🏠 Dashboard │  Dashboard Content                       │
│              │                                          │
│ 👥 Candidates│  (Charts, Stats, etc.)                   │
│              │                                          │
│              │                                          │
│              │                                          │
│ 🚪 Logout    │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
   Sidebar         Main Content Area
```

## Quick Actions

| Action | Desktop | Mobile |
|--------|---------|--------|
| Go to Dashboard | Click "Dashboard" in sidebar | Open menu → Click "Dashboard" |
| Go to Candidates | Click "Candidates" in sidebar | Open menu → Click "Candidates" |
| Logout | Click avatar → Logout OR Click sidebar logout | Open menu → Click logout |
| Open Menu | N/A (always visible) | Click ☰ burger icon |

## Visual Indicators

### Active Page
- **Dashboard active:** Dashboard button is filled with violet color
- **Candidates active:** Candidates button is filled with violet color

### Hover States
- Buttons highlight on hover
- User menu shows dropdown arrow

### Colors
- **Active:** Violet/Purple (filled)
- **Inactive:** Gray (subtle)
- **Logout:** Red (emphasis)

## Keyboard Navigation

- **Tab:** Navigate through buttons
- **Enter/Space:** Activate button
- **Escape:** Close dropdown menu

## Responsive Breakpoints

- **Desktop (>768px):** Sidebar always visible
- **Mobile (<768px):** Sidebar hidden, burger menu visible

## Common Issues

### Can't see navigation
- **Solution:** Refresh the page
- **Check:** You're on an /admin/* route
- **Try:** Hard refresh (Ctrl+Shift+R)

### Sidebar won't open on mobile
- **Solution:** Click the ☰ burger icon in top-left
- **Check:** Screen width is less than 768px

### Logout doesn't work
- **Solution:** Check browser console for errors
- **Try:** Use the other logout button location
- **Check:** Backend is running

## Features

✅ Fixed header (stays at top when scrolling)
✅ Collapsible sidebar (mobile)
✅ Active page highlighting
✅ Multiple logout options
✅ User info display
✅ Responsive design
✅ Smooth animations

## Pages

- **/admin/dashboard** - Overview with stats and charts
- **/admin/candidates** - List of all candidates
- **/admin/candidates/:id** - Individual candidate details

## Tips

💡 **Tip 1:** The sidebar shows which page you're on
💡 **Tip 2:** You can logout from two places (header or sidebar)
💡 **Tip 3:** On mobile, the sidebar auto-closes after navigation
💡 **Tip 4:** The header is always visible, even when scrolling

---

**Navigation is now fully functional and easy to use! 🎉**
