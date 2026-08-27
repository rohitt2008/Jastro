import { TemplateData } from '../types';

export const defaultTemplate: TemplateData = {
  id: 'tpl-1',
  name: 'Basic Landing Page',
  rootElementId: 'root',
  elements: {
    'root': {
      id: 'root',
      type: 'container',
      base: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }
      },
      overrides: {},
      children: ['header', 'hero', 'features', 'footer']
    },
    'header': {
      id: 'header',
      type: 'container',
      base: {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0'
        }
      },
      overrides: {
        mobile: {
          flexDirection: 'column',
          padding: '1rem'
        }
      },
      children: ['logo', 'nav']
    },
    'logo': {
      id: 'logo',
      type: 'text',
      base: {
        content: 'Acme Corp',
        style: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#2563eb'
        }
      },
      overrides: {}
    },
    'nav': {
      id: 'nav',
      type: 'text',
      base: {
        content: 'Home • About • Services • Contact',
        style: {
          gap: '1rem'
        }
      },
      overrides: {
        mobile: {
          marginTop: '1rem'
        }
      }
    },
    'hero': {
      id: 'hero',
      type: 'container',
      base: {
        style: {
          padding: '4rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }
      },
      overrides: {
        mobile: {
          padding: '2rem 1rem'
        }
      },
      children: ['hero-title', 'hero-subtitle', 'hero-cta']
    },
    'hero-title': {
      id: 'hero-title',
      type: 'text',
      base: {
        content: 'Build Better Websites',
        style: {
          fontSize: '3rem',
          fontWeight: '800',
          lineHeight: '1.2'
        }
      },
      overrides: {
        mobile: {
          fontSize: '2rem'
        }
      }
    },
    'hero-subtitle': {
      id: 'hero-subtitle',
      type: 'text',
      base: {
        content: 'The only scoped AI template editor you will ever need.',
        style: {
          fontSize: '1.25rem',
          color: '#64748b',
          maxWidth: '600px'
        }
      },
      overrides: {}
    },
    'hero-cta': {
      id: 'hero-cta',
      type: 'button',
      base: {
        content: 'Get Started',
        href: '#',
        style: {
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '0.375rem',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer'
        }
      },
      overrides: {}
    },
    'features': {
      id: 'features',
      type: 'container',
      base: {
        style: {
          display: 'flex',
          gap: '2rem',
          padding: '4rem 2rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }
      },
      overrides: {
        mobile: {
          flexDirection: 'column',
          padding: '2rem 1rem'
        }
      },
      children: ['feature-1', 'feature-2', 'feature-3']
    },
    'feature-1': {
      id: 'feature-1',
      type: 'text',
      base: {
        content: 'Safe Edits: Your layouts are isolated by viewport.',
        style: {
          flex: '1',
          minWidth: '250px',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }
      },
      overrides: {}
    },
    'feature-2': {
      id: 'feature-2',
      type: 'text',
      base: {
        content: 'AI Powered: Text to edit demo with deterministic outputs.',
        style: {
          flex: '1',
          minWidth: '250px',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }
      },
      overrides: {}
    },
    'feature-3': {
      id: 'feature-3',
      type: 'text',
      base: {
        content: 'Recoverable: Undo specific changes without losing everything else.',
        style: {
          flex: '1',
          minWidth: '250px',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }
      },
      overrides: {}
    },
    'footer': {
      id: 'footer',
      type: 'container',
      base: {
        style: {
          marginTop: 'auto',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#1e293b',
          color: '#94a3b8'
        }
      },
      overrides: {},
      children: ['footer-text']
    },
    'footer-text': {
      id: 'footer-text',
      type: 'text',
      base: {
        content: '© 2026 Acme Corp. All rights reserved.',
        style: {
          fontSize: '0.875rem'
        }
      },
      overrides: {}
    }
  }
};
