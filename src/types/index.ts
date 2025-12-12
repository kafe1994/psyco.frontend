// Tipos principales del sistema psiquiátrico

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'M' | 'F' | 'O';
  phone?: string;
  email?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_history?: string;
  allergies?: string;
  medications?: string;
  created_at: string;
  updated_at: string;
  doctor_id: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  scheduled_date: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  appointment_type: 'initial' | 'follow_up' | 'emergency' | 'consultation';
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  patient_name?: string;
}

export interface Diagnosis {
  id: string;
  patient_id: string;
  doctor_id: string;
  diagnosis_code: string;
  diagnosis_name: string;
  diagnosis_text: string;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'resolved' | 'chronic';
  icd_code?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  patient_name?: string;
  doctor_name?: string;
}

export interface Medication {
  id: string;
  patient_id: string;
  doctor_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date?: string;
  status: 'active' | 'discontinued' | 'completed';
  prescribed_by: string;
  instructions?: string;
  side_effects?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  patient_name?: string;
  doctor_name?: string;
}

export interface Assessment {
  id: string;
  patient_id: string;
  doctor_id: string;
  assessment_type: 'phq9' | 'gad7' | 'moca' | 'custom';
  score?: number;
  max_score?: number;
  interpretation?: string;
  responses: Record<string, any>;
  notes?: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  patient_name?: string;
  doctor_name?: string;
}

export interface Payment {
  id: string;
  patient_id: string;
  appointment_id?: string;
  amount: number;
  currency: string;
  payment_method: 'cash' | 'card' | 'transfer' | 'insurance';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  paid_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  patient_name?: string;
}

export interface Invoice {
  id: string;
  patient_id: string;
  invoice_number: string;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  paid_at?: string;
  items: InvoiceItem[];
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  patient_name?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// Tipos para autenticación
export interface AuthToken {
  user_id: string;
  email: string;
  role: 'doctor' | 'admin';
  exp: number;
  iat: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'doctor' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
  error?: string;
}

// Tipos para respuestas de API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para parámetros de consulta
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Tipos para formularios
export interface PatientFormData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'M' | 'F' | 'O';
  phone?: string;
  email?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_history?: string;
  allergies?: string;
  medications?: string;
}

export interface AppointmentFormData {
  patient_id: string;
  scheduled_date: string;
  duration_minutes: number;
  appointment_type: 'initial' | 'follow_up' | 'emergency' | 'consultation';
  notes?: string;
}

export interface DiagnosisFormData {
  patient_id: string;
  diagnosis_code: string;
  diagnosis_name: string;
  diagnosis_text: string;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'resolved' | 'chronic';
  icd_code?: string;
  notes?: string;
  appointment_id?: string;
}

export interface MedicationFormData {
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date?: string;
  instructions?: string;
  side_effects?: string;
}

export interface AssessmentFormData {
  patient_id: string;
  assessment_type: 'phq9' | 'gad7' | 'moca' | 'custom';
  responses: Record<string, any>;
  score?: number;
  max_score?: number;
  interpretation?: string;
  notes?: string;
  appointment_id?: string;
}

// Tipos para estadísticas
export interface DashboardStats {
  total_patients: number;
  total_appointments: number;
  upcoming_appointments: number;
  completed_appointments: number;
  active_diagnoses: number;
  pending_payments: number;
}

export interface DiagnosisStats {
  total_diagnoses: number;
  active_diagnoses: number;
  resolved_diagnoses: number;
  chronic_diagnoses: number;
  mild_diagnoses: number;
  moderate_diagnoses: number;
  severe_diagnoses: number;
}

export interface AssessmentStats {
  assessment_type: string;
  total_assessments: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  last_assessment_date: string;
}

// Tipos para IA
export interface AIRequest {
  prompt: string;
  context?: string;
  type: 'diagnosis' | 'treatment' | 'assessment' | 'general';
}

export interface AIResponse {
  response: string;
  confidence?: number;
  suggestions?: string[];
  warnings?: string[];
}

// Tipos para errores
export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse extends ApiResponse {
  errors?: ValidationError[];
  statusCode: number;
}

// Tipos para el contexto de autenticación
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}