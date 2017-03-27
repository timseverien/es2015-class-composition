import test from 'ava';

import Cat from '../lib/cat-mixin';

test('Mixin', t => {
  const cat = new Cat();

  t.is(cat.className, 'Cat');
  t.true(typeof cat.methodA === 'function');
  t.is(cat.methodA(), 'Cat.methodA');
  t.true(typeof cat.methodB === 'function');
  t.is(cat.methodB(), 'Hostile.methodB');
  t.true(typeof cat.methodC === 'function');
  t.is(cat.methodC(), 'Cat.methodC');
});
