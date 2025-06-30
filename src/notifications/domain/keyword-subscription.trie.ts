class KeywordTrie {
  children: Map<string, KeywordTrie> = new Map();
  isEndOfWord: boolean = false;
  keyword: string = '';
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
      currentNode.keyword = keyword;
      currentNode.subscribers.add(subscriber);
    }

    public findKeywordSubscribers(text: string): Map<string, Set<string>> {
        const words = text.split(' ');
        const subscribersByKeyword: Map<string, Set<string>> = new Map();
        for (const word of words) {
          const matchedKeywords = this._searchMatchedKeywords(word);
          if (!matchedKeywords.length) continue;

          matchedKeywords.forEach((keywordTrie: KeywordTrie) => {
            const existingSubscribers = subscribersByKeyword.get(keywordTrie.keyword);
            if (!existingSubscribers) {
              subscribersByKeyword.set(keywordTrie.keyword, new Set([...keywordTrie.subscribers]));
              return;
            }
            
            subscribersByKeyword.set(keywordTrie.keyword, new Set([...existingSubscribers, ...keywordTrie.subscribers]));
          });
        }

        return subscribersByKeyword;
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
