
// A simple Levenshtein distance implementation
// This is used for "fuzzy" searching to allow for typos
const levenshtein = (s1: string, s2: string): number => {
  if (s1.length > s2.length) {
    [s1, s2] = [s2, s1];
  }

  const distances = Array.from({ length: s1.length + 1 }, (_, i) => i);

  for (let j = 0; j < s2.length; j++) {
    let previousDiagonal = distances[0];
    distances[0]++;

    for (let i = 0; i < s1.length; i++) {
      const previousHorizontal = distances[i + 1];
      if (s2[j] !== s1[i]) {
        distances[i + 1] = Math.min(
          distances[i] + 1,      // Deletion
          previousHorizontal + 1,      // Insertion
          previousDiagonal + 1   // Substitution
        );
      }
      previousDiagonal = previousHorizontal;
    }
  }

  return distances[s1.length];
};


interface SearchableItem {
  slug: string;
  title: string;
  id: string;
}

export const performSearch = <T extends SearchableItem>(query: string, items: T[]): T[] => {
  if (!query.trim()) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();
  const queryWords = lowerCaseQuery.split(' ').filter(w => w);

  const scoredItems = items.map(item => {
    const lowerCaseTitle = item.title.toLowerCase();
    let score = 0;

    // Rule 1: ID exact match (highest priority)
    if (item.id.toString() === lowerCaseQuery) {
        score += 200;
    }
    
    // Rule 2: Exact title match
    if (lowerCaseTitle === lowerCaseQuery) {
      score += 100;
    }

    // Rule 3: Starts-with bonus
    if (lowerCaseTitle.startsWith(lowerCaseQuery)) {
      score += 50;
    }

    // Rule 4: Word matching bonus
    const titleWords = lowerCaseTitle.split(' ');
    queryWords.forEach(qw => {
      if (titleWords.includes(qw)) {
        score += 20; // Full word match
      }
      titleWords.forEach(tw => {
        if (tw.startsWith(qw)) {
          score += 10; // Partial word match (starts with)
        }
      });
    });
    
    // Rule 5: Includes bonus (for partial matches within words)
    if (lowerCaseTitle.includes(lowerCaseQuery)) {
        score += 10;
    }

    // Rule 6: Levenshtein distance for fuzzy matching
    if (score < 50) { // Only apply fuzzy search if no strong matches were found
        const distance = levenshtein(lowerCaseTitle, lowerCaseQuery);
        const maxLen = Math.max(lowerCaseTitle.length, lowerCaseQuery.length);
        if (maxLen > 0) {
            const similarity = (maxLen - distance) / maxLen;
            if (similarity > 0.7) {
                score += similarity * 30;
            }
        }
    }

    return { item, score };
  });

  return scoredItems
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
};
