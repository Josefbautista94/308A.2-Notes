////////////////////////
// The 'this' Keyword //
////////////////////////

const obj = {
    test: function () { // function declaration
        console.log(this) //In a regular function, this refers to the object that called the method — in this case, obj
    }
}

const obj2 = {
    test: () => { // arrow function 
        console.log(this)

    }
};

// ^^^^^^ 
// test: () => {}
// Declares an arrow function. Arrow functions do not have their own this. Instead, 
// they inherit it from the surrounding scope (e.g., global/window or enclosing function).
//  So this here is not obj2, it’s whatever this was outside of the object.

obj.test(); // the 'this' keyword will represent the current object calling the method
obj2.test(); // the 'this' keyword will NOT represent the current object calling the method

//////////////
// Classess //
//////////////

class Animal { //  class Animal {} Defines a blueprint for creating animals.
    constructor(eyes, legs, isAwake, isMoving) { //constructor(...) Method that runs when an object is created from the class.
        this.eyes = eyes, // this.eyes = eyes etc. Sets properties for the object being created.
            this.legs = legs,
            this.isAwake = isAwake,
            this.isMoving = isMoving
    }

    // These are methods inside the class:
    sleep() {
        this.isAwake = false;
    }
    wake() {
        this.isAwake = true;
    }
    sit() {
        this.isMoving = false;
    }
    walk() {
        this.isMoving = true;
    }
    speak(sound) { // speak(sound) logs the provided sound.        
        console.log(sound);
    }
}

const cat1 = new Animal(2, 4, true, false); // Creates a new Animal named cat1 with 2 eyes, 4 legs, is awake, and not moving.
const cat2 = new Animal(2, 4, false, false); // The same applies for cat2, dog1, and cow1.
const dog1 = new Animal(2, 4, true, true);
const cow1 = new Animal(2, 4, true, false);
console.log(cat1)
console.log(cat2)
console.log(dog1)
console.log(cow1)

/////////////////
// Inheritance //
/////////////////

class Animal {
    constructor(eyes, legs, isAwake, isMoving) { // Calls the constructor of the parent
        this.eyes = eyes,
            this.legs = legs,
            this.isAwake = isAwake,
            this.isMoving = isMoving
    }
    sleep() {
        this.isAwake = false;
    }
    wake() {
        this.isAwake = true;
    }
    sit() {
        this.isMoving = false;
    }
    walk() {
        this.isMoving = true;
    }
    speak(sound) {
        console.log(sound);
    }
    toString(animal = 'Animal') { // Animal is used to provide a generic label when no specific type is provided
        return `This ${animal} has ${this.eyes} eyes and ${this.legs} legs. It ${this.isAwake ? 'is' : 'is not'} awake, and ${this.isMoving ? 'is' : 'is not'} moving.`;
    }
}

class Cat extends Animal { // extends means Cat is a child class of Animal.
    constructor(fur, isAwake, isMoving) {
        super(2, 4, isAwake, isMoving); // super(...) calls the parent's constructor.
        this.fur = fur; // this.fur = fur adds an extra property specific to Cat.        
    }
    speak() {
        super.speak("Meow..."); // super.speak() calls the parent’s speak() with a custom sound.
    }
    toString() {// toString() calls and customizes the parent method.
        return super.toString("Cat");
    }
}

//The same pattern applies to Dog and Cow, just with different sounds and property names (hair vs fur).

class Dog extends Animal {
    constructor(fur, isAwake, isMoving) {
        super(2, 4, isAwake, isMoving);
        this.fur = fur;
    }
    speak() {
        super.speak("Woof!");
    }
    toString() {
        return super.toString("Dog");
    }
}

class Cow extends Animal {
    constructor(hair, isAwake, isMoving) {
        super(2, 4, isAwake, isMoving);
        this.hair = hair;
    }
    speak() {
        super.speak("Moo.");
    }
    toString() {
        return super.toString("Cow");
    }
}

const cat1 = new Cat("Orange", true, false);
const cat2 = new Cat("Black and White", false, false);
const dog1 = new Dog("Gold", true, true);
const cow1 = new Cow("Brown", true, false);

//////////////////////////////////
// Encapsulation  & Abstraction //
//////////////////////////////////

