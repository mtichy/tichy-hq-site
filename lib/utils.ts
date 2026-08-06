import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom type-scale tokens (`text-small`, etc.) must be registered as font-size
 * so they do not conflict with color utilities like `text-accent-foreground`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['small', 'regular', 'medium', 'large', 'xlarge', 'mega'],
        },
      ],
      leading: [
        {
          leading: ['small', 'regular', 'medium', 'large', 'xlarge', 'mega'],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
