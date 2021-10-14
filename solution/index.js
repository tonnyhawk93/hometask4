module.exports = function (Homework) {
    const {add} = Homework;
    function promisify(fn, ...args) {
        return new Promise(resolve => {fn(...args, resolve)});
    }
    async function asyncRecursion(length, acc, currentIndex, arr, fn) {
        if(currentIndex === length) return acc; 

        let currentValue = await promisify(arr.get, currentIndex);
        let result = await promisify(fn, acc, currentValue, currentIndex, arr);  
        let nexIndex = await promisify(add, currentIndex, 1)     
        return await asyncRecursion(length, result, nexIndex, arr, fn)
    }
    return (array, fn, initialValue, cb) => {        
        promisify(array.length)
        .then(length => {
            asyncRecursion(length, initialValue, 0, array, fn)
            .then(cb);            
        })
    }
}