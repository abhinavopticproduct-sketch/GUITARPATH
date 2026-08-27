// Validation utilities

export const validators = {
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  password: (value: string): { valid: boolean; message?: string } => {
    if (value.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (value.length > 128) {
      return { valid: false, message: 'Password must be less than 128 characters' };
    }
    return { valid: true };
  },

  name: (value: string): { valid: boolean; message?: string } => {
    if (value.length < 2) {
      return { valid: false, message: 'Name must be at least 2 characters' };
    }
    if (value.length > 50) {
      return { valid: false, message: 'Name must be less than 50 characters' };
    }
    return { valid: true };
  },

  required: (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  number: (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  range: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },

  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
};

export const validateForm = (data: Record<string, any>, rules: Record<string, (value: any) => boolean | { valid: boolean; message?: string }>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let valid = true;

  for (const [field, validator] of Object.entries(rules)) {
    const result = validator(data[field]);
    
    if (typeof result === 'boolean') {
      if (!result) {
        errors[field] = `${field} is invalid`;
        valid = false;
      }
    } else {
      if (!result.valid) {
        errors[field] = result.message || `${field} is invalid`;
        valid = false;
      }
    }
  }

  return { valid, errors };
};
