// xdescribe("First group of tests", () => {
//   xtest("Jest is working", () => {
//     expect(1).toBe(1);
//   });

//   function getNewId() {
//     return Math.random();
//   }

//   function getRandomId(min, max) {
//     return Math.floor(Math.random());
//   }

//   xtest("returns a random number", () => {
//     //Creates a new constant originalMath of type Math. Kind of clones it.
//     const originalMath = Object.create(global.Math);
//     //Creates a new constant mockMath of type Math. Kind of clones it.
//     const mockMath = Object.create(global.Math);
//     //Creates a mock function using the anonymous function jest provides so now our mockMath.random function will return our anonymous functions value when mockMath.random is called.
//     //Essentially assigns mockMath.random to take on the persona of our jest.fn anonymous function which constantly returns the value we pass
//     mockMath.random = jest.fn(() => 0.85);
//     //We then assign the global.Math object value to take on our mockMath object values
//     global.Math = mockMath;
//     //Then we define a new constant id to take on the value of our previously defined getNewId() which returns a "random" number which we know is now a constant value(0.85) because we created a mock function.
//     const id = getNewId();
//     //Assert our results are correct
//     expect(id).toBe(0.85);
//     //Reset global.Math to it's original state
//     global.Math = originalMath;
//   });

//   xtest("returns an integer : bool", () => {
//     const id = getRandomId();
//     expect(Number.isInteger(id)).toBe(true);
//   });

//   xtest("returns an integer : value", () => {
//     const id = getRandomId();
//     expect(id).toBe(Math.floor(id));
//   });

//   xtest("generates a number within a specified range", () => {
//     const id = getRandomId(10, 100);
//     expect(id).toBeLessThanOrEqual(100);
//     expect(id).toBeGreaterThanOrEqual(10);
//   });
// });

describe("Jest works", () => {
  test("Jest is working", () => {
    expect(1).toBe(1);
  });
});

describe("Returns a random number", () => {
  function getNewId() {
    return Math.random();
  }
  test("Returns a 'random' number from mock funtion", () => {
    //Creates a new constant originalMath of type Math. Kind of clones it.
    const originalMath = Object.create(global.Math);
    //Creates a new constant mockMath of type Math. Kind of clones it.
    const mockMath = Object.create(global.Math);
    //Creates a mock function using the anonymous function jest provides so now our mockMath.random function will return our anonymous functions value when mockMath.random is called.
    //Essentially assigns mockMath.random to take on the persona of our jest.fn anonymous function which constantly returns the value we pass
    mockMath.random = jest.fn(() => 0.85);
    //We then assign the global.Math object value to take on our mockMath object values
    global.Math = mockMath;
    //Then we define a new constant id to take on the value of our previously defined getNewId() which returns a "random" number which we know is now a constant value(0.85) because we created a mock function.
    const id = getNewId();
    //Assert our results are correct
    expect(id).toBe(0.85);
    //Reset global.Math to it's original state
    global.Math = originalMath;
  });
});

describe("Returns a random number - w/floor", () => {
  function getNewId() {
    return Math.floor(Math.random());
  }
  test("Math.floor called with mock data from mock function", () => {
    jest.spyOn(Math, "floor");
    const mockMath = Object.create(global.Math);
    const globalMath = Object.create(global.Math);
    mockMath.random = () => 0.75;
    global.Math = mockMath;
    getNewId();
    expect(Math.floor).toHaveBeenCalledWith(0.75);
    global.Math = globalMath;
  });
});

describe("returns an intger", () => {
  function getRandomId() {
    return Math.floor(Math.random());
  }
  test("returns an integer : bool", () => {
    const id = getRandomId();
    expect(Number.isInteger(id)).toBe(true);
  });

  test("returns an integer : value", () => {
    const id = getRandomId();
    expect(id).toBe(Math.floor(id));
  });
});

describe("Number is within range", () => {
  function getRandomId(min, max) {
    const output = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(output);
    return output;
  }
  test("returns a random number", () => {
    jest.spyOn(Math, "floor");
    const mockMath = Object.create(global.Math);
    const originalMath = Object.create(global.Math);
    mockMath.random = () => 0.75;
    global.Math = mockMath;
    const id = getRandomId(10, 100);
    expect(id).toBe(78);
    global.Math = originalMath;
  });
  test("generates a number within a specifc range", () => {
    const id = getRandomId(10, 100);
    expect(id).toBeLessThanOrEqual(100);
    expect(id).toBeGreaterThanOrEqual(10);
  });
  test("generates a number within range 100x", () => {
    for (let i = 0; i < 100; i++) {
      const id = getRandomId(10, 100);
      expect(id).toBeLessThanOrEqual(100);
      expect(id).toBeGreaterThanOrEqual(10);
      expect(id).not.toBeLessThan(10);
      expect(id).not.toBeGreaterThan(100);
    }
  });
  test("generates a number within a defined range ROBUST/Single assertion", () => {
    const min = 10;
    const max = 100;
    const range = [];
    for (let i = min; i < max + 1; i++) {
      range.push(i);
    }
    for (let i = 0; i < 100; i++) {
      const id = getRandomId(min, max);
      expect(range).toContain(id);
    }
  });
});

describe("The number is unique", () => {
  function getRandomId(min, max) {
    const output = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(output);
    return output;
  }
  function getNewId(min = 0, max = 0, ids = []) {
    let id;
    let a = [];
    do {
      id = Math.floor(Math.random() * (max - min + 1)) + min;
      if (a.indexOf(id) === -1) {
        a.push(id);
      }
      if (a.length === max - min + 1) {
        if (ids.indexOf(id) > -1) {
          return "failed";
        }
      }
    } while (ids.indexOf(id) > -1);
    return id;
  }
  const currentIds = [1, 2, 3, 4];
  test("generates a unique number", () => {
    const id = getRandomId();
    const index = currentIds.indexOf(id);
    expect(index).toBe(-1);
  });
  test("generates a unique number 1", () => {
    mockIds = [1, 2, 3, 4, 5];
    let id = getNewId(1, 5, mockIds);
    expect(id).toBe("failed");

    id = getNewId(1, 6, mockIds);
    expect(id).toBe(6);
  });
});
