class KeywordTrie {
  children: Map<string, KeywordTrie> = new Map();
  isEndOfWord: boolean = false;
  subscribers: Set<string> = new Set();
}

export class KeywordSubscriptionTrie {
    private _root: KeywordTrie;
    
    constructor() {
        this._root = new KeywordTrie();
    }

    get root(): KeywordTrie {
        return this._root;
    }

    public addKeyword(keyword: string, subscriber: string): void {
      const lowercaseKeyword = keyword.toLowerCase().trim();

      let currentNode = this.root;
      for (const char of lowercaseKeyword) {
        let childNode = currentNode.children.get(char);
        if (!childNode) {
          childNode = new KeywordTrie();
          currentNode.children.set(char, childNode);
        }

        currentNode = childNode;
      }

      currentNode.isEndOfWord = true;
      currentNode.subscribers.add(subscriber);
    }

    public findKeywordSubscribers(text: string): string[] {
        const words = text.split(' ');
        const subscribers: Set<string> = new Set();
        for (const word of words) {
          const matchedKeywords = this._searchMatchedKeywords(word);
          if (!matchedKeywords.length) continue;

          const currentSubscribers = matchedKeywords.flatMap(keyword => [...keyword.subscribers]);
          currentSubscribers.forEach(subscriber => subscribers.add(subscriber));
        }
        return Array.from(subscribers);
    }

    private _searchMatchedKeywords(word: string): KeywordTrie[] {
      const lowercaseWord = word.toLowerCase().trim();
      const matchedKeywords: KeywordTrie[] = [];

      let currentNode = this.root;
      for (const char of lowercaseWord) {
        const childNode = currentNode.children.get(char);
        if (!childNode) break;

        currentNode = childNode;
        if (!currentNode.isEndOfWord) continue;

        matchedKeywords.push(currentNode);
      }

      return matchedKeywords;
  }
}
