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
      this._root.children.set('test', new KeywordTrie());
    }

    public findKeywordSubscribers(text: string): string[] {
        return [];
    }

    private _searchMatchedKeywords(text: string): KeywordTrie[] {
      return [];
  }
}
