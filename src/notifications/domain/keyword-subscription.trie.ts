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
      let currentNode = this.root;
      for (const char of keyword) {
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
        return [];
    }

    private _searchMatchedKeywords(text: string): KeywordTrie[] {
      return [];
  }
}
