/**
 * API Client for Access Health Medical Supplies API
 * Handles all communication with the NestJS backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      let data = await response.json();
      
      // Handle wrapped responses (like from PowerShell)
      if (data.value && !Array.isArray(data) && Array.isArray(data.value)) {
        data = data.value;
      }
      
      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Catalog endpoints
  async getCategories() {
    return this.request("/catalog/categories");
  }

  async getProducts(params?: { categoryId?: string; skip?: number; take?: number }) {
    const query = new URLSearchParams();
    if (params?.categoryId) query.append("categoryId", params.categoryId);
    if (params?.skip) query.append("skip", params.skip.toString());
    if (params?.take) query.append("take", params.take.toString());

    const queryString = query.toString();
    const endpoint = `/catalog/products${queryString ? `?${queryString}` : ""}`;
    return this.request(endpoint);
  }

  async getProductBySlug(slug: string) {
    return this.request(`/catalog/products/${slug}`);
  }

  // Orders endpoints
  async getOrders(userId: string) {
    return this.request(`/orders?userId=${userId}`);
  }

  async getOrderById(orderId: string) {
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(data: any) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Accounts endpoints (Auth)
  async login(email: string, password: string) {
    return this.request("/accounts/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    return this.request("/accounts/register", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
  }

  // Cart endpoints
  async getCart(userId: string) {
    return this.request(`/orders/cart?userId=${userId}`);
  }

  async addToCart(userId: string, variantId: string, quantity: number) {
    return this.request("/orders/cart/items", {
      method: "POST",
      body: JSON.stringify({ userId, variantId, quantity }),
    });
  }

  async removeFromCart(cartItemId: string) {
    return this.request(`/orders/cart/items/${cartItemId}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
