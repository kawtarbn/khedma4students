# Debug Modal Issues

## 🔍 Steps to Debug the Contact Student Modal

### 1. Check Console Logs
Open browser console and look for:
- "Contact button clicked" - when clicking the button
- "Modal should be visible" - when modal should appear
- Any JavaScript errors

### 2. Verify Employer Login Status
In browser console, run:
```javascript
console.log('Employer ID:', localStorage.getItem('employerId'));
console.log('Student ID:', localStorage.getItem('studentId'));
```

### 3. Test Modal Manually
In browser console, try:
```javascript
// Force show modal
localStorage.setItem('employerId', 'test');
window.location.reload();
```

### 4. Check CSS
Modal should have these styles:
```css
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
```

### 5. Common Issues

**Issue 1: Modal not visible**
- Check if z-index is high enough
- Verify background color is set
- Ensure display: flex is working

**Issue 2: Button not clickable**
- Verify employer is logged in
- Check button is not disabled
- Look for CSS conflicts

**Issue 3: Form not appearing**
- Check React state updates
- Verify modal condition is met
- Look for JavaScript errors

### 6. Quick Test
Add this to browser console to test modal:
```javascript
// Test modal visibility
document.querySelector('.modal')?.style.display = 'flex';
```

### 7. Expected Behavior
1. ✅ Employer logged in → Button enabled → Click → Modal appears
2. ❌ Student logged in → Button disabled → No modal
3. ❌ Not logged in → Button disabled → No modal

If modal still doesn't appear, check:
- React component re-rendering
- CSS conflicts
- JavaScript errors
- State management
