import { 
  users, categories, products, platformLinks,
  type User, type InsertUser, type Category, type InsertCategory,
  type Product, type InsertProduct, type PlatformLink, type InsertPlatformLink,
  type ProductWithDetails
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;

  // Category methods
  getCategories(): Promise<Category[]>;
  createCategory(insertCategory: InsertCategory): Promise<Category>;

  // Product methods
  getProducts(options?: { categoryId?: string; limit?: number; offset?: number }): Promise<ProductWithDetails[]>;
  getFeaturedProducts(limit: number): Promise<ProductWithDetails[]>;
  getProductById(id: string): Promise<ProductWithDetails | undefined>;
  createProduct(insertProduct: InsertProduct): Promise<Product>;
  updateProduct(id: string, insertProduct: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Platform link methods
  getPlatformLinksByProductId(productId: string): Promise<PlatformLink[]>;
  createPlatformLink(insertPlatformLink: InsertPlatformLink): Promise<PlatformLink>;
  updatePlatformLink(id: string, insertPlatformLink: InsertPlatformLink): Promise<PlatformLink | undefined>;
  deletePlatformLink(id: string): Promise<boolean>;

  // Admin methods
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(asc(categories.name));
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async getProducts(options?: { categoryId?: string; limit?: number; offset?: number }): Promise<ProductWithDetails[]> {
    // Build base query conditions
    let conditions = eq(products.isActive, true);
    
    if (options?.categoryId) {
      conditions = and(conditions, eq(products.categoryId, options.categoryId)) as any;
    }

    // Get products with categories
    let query = db
      .select()
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(conditions)
      .orderBy(desc(products.createdAt));

    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }

    if (options?.offset) {
      query = query.offset(options.offset) as any;
    }

    const productResults = await query;
    
    // Build the response
    const result: ProductWithDetails[] = [];
    
    for (const row of productResults) {
      const product = row.products;
      const category = row.categories;
      
      if (category) {
        const productPlatformLinks = await db
          .select()
          .from(platformLinks)
          .where(eq(platformLinks.productId, product.id));
        
        result.push({
          ...product,
          category,
          platformLinks: productPlatformLinks
        });
      }
    }
    
    return result;
  }

  async getFeaturedProducts(limit: number): Promise<ProductWithDetails[]> {
    return this.getProducts({ limit });
  }

  async getProductById(id: string): Promise<ProductWithDetails | undefined> {
    const results = await this.getProducts();
    return results.find(product => product.id === id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct as any)
      .returning();
    return product;
  }

  async updateProduct(id: string, insertProduct: InsertProduct): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(insertProduct as any)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getPlatformLinksByProductId(productId: string): Promise<PlatformLink[]> {
    return await db
      .select()
      .from(platformLinks)
      .where(eq(platformLinks.productId, productId));
  }

  async createPlatformLink(insertPlatformLink: InsertPlatformLink): Promise<PlatformLink> {
    const [link] = await db
      .insert(platformLinks)
      .values(insertPlatformLink)
      .returning();
    return link;
  }

  async updatePlatformLink(id: string, insertPlatformLink: InsertPlatformLink): Promise<PlatformLink | undefined> {
    const [link] = await db
      .update(platformLinks)
      .set(insertPlatformLink)
      .where(eq(platformLinks.id, id))
      .returning();
    return link || undefined;
  }

  async deletePlatformLink(id: string): Promise<boolean> {
    const result = await db
      .delete(platformLinks)
      .where(eq(platformLinks.id, id));
    return (result.rowCount || 0) > 0;
  }

  async seedData(): Promise<void> {
    // Check if categories already exist
    const existingCategories = await db.select().from(categories);
    
    // Insert categories only if none exist
    let insertedCategories = existingCategories;
    if (existingCategories.length === 0) {
      const womenCategories = [
        { name: "Necklaces", code: "NK", gender: "women", description: "Elegant necklaces for women" },
        { name: "Earrings", code: "ER", gender: "women", description: "Beautiful earrings collection" },
        { name: "Jhumkas", code: "JH", gender: "women", description: "Traditional jhumka designs" },
        { name: "Rings", code: "RG", gender: "women", description: "Stunning rings for every occasion" },
        { name: "Bangles", code: "BN", gender: "women", description: "Elegant bangles and bracelets" },
        { name: "Jewelry Sets", code: "ST", gender: "women", description: "Complete jewelry sets" },
      ];

      const menCategories = [
        { name: "Rings", code: "MRG", gender: "men", description: "Sophisticated rings for men" },
        { name: "Bracelets", code: "BR", gender: "men", description: "Stylish bracelets for men" },
        { name: "Chains", code: "MNK", gender: "men", description: "Premium chains and necklaces" },
      ];

      insertedCategories = await db
        .insert(categories)
        .values([...womenCategories, ...menCategories])
        .returning();
    }

    // Create sample products
    const sampleProducts = [
      {
        sku: "ZHV-NK-001",
        name: "Eternal Elegance Diamond Necklace",
        description: "A stunning 18K gold necklace featuring brilliant cut diamonds arranged in an intricate pattern. Perfect for special occasions and formal events.",
        price: "245000.00",
        material: "18K Gold, Diamonds",
        weight: "25.4g",
        categoryId: insertedCategories.find(c => c.code === "NK" && c.gender === "women")!.id,
        images: [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        stockQuantity: 15,
        isActive: true
      },
      {
        sku: "ZHV-ER-001",
        name: "Royal Ruby Drop Earrings",
        description: "Exquisite ruby drop earrings set in 18K white gold with diamond accents. A timeless piece that adds elegance to any outfit.",
        price: "185000.00",
        material: "18K White Gold, Rubies, Diamonds",
        weight: "12.8g",
        categoryId: insertedCategories.find(c => c.code === "ER" && c.gender === "women")!.id,
        images: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        stockQuantity: 8,
        isActive: true
      },
      {
        sku: "ZHV-JH-001",
        name: "Heritage Kundan Jhumkas",
        description: "Traditional kundan jhumkas with intricate gold work and pearl drops. A perfect blend of heritage and contemporary design.",
        price: "125000.00",
        material: "22K Gold, Kundan, Pearls",
        weight: "18.5g",
        categoryId: insertedCategories.find(c => c.code === "JH" && c.gender === "women")!.id,
        images: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        stockQuantity: 12,
        isActive: true
      },
      {
        sku: "ZHV-RG-001",
        name: "Princess Cut Diamond Ring",
        description: "A magnificent solitaire ring featuring a 2-carat princess cut diamond set in platinum. Symbol of eternal love and commitment.",
        price: "350000.00",
        material: "Platinum, Diamond (2ct)",
        weight: "8.2g",
        categoryId: insertedCategories.find(c => c.code === "RG" && c.gender === "women")!.id,
        images: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        stockQuantity: 5,
        isActive: true
      },
      {
        sku: "ZHV-BN-001",
        name: "Classic Gold Bangles Set",
        description: "Set of 4 classic gold bangles with traditional engravings. Perfect for daily wear and special occasions.",
        price: "95000.00",
        material: "22K Gold",
        weight: "45.6g",
        categoryId: insertedCategories.find(c => c.code === "BN" && c.gender === "women")!.id,
        images: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        stockQuantity: 20,
        isActive: true
      }
    ];

    // Insert products
    const insertedProducts = await db
      .insert(products)
      .values(sampleProducts)
      .returning();

    // Create platform links for each product
    const platformData = [
      { platform: "amazon", isActive: true },
      { platform: "myntra", isActive: true },
      { platform: "flipkart", isActive: true },
      { platform: "meesho", isActive: false },
      { platform: "direct", isActive: true }
    ];

    for (const product of insertedProducts) {
      const links = platformData.map(platform => ({
        productId: product.id,
        platform: platform.platform,
        url: platform.platform === "direct" ? null : `https://${platform.platform}.com/product/${product.sku}`,
        isActive: platform.isActive
      }));

      await db.insert(platformLinks).values(links);
    }
  }
}

export const storage = new DatabaseStorage();