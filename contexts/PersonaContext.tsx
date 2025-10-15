'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PersonaType, Persona, personas } from '@/types/personas';

interface PersonaContextType {
  currentPersona: Persona | null;
  setPersona: (personaId: PersonaType) => void;
  hasCapability: (capability: keyof Persona['capabilities']) => boolean;
  canAccessAgent: (agentId: string) => boolean;
  isPersonaSelected: boolean;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has a saved persona
    const savedPersonaId = localStorage.getItem('userPersona') as PersonaType;
    if (savedPersonaId && personas[savedPersonaId]) {
      setCurrentPersona(personas[savedPersonaId]);
    }
  }, []);

  const setPersona = (personaId: PersonaType) => {
    const persona = personas[personaId];
    if (persona) {
      setCurrentPersona(persona);
      localStorage.setItem('userPersona', personaId);
    }
  };

  const hasCapability = (capability: keyof Persona['capabilities']): boolean => {
    if (!currentPersona) return false;
    return currentPersona.capabilities[capability];
  };

  const canAccessAgent = (agentId: string): boolean => {
    if (!currentPersona) return false;
    return currentPersona.allowedAgents.includes(agentId);
  };

  if (!mounted) {
    return null;
  }

  return (
    <PersonaContext.Provider
      value={{
        currentPersona,
        setPersona,
        hasCapability,
        canAccessAgent,
        isPersonaSelected: currentPersona !== null,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
