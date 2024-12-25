import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function registerRoutes(app: Express): Server {
  // put application routes here
  // prefix all routes with /api

  app.get('/api/content', (req, res) => {
    const { section, slug } = req.query;

    if (!section || !slug) {
      res.status(400).json({ error: 'Section and slug are required' });
      return;
    }

    try {
      const filePath = path.resolve(__dirname, '..', 'markdown-pages', `${slug}.md`);
      const content = fs.readFileSync(filePath, 'utf-8');
      res.status(200).json({ content });
    } catch (error) {
      const filePath = path.resolve(__dirname, '..', 'markdown-pages', `${slug}.md`);
      res.status(500).json({ error: `Failed to read content` });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}