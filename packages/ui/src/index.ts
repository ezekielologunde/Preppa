// Theme context + accessibility hooks
export { ThemeProvider, useTheme } from './ThemeProvider.js';
export { useReducedMotion } from './useReducedMotion.js';

// Core primitives
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button.js';
export { Badge, type BadgeTone } from './Badge.js';
export { Tag } from './Tag.js';
export { Card } from './Card.js';
export { Avatar } from './Avatar.js';
export { Input, type InputProps } from './Input.js';
export { Stepper } from './Stepper.js';
export { Stars } from './Stars.js';

// Content components
export { ListingImage } from './ListingImage.js';
export { MealCard, type Meal } from './MealCard.js';
export { PrepperCard, type Kitchen } from './PrepperCard.js';

// Formatting helpers
export { formatMoney, formatMoneyShort, formatRating } from './format.js';

// Re-export tokens so consumers can `import { color, space } from '@preppa/ui'`
export * from '@preppa/theme';
