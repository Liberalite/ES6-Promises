/**
 * @public Promise chaining example
 */

var A = () => {

    return new Promise(function(resolve, reject) {
        var string = 'A has finished';
            console.log(string);
            resolve(string);
    })
}

var B = () => {

    return new Promise(function(resolve, reject) {
        var string = 'B has finished';
            console.log(string);
            resolve(string);
    })
}

var C = () => {

    return new Promise(function(resolve, reject) {
        var string = 'C has finished';
        setTimeout(function() {
            console.log(string);
            resolve(string);
        }, 2000)
    })
}

var D = () => {

    return new Promise(function(resolve, reject) {
        var string = 'D has finished'
            console.log(string)
            resolve(string);
    })
}

/**
 * @method METHOD 1 - Ensures function C finishes before calling function D
 */
A()
.then(B)
.then(C)
.then(D)

// METHOD 1 OUTPUT
// A has finished
// B has finished
// C has finished
// D has finished

/**
 * @method METHOD 2 - Similar to first METHOD, C finishes before calling function D but we can play inside B's function scope
 */
A()
.then(B)
.then(function(result) { 
    console.log(`This is still B`)
    return C();
})
.then(D)

// METHOD 2 OUTPUT
// A has finished
// B has finished
// This is still B
// C has finished
// D has finished

/**
 * @method METHOD 3 - Does not ensure promises run in the same order
 */
Promise.all([A(),B(),C(),D()]);

// METHOD 3 OUTPUT
// A has finished
// B has finished
// D has finished
// C has finished
