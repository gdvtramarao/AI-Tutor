import type { Language, Difficulty, LanguageSection, RoadmapSection } from './types';

export const LANGUAGES: Language[] = ['Python', 'JavaScript', 'Java', 'C++', 'C'];
export const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const AVATARS = ['🧑‍💻', '👨‍💻', '👩‍💻', '🤖', '👾', '🚀', '🧠', '💡', '🔥', '⚛️', '⚡️', '🌟'];

export const FOOTER_QUOTES = [
    { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { quote: "The only way to learn a new programming language is by writing programs in it.", author: "Brian Kernighan" },
    { quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" }
];

export const BEGINNER_SAMPLE_CODE: Record<Language, string[]> = {
  Python: [
    '# Print a welcome message\nprint("Hello, Python!")',
    '# Store a name in a variable\nname = "Alice"\nprint("My name is", name)',
    '# Simple addition\nx = 10\ny = 5\nprint(x + y)',
    '# Comments are useful!\nmessage = "This is a simple program."\nprint(message)',
    '# Multiplication\na = 7\nb = 3\nprint(a * b)',
    '# Store your favorite number\nfavorite_number = 8\nprint("My favorite number is:", favorite_number)'
  ],
  JavaScript: [
    '// Print a welcome message\nconsole.log("Hello, JavaScript!");',
    '// Store a language in a variable\nlet language = "JavaScript";\nconsole.log("I am learning " + language);',
    '// Simple subtraction\nconst num1 = 15;\nconst num2 = 5;\nconsole.log(num1 - num2);',
    '// Variables store data\nlet score = 100;\nconsole.log("Score:", score);',
    '// Combine two strings\nlet greeting = "Hi";\nlet user = "Bob";\nconsole.log(greeting + ", " + user);',
    'const year = 2024;\nconsole.log("The current year is", year);'
  ],
  Java: [
    'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}',
    'public class Main {\n  public static void main(String[] args) {\n    int myNumber = 42;\n    System.out.println(myNumber);\n  }\n}',
    'public class Main {\n  public static void main(String[] args) {\n    String text = "Learning Java";\n    System.out.println(text);\n  }\n}',
    'public class Main {\n  public static void main(String[] args) {\n    int a = 5;\n    int b = 2;\n    System.out.println(a * b);\n  }\n}'
  ],
  'C++': [
    '#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!";\n  return 0;\n}',
    '#include <iostream>\n\nint main() {\n  int score = 95;\n  std::cout << "Score: " << score;\n  return 0;\n}',
    '#include <iostream>\n#include <string>\n\nint main() {\n  std::string lang = "C++";\n  std::cout << "This is " << lang;\n  return 0;\n}',
    '#include <iostream>\n\nint main() {\n  // Simple math\n  std::cout << 100 - 25;\n  return 0;\n}'
  ],
  C: [
    '#include <stdio.h>\n\nint main() {\n  printf("Hello, C!\\n");\n  return 0;\n}',
    '#include <stdio.h>\n\nint main() {\n  int age = 30;\n  printf("Age: %d\\n", age);\n  return 0;\n}',
    '#include <stdio.h>\n\nint main() {\n  // Print the sum of two numbers\n  printf("%d\\n", 12 + 8);\n  return 0;\n}',
    '#include <stdio.h>\n\nint main() {\n  char initial = \'J\';\n  printf("Initial: %c\\n", initial);\n  return 0;\n}'
  ],
};


export const PLACEHOLDER_CODE: Record<Language, string> = {
  Python: '# Start coding here...',
  JavaScript: '// Start coding here...',
  Java: '// Start coding here...',
  'C++': '// Start coding here...',
  C: '// Start coding here...',
};

export const PYTHON_PATH_DATA: RoadmapSection[] = [
  {
    title: '1. Basics',
    items: [
      { id: 'py-basics-1', title: 'Hello World', code: '# Task: Write Python code to print "Hello, World!" to the console.', points: 5 },
      { id: 'py-basics-2', title: 'Variables & Data Types', code: '# Task: Create a variable `name` with the value "Alex" and a variable `age` with the value 25.\n# Then, print a sentence combining them, like "Alex is 25 years old."', points: 5 },
      { id: 'py-basics-3', title: 'Input & Output', code: '# Task: Ask the user for their name using the input() function and then print a greeting, like "Hello, [name]!".', points: 5 },
      { id: 'py-basics-4', title: 'Operators', code: '# Task: Create two variables, `a` and `b`, with number values. \n# Print their sum, difference, and product.', points: 5 },
      { id: 'py-basics-5', title: 'Conditional Statements (if/else)', code: '# Task: Write a program that checks if a number `x` is positive, negative, or zero and prints the result.', points: 10 },
      { id: 'py-basics-6', title: 'Loops (for, while)', code: '# Task: Use a `for` loop to print the numbers from 1 to 5.\n# Then, use a `while` loop to do the same thing.', points: 10 },
    ],
  },
  {
    title: '2. Functions & Data Structures',
    items: [
        { id: 'py-ds-1', title: 'Functions', code: '# Task: Define a function `add` that takes two numbers as arguments and returns their sum.', points: 10 },
        { id: 'py-ds-2', title: 'Lists', code: '# Task: Create a list of your three favorite fruits. Add a fourth fruit to the list and then print the second fruit.', points: 10 },
        { id: 'py-ds-3', title: 'Tuples', code: '# Task: Create a tuple representing a point with x and y coordinates, for example (10, 20). Print the y-coordinate.', points: 10 },
        { id: 'py-ds-4', title: 'Sets', code: '# Task: Create a set with duplicate numbers, like {1, 2, 3, 3, 4}. Add a new number, 5, to the set and print the final set.', points: 10 },
        { id: 'py-ds-5', title: 'Dictionaries', code: '# Task: Create a dictionary for a person with keys "name" and "age". Print the person\'s name.', points: 10 },
    ],
  },
   {
    title: '3. Intermediate Python',
    items: [
        { id: 'py-int-1', title: 'String Manipulation', code: '# Task: Given the string s = "Hello, World!", print it in all uppercase and then print only the "World!" part.', points: 15 },
        { id: 'py-int-2', title: 'List Comprehensions', code: '# Task: Use a list comprehension to create a list of the squares of numbers from 0 to 9.', points: 15 },
        { id: 'py-int-3', title: 'File Handling', code: '# Task: Write Python code to create a file named "test.txt" and write the text "Hello from Python!" into it.', points: 15 },
        { id: 'py-int-4', title: 'Exception Handling', code: '# Task: Write a try-except block to handle a ZeroDivisionError when you try to divide a number by zero.', points: 15 },
        { id: 'py-int-5', title: 'Object-Oriented Programming', code: '# Task: Create a `Car` class with a constructor that sets the `brand` and `model`. \n# Create an instance of the Car class and print its brand.', points: 20},
    ],
  },
  {
      title: '4. Advanced Concepts',
      items: [
          { id: 'py-adv-1', title: 'Generators', code: '# Task: Create a generator function that yields the first `n` even numbers.', points: 25 },
          { id: 'py-adv-2', title: 'Decorators', code: '# Task: Write a decorator that prints "Function starting..." before a function is called and "Function finished." after.', points: 25 },
          { id: 'py-adv-3', title: 'Lambda Functions', code: '# Task: Create a lambda function that takes a number and returns its triple. Use it to triple the number 5.', points: 20 },
      ],
  },
  {
      title: '5. Problem Solving & Algorithms',
      items: [
          { id: 'py-algo-1', title: 'Binary Search', code: '# Task: Implement a binary search function that finds the index of a target in a sorted list.', points: 30 },
          { id: 'py-algo-2', title: 'Bubble Sort', code: '# Task: Implement the bubble sort algorithm to sort a list of numbers.', points: 30 },
          { id: 'py-algo-3', title: 'Recursion (Factorial)', code: '# Task: Write a recursive function to calculate the factorial of a number.', points: 25},
      ],
  },
];


export const PROBLEM_LIBRARY: LanguageSection[] = [
    {
        language: 'Python',
        snippets: [
            // Beginner
            { id: 1, title: 'Hello World', difficulty: 'Beginner', description: 'The classic first program.', code: `print("Hello, World!")` },
            { id: 2, title: 'Variables and Types', difficulty: 'Beginner', description: 'Working with basic data types.', code: `user_name = "Alex"\nuser_age = 25\nheight_meters = 1.75\nis_active = True\nprint(f"{user_name} is {user_age} years old.")` },
            { id: 3, title: 'User Input', difficulty: 'Beginner', description: 'Getting input from the user.', code: `name = input("Enter your name: ")\nprint(f"Hello, {name}!")` },
            { id: 4, title: 'Basic Arithmetic', difficulty: 'Beginner', description: 'Performing simple math operations.', code: `a = 10\nb = 5\nprint(f"Sum: {a + b}")\nprint(f"Difference: {a - b}")\nprint(f"Product: {a * b}")\nprint(f"Quotient: {a / b}")` },
            { id: 5, title: 'Conditional (if-else)', difficulty: 'Beginner', description: 'Making decisions in code.', code: `age = 18\nif age >= 18:\n    print("You are an adult.")\nelse:\n    print("You are a minor.")` },
            { id: 6, title: 'Basic List Operations', difficulty: 'Beginner', description: 'Creating and manipulating lists.', code: `numbers = [1, 2, 3, 4, 5]\nnumbers.append(6)\nprint(numbers[2])\nnumbers.remove(1)\nprint(f"Length: {len(numbers)}")` },
            { id: 7, title: 'For Loops', difficulty: 'Beginner', description: 'Iterating with for loops.', code: `for i in range(5):\n    print(f"Iteration {i}")` },
            { id: 8, title: 'While Loops', difficulty: 'Beginner', description: 'Repeating code with a condition.', code: `count = 0\nwhile count < 5:\n    print(f"Count is {count}")\n    count += 1` },
            // Intermediate
            { id: 9, title: 'Simple Function', difficulty: 'Intermediate', description: 'Defining and calling a function.', code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("User"))` },
            { id: 10, title: 'Function with Default Arguments', difficulty: 'Intermediate', description: 'Defining functions with optional parameters.', code: `def power(base, exponent=2):\n    return base ** exponent\n\nprint(power(3))      # 9\nprint(power(3, 3))   # 27` },
            { id: 11, title: 'Basic Dictionary', difficulty: 'Intermediate', description: 'Using key-value pairs.', code: `person = {"name": "Chris", "age": 25}\nprint(person["name"])\nperson["city"] = "New York"\nprint(person)` },
            { id: 12, title: 'String Slicing', difficulty: 'Intermediate', description: 'Extracting parts of a string.', code: `s = "Hello, World!"\nprint(s[0:5])   # Hello\nprint(s[7:])    # World!\nprint(s[::-1])  # !dlroW ,olleH` },
            { id: 13, title: 'File Handling (Read)', difficulty: 'Intermediate', description: 'Reading content from a file.', code: `# Assume 'example.txt' exists with some text\n# with open('example.txt', 'r') as f:\n#     content = f.read()\n#     print(content)` },
            { id: 14, title: 'File Handling (Write)', difficulty: 'Intermediate', description: 'Writing content to a file.', code: `with open('output.txt', 'w') as f:\n    f.write("This is a new line.\\n")\n    f.write("This is another line.\\n")` },
            { id: 15, title: 'List Comprehension', difficulty: 'Intermediate', description: 'A concise way to create lists.', code: `squares = [x**2 for x in range(10)]\nprint(squares)` },
            { id: 16, title: 'Exception Handling', difficulty: 'Intermediate', description: 'Gracefully handling errors.', code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")` },
            // Advanced
            { id: 17, title: 'Object-Oriented Programming (Class)', difficulty: 'Advanced', description: 'Creating a simple class.', code: `class Vehicle:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n\n    def display_info(self):\n        return f"{self.make} {self.model}"\n\ncar = Vehicle("Tesla", "Model 3")\nprint(car.display_info())` },
            { id: 18, title: 'Inheritance', difficulty: 'Advanced', description: 'Creating a subclass from a parent class.', code: `class Car(Vehicle):\n    def __init__(self, make, model, year):\n        super().__init__(make, model)\n        self.year = year\n\n    def display_info(self):\n        return f"{self.year} {self.make} {self.model}"` },
            { id: 19, title: 'Lambda Functions', difficulty: 'Advanced', description: 'Creating small anonymous functions.', code: `multiply = lambda x, y: x * y\nprint(multiply(5, 4)) # 20` },
            { id: 20, title: 'Map, Filter, Reduce', difficulty: 'Advanced', description: 'Functional programming tools.', code: `from functools import reduce\nnums = [1, 2, 3, 4]\nsquares = list(map(lambda x: x**2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\nsum_all = reduce(lambda x, y: x + y, nums)` },
            { id: 21, title: 'Decorators', difficulty: 'Advanced', description: 'Modifying function behavior.', code: `def my_decorator(func):\n    def wrapper():\n        print("Something is happening before the function is called.")\n        func()\n        print("Something is happening after the function is called.")\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print("Hello!")\n\nsay_hello()` },
            { id: 22, title: 'Generators', difficulty: 'Advanced', description: 'Creating iterators for large datasets.', code: `def countdown(num):\n    while num > 0:\n        yield num\n        num -= 1\n\nfor i in countdown(5):\n    print(i)` },
            { id: 23, title: 'Async/Await', difficulty: 'Advanced', description: 'Writing asynchronous code.', code: `import asyncio\n\nasync def main():\n    print('Hello')\n    await asyncio.sleep(1)\n    print('...World!')\n\n# asyncio.run(main()) # To run in a Python environment` },
            { id: 24, title: 'Working with JSON', difficulty: 'Advanced', description: 'Parsing and creating JSON data.', code: `import json\n\nperson_dict = {'name': 'Jane', 'age': 30, 'city': 'New York'}\nperson_json = json.dumps(person_dict)\nprint(person_json)\n\nparsed_dict = json.loads(person_json)\nprint(parsed_dict['name'])` },
            { id: 25, title: 'Using an External API', difficulty: 'Advanced', description: 'Fetching data from an API.', code: `import requests\n\n# response = requests.get('https://api.github.com')\n# print(f"Status Code: {response.status_code}")\n# print(response.json())` },
        ],
    },
    {
        language: 'JavaScript',
        snippets: [
             // Beginner
            { id: 1, title: 'Hello World', difficulty: 'Beginner', description: 'Printing to the browser console.', code: `console.log("Hello, World!");` },
            { id: 2, title: 'Variables (let, const)', difficulty: 'Beginner', description: 'Declaring variables.', code: `let userAge = 25;\nconst userName = "Sam";\nuserAge = 26;\nconsole.log(userName + " is " + userAge);` },
            { id: 3, title: 'Data Types', difficulty: 'Beginner', description: 'Exploring JS data types.', code: `let length = 16; // number\nlet lastName = "Johnson"; // string\nlet x = {firstName:"John", lastName:"Doe"}; // object\nlet isDone = false; // boolean` },
            { id: 4, title: 'Array Basics', difficulty: 'Beginner', description: 'Creating and accessing arrays.', code: `const fruits = ["Apple", "Banana", "Cherry"];\nconsole.log(fruits[1]);\nfruits.push("Orange");\nconsole.log(fruits.length);` },
            { id: 5, title: 'Object Basics', difficulty: 'Beginner', description: 'Creating and using objects.', code: `const person = {\n  firstName: "John",\n  lastName: "Doe",\n  age: 50\n};\nconsole.log(person.firstName);` },
            { id: 6, title: 'Basic Functions', difficulty: 'Beginner', description: 'Defining and calling a function.', code: `function greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("World"));` },
            { id: 7, title: 'Comparison Operators', difficulty: 'Beginner', description: 'Comparing values in JS.', code: `let x = 5;\nconsole.log(x == "5");  // true (loose equality)\nconsole.log(x === "5"); // false (strict equality)\nconsole.log(x > 3);     // true` },
            { id: 8, title: 'For Loop', difficulty: 'Beginner', description: 'Iterating through a sequence.', code: `for (let i = 0; i < 5; i++) {\n  console.log("The number is " + i);\n}` },
            // Intermediate
            { id: 9, title: 'Arrow Functions', difficulty: 'Intermediate', description: 'A modern way to write functions.', code: `const add = (a, b) => a + b;\nconsole.log(add(5, 3));` },
            { id: 10, title: 'DOM Manipulation', difficulty: 'Intermediate', description: 'Changing web page content.', code: `// In a browser context with an element with id="demo"\n// document.getElementById("demo").innerHTML = "Hello from JS!";` },
            { id: 11, title: 'Event Listeners', difficulty: 'Intermediate', description: 'Responding to user actions.', code: `// In a browser context with a button with id="myBtn"\n// document.getElementById("myBtn").addEventListener("click", () => {\n//   alert("Button clicked!");\n// });` },
            { id: 12, title: 'Template Literals', difficulty: 'Intermediate', description: 'Easier string formatting.', code: `const name = "Jane";\nconst age = 30;\nconst sentence = \`Her name is \${name} and she is \${age} years old.\`;\nconsole.log(sentence);` },
            { id: 13, title: 'Array Methods (map)', difficulty: 'Intermediate', description: 'Creating a new array from an existing one.', code: `const numbers = [1, 4, 9, 16];\nconst roots = numbers.map(Math.sqrt);\nconsole.log(roots); // [1, 2, 3, 4]` },
            { id: 14, title: 'Array Methods (filter)', difficulty: 'Intermediate', description: 'Creating a new array with filtered elements.', code: `const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction'];\nconst result = words.filter(word => word.length > 6);\nconsole.log(result);` },
            { id: 15, title: 'Array Destructuring', difficulty: 'Intermediate', description: 'Unpacking values from arrays.', code: `const [first, second, third] = ["Gold", "Silver", "Bronze"];\nconsole.log(second); // "Silver"` },
            { id: 16, title: 'Object Destructuring', difficulty: 'Intermediate', description: 'Unpacking values from objects.', code: `const person = { name: 'Sarah', age: 32 };\nconst { name, age } = person;\nconsole.log(name); // 'Sarah'` },
            // Advanced
            { id: 17, title: 'Promises', difficulty: 'Advanced', description: 'Handling asynchronous operations.', code: `const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Success!"), 1000);\n});\nmyPromise.then(result => console.log(result));` },
            { id: 18, title: 'Async/Await', difficulty: 'Advanced', description: 'Syntactic sugar for Promises.', code: `async function fetchData() {\n  // let response = await fetch('https://api.example.com/data');\n  // let data = await response.json();\n  // console.log(data);\n  console.log("Simulating API call");\n}\nfetchData();` },
            { id: 19, title: 'Classes', difficulty: 'Advanced', description: 'Creating objects using class syntax.', code: `class Car {\n  constructor(name) {\n    this.name = name;\n  }\n  present() {\n    return 'I have a ' + this.name;\n  }\n}\nconst myCar = new Car("Ford");\nconsole.log(myCar.present());` },
            { id: 20, title: 'Modules (Import/Export)', difficulty: 'Advanced', description: 'Organizing code into separate files.', code: `// In file: person.js\n// export const name = "Jesse";\n\n// In file: app.js\n// import { name } from "./person.js";\n// console.log(name);` },
            { id: 21, title: 'Spread Operator', difficulty: 'Advanced', description: 'Expanding iterables into individual elements.', code: `const arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5];\nconsole.log(arr2); // [1, 2, 3, 4, 5]` },
            { id: 22, title: 'Rest Parameters', difficulty: 'Advanced', description: 'Representing an indefinite number of arguments as an array.', code: `function sum(...args) {\n  return args.reduce((total, current) => total + current, 0);\n}\nconsole.log(sum(1, 2, 3, 4)); // 10` },
            { id: 23, 'title': 'Closures', 'difficulty': 'Advanced', 'description': 'A function with access to its outer scope, even after the outer function has returned.', 'code': `function outer() {\n  let count = 0;\n  function inner() {\n    count++;\n    console.log(count);\n  }\n  return inner;\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2` },
            { id: 24, title: 'Fetch API', difficulty: 'Advanced', description: 'Making network requests in the browser.', code: `// fetch('https://jsonplaceholder.typicode.com/todos/1')\n//   .then(response => response.json())\n//   .then(json => console.log(json));` },
            { id: 25, title: 'Local Storage', difficulty: 'Advanced', description: 'Storing data in the browser.', code: `// localStorage.setItem('user', 'John');\n// const user = localStorage.getItem('user');\n// console.log(user);` },
        ],
    },
    {
        language: 'Java',
        snippets: [
            // Beginner
            { id: 1, title: 'Hello World', difficulty: 'Beginner', description: 'The entry point of a Java application.', code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` },
            { id: 2, title: 'Variables and Data Types', difficulty: 'Beginner', description: 'Declaring and using variables.', code: `int myNum = 5;\nString myText = "Hello";\nfloat myFloat = 5.99f;\nchar myLetter = 'D';\nboolean myBool = true;` },
            { id: 3, title: 'Type Casting', difficulty: 'Beginner', description: 'Converting between data types.', code: `double myDouble = 9.78d;\nint myInt = (int) myDouble; // Manual casting: double to int\nSystem.out.println(myInt);` },
            { id: 4, title: 'Arrays', difficulty: 'Beginner', description: 'Working with fixed-size arrays.', code: `String[] cars = {"Volvo", "BMW", "Ford"};\nSystem.out.println(cars[0]);` },
            { id: 5, title: 'If...Else Statement', difficulty: 'Beginner', description: 'Conditional logic.', code: `int time = 20;\nif (time < 18) {\n  System.out.println("Good day.");\n} else {\n  System.out.println("Good evening.");\n}` },
            { id: 6, title: 'For Loop', difficulty: 'Beginner', description: 'Iterating a specific number of times.', code: `for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}` },
            { id: 7, title: 'Methods', difficulty: 'Beginner', description: 'Creating and calling methods.', code: `public class Main {\n    static void myMethod() {\n        System.out.println("I just got executed!");\n    }\n\n    public static void main(String[] args) {\n        myMethod();\n    }\n}` },
            { id: 8, title: 'Method Parameters', difficulty: 'Beginner', description: 'Passing data to methods.', code: `public class Main {\n  static void sayHello(String name) {\n    System.out.println("Hello " + name);\n  }\n\n  public static void main(String[] args) {\n    sayHello("Liam");\n  }\n}` },
            // Intermediate
            { id: 9, title: 'Basic Class and Object', difficulty: 'Intermediate', description: 'Fundamentals of OOP.', code: `public class MyClass {\n    int x = 5;\n\n    public static void main(String[] args) {\n        MyClass myObj = new MyClass();\n        System.out.println(myObj.x);\n    }\n}` },
            { id: 10, title: 'Constructors', difficulty: 'Intermediate', description: 'Initializing new objects.', code: `public class Car {\n  int modelYear;\n  String modelName;\n\n  public Car(int year, String name) {\n    modelYear = year;\n    modelName = name;\n  }\n}` },
            { id: 11, title: 'Method Overloading', difficulty: 'Intermediate', description: 'Multiple methods with the same name but different parameters.', code: `static int plusMethod(int x, int y) {\n  return x + y;\n}\n\nstatic double plusMethod(double x, double y) {\n  return x + y;\n}` },
            { id: 12, title: 'Inheritance', difficulty: 'Intermediate', description: 'Subclass inheriting from a superclass.', code: `class Vehicle { }\nclass Car extends Vehicle { }` },
            { id: 13, title: 'Polymorphism', difficulty: 'Intermediate', description: 'An object taking many forms.', code: `class Animal { public void sound() { System.out.println("Animal makes a sound"); } }\nclass Pig extends Animal { public void sound() { System.out.println("Pig says: wee wee"); } }` },
            { id: 14, title: 'Abstraction', difficulty: 'Intermediate', description: 'Hiding details and showing essential information.', code: `abstract class Animal {\n  public abstract void animalSound();\n  public void sleep() {\n    System.out.println("Zzz");\n  }\n}` },
            { id: 15, title: 'Interfaces', difficulty: 'Intermediate', description: 'A completely abstract class used to group related methods.', code: `interface Animal {\n  public void animalSound();\n  public void run();\n}` },
            { id: 16, title: 'Enums', difficulty: 'Intermediate', description: 'A special class that represents a group of constants.', code: `enum Level {\n  LOW,\n  MEDIUM,\n  HIGH\n}\nLevel myVar = Level.MEDIUM;` },
            // Advanced
            { id: 17, title: 'ArrayList', difficulty: 'Advanced', description: 'Using the dynamic ArrayList collection.', code: `import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> cars = new ArrayList<String>();\n        cars.add("Volvo");\n        cars.add("BMW");\n        System.out.println(cars.get(0));\n    }\n}` },
            { id: 18, title: 'HashMap', difficulty: 'Advanced', description: 'Storing key-value pairs.', code: `import java.util.HashMap;\n\npublic class Main {\n  public static void main(String[] args) {\n    HashMap<String, String> capitalCities = new HashMap<String, String>();\n    capitalCities.put("England", "London");\n    System.out.println(capitalCities.get("England"));\n  }\n}` },
            { id: 19, title: 'Exception Handling', difficulty: 'Advanced', description: 'Using try-catch blocks to handle errors.', code: `try {\n  int[] myNumbers = {1, 2, 3};\n  System.out.println(myNumbers[10]);\n} catch (Exception e) {\n  System.out.println("Something went wrong.");\n}` },
            { id: 20, title: 'Threads', difficulty: 'Advanced', description: 'Creating and running concurrent threads.', code: `public class MyThread extends Thread {\n  public void run() {\n    System.out.println("This code is running in a thread");\n  }\n}` },
            { id: 21, title: 'Lambda Expressions', difficulty: 'Advanced', description: 'A short block of code which takes in parameters and returns a value.', code: `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Integer> numbers = new ArrayList<Integer>();\n    numbers.add(5);\n    numbers.forEach( (n) -> { System.out.println(n); } );\n  }\n}` },
            { id: 22, title: 'File Reading', difficulty: 'Advanced', description: 'Reading data from a file.', code: `import java.io.File;\nimport java.util.Scanner;\n\n// try {\n//   File myObj = new File("filename.txt");\n//   Scanner myReader = new Scanner(myObj);\n// } catch (Exception e) { }` },
            { id: 23, title: 'Generics', difficulty: 'Advanced', description: 'Creating classes and methods that work with different data types.', code: `class MyGeneric<T> {\n  T obj;\n  void add(T obj) { this.obj = obj; }\n  T get() { return obj; }\n}` },
            { id: 24, title: 'Streams API', difficulty: 'Advanced', description: 'Performing aggregate operations on data.', code: `import java.util.Arrays;\nimport java.util.List;\n\nList<String> list = Arrays.asList("a", "b", "c");\nlist.stream().forEach(System.out::println);` },
            { id: 25, title: 'Regular Expressions', difficulty: 'Advanced', description: 'Finding or matching patterns in text.', code: `import java.util.regex.Matcher;\nimport java.util.regex.Pattern;\n\nPattern pattern = Pattern.compile("w3schools", Pattern.CASE_INSENSITIVE);\nMatcher matcher = pattern.matcher("Visit W3Schools!");\nboolean matchFound = matcher.find();` },
        ],
    },
    {
        language: 'C++',
        snippets: [
            // Beginner
            { id: 1, title: 'Hello World', difficulty: 'Beginner', description: 'Using iostream to print.', code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}` },
            { id: 2, title: 'Variables', difficulty: 'Beginner', description: 'Declaring different types of variables.', code: `int myNum = 15;\ndouble myFloatNum = 5.99;\nchar myLetter = 'D';\nstd::string myText = "Hello";\nbool myBoolean = true;` },
            { id: 3, title: 'User Input', difficulty: 'Beginner', description: 'Getting input with cin.', code: `#include <iostream>\n\nint main() {\n    int x;\n    std::cout << "Type a number: ";\n    std::cin >> x;\n    std::cout << "Your number is: " << x;\n    return 0;\n}` },
            { id: 4, title: 'If...Else', difficulty: 'Beginner', description: 'Making conditional statements.', code: `#include <iostream>\n\nint main() {\n    if (20 > 18) {\n        std::cout << "20 is greater than 18";\n    }\n    return 0;\n}` },
            { id: 5, title: 'For Loop', difficulty: 'Beginner', description: 'Executing a block of code a number of times.', code: `#include <iostream>\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        std::cout << i << "\\n";\n    }\n    return 0;\n}` },
            { id: 6, title: 'Basic Function', difficulty: 'Beginner', description: 'Defining and calling a function.', code: `#include <iostream>\n\nvoid myFunction() {\n    std::cout << "I just got executed!\\n";\n}\n\nint main() {\n    myFunction();\n    return 0;\n}` },
            { id: 7, title: 'Arrays', difficulty: 'Beginner', description: 'Storing multiple values in a single variable.', code: `#include <iostream>\n\nint main() {\n    std::string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};\n    std::cout << cars[0];\n    return 0;\n}` },
            { id: 8, title: 'References', difficulty: 'Beginner', description: 'Creating an alias for a variable.', code: `#include <iostream>\n\nint main() {\n    std::string food = "Pizza";\n    std::string &meal = food;\n    std::cout << meal; // Outputs Pizza\n    return 0;\n}` },
            // Intermediate
            { id: 9, title: 'Pointers', difficulty: 'Intermediate', description: 'Working with memory addresses.', code: `#include <iostream>\n\nint main() {\n    std::string food = "Pizza";\n    std::string* ptr = &food;\n    std::cout << *ptr << "\\n"; // Dereference\n    return 0;\n}` },
            { id: 10, title: 'Function Overloading', difficulty: 'Intermediate', description: 'Functions with the same name but different parameters.', code: `int plusFunc(int x, int y) { return x + y; }\ndouble plusFunc(double x, double y) { return x + y; }` },
            { id: 11, title: 'Simple Class', difficulty: 'Intermediate', description: 'A basic class with a method.', code: `#include <iostream>\n\nclass MyClass {\npublic:\n    void myMethod() {\n        std::cout << "Hello from MyClass!\\n";\n    }\n};\n\nint main() {\n    MyClass obj;\n    obj.myMethod();\n    return 0;\n}` },
            { id: 12, title: 'Class Constructor', difficulty: 'Intermediate', description: 'A special method for creating and initializing objects.', code: `class Car {\npublic:\n    std::string brand;\n    Car(std::string x) {\n        brand = x;\n    }\n};` },
            { id: 13, title: 'Access Specifiers', difficulty: 'Intermediate', description: 'Controlling access to class members with public, private, protected.', code: `class MyClass {\npublic:    // Public access specifier\n    int x;\nprivate:   // Private access specifier\n    int y;\n};` },
            { id: 14, title: 'Inheritance', difficulty: 'Intermediate', description: 'Making a new class from an existing one.', code: `class Vehicle { };\nclass Car: public Vehicle { };` },
            { id: 15, title: 'Polymorphism', difficulty: 'Intermediate', description: 'Using a single interface to represent different underlying forms.', code: `class Animal {\npublic:\n  void animalSound() { std::cout << "An animal sound\\n"; }\n};\n\nclass Pig : public Animal {\npublic:\n  void animalSound() { std::cout << "The pig says: wee wee\\n"; }\n};` },
            { id: 16, title: 'Vectors', difficulty: 'Intermediate', description: 'Using the std::vector dynamic array.', code: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {10, 20, 30};\n    numbers.push_back(40);\n    std::cout << numbers[1] << "\\n";\n    return 0;\n}` },
            // Advanced
            { id: 17, title: 'File I/O', difficulty: 'Advanced', description: 'Writing to and reading from files.', code: `#include <fstream>\n\n// std::ofstream MyFile("filename.txt");\n// MyFile << "Some text.";\n// MyFile.close();` },
            { id: 18, title: 'Exception Handling', difficulty: 'Advanced', description: 'Using try-throw-catch blocks.', code: `try {\n  int age = 15;\n  if (age < 18) {\n    throw 505;\n  }\n} catch (int myNum) {\n  std::cout << "Access denied - You must be at least 18 years old.\\n";\n}` },
            { id: 19, title: 'Templates', difficulty: 'Advanced', description: 'Writing generic functions and classes.', code: `template <typename T>\nT add(T a, T b) {\n    return a + b;\n}\n// int result = add<int>(5, 10);` },
            { id: 20, title: 'Smart Pointers (unique_ptr)', difficulty: 'Advanced', description: 'Pointers that handle their own memory deallocation.', code: `#include <memory>\n\n// std::unique_ptr<int> p1(new int(5));` },
            { id: 21, title: 'STL Algorithms (sort)', difficulty: 'Advanced', description: 'Using standard library algorithms.', code: `#include <vector>\n#include <algorithm>\n\n// std::vector<int> v = {4, 2, 5, 1, 3};\n// std::sort(v.begin(), v.end());` },
            { id: 22, title: 'Maps', difficulty: 'Advanced', description: 'Using std::map for key-value pairs.', code: `#include <map>\n#include <string>\n\n// std::map<std::string, int> myMap;\n// myMap["one"] = 1;` },
            { id: 23, title: 'Lambda Expressions', difficulty: 'Advanced', description: 'Creating anonymous functions.', code: `auto greet = []() { std::cout << "Hello, World!"; };\n// greet();` },
            { id: 24, title: 'Multithreading', difficulty: 'Advanced', description: 'Running multiple threads concurrently.', code: `#include <thread>\n\n// void task1() { /* ... */ }\n// std::thread t1(task1);` },
            { id: 25, title: 'Namespaces', difficulty: 'Advanced', description: 'Organizing code to prevent name collisions.', code: `namespace my_code {\n  void foo() {}\n}\n// my_code::foo();` },
        ],
    },
    {
        language: 'C',
        snippets: [
            // Beginner
            { id: 1, title: 'Hello World', difficulty: 'Beginner', description: 'Using stdio.h for output.', code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}` },
            { id: 2, title: 'Variables and Types', difficulty: 'Beginner', description: 'Basic data types in C.', code: `int myNum = 5;\nfloat myFloatNum = 5.99;\nchar myLetter = 'D';` },
            { id: 3, title: 'User Input', difficulty: 'Beginner', description: 'Reading input with scanf.', code: `#include <stdio.h>\n\nint main() {\n    int myNum;\n    printf("Type a number: ");\n    scanf("%d", &myNum);\n    printf("Your number is: %d\\n", myNum);\n    return 0;\n}` },
            { id: 4, title: 'Arrays', difficulty: 'Beginner', description: 'Declaring and accessing arrays.', code: `int myNumbers[] = {25, 50, 75, 100};\nprintf("%d", myNumbers[0]);` },
            { id: 5, title: 'If...Else', difficulty: 'Beginner', description: 'Conditional logic.', code: `if (20 > 18) {\n  printf("20 is greater than 18\\n");\n}` },
            { id: 6, title: 'For Loop', difficulty: 'Beginner', description: 'Repeating code a set number of times.', code: `int i;\nfor (i = 0; i < 5; i++) {\n  printf("%d\\n", i);\n}` },
            { id: 7, title: 'Functions', difficulty: 'Beginner', description: 'Creating and calling functions.', code: `#include <stdio.h>\n\nvoid myFunction() {\n    printf("I just got executed!\\n");\n}\n\nint main() {\n    myFunction();\n    return 0;\n}` },
            { id: 8, title: 'Function Parameters', difficulty: 'Beginner', description: 'Passing arguments to functions.', code: `void print_name(char name[]) {\n  printf("Hello %s\\n", name);\n}\n// print_name("John");` },
            // Intermediate
            { id: 9, title: 'Pointers', difficulty: 'Intermediate', description: 'Understanding pointers and memory.', code: `#include <stdio.h>\n\nint main() {\n    int myAge = 43;\n    int* ptr = &myAge;\n    printf("%p\\n", (void*)ptr);\n    printf("%d\\n", *ptr);\n    return 0;\n}` },
            { id: 10, title: 'Strings', difficulty: 'Intermediate', description: 'Working with character arrays as strings.', code: `char greetings[] = "Hello World!";\nprintf("%s", greetings);` },
            { id: 11, title: 'String Functions', difficulty: 'Intermediate', description: 'Using functions from string.h.', code: `#include <string.h>\n\nchar str1[20] = "Hello ";\nchar str2[] = "World!";\nstrcat(str1, str2); // Concatenates str2 to str1` },
            { id: 12, 'title': 'Structs', 'difficulty': 'Intermediate', 'description': 'Creating custom data structures.', 'code': `#include <stdio.h>\n\nstruct myStructure {\n    int myNum;\n    char myLetter;\n};\n\nint main() {\n    struct myStructure s1;\n    s1.myNum = 13;\n    s1.myLetter = 'B';\n    printf("My number: %d\\n", s1.myNum);\n    return 0;\n}` },
            { id: 13, title: 'Recursion', difficulty: 'Intermediate', description: 'A function that calls itself.', code: `int sum(int k) {\n  if (k > 0) {\n    return k + sum(k - 1);\n  } else {\n    return 0;\n  }\n}` },
            { id: 14, title: 'Pass by Reference', difficulty: 'Intermediate', description: 'Passing pointers to functions to modify variables.', code: `void swap(int* x, int* y) {\n  int temp = *x;\n  *x = *y;\n  *y = temp;\n}` },
            { id: 15, title: 'Preprocessor Directives', difficulty: 'Intermediate', description: 'Using #define and #include.', code: `#include <stdio.h>\n#define PI 3.14159` },
            { id: 16, title: 'Enums', difficulty: 'Intermediate', description: 'Creating named integer constants.', code: `enum Level {\n  LOW = 25,\n  MEDIUM = 50,\n  HIGH = 75\n};` },
            // Advanced
            { id: 17, title: 'File Handling (Write)', difficulty: 'Advanced', description: 'Writing data to a file.', code: `#include <stdio.h>\n\n// FILE *fptr;\n// fptr = fopen("filename.txt", "w");\n// fprintf(fptr, "Some text");\n// fclose(fptr);` },
            { id: 18, title: 'File Handling (Read)', difficulty: 'Advanced', description: 'Reading data from a file.', code: `#include <stdio.h>\n\n// FILE *fptr;\n// fptr = fopen("filename.txt", "r");\n// char myString[100];\n// fgets(myString, 100, fptr);` },
            { id: 19, title: 'Dynamic Memory Allocation (malloc)', difficulty: 'Advanced', description: 'Allocating memory at runtime.', code: `#include <stdlib.h>\n\n// int *arr;\n// arr = (int*) malloc(5 * sizeof(int));` },
            { id: 20, title: 'Dynamic Memory Allocation (free)', difficulty: 'Advanced', description: 'Deallocating memory.', code: `#include <stdlib.h>\n\n// int *arr = (int*) malloc(5 * sizeof(int));\n// free(arr);` },
            { id: 21, title: 'Unions', difficulty: 'Advanced', description: 'A memory location shared by several variables.', code: `union Data {\n   int i;\n   float f;\n   char str[20];\n};` },
            { id: 22, title: 'Function Pointers', difficulty: 'Advanced', description: 'Storing the address of a function.', code: `void myFunction() { }\nvoid (*fun_ptr)() = &myFunction;` },
            { id: 23, title: 'Static Variables', difficulty: 'Advanced', description: 'Variables that preserve their value between function calls.', code: `void counter() {\n  static int count = 0;\n  count++;\n  printf("%d\\n", count);\n}` },
            { id: 24, title: 'Command Line Arguments', difficulty: 'Advanced', description: 'Passing arguments to a program upon execution.', code: `#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf("Program name is: %s\\n", argv[0]);\n    return 0;\n}` },
            { id: 25, title: 'Bitwise Operators', difficulty: 'Advanced', description: 'Performing operations on individual bits.', code: `int a = 60;  // 0011 1100\nint b = 13;  // 0000 1101\nint c = a & b; // 12 (0000 1100)` },
        ],
    },
];