import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  LoginCredentials, 
  RegisterData, 
  User, 
  Patient,
  Appointment,
  Diagnosis,
  Medication,
  Assessment,
  Payment,
  Invoice,
  AIRequest,
  AIResponse
} from '@/types';

// Configuración base del cliente API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mi-backend-api.liendoalejandro94.workers.dev/api';

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configurar interceptores
    this.setupInterceptors();
    
    // Cargar token inicial
    this.loadToken();
  }

  private setupInterceptors(): void {
    // Request interceptor para agregar token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor para manejar errores
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          // Redirigir a login si es necesario
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || 
             Cookies.get('auth_token') || 
             this.token;
    }
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      Cookies.set('auth_token', token, { expires: 1 }); // 1 día
    }
  }

  private clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      Cookies.remove('auth_token');
    }
  }

  private loadToken(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token') || Cookies.get('auth_token');
      if (token) {
        this.token = token;
      }
    }
  }

  // Método genérico para hacer requests
  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.request(config);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw new Error(error.message || 'Error de conexión');
    }
  }

  // ========== AUTENTICACIÓN ==========
  
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.request<ApiResponse<{ token: string; user: User }>>({
      method: 'POST',
      url: '/auth/login',
      data: credentials,
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(data: RegisterData): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.request<ApiResponse<{ token: string; user: User }>>({
      method: 'POST',
      url: '/auth/register',
      data,
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    this.clearToken();
    return { success: true };
  }

  // ========== PACIENTES ==========

  async getPatients(params?: any): Promise<PaginatedResponse<Patient>> {
    return this.request<PaginatedResponse<Patient>>({
      method: 'GET',
      url: '/patients',
      params,
    });
  }

  async getPatient(id: string): Promise<ApiResponse<Patient>> {
    return this.request<ApiResponse<Patient>>({
      method: 'GET',
      url: `/patients/${id}`,
    });
  }

  async createPatient(data: Partial<Patient>): Promise<ApiResponse<Patient>> {
    return this.request<ApiResponse<Patient>>({
      method: 'POST',
      url: '/patients',
      data,
    });
  }

  async updatePatient(id: string, data: Partial<Patient>): Promise<ApiResponse<Patient>> {
    return this.request<ApiResponse<Patient>>({
      method: 'PUT',
      url: `/patients/${id}`,
      data,
    });
  }

  async deletePatient(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/patients/${id}`,
    });
  }

  // ========== CITAS ==========

  async getAppointments(params?: any): Promise<PaginatedResponse<Appointment>> {
    return this.request<PaginatedResponse<Appointment>>({
      method: 'GET',
      url: '/appointments',
      params,
    });
  }

  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return this.request<ApiResponse<Appointment>>({
      method: 'GET',
      url: `/appointments/${id}`,
    });
  }

  async createAppointment(data: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return this.request<ApiResponse<Appointment>>({
      method: 'POST',
      url: '/appointments',
      data,
    });
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return this.request<ApiResponse<Appointment>>({
      method: 'PUT',
      url: `/appointments/${id}`,
      data,
    });
  }

  async deleteAppointment(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/appointments/${id}`,
    });
  }

  // ========== DIAGNÓSTICOS ==========

  async getDiagnoses(params?: any): Promise<PaginatedResponse<Diagnosis>> {
    return this.request<PaginatedResponse<Diagnosis>>({
      method: 'GET',
      url: '/diagnoses',
      params,
    });
  }

  async getDiagnosis(id: string): Promise<ApiResponse<Diagnosis>> {
    return this.request<ApiResponse<Diagnosis>>({
      method: 'GET',
      url: `/diagnoses/${id}`,
    });
  }

  async getPatientDiagnoses(patientId: string): Promise<ApiResponse<Diagnosis[]>> {
    return this.request<ApiResponse<Diagnosis[]>>({
      method: 'GET',
      url: `/diagnoses/patient/${patientId}`,
    });
  }

  async createDiagnosis(data: Partial<Diagnosis>): Promise<ApiResponse<Diagnosis>> {
    return this.request<ApiResponse<Diagnosis>>({
      method: 'POST',
      url: '/diagnoses',
      data,
    });
  }

  async updateDiagnosis(id: string, data: Partial<Diagnosis>): Promise<ApiResponse<Diagnosis>> {
    return this.request<ApiResponse<Diagnosis>>({
      method: 'PUT',
      url: `/diagnoses/${id}`,
      data,
    });
  }

  async deleteDiagnosis(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/diagnoses/${id}`,
    });
  }

  async getDiagnosisStats(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>({
      method: 'GET',
      url: '/diagnoses/stats/overview',
    });
  }

  // ========== MEDICAMENTOS ==========

  async getMedications(params?: any): Promise<PaginatedResponse<Medication>> {
    return this.request<PaginatedResponse<Medication>>({
      method: 'GET',
      url: '/medications',
      params,
    });
  }

  async getMedication(id: string): Promise<ApiResponse<Medication>> {
    return this.request<ApiResponse<Medication>>({
      method: 'GET',
      url: `/medications/${id}`,
    });
  }

  async createMedication(data: Partial<Medication>): Promise<ApiResponse<Medication>> {
    return this.request<ApiResponse<Medication>>({
      method: 'POST',
      url: '/medications',
      data,
    });
  }

  async updateMedication(id: string, data: Partial<Medication>): Promise<ApiResponse<Medication>> {
    return this.request<ApiResponse<Medication>>({
      method: 'PUT',
      url: `/medications/${id}`,
      data,
    });
  }

  async deleteMedication(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/medications/${id}`,
    });
  }

  // ========== EVALUACIONES ==========

  async getAssessments(params?: any): Promise<PaginatedResponse<Assessment>> {
    return this.request<PaginatedResponse<Assessment>>({
      method: 'GET',
      url: '/assessments',
      params,
    });
  }

  async getAssessment(id: string): Promise<ApiResponse<Assessment>> {
    return this.request<ApiResponse<Assessment>>({
      method: 'GET',
      url: `/assessments/${id}`,
    });
  }

  async getPatientAssessments(patientId: string, params?: any): Promise<ApiResponse<Assessment[]>> {
    return this.request<ApiResponse<Assessment[]>>({
      method: 'GET',
      url: `/assessments/patient/${patientId}`,
      params,
    });
  }

  async getAssessmentTemplates(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>({
      method: 'GET',
      url: '/assessments/templates',
    });
  }

  async createAssessment(data: Partial<Assessment>): Promise<ApiResponse<Assessment>> {
    return this.request<ApiResponse<Assessment>>({
      method: 'POST',
      url: '/assessments',
      data,
    });
  }

  async updateAssessment(id: string, data: Partial<Assessment>): Promise<ApiResponse<Assessment>> {
    return this.request<ApiResponse<Assessment>>({
      method: 'PUT',
      url: `/assessments/${id}`,
      data,
    });
  }

  async deleteAssessment(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/assessments/${id}`,
    });
  }

  async calculateAssessment(id: string): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>({
      method: 'POST',
      url: `/assessments/${id}/calculate`,
    });
  }

  async getAssessmentStats(patientId: string): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>({
      method: 'GET',
      url: `/assessments/stats/patient/${patientId}`,
    });
  }

  // ========== PAGOS ==========

  async getPayments(params?: any): Promise<PaginatedResponse<Payment>> {
    return this.request<PaginatedResponse<Payment>>({
      method: 'GET',
      url: '/payments',
      params,
    });
  }

  async getPayment(id: string): Promise<ApiResponse<Payment>> {
    return this.request<ApiResponse<Payment>>({
      method: 'GET',
      url: `/payments/${id}`,
    });
  }

  async createPayment(data: Partial<Payment>): Promise<ApiResponse<Payment>> {
    return this.request<ApiResponse<Payment>>({
      method: 'POST',
      url: '/payments',
      data,
    });
  }

  async updatePayment(id: string, data: Partial<Payment>): Promise<ApiResponse<Payment>> {
    return this.request<ApiResponse<Payment>>({
      method: 'PUT',
      url: `/payments/${id}`,
      data,
    });
  }

  async deletePayment(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/payments/${id}`,
    });
  }

  // ========== FACTURAS ==========

  async getInvoices(params?: any): Promise<PaginatedResponse<Invoice>> {
    return this.request<PaginatedResponse<Invoice>>({
      method: 'GET',
      url: '/invoices',
      params,
    });
  }

  async getInvoice(id: string): Promise<ApiResponse<Invoice>> {
    return this.request<ApiResponse<Invoice>>({
      method: 'GET',
      url: `/invoices/${id}`,
    });
  }

  async createInvoice(data: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return this.request<ApiResponse<Invoice>>({
      method: 'POST',
      url: '/invoices',
      data,
    });
  }

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return this.request<ApiResponse<Invoice>>({
      method: 'PUT',
      url: `/invoices/${id}`,
      data,
    });
  }

  async deleteInvoice(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>({
      method: 'DELETE',
      url: `/invoices/${id}`,
    });
  }

  // ========== INTELIGENCIA ARTIFICIAL ==========

  async chatWithAI(data: AIRequest): Promise<ApiResponse<AIResponse>> {
    return this.request<ApiResponse<AIResponse>>({
      method: 'POST',
      url: '/ai/chat',
      data,
    });
  }

  // ========== DASHBOARD ==========

  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>({
      method: 'GET',
      url: '/dashboard/stats',
    });
  }

  // ========== UTILIDADES ==========

  getCurrentToken(): string | null {
    return this.getToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async refreshToken(): Promise<void> {
    const response = await this.request<ApiResponse<{ token: string }>>({
      method: 'POST',
      url: '/auth/refresh',
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();
export default apiClient;