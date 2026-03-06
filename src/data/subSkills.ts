import type { SubSkill } from '@/types';

export const subSkillsDatabase: Record<string, SubSkill[]> = {
  React: [
    { name: 'Hooks', proficiency: 95 },
    { name: 'Context API', proficiency: 90 },
    { name: 'React Native', proficiency: 88 },
    { name: 'Server Components', proficiency: 85 },
    { name: 'Suspense', proficiency: 88 },
    { name: 'Custom Hooks', proficiency: 92 },
    { name: 'Memoization', proficiency: 87 },
  ],
  TypeScript: [
    { name: 'Generics', proficiency: 93 },
    { name: 'Type Guards', proficiency: 90 },
    { name: 'Utility Types', proficiency: 88 },
    { name: 'Interfaces', proficiency: 95 },
    { name: 'Decorators', proficiency: 82 },
    { name: 'Enums', proficiency: 90 },
  ],
  JavaScript: [
    { name: 'ES6+', proficiency: 97 },
    { name: 'Async/Await', proficiency: 95 },
    { name: 'Promises', proficiency: 93 },
    { name: 'Closures', proficiency: 90 },
    { name: 'Prototypes', proficiency: 85 },
    { name: 'Modules', proficiency: 92 },
  ],
  'Node.js': [
    { name: 'Express', proficiency: 90 },
    { name: 'REST APIs', proficiency: 95 },
    { name: 'Middleware', proficiency: 88 },
    { name: 'Authentication', proficiency: 92 },
    { name: 'Streaming', proficiency: 85 },
    { name: 'Event Loop', proficiency: 87 },
  ],
  'Next.js': [
    { name: 'App Router', proficiency: 90 },
    { name: 'SSR', proficiency: 93 },
    { name: 'SSG', proficiency: 92 },
    { name: 'API Routes', proficiency: 88 },
    { name: 'Image Optimization', proficiency: 85 },
    { name: 'Middleware', proficiency: 87 },
  ],
};