class Learner {
    //# makes fields private, meaning they can't be accessed directly from outside the class.
    #grades = [];
    #name = {
        first: '',
        last: '',
    }
    #age;

    constructor(firstName, lastName, age) { // Sets up values using the constructor.        
        this.#name.first = firstName;
        this.#name.last = lastName;
        this.#age = age;
    }
    get name() { // Data abstraction, Getter method – lets you read the name without accessing private fields directly.
        return this.#name.first + ' ' + this.#name.last;
    }
    get age() {
        return this.#age;
    }
    get grades() {
        return this.#grades;
    }

    set grades(grade) { //This defines a setter method named grades.
        // change the grade to a Number, in case it was provided as a String
        grade = Number(grade); // Converts the input to a Number, in case someone passed a string like "90" instead of a number. ✅ "90" ➝ 90  ❌ "A+" ➝ NaN (Not a Number)
        // Only accept values between 0 and 100
        if (grade >= 0 && grade <= 100) {
            this.#grades.push(grade); // If it’s valid, adds the grade to the private #grades array.

        }
    }
    addGrades(...grades) { // Process Abstraction, Accepts a list or array of grades.

        grades = grades.flat(); // The .flat() method flattens nested arrays into a single-level array. Example : [80, [70, 90]].flat() ➝ [80, 70, 90]
        // This makes sure the method can handle both individual grades and arrays of grades.

        grades.forEach((grade) => { // Loops through each grade in the now-flattened grades array.
            grade = Number(grade); // Ensures that every grade is converted to a Number, just in case someone passed a string like "100".

            if (grade >= 0 && grade <= 100) {
                this.#grades.push(grade); // If the grade passed the validation, it's added to the private #grades array.
            }
        });
    }
    get average() {
        const arr = [...this.#grades]; // Creates a copy of the private #grades array. The spread operator ... makes a shallow clone so we don’t modify the original.
        arr.sort((a, b) => a - b).shift(); // First, arr.sort((a, b) => a - b) sorts grades in ascending order (e.g., 50, 75, 100). Then .shift() removes the first (lowest) grade from the array.

        return arr.reduce((a, b) => a + b) / arr.length; // arr.reduce((a, b) => a + b) adds up all the grades. / arr.length divides the total by how many grades are left.

    }
}

const learner1 = new Learner('Leeroy', 'Jenkins', 18);
console.log(learner1.age);
learner1.grades = 100;
learner1.addGrades(100, 75, [50]);
console.log(learner1.grades);
console.log(learner1.average);

//////////////////
// Polymorphism //
//////////////////

/*
Polymorphism is the ability of a single thing to take on many forms 
(poly = many; morph = change form). In the context of OOP and JavaScript, 
this means the ability for one object to have multiple realizations that 
each implement the same functionality, but work in differrent ways.

We can call the same method, speak(), on each of the intances of these 
Animal objects, but it will behave differently. This is an example of 
polymorphism - common functionality with unique behavior. toString() is 
similarly polymorphic.
*/

// Polymorphism = same method name, different behavior.
// All animal subclasses use speak() but each produces a unique sound.
// Same for toString().

///////////////////////////////////
// Static Properties and Methods //
///////////////////////////////////

///////// The older way /////////
const cat1 = new Cat('orange', true, false); //This only works if speak() was defined as a non-static method inside the class.
cat1.speak();
//////////////////////////////////

class Animal {
    static speak(sound) { // static means the method belongs to the class itself, not instances.
        console.log(sound);  //You call it like this: Animal.speak("some sound").
    }
}
//🔸 Child Classes Override It
class Cat extends Animal { //Cat inherits from Animal.
    static speak() { // It overrides speak() with its own version.
        super.speak("Meow..."); // It still uses super.speak(...) to call the original method from Animal, passing "Meow...".
    }
}
// Same idea for Dog and Cow:
class Dog extends Animal {
    static speak() {
        super.speak("Woof!");
    }
}

class Cow extends Animal {
    static speak() {
        super.speak("Moo.");
    }
}

/////// The newer way /////////
Cat.speak();  // This is the "newer" and more modern way — no need to create an object just to call a method.
Dog.speak();
//////////////////////////////////

class Grades {
    static getAverage(...grades) {
        const arr = [];

        grades = grades.flat(); // flattens nested arrays
        grades.forEach((grade) => {
            grade = Number(grade);

            if (grade >= 0 && grade <= 100) {
                arr.push(grade);
            }
        });

        arr.sort((a, b) => a - b).shift(); // arr.sort((a, b) => a - b).shift(); // removes lowest grade

        return arr.reduce((a, b) => a + b) / arr.length;
    }
}

