# Creative Preview Testing Guide

## How to Test Creative Content Previews

The creative preview functionality is now fully implemented. Here's how to test it:

### 1. Access the Creative Agent

1. Open http://localhost:3000
2. Click on the **Creative Content Agent** from the specialist agents section
3. Or use the Super Entry to ask a creative-related question

### 2. Test TikTok/Video Content Generation

**Prompts to try:**
```
Generate TikTok video concepts for our spring collection
Create Instagram Reels ideas for our new product launch
Give me video content ideas for social media
```

**Expected Result:**
- 4 video script concepts will appear
- Each shows as a card with a blue→cyan→teal gradient
- Timestamp breakdowns visible in content
- Video icon displayed
- Metadata shows: Duration (20s), Platform (TikTok/Instagram), Format (Vertical 9:16)

**Features to test:**
- ✅ Click "Copy" button - should copy script to clipboard
- ✅ Click "Refine" button - shows textarea for feedback
- ✅ Enter feedback like "make it more playful" and click "Generate Refined Version"
- ✅ Click eye icon on hover - opens preview modal
- ✅ Click download icon (if available)

### 3. Test Email Subject Lines

**Prompts to try:**
```
Generate holiday email subject lines
Create subject lines for our gift guide campaign
Give me email subject line ideas for Black Friday
```

**Expected Result:**
- 10 email subject line variations
- Pink→rose→red gradient cards
- Each shows psychological trigger used
- Character count displayed
- Email/Subject Line format badge

**Features to test:**
- ✅ Copy individual subject lines
- ✅ Refine specific variations
- ✅ View full preview modal

### 4. Test Full Campaign Package

**Prompts to try:**
```
Create a complete creative campaign package
Generate a full set of campaign creatives
Give me a comprehensive campaign asset package
```

**Expected Result:**
- 5 integrated creative assets:
  1. Hero Video (30s Premium Cut) - video gradient
  2. TikTok Native (15s Hook) - video gradient
  3. Static Feed Ad - image gradient (purple→pink→orange)
  4. Influencer Partnership Brief - copy gradient (indigo→purple→pink)
  5. Retail Display Copy - copy gradient

**Features to test:**
- ✅ All 5 assets display in grid layout
- ✅ Each has appropriate icon and gradient
- ✅ Metadata shows platform/format info
- ✅ Brand guidelines section appears at bottom
- ✅ Recommendations section appears at bottom

### 5. Test Refine with AI

1. Click "Refine" on any creative variant
2. Textarea appears with placeholder: "What would you like to change?"
3. Enter feedback examples:
   - "Make it more urgent"
   - "Add more humor"
   - "Focus on product benefits"
   - "Shorten the copy"
   - "Make it more formal"
4. Click "Generate Refined Version"
5. New message should appear in chat with refined content

### 6. Test Preview Modal

1. Hover over any creative card
2. Eye icon should appear with dark overlay
3. Click eye icon
4. Modal opens showing:
   - Full gradient preview
   - Icon if no image
   - Complete content text
   - Close button (✕)
5. Click outside modal or ✕ to close

### 7. Test Dark Mode

1. Toggle dark mode in your system settings
2. Verify all creative cards render correctly
3. Check that:
   - Gradients still visible
   - Text is readable
   - Borders are subtle
   - Modal background is appropriate

### 8. Test Export Functionality

1. Click "Export All" button at top of visualization panel
2. Should download JSON file with all creative content
3. Verify JSON structure includes:
   - mainConcept
   - variants array
   - brandGuidelines
   - recommendations

## Expected Visual Elements

### Card Structure
```
┌─────────────────────────────┐
│  Gradient Preview (h-48)    │  ← Gradient background with icon
│  [Eye icon on hover]         │
│  [Type Badge]  [Metadata]    │
├─────────────────────────────┤
│  Title (Bold)                │
│  Content (3 lines max)       │
│  [Format] [Duration]         │  ← Metadata badges
│  [Copy] [Refine] [Download]  │  ← Action buttons
│  [Refine textarea if active] │
└─────────────────────────────┘
```

### Color Coding
- **Video**: Blue → Cyan → Teal (ocean waves)
- **Image**: Purple → Pink → Orange (creative spark)
- **Email**: Pink → Rose → Red (attention-grabbing)
- **Copy**: Indigo → Purple → Pink (editorial flow)

## Troubleshooting

### Preview Not Showing
- Check browser console for errors
- Verify agent response includes `visualizationType: 'creative'`
- Check that `creativeContent` object exists in response
- Ensure VisualizationPanel receives `creativeContent` prop

### Refine Not Working
- Verify `onRefineCreative` is passed to VisualizationPanel
- Check that feedback text is not empty
- Look for new message in chat history after clicking "Generate Refined Version"

### Copy Button Not Working
- Check browser clipboard permissions
- Try in incognito/private mode
- Verify Clipboard API is supported in browser

### Modal Not Opening
- Check for z-index conflicts
- Verify click event is not being prevented
- Look for `previewIndex` state updates in React DevTools

## Success Criteria

✅ All creative types render with correct gradients
✅ Copy functionality works for all variants
✅ Refine UI appears and submits properly
✅ Preview modal opens/closes smoothly
✅ Download buttons trigger correctly
✅ Brand guidelines section displays when present
✅ Recommendations section displays when present
✅ Dark mode renders correctly
✅ Export functionality works
✅ No console errors

## Next Steps

After testing, you can:
1. Request additional creative formats
2. Ask for different campaign types
3. Refine multiple variants to compare
4. Export and use the creative content
5. Integrate with actual image generation APIs
