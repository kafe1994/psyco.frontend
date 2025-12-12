'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import type { Appointment, QueryParams, PaginatedResponse } from '@/types';

// Hook para manejar citas
export function useAppointments(params?: QueryParams) {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchAppointments = async (newParams?: QueryParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAppointments(newParams || params);
      
      if (response.success) {
        setData(response.data || []);
        setPagination(response.pagination || pagination);
      } else {
        setError(response.error || 'Error al cargar citas');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchAppointments,
  };
}

// Hook para manejar una cita específica
export function useAppointment(id: string) {
  const [data, setData] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointment = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAppointment(id);
      
      if (response.success) {
        setData(response.data || null);
      } else {
        setError(response.error || 'Error al cargar cita');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar cita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchAppointment,
  };
}

// Hook para crear cita
export function useCreateAppointment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAppointment = async (data: Partial<Appointment>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.createAppointment(data);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al crear cita');
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear cita';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createAppointment,
    loading,
    error,
  };
}

// Hook para actualizar cita
export function useUpdateAppointment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAppointment = async (id: string, data: Partial<Appointment>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.updateAppointment(id, data);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al actualizar cita');
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar cita';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateAppointment,
    loading,
    error,
  };
}

// Hook para eliminar cita
export function useDeleteAppointment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAppointment = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.deleteAppointment(id);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al eliminar cita');
      }
      
      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar cita';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteAppointment,
    loading,
    error,
  };
}

// Hook para citas del día
export function useTodayAppointments() {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const today = new Date().toISOString().split('T')[0];
      const response = await apiClient.getAppointments({
        date: today,
        limit: 100,
      });
      
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || 'Error al cargar citas de hoy');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar citas de hoy');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayAppointments();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchTodayAppointments,
  };
}

// Hook para próximas citas
export function useUpcomingAppointments(limit = 10) {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const today = new Date().toISOString().split('T')[0];
      const response = await apiClient.getAppointments({
        date_from: today,
        status: 'scheduled',
        limit,
        sortBy: 'scheduled_date',
        sortOrder: 'asc',
      });
      
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || 'Error al cargar próximas citas');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar próximas citas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingAppointments();
  }, [limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchUpcomingAppointments,
  };
}