console.log(Grades.getAverage(100, 75, [50]))

///////////////////////////////////
// Learner and Grades Refactored //
///////////////////////////////////

// This class models a student — with a name, age, and grades — but it delegates all 
// grade-related work to another class (NewGrades). This is a cleaner design using 
// encapsulation and separation of concerns.

class NewLearner { //Starts the definition of the learner class.
    #grades; // #grades: a reference to a NewGrades object.
    #name = { //#name: stores the first and last name.
        first: "",
        last: ""
    };
    #age; // #age: stores the learner’s age.

    // Sets the learner's name and age using the constructor.
    constructor(firstName, lastName, age) {
        //Initializes #grades as a new instance of the NewGrades class (starting with an empty grade list).
        this.#name.first = firstName;
        this.#name.last = lastName;
        this.#age = age;

        this.#grades = new NewGrades();
    }
    get name() { //A getter that returns the full name as a single string.
        return this.#name.first + " " + this.#name.last;
    }
    get age() { //A getter for the learner’s age.
        return this.#age;
    }
    addGrades(...grades) { // Passes the grades to the NewGrades object to handle. 
        // Uses the spread operator so it can accept individual grades or arrays.
        this.#grades.addGrades(grades);
    }
    get grades() {
        return this.#grades.grades; // Exposes the private grades via a getter from the NewGrades instance.
    }
    get average() { // Returns the average grade by calling the getter from NewGrades.
        return this.#grades.average;
    }
}

class NewGrades {
    #grades = []; // Private array to store grades.

    constructor(initialGrades) { // Allows initializing the class with some grades if desired.
        if (initialGrades) {
            this.addGrades(initialGrades); // Uses addGrades() to make sure validation is applied.
        }
    }
    //🔸 Static Utility Methods
    //These can be used without creating an instance — perfect for reusable logic.
    static getAverage(...grades) { // Takes grades as input.
        const arr = [];
        this.addToArray(arr, grades); //Adds valid grades to an array.

        return this.avgArray(arr); //Returns the average using another static helper.

    }
    static addToArray(arr, grades) {
        grades = grades.flat(); // Flattens nested arrays.
        grades.forEach((grade) => {
            grade = Number(grade); // Converts grades to numbers.

            if (grade >= 0 && grade <= 100) { // Validates each one (0–100).
                arr.push(grade); // Adds valid ones to the arr.
            }
        });
    }
    static avgArray(gradeArray) {
        const arr = [...gradeArray]; // Copies the array to avoid changing the original.
        arr.sort((a, b) => a - b).shift(); // Sorts the grades and removes the lowest (.shift()).

        return arr.reduce((a, b) => a + b) / arr.length; // Returns the average of the remaining values.
    }
    addGrades(...grades) { // Adds new grades to the instance’s private #grades array.
        NewGrades.addToArray(this.#grades, grades.flat());
    }
    get grades() { // Exposes the list of grades safely via a getter.
        return this.#grades;
    }
    get average() { // Returns the current average for this NewGrades instance.
        return NewGrades.avgArray(this.#grades);
    }
}

// //////////////
// Prototypes //
// //////////////
//creating a chain of classes
class Animal { } // Animal is the top (base) class.
class Cat extends Animal { } // Cat inherits from Animal.
class Tabby extends Cat { } // Tabby inherits from Cat.
class SpottedTabby extends Tabby { } // SpottedTabby inherits from Tabby.

const cat1 = new SpottedTabby();//  making a new object called cat1.
let object = cat1;
//Its prototype is SpottedTabby.prototype, which links up the prototype chain like this:

// cat1 → SpottedTabby.prototype 
//      → Tabby.prototype 
//      → Cat.prototype 
//      → Animal.prototype 
//      → Object.prototype 
//      → null

//🔸 Walk the Prototype Chain
do {
    object = Object.getPrototypeOf(object);
    console.log(object);
} while (object);

//🔸 What gets logged?

// Here’s a rough idea of what will be printed:

// SpottedTabby {}      // prototype of cat1
// Tabby {}             // prototype of SpottedTabby
// Cat {}               // prototype of Tabby
// Animal {}            // prototype of Cat
// {}                   // Object.prototype
// null                 // ends the loop (not printed)