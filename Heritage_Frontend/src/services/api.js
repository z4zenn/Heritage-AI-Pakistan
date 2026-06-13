// src/services/api.js
// Central API client handling requests to Express server and schema mapping

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// Auto-attach JWT token if present in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Maps backend DB Site schema fields to the exact properties expected by frontend components
export const mapDbSiteToFrontend = (dbSite) => {
  if (!dbSite) return null;
  return {
    id: dbSite._id || dbSite.slug,
    slug: dbSite.slug,
    name: dbSite.name,
    city: dbSite.nearbyCity || '',
    province: dbSite.region || '',
    civilizationEra: dbSite.era || '',
    siteType: dbSite.type || '',
    unescoListed: dbSite.tags ? dbSite.tags.includes('unesco') : false,
    period: dbSite.era || '', // fallback
    lat: dbSite.coordinates ? dbSite.coordinates.lat : 0,
    lon: dbSite.coordinates ? dbSite.coordinates.lng : 0,
    satisfactionRating: dbSite.satisfactionRating || 4.7, // fallback
    description: dbSite.fullDescription || dbSite.shortDescription || '',
    highlights: dbSite.highlights && dbSite.highlights.length > 0
      ? dbSite.highlights 
      : [dbSite.shortDescription || 'A site of profound historical archaeological significance.'],
    visitorTips: dbSite.visitorTips || `Visiting Hours: ${dbSite.visitingHours || '09:00 AM - 05:00 PM'}. Entry Fee: ${dbSite.entryFee || 'Free'}.`,
    images: dbSite.images && dbSite.images.length > 0
      ? dbSite.images
      : ['https://images.unsplash.com/photo-1627856013091-fed6e4e30025'], // fallback image
    tags: dbSite.tags || [],
    recommendationReason: dbSite.recommendationReason || '' // For Claude recommendations reasoning
  };
};

// API Services Exporter
export const api = {
  // 1. Sites Services
  async fetchSites(filters = {}) {
    const response = await API.get('/sites', { params: filters });
    if (response.data && response.data.success) {
      return response.data.data.map(mapDbSiteToFrontend);
    }
    throw new Error(response.data?.message || 'Failed to fetch sites');
  },

  async fetchSiteById(idOrSlug) {
    const response = await API.get(`/sites/${idOrSlug}`);
    if (response.data && response.data.success) {
      return mapDbSiteToFrontend(response.data.data);
    }
    throw new Error(response.data?.message || 'Failed to fetch site details');
  },

  // 2. Auth Services
  async register(name, email, password, role = 'user') {
    const response = await API.post('/auth/register', { name, email, password, role });
    if (response.data && response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Registration failed');
  },

  async login(email, password) {
    const response = await API.post('/auth/login', { email, password });
    if (response.data && response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Login failed');
  },

  async getMe() {
    const response = await API.get('/auth/me');
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to fetch user profile');
  },

  // 3. Booking Services
  async createBooking(siteId, date, numberOfPeople) {
    const response = await API.post('/bookings', { siteId, date, numberOfPeople });
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to create booking');
  },

  async fetchMyBookings() {
    const response = await API.get('/bookings/me');
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to fetch bookings list');
  },

  // 4. AI Services
  async fetchRecommendations(interests, region, travelStyle) {
    const response = await API.post('/ai/recommend', { interests, region, travelStyle });
    if (response.data && response.data.success) {
      return response.data.data.map(mapDbSiteToFrontend);
    }
    throw new Error(response.data?.message || 'Failed to fetch recommendations');
  },

  async searchSites(query) {
    const response = await API.post('/ai/search', { query });
    if (response.data && response.data.success) {
      return response.data.data.map(mapDbSiteToFrontend);
    }
    throw new Error(response.data?.message || 'AI search failed');
  }
};
