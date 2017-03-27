import test from 'ava';

import Animal from '../lib/base/animal';
import Hostile from '../lib/base/hostile';

import CatConstructor from '../lib/cat-constructor';
import CatConstructorObject from '../lib/cat-constructor-object';

// Just like Object.assign() with classes, prototypes are hard to read
test('Constructor', t => {
  const cat = new CatConstructor();

  t.false(cat instanceof Animal);
  t.false(cat instanceof Hostile);

  t.is(cat.className, 'Cat');
  t.true(typeof cat.methodA === 'function');
  t.is(cat.methodA(), 'Cat.methodA');
  t.false(typeof cat.methodB === 'function');
  t.true(typeof cat.methodC === 'function');
  t.is(cat.methodC(), 'Cat.methodC');
});

test('Constructor object', t => {
  const cat = new CatConstructorObject();

  t.is(cat.className, 'Cat');
  t.true(typeof cat.methodA === 'function');
  t.is(cat.methodA(), 'Cat.methodA');
  t.true(typeof cat.methodB === 'function');
  t.is(cat.methodB(), 'Hostile.methodB');
  t.true(typeof cat.methodC === 'function');
  t.is(cat.methodC(), 'Cat.methodC');
});
