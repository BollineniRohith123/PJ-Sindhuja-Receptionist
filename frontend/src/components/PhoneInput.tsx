
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  onValueChange?: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, label, helperText, error, onValueChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(props.value || '');
    const [isFocused, setIsFocused] = useState(false);

    // Format phone number as user types (XXX) XXX-XXXX
    const formatPhoneNumber = (value: string) => {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      
      // Don't format if empty
      if (!digits.length) return '';
      
      // Format based on length
      if (digits.length <= 3) {
        return digits;
      } else if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formattedValue = formatPhoneNumber(value);
      setInputValue(formattedValue);
      
      if (onValueChange) {
        // Pass only digits to parent component
        onValueChange(formattedValue.replace(/\D/g, ''));
      }
    };

    // If props.value changes, update internal state
    useEffect(() => {
      if (props.value !== undefined && props.value !== inputValue) {
        setInputValue(formatPhoneNumber(props.value.toString()));
      }
    }, [props.value]);

    return (
      <div className="phone-input space-y-2">
        {label && (
          <label 
            className={cn(
              "text-sm font-medium transition-all duration-200",
              isFocused ? "text-primary" : "text-muted-foreground",
              error && "text-destructive"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            type="tel"
            className={cn(
              "phone-input-field",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={14} // (123) 456-7890 is 14 characters
            ref={ref}
            {...props}
          />
        </div>
        
        {(helperText || error) && (
          <p className={cn(
            "text-xs transition-all duration-200",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
