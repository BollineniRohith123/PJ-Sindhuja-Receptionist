
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  helperText,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
    value ? options.find(option => option.value === value) : undefined
  );
  
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected option if value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(options.find(option => option.value === value));
    }
  }, [value, options]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setIsFocused(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      toggleDropdown();
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const currentIndex = selectedOption 
        ? options.findIndex(o => o.value === selectedOption.value) 
        : -1;
      const nextIndex = (currentIndex + 1) % options.length;
      handleSelect(options[nextIndex]);
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      const currentIndex = selectedOption 
        ? options.findIndex(o => o.value === selectedOption.value) 
        : options.length;
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      handleSelect(options[prevIndex]);
    }
  };

  return (
    <div className="space-y-2 w-full" ref={selectRef}>
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

      <div className="dropdown-container">
        <button
          type="button"
          className={cn(
            "dropdown-field",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          data-state={isOpen ? "open" : "closed"}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <span className={cn(
            "flex-1 text-left truncate",
            !selectedOption && "text-muted-foreground"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "transform rotate-180"
            )} 
          />
        </button>

        <div
          className="dropdown-content"
          data-state={isOpen ? "open" : "closed"}
          role="listbox"
          hidden={!isOpen}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "dropdown-item",
                selectedOption?.value === option.value && "bg-accent"
              )}
              role="option"
              aria-selected={selectedOption?.value === option.value}
              tabIndex={-1}
              onClick={() => handleSelect(option)}
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-normal">{option.label}</div>
                  {option.description && (
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  )}
                </div>
                {selectedOption?.value === option.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
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
};

export default CustomSelect;
