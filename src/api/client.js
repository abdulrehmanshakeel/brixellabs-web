// Unified BrixelLabs Django REST API Client
// In production on Vercel Option B (monorepo), default to same-domain '/api'
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://127.0.0.1:8000/api');

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getAuthToken() {
    try {
      const auth = localStorage.getItem('brixel_admin_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        return parsed.token || parsed.access || null;
      }
    } catch (e) {
      console.warn('Could not read auth token', e);
    }
    return null;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const token = this.getAuthToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      if (response.status === 204) {
        return { ok: true };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          error: data.detail || data.error || 'API Request Failed',
          data,
        };
      }

      return {
        ok: true,
        status: response.status,
        data,
      };
    } catch (error) {
      console.warn(`Django API connection failed for [${endpoint}]:`, error.message);
      return {
        ok: false,
        networkError: true,
        error: error.message,
      };
    }
  }

  // --- Auth APIs ---
  async login(usernameOrEmail, password) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: { username: usernameOrEmail, password },
    });
  }

  async refreshToken(refreshToken) {
    return this.request('/auth/token/refresh/', {
      method: 'POST',
      body: { refresh: refreshToken },
    });
  }

  // --- Health Check ---
  async checkHealth() {
    return this.request('/health/', { method: 'GET' });
  }

  // --- Inquiries / Leads ---
  async getInquiries() {
    return this.request('/inquiries/', { method: 'GET' });
  }

  async createInquiry(inquiryData) {
    return this.request('/inquiries/', {
      method: 'POST',
      body: inquiryData,
    });
  }

  async updateInquiry(id, updates) {
    return this.request(`/inquiries/${id}/`, {
      method: 'PATCH',
      body: updates,
    });
  }

  async deleteInquiry(id) {
    return this.request(`/inquiries/${id}/`, {
      method: 'DELETE',
    });
  }

  // --- Admin Stats ---
  async getAdminStats() {
    return this.request('/admin/stats/', { method: 'GET' });
  }

  // --- Services ---
  async getServices() {
    return this.request('/services/', { method: 'GET' });
  }

  async updateService(id, updates) {
    return this.request(`/services/${id}/`, {
      method: 'PATCH',
      body: updates,
    });
  }

  // --- Portfolio ---
  async getPortfolio() {
    return this.request('/portfolio/', { method: 'GET' });
  }

  async updatePortfolioItem(id, updates) {
    return this.request(`/portfolio/${id}/`, {
      method: 'PATCH',
      body: updates,
    });
  }

  // --- Team ---
  async getTeam() {
    return this.request('/team/', { method: 'GET' });
  }

  async updateTeamMember(id, updates) {
    return this.request(`/team/${id}/`, {
      method: 'PATCH',
      body: updates,
    });
  }

  // --- Settings ---
  async getSettings() {
    return this.request('/settings/', { method: 'GET' });
  }

  async updateSetting(key, value) {
    return this.request(`/settings/${key}/`, {
      method: 'PATCH',
      body: { value },
    });
  }

  // --- Newsletter ---
  async subscribeNewsletter(email, source = 'Footer Newsletter') {
    return this.request('/newsletter/', {
      method: 'POST',
      body: { email, source },
    });
  }

  // --- Additional CRUD Helpers for Services, Portfolio & Team ---
  async createService(serviceData) {
    return this.request('/services/', {
      method: 'POST',
      body: serviceData,
    });
  }

  async deleteService(id) {
    return this.request(`/services/${id}/`, {
      method: 'DELETE',
    });
  }

  async createPortfolioItem(portfolioData) {
    return this.request('/portfolio/', {
      method: 'POST',
      body: portfolioData,
    });
  }

  async deletePortfolioItem(id) {
    return this.request(`/portfolio/${id}/`, {
      method: 'DELETE',
    });
  }

  async createTeamMember(memberData) {
    return this.request('/team/', {
      method: 'POST',
      body: memberData,
    });
  }

  async deleteTeamMember(id) {
    return this.request(`/team/${id}/`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

