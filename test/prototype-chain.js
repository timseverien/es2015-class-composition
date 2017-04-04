import test from 'ava';

import Animal from '../lib/base/animal';
import Hostile from '../lib/base/hostile';

import CatPrototypeChain from '../lib/cat-prototype-chain';
import CatPrototypeChainObject from '../lib/cat-prototype-chain-object';

test('Object.setPrototypeOf(class, baseClass.prototype)', t => {
  const cat = new CatPrototypeChain();

  t.false(cat instanceof Animal);
  t.false(cat instanceof Hostile);

  t.is(cat.className, 'Cat');
  t.true(typeof cat.methodA === 'function');
  t.is(cat.methodA(), 'Cat.methodA');
  t.false(typeof cat.methodB === 'function');
  t.true(typeof cat.methodC === 'function');
  t.is(cat.methodC(), 'Cat.methodC');
});

test('Object.setPrototypeOf(class, baseObject)', t => {
  const cat = new CatPrototypeChainObject();

  t.is(cat.className, 'Cat');
  t.true(typeof cat.methodA === 'function');
  t.is(cat.methodA(), 'Cat.methodA');
  t.false(typeof cat.methodB === 'function');
  t.true(typeof cat.methodC === 'function');
  t.is(cat.methodC(), 'Cat.methodC');
});
