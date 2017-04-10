# Composing ES2015 Classes

Many programmers familiar with object-oriented programming swear by the principle _composition over inheritance_. With the long-awaited arrival of ES2015 (formerly known as ES6), JavaScript is equipped with syntax specifically to define classes.

Perhaps you have never heard of the principle. In object-oriented programming (OOP), we often extend one a base class with one other, inheriting the fields and methods of that base class. This is great for a tree-like object structure, where one class is a superset of one other:

```js
class Animal {
  // ...
}

class Cat extends Animal {
  // ...
}
class Dog extends Animal {
  // ...
}
```

In above example, `Animal` is the base class. `Cat` and `Dog` are both supersets of the `Animal` class. Much like branches spawning off a tree trunk.

Now imagine we’re building a game where the player lives in a world of animals and robots. Some of each are friends, others are hostile. A dog person like myself might say all cats are hostile creatures. We could create a class `HostileAnimal`, which extends `Animal`, to serve as a base class for `Cat`.

At some point we decide to add robots designed to harm humans. Naturally, we create a class `Robot`. We now have two classes that have similar properties in order to be hostile. Both `HostileAnimal` and `Robot` are able to `attack()`, for instance.

```js
class Animal {
  // ...
}

class HostileAnimal extends Animal {
  attack(target) {
    // ...
  }
}

class Cat extends HostileAnimal {
  // ...
}
class Dog extends Animal {
  // ...
}

class Robot {
  // Seems to be duplicate of HostileAnimal.attack()
  attack(target) {
    // ...
  }
}
```

This is where composition prevails over good old inheritance. Composition is much like a recipe for a pie. First we need ingredients; tiny bits of flavor we can mix together. The next step is to combine the ingredients. To bake a `Cat`, we would need a bit of `Animal` and a teaspoon of `Hostile`. We could even throw in a little `Mammel`, `Carnivore` or `Demonic` to better describe the `Cat`’s properties. But for now, let’s stick with the few ingredients from before.

## A Recap: ES2015 Class Syntax

If you haven’t got the chance to dive into ES2015 classes, or feel you don’t know everything about them, be sure to read Jeff Mott’s [Object-Oriented JavaScript — A Deep Dive into ES6 Classes](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/) before you continue.

Unfortunately, OOP in ES2015 quite limited in comparison to mature OOP languages. We only get classes, and those aren’t too comprehensive either. In a nutshell:

- `class Foo { ... }` describes a class named `Foo`
- `class Foo extends Bar { ... }` describes a class, `Foo`, that extends an other class, `Bar`

Within the class block, we can define properties of that class. For this article, we only need to understand constructors and methods:

- `constructor() { ... }` is a reserved function which is executed upon creation (`new Foo()`)
- `foo() { ... }` creates a method named `foo`

## How Other Languages Facilitate Composition

Many other OOP languages have features that aid in composing classes.

The most common feature is the **interface**. An interface to a class is similar to what a blueprint is to a building. They allow you to dictate what methods a class should contain. Some languages allow you to define properties in an interface as well. If the class doesn’t respect one of the blueprints, the compiler will raise an error.

```ts
interface Animal {
  walk();
}
interface Hostile {
  attack();
}

// If the attack() or walk() method is missing, the compiler raises an error
class Cat implements Animal, Hostile {
  attack() {
    // ...
  }

  walk() {
    // ...
  }
}
```

Sometimes you want to inherit methods from a parent class. For example, the `walk()` method shouldn’t be too different for `Cat`s and `Dog`s. Inheriting from multiple base classes gets a little trickier, and there are different way to do so.

Some OOP languages, like C++, Perl, Python and Scala, support **multiple inheritence** (MI). This is when a class can extend multiple classes. To illustrate, consider the following Python code:

```py
class Animal(object):
  def walk(self):
    # ...

class Hostile(object):
  def attack(self, target):
    # ...

class Dog(Animal):
  # ...

class Cat(Animal, Hostile):
  # ...

class Robot(Hostile):
  # ...

dave = Cat();
dave.walk();
dave.attack(target);
```

Other languages achieve something similar via **mixins**. The subtle difference is that instead of inheriting from a base class, you tell the subclass to copy methods from mixins. PHP, for example, uses traits, and in Ruby you can use modules for mixins. Here’s an example of PHP’s traits:

```php
class Animal {
  // ...
}

trait Hostile {
  // ...
}

class Dog extends Animal {
  // ...
}

class Cat extends Animal {
  use Hostile;
  // ...
}

class Robot {
  use Hostile;
  // ...
}
```

## Composing ES2015 Classes

Knowing that JavaScript isn’t a mature OOP language, is it possible to compose ES2015 classes?

ES2015 didn’t introduce `interface`s, so that’s a no go. Multiple Inheritence is out of the question too. Perhaps we can leverage JavaScript’s unique flexibility to somehow mimic mixins.

