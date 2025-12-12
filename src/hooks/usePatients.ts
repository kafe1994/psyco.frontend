'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import type { Patient, QueryParams, PaginatedResponse } from '@/types';

// Hook para manejar pacientes
export function usePatients(params?: QueryParams) {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchPatients = async (newParams?: QueryParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getPatients(newParams || params);
      
      if (response.success) {
        setData(response.data || []);
        setPagination(response.pagination || pagination);
      } else {
        setError(response.error || 'Error al cargar pacientes');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchPatients,
  };
}

// Hook para manejar un paciente específico
export function usePatient(id: string) {
  const [data, setData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getPatient(id);
      
      if (response.success) {
        setData(response.data || null);
      } else {
        setError(response.error || 'Error al cargar paciente');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar paciente');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchPatient,
  };
}

// Hook para crear paciente
export function useCreatePatient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPatient = async (data: Partial<Patient>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.createPatient(data);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al crear paciente');
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear paciente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createPatient,
    loading,
    error,
  };
}

// Hook para actualizar paciente
export function useUpdatePatient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePatient = async (id: string, data: Partial<Patient>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.updatePatient(id, data);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al actualizar paciente');
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar paciente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePatient,
    loading,
    error,
  };
}

// Hook para eliminar paciente
export function useDeletePatient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePatient = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.deletePatient(id);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al eliminar paciente');
      }
      
      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar paciente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    deletePatient,
    loading,
    error,
  };
}