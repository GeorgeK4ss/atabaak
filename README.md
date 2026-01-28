# Atabaak Landing Page

## Deployment with Webhook (No CORS Issues)

This landing page uses a serverless webhook to send leads to the API, avoiding CORS issues.

### Deploy to Vercel (Recommended)

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Or connect your GitHub repo to Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo: `GeorgeK4ss/atabaak`
   - Click "Deploy"

### Deploy to Render

If continuing with Render for static hosting, you'll need to add the serverless function separately or use Vercel for the API proxy.

### How It Works

- Form submissions go to `/api/submit-lead` (serverless function)
- The serverless function forwards data to your API with proper authentication
- No CORS issues because the API call happens server-to-server
- API key is hidden from frontend (more secure)

### Files

- `index.html` - Landing page
- `api/submit-lead.js` - Serverless webhook function
- `vercel.json` - Vercel configuration