All examined strategies below are available on [GitHub](https://github.com/timseverien/es2015-class-composition).

### `Object.assign(ChildClass.prototype, Mixin...)`

Pre-ES2015 we used prototypes for inhertance. All functions have a `prototype` property. When creating an instance using `new MyFunction()`, `prototype` is copied to a property in the instance. When you try to access a property that isn’t in the instance, the JavaScript engine will try to look it up in the prototype object. To demonstrate, take a look at the following code:

```js
function MyFunction () {
  this.myOwnProperty = 1;
}
MyFunction.prototype.myProtoProperty = 2;

const myInstance = new MyFunction();

// logs "1"
console.log(myInstance.myOwnProperty);
// logs "2"
console.log(myInstance.myProtoProperty);

// logs "true", because "myOwnProperty" is a property of "myInstance"
console.log(myInstance.hasOwnProperty('myOwnProperty'));
// logs "false", because "myProtoProperty" isn’t a property of "myInstance", but "myInstance.__proto__"
console.log(myInstance.hasOwnProperty('myProtoProperty'));
```

These prototype objects can be created and modified on runtime. Initially, I tried to use classes for `Animal` and `Hostile`:

```js
class Animal {
  walk() {
    // ...
  }
}

class Dog {
  // ...
}

Object.assign(Dog.prototype, Object.create(Animal.prototype));
```

The above doesn’t work, because class methods are not enumerable. Practically, this means `Object.assign(...)` doesn’t copy methods from classes. One way to overcome this, is by constructing an object, manually copying each method:

```js
Object.assign(Dog.prototype, {
  walk: Animal.prototype.walk,
});
```

An other way is to ditch classes and use objects as mixins. A positive side-effect is that mixin objects cannot be used to create instances, making them solely to extend base classes.

```js
const Animal = {
  walk() {
    // ...
  },
};

const Hostile = {
  attack(target) {
    // ...
  },
};

class Cat {
  // ...
}

Object.assign(Cat.prototype, Animal, Hostile);
```

#### Pros:

- Mixins cannot be initialized

#### Cons:

- Requires an extra line of code
- Object.assign() is a little obscure

### Composing Objects in Constructors

With ES2015 classes, you can override the instance by returning an object in the constructor:

```js
class Answer {
  constructor(question) {
    return {
      answer: 42,
    };
  }
}

// { answer: 42 }
new Answer("Life, the universe, and everything");
```

We can leverage that feature to compose an object inside a class. Note that `Object.assign(...)` still doesn’t work well with classes as mixins, so I used objects here as well:

```js
const Animal = {
  walk() {
    // ...
  },
};

const Hostile = {
  attack(target) {
    // ...
  },
};

class Cat {
  constructor() {
    // Cat-specific properties and methods go here
    // ...

    return Object.assign(
      {},
      Animal,
      Hostile,
      this
    );
  }
}
```

Since `this` refers to a class in above context, `Object.assign(..., this)` doesn’t copy the methods of `Cat`. Instead, you will have to set fields and methods on `this` explicitly in order for `Object.assign()` to apply those, like so:

```js
class Cat {
  constructor() {
    this.purr = () => {
      // ...
    };

    return Object.assign(
      {},
      Animal,
      Hostile,
      this
    );
  }
}
```

This approach is stupid. Because you’re returning a new object instead of an instance, it is essentially equivalent to:

```js
const createCat = () => Object.assign({}, Animal, Hostile, {
  purr() {
    // ...
  }
});

const thunder = createCat();
thunder.walk();
thunder.attack();
```

I think we can agree the latter is more readable.

#### Pros:

It works, I guess?

#### Cons:

- Very obscure
- Zero benefit from ES2015 class syntax
- Misuse of ES2015 classes

### Class Factory Function

This approach leverages JavaScript’s ability to define class at runtime.

First, we will need base classes. In our example, `Animal` and `Robot` serve as base classes. If you want to start from scratch, an empty class works, too.

```js
class Animal {
  // ...
}

class Robot {
  // ...
}
```

Next we have to create a factory function that returns a new class that extends class `Base`, which is passed as a parameter. These are the mixins:

```js
const Hostile = (Base) => class Hostile extends Base {
  // ...
};
```

Now we can pass any class to the `Hostile` function which will return a new class combining `Hostile` and whatever class we passed to the function:

```js
class Dog extends Animal {
  // ...
}

class Cat extends Hostile(Animal) {
  // ...
}

class HostileRobot extends Hostile(Robot) {
  // ...
}
```

We could pipe through several classes to apply a set of mixins:

```js
class Cat extends Demonic(Hostile(Mammel(Animal))) {
  // ...
}
```

#### Pros:

- Easy to understand, because all information is in the class declaration header

#### Cons:

- Creating classes at runtime might impact startup performance and/or memory
- You must define a base class, even if it’s empty, as mixins must extend another class

## Conclusion

When I decided to research this topic and write an article about it, I expected applying the principle would be easier, given JavaScript’s flexibility to alter objects at runtime. Because the class syntax make methods non-enumerable, it was a lot harder than I initially thought.

The last approach, using factory functions, wins over any other approach I tried. It’s most readable that requires just a minor change in how you define classes. Alternatively, you can ditch the class syntax altogether and stick with good old plain objects. Whether you’re using classes or objects, I would recommend keeping an extra eye on memory usage.

I think it’s safe to conclude JavaScript isn’t designed to be an object-oriented language. If you want to write web applications full-blown object-oriented style, you should consider TypeScript or an other language that compiles to JavaScript, because JavaScript isn’t that language. If, for any reason, you want to use ES2015 classes, factory function mixins (the last approach) seems like the least suboptimal way.

Are you going to use either of above approaches in your projects? Did you find better approaches? Let us know in the comments!
