import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../server/app";

// ============= Vercel Serverless Handler =============
// This wraps the Express app for Vercel's serverless environment
export default async (req: VercelRequest, res: VercelResponse) => {
  // Convert Vercel request to Express request and handle
  return new Promise((resolve, reject) => {
    // Use Express app to handle the request
    app(req as any, res as any);
    
    // Resolve when response is finished
    res.on('finish', resolve);
    res.on('error', reject);
  });
};
