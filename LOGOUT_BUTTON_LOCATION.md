# Logout Button Location Guide

## Desktop View (Screen width > 768px)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🏠 MegaHub          [Dashboard] [Candidates]        👤 John Doe  [Logout]   ┃
┃     Admin Portal                                        Administrator         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
     ↑                                                                    ↑
   Logo/Brand                                                    Logout Button Here!
```

### Detailed Desktop Layout

```
Navigation Bar (Top Right Corner)
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┌──────────────────────┐  ┌──────────────┐              │
│  │  👤  John Doe        │  │  🚪 Logout   │              │
│  │      Administrator   │  │              │              │
│  └──────────────────────┘  └──────────────┘              │
│   User Info Card            Logout Button                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Mobile View (Screen width < 768px)

### Step 1: Click Hamburger Menu

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🏠 MegaHub                                    ☰        ┃
┃     Admin Portal                                ↑       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                            Click Here!
```

### Step 2: Mobile Menu Opens

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🏠 MegaHub                                    ✕        ┃
┃     Admin Portal                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                         ┃
┃  ┌───────────────────────────────────────────────────┐ ┃
┃  │  🏠  Dashboard                                    │ ┃
┃  └───────────────────────────────────────────────────┘ ┃
┃                                                         ┃
┃  ┌───────────────────────────────────────────────────┐ ┃
┃  │  👥  Candidates                                   │ ┃
┃  └───────────────────────────────────────────────────┘ ┃
┃                                                         ┃
┃  ─────────────────────────────────────────────────────  ┃
┃                                                         ┃
┃  ┌───────────────────────────────────────────────────┐ ┃
┃  │  👤  John Doe                                     │ ┃
┃  │      Administrator                                │ ┃
┃  └───────────────────────────────────────────────────┘ ┃
┃                                                         ┃
┃  ┌───────────────────────────────────────────────────┐ ┃
┃  │  🚪  Logout                                       │ ┃ ← Logout Button Here!
┃  └───────────────────────────────────────────────────┘ ┃
┃                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Visual Features

### Desktop Logout Button
- **Icon:** 🚪 Logout arrow icon
- **Text:** "Logout"
- **Style:** Ghost button (subtle background)
- **Hover:** Lifts slightly with shadow effect
- **Location:** Top-right corner, next to user info

### Mobile Logout Button
- **Icon:** 🚪 Logout arrow icon
- **Text:** "Logout"
- **Style:** Full-width ghost button
- **Location:** Bottom of mobile menu, below user info

---

## User Info Display

### Desktop
```
┌──────────────────────┐
│  👤  John Doe        │
│      Administrator   │
└──────────────────────┘
```

### Mobile
```
┌───────────────────────────────────────┐
│  👤  John Doe                         │
│      Administrator                    │
└───────────────────────────────────────┘
```

---

## How to Logout

### Desktop
1. Look at the top-right corner of the page
2. You'll see your user info (avatar + name)
3. Next to it is the "Logout" button
4. Click "Logout"
5. You'll be redirected to /admin/login

### Mobile
1. Click the hamburger menu (☰) in the top-right corner
2. Mobile menu slides down
3. Scroll to the bottom of the menu
4. You'll see your user info
5. Below it is the "Logout" button
6. Click "Logout"
7. You'll be redirected to /admin/login

---

## What Happens When You Logout

1. **API Call:** POST /api/auth/logout
2. **Cookie Cleared:** JWT token removed
3. **State Cleared:** User data removed from store
4. **Redirect:** Navigate to /admin/login
5. **Toast:** "Logged out successfully" message

---

## Troubleshooting

### Can't see logout button on desktop
- **Check:** Are you on an admin page? (URL starts with /admin/)
- **Check:** Is your screen width > 768px?
- **Try:** Refresh the page
- **Try:** Zoom out if zoomed in too much

### Can't see logout button on mobile
- **Check:** Did you click the hamburger menu (☰)?
- **Check:** Is the mobile menu open?
- **Try:** Scroll down in the mobile menu
- **Try:** Close and reopen the menu

### Logout button doesn't work
- **Check:** Browser console for errors
- **Check:** Backend is running
- **Try:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Try:** Clear browser cache

---

## Code Reference

**File:** `frontend/src/components/AdminLayout.tsx`

**Desktop Logout Button:**
```typescript
<Button 
  variant="ghost" 
  size="sm" 
  onClick={handleLogout}
  className="hover-lift rounded-xl"
>
  <svg className="w-4 h-4 mr-2" ...>
    {/* Logout icon */}
  </svg>
  Logout
</Button>
```

**Mobile Logout Button:**
```typescript
<Button 
  variant="ghost" 
  size="sm" 
  onClick={handleLogout} 
  className="w-full rounded-xl hover-lift"
>
  <svg className="w-4 h-4 mr-2" ...>
    {/* Logout icon */}
  </svg>
  Logout
</Button>
```

**Logout Handler:**
```typescript
const handleLogout = () => {
  logout(undefined, {
    onSuccess: () => {
      navigate('/admin/login');
    },
  });
};
```

---

## Screenshots Description

### Desktop Navigation
- Clean, modern glass-effect navigation bar
- Logo on the left with "MegaHub" branding
- Navigation links in the center (Dashboard, Candidates)
- User info and logout on the right
- Gradient effects and smooth animations

### Mobile Navigation
- Hamburger menu icon in top-right
- Slide-down menu with all navigation items
- User info card at the bottom
- Full-width logout button
- Touch-friendly spacing

---

## Summary

✅ **Desktop:** Logout button is in the top-right corner, next to user info
✅ **Mobile:** Logout button is at the bottom of the hamburger menu
✅ **Always Visible:** On all admin pages (/admin/*)
✅ **Easy to Find:** Clear icon and text label
✅ **Works Correctly:** Clears session and redirects to login

**The logout button is already implemented and working! 🎉**
