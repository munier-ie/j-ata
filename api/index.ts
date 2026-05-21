import { VercelRequest, VercelResponse } from "@vercel/node";

// ============= Vercel Serverless Handler =============
// This wraps the Express app for Vercel's serverless environment
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Dynamically import the Express app to catch load-time errors
    const appModule = await import("../server/app");
    const app = appModule.default;

    return new Promise((resolve, reject) => {
      // Use Express app to handle the request
      app(req as any, res as any);
      
      // Resolve when response is finished
      res.on('finish', resolve);
      res.on('error', reject);
    });
  } catch (err: any) {
    console.error("Initialization Error:", err);
    res.status(500).json({
      error: "Serverless Initialization Error",
      message: err.message,
      stack: err.stack,
      hint: "This error was caught during dynamic import of the Express app inside the Vercel handler."
    });
  }
};
