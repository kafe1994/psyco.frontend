'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Stethoscope, Users, Calendar, FileText, BarChart3, Shield } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bienvenido al Sistema Psiquiátrico
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Gestiona tus consultas y pacientes de manera eficiente
            </p>
            <Link
              href="/dashboard"
              className="btn btn-primary btn-lg"
            >
              Ir al Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Stethoscope className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sistema Psiquiátrico
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para la gestión de consultas psiquiátricas, 
            historial clínico, diagnósticos y tratamientos especializados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="btn btn-primary btn-lg"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="btn btn-outline btn-lg"
            >
              Registrarse
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card">
            <div className="card-header">
              <Users className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="card-title">Gestión de Pacientes</h3>
            </div>
            <div className="card-content">
              <p className="card-description">
                Administra el historial completo de tus pacientes con información detallada 
                y seguimiento personalizado.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Calendar className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="card-title">Programación de Citas</h3>
            </div>
            <div className="card-content">
              <p className="card-description">
                Programa y gestiona citas de manera eficiente con recordatorios 
                automáticos y seguimiento de estados.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <FileText className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="card-title">Diagnósticos Especializados</h3>
            </div>
            <div className="card-content">
              <p className="card-description">
                Registra diagnósticos con códigos ICD-10, niveles de severidad 
                y seguimiento del progreso del tratamiento.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <BarChart3 className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="card-title">Evaluaciones Psicológicas</h3>
            </div>
            <div className="card-content">
              <p className="card-description">
                Implementa evaluaciones PHQ-9, GAD-7 y MoCA con interpretación 
                automática y seguimiento de resultados.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Shield className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="card-title">Seguridad y Privacidad</h3>
            </div>
            <div className="card-content">
              <p className="card-description">
                Datos protegidos con los más altos estándares de seguridad 
                y cumplimiento normativo médico.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Stethoscope className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="card-title">Inteligencia Artificial</h3>
            </div>
            <div className="card-content">
              <p className="card-description">
                Asistente IA integrado para apoyo en diagnósticos y recomendaciones 
                de tratamiento basadas en evidencia.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card max-w-2xl mx-auto">
            <div className="card-content py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Únete a nuestra plataforma y mejora la atención de tus pacientes 
                con herramientas profesionales especializadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="btn btn-primary btn-lg"
                >
                  Crear Cuenta Gratis
                </Link>
                <Link
                  href="/login"
                  className="btn btn-outline btn-lg"
                >
                  Ya tengo cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}