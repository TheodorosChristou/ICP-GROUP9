import {render, screen, fireEvent} from '@testing-library/react'
import FieldValidation from '@/components/FieldValidation'
import NumberValidation from '@/components/FieldValidation'

  describe('FieldValidation', () => {
    it('returns validation object with true and message if check is true', () => {
      const result = FieldValidation(true);
      expect(result).toEqual({
        required: {
          value: true,
          message: "Please enter a valid value"
        }
      });
    });
  
    it('returns validation object with false if check is false', () => {
      const result = FieldValidation(false);
      expect(result).toEqual({
        required: false
      });
    });
  });