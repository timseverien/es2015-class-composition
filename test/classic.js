import test from 'ava';

import {
  Animal,
  Hostile,
  Cat
} from '../lib/cat-classic';

test('Classic', t => {
  const cat = new Cat();

  t.false(cat instanceof Animal);
  t.true(cat instanceof Hostile);

  t.is(cat.className, 'Cat');
  t.true(typeof cat.methodA === 'function');
  t.is(cat.methodA(), 'Cat.methodA');

  // Because Hostile doesn’t have methodB(), and prototypes only allow one base class, cat.methodB() is undefined
  t.false(typeof cat.methodB === 'function');

  t.true(typeof cat.methodC === 'function');
  t.is(cat.methodC(), 'Cat.methodC');
});
