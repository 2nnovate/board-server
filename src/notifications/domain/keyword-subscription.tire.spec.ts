import { KeywordSubscriptionTrie } from './keyword-subscription.trie';

describe('KeywordSubscriptionTrie', () => {
    let trie: KeywordSubscriptionTrie;

    beforeEach(() => {
        trie = new KeywordSubscriptionTrie();
    });

    describe('addKeyword', () => {
      describe('when keyword added', () => {
        it('root should have children', () => {
          trie.addKeyword('test', 'subscriber1');
          expect(trie.root.children.size).toBe(1);
        });
      });

      describe('when duplicate keyword registration', () => {
        it('should not have duplicate subscriber', () => {
          trie.addKeyword('test', 'subscriber1');
          trie.addKeyword('test', 'subscriber1');

          let current = trie.root;
          do {
            const firstKey = current.children.keys().next().value;
            current = current.children.get(firstKey);
          } while (current.children.size > 0);
          expect(current.subscribers.size).toBe(1);
        });
      });

      describe('when keyword added by different subscriber', () => {
        it('should have all subscribers', () => {
          trie.addKeyword('test', 'subscriber1');
          trie.addKeyword('test', 'subscriber2');

          let current = trie.root;
          do {
            const firstKey = current.children.keys().next().value;
            current = current.children.get(firstKey);
          } while (current.children.size > 0);
          expect(current.subscribers.size).toBe(2);
        });
      });
    });

    describe('findKeywordSubscribers', () => {
      beforeEach(() => {
        trie.addKeyword('개발', '홍길동');
        trie.addKeyword('AI', '김철수');
        trie.addKeyword('원티드랩', '이영희');
      });

      describe('when text has not matched keywords', () => {
        it('should return empty array', () => {
          // Given
          const text = 'test';
          
          // When
          const result = trie.findKeywordSubscribers(text);
          
          // Then
          expect(result).toEqual([]);
        });
      });

      describe('when text has matched keywords', () => {
        it('should return empty array', () => {
          // Given
          const text = '원티드랩에서 Node.js 개발자를 찾고있습니다.';
          
          // When
          const result = trie.findKeywordSubscribers(text);
          
          // Then
          expect(result).toEqual(['이영희', '홍길동']);
        });
      });
    });
});
 