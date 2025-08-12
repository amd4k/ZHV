import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCategorySchema, insertPlatformLinkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const { category, limit, offset } = req.query;
      const products = await storage.getProducts({
        categoryId: category as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts(10);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Platform links routes
  app.get("/api/products/:productId/platforms", async (req, res) => {
    try {
      const links = await storage.getPlatformLinksByProductId(req.params.productId);
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch platform links" });
    }
  });

  app.post("/api/products/:productId/platforms", async (req, res) => {
    try {
      const validatedData = insertPlatformLinkSchema.parse({
        ...req.body,
        productId: req.params.productId,
      });
      const link = await storage.createPlatformLink(validatedData);
      res.status(201).json(link);
    } catch (error) {
      res.status(400).json({ message: "Invalid platform link data" });
    }
  });

  app.put("/api/platforms/:id", async (req, res) => {
    try {
      const validatedData = insertPlatformLinkSchema.parse(req.body);
      const link = await storage.updatePlatformLink(req.params.id, validatedData);
      if (!link) {
        return res.status(404).json({ message: "Platform link not found" });
      }
      res.json(link);
    } catch (error) {
      res.status(400).json({ message: "Invalid platform link data" });
    }
  });

  app.delete("/api/platforms/:id", async (req, res) => {
    try {
      const success = await storage.deletePlatformLink(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Platform link not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete platform link" });
    }
  });

  // Admin routes
  app.post("/api/admin/seed", async (req, res) => {
    try {
      await storage.seedData();
      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ message: "Failed to seed database", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
