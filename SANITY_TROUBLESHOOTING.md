# Sanity Studio Troubleshooting Guide

## Current Issue: API Request Error

The error you're seeing indicates that Sanity Studio is having trouble connecting to the Sanity API. This is typically due to CORS (Cross-Origin Resource Sharing) configuration.

## Quick Fix Steps

### 1. Configure CORS in Sanity Project

1. Go to your Sanity project dashboard at [sanity.io](https://sanity.io)
2. Navigate to **API** → **CORS Origins**
3. Click **Add CORS Origin**
4. Add these origins:
   - `http://localhost:3001` (your current dev server)
   - `http://localhost:3000` (backup)
   - Your production domain when ready

### 2. Verify Environment Variables

Check that your `.env.local` file has the correct values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=89w71bi1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_actual_token_here
```

### 3. Test Connection

1. Visit `http://localhost:3001/test-sanity` to verify the connection
2. If successful, try accessing `http://localhost:3001/studio`

## Alternative: Use Sanity's Hosted Studio

If the embedded studio continues to have issues, you can use Sanity's hosted studio:

1. Go to `https://89w71bi1.sanity.studio/`
2. Login with your Sanity account
3. Manage content directly from Sanity's interface

## Manual CORS Setup

If you need to set up CORS manually:

1. In your Sanity project dashboard
2. Go to **API** → **CORS Origins**
3. Add these entries:

| Origin | Allow Credentials |
|--------|------------------|
| `http://localhost:3001` | ✓ |
| `http://localhost:3000` | ✓ |
| `https://yourdomain.com` | ✓ (for production) |

## Verify Setup

After configuring CORS:

1. Restart your development server: `npm run dev`
2. Clear browser cache
3. Try accessing the studio again

## Common Issues & Solutions

### Issue: "Request error while attempting to reach..."
**Solution**: Add your domain to CORS origins in Sanity project settings

### Issue: "Hydration failed"
**Solution**: This is normal for the studio page and shouldn't affect functionality

### Issue: "Missing environment variables"
**Solution**: Ensure all Sanity environment variables are set correctly

### Issue: Studio loads but can't save content
**Solution**: Check that your API token has "Editor" permissions

## Working with Content

Once the studio is working, you can:

1. **Create Authors**: Add author profiles with bios and images
2. **Create Categories**: Organize your content with colored categories
3. **Write Posts**: Use the rich text editor to create blog posts
4. **Manage Media**: Upload and organize images

## Need Help?

If you continue to have issues:

1. Check the browser console for detailed error messages
2. Verify your Sanity project settings
3. Ensure your API token has the correct permissions
4. Try using the hosted studio as a backup option

The blog frontend will work once you have content in Sanity, regardless of whether you use the embedded or hosted studio.
