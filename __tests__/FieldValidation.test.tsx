import {render, screen, fireEvent} from '@testing-library/react'
import FieldValidation from '@/components/FieldValidation'
import NumberValidation from '@/components/FieldValidation'

describe('NumberValidation', () => {
    it('returns validation object with false if value is a valid number', () => {
      const result = NumberValidation(42);
      expect(result).toEqual({ required: false });
    });
  
    it('returns validation object with true and message if value is not a valid number', () => {
      const result = NumberValidation("not a number");
      expect(result).toEqual({
        required: {
          value: true,
          message: "Please enter a valid numerical value"
        }
      });
    });
  
    it('returns validation object with true and message if value is 0', () => {
      const result = NumberValidation(0);
      expect(result).toEqual({
        required: {
          value: true,
          message: "Please enter a valid numerical value"
        }
      });
    });
  
    it('returns validation object with false if value is Infinity', () => {
      const result = NumberValidation(1/0);
      expect(result).toEqual({ required: false });
    });
  });

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