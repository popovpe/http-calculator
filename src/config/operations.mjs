export default new Map([
    ['add', op => op[0] + op[1]],
    ['sub', op => op[0] - op[1]],
    ['mul', op => op[0] * op[1]],
    ['div', op => {
        if ( op[1] === 0) {
            throw new Error("Division by zero")
        } else {
            return op[0] / op[1];
        }
    }
],
]);
