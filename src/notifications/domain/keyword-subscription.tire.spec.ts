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
    });
});
    