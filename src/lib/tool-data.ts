export interface Tool {
  slug: string;
  title: string;
  id: string;
  description?: string;
  icon?: string;
}

const tools: Tool[] = [
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Create meaningful placeholder text with AI industry themes.',
    icon: 'FileText'
  },
  {
    id: 'text-difference-checker',
    slug: 'text-difference-checker',
    title: 'Text Difference Checker',
    description: 'Compare two texts and highlight the differences in real-time.',
    icon: 'Split'
  },
  {
    id: 'random-string-generator',
    slug: 'random-string-generator',
    title: 'Random String Generator',
    description: 'Generate secure random strings for passwords or keys.',
    icon: 'Hash'
  },
  {
    id: 'text-statistics-tool',
    slug: 'text-statistics-tool',
    title: 'Text Statistics Tool',
    description: 'Analyze word count, reading time, and sentiment with AI.',
    icon: 'BarChart'
  },
  {
    id: 'number-to-words-converter',
    slug: 'number-to-words-converter',
    title: 'Number to Words Converter',
    description: 'Convert large numbers into human-readable words instantly.',
    icon: 'Languages'
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test patterns and generate complex Regex with AI assistance.',
    icon: 'Code'
  },
  {
    id: 'text-scrambler',
    slug: 'text-scrambler',
    title: 'Text Scrambler',
    description: 'Protect sensitive information by scrambling or obscuring text.',
    icon: 'Shield'
  },
  {
    id: 'base-converter',
    slug: 'base-converter',
    title: 'Base Converter',
    description: 'Convert between Binary, Octal, Decimal, and Hex with AI logic.',
    icon: 'Binary'
  },
  {
    id: 'json-prettify-compress-toggle',
    slug: 'json-prettify-compress-toggle',
    title: 'JSON Formatter',
    description: 'Format, compress, and generate TypeScript schemas via AI.',
    icon: 'Braces'
  },
  {
    id: 'url-qr-code-generator',
    slug: 'url-qr-code-generator',
    title: 'URL to QR Code',
    description: 'Instantly generate high-quality QR codes for any URL.',
    icon: 'QrCode'
  },
  {
    id: 'image-optimizer',
    slug: 'image-optimizer',
    title: 'Image Optimizer',
    description: 'Reduce file size while maintaining professional image quality.',
    icon: 'Image'
  },
  {
    id: 'webp-converter',
    slug: 'webp-converter',
    title: 'WEBP Converter',
    description: 'Convert images to the modern, efficient WEBP format easily.',
    icon: 'Zap'
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    title: 'Image Converter',
    description: 'Switch between PNG, JPEG, and more with high fidelity.',
    icon: 'RefreshCcw'
  },
  {
    id: 'image-quality-compressor',
    slug: 'image-quality-compressor',
    title: 'Image Quality Preview',
    description: 'Compress images and see changes side-by-side in real-time.',
    icon: 'Eye'
  },
  {
    id: 'svg-converter',
    slug: 'svg-converter',
    title: 'Image to SVG',
    description: 'Vectorize your raster images for scalable web graphics.',
    icon: 'Feather'
  },
  {
    id: 'roman-urdu-typing-test',
    slug: 'roman-urdu-typing-test',
    title: 'Roman-Urdu Typing',
    description: 'Test your speed in Roman-Urdu with local Pothwari jokes.',
    icon: 'Keyboard'
  },
  {
    id: 'urdu-typing-test',
    slug: 'urdu-typing-test',
    title: 'Urdu Script Typing',
    description: 'Classic Urdu script typing test with AI accuracy feedback.',
    icon: 'PenTool'
  },
  {
    id: 'slang-typing-test',
    slug: 'slang-typing-test',
    title: 'Pakistani Slang Challenge',
    description: 'Fun typing test featuring colloquial Pakistani phrases.',
    icon: 'MessageCircle'
  },
  {
    id: 'english-typing-test',
    slug: 'english-typing-test',
    title: 'English Typing Pro',
    description: 'Refine your professional typing speed and accuracy.',
    icon: 'Trophy'
  },
  {
    id: 'voice-to-text',
    slug: 'voice-to-text',
    title: 'Voice to Text AI',
    description: 'Convert speech to text with AI grammar polish and summaries.',
    icon: 'Mic'
  },
];

// Sort tools by reversing the array, so latest added is first.
const sortedTools = [...tools].reverse();

export const getTools = (): Tool[] => {
  return sortedTools;
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find((tool) => tool.slug === slug);
};

export const getDummyToolContent = (title: string): string => `
  <p>The online tool "${title}" is not yet implemented.</p>
  <p>Please check back later or explore our other available tools.</p>
`;
