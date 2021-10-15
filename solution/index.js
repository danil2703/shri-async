module.exports = function (Homework) {
    
    function promisify(f) {
        return function (...args) { 
          return new Promise((resolve) => {
            args.push((res) => {resolve(res)});
            f.apply(this, args);
          })
        }
    }

    return async (array, fn, initialValue, cb) => {
        const lengthPromise = promisify(array.length);
        const fnPromise = promisify(fn);
        const getPromise = promisify(array.get);
        const addPromise = promisify(Homework.add);
        const lessPromise = promisify(Homework.less);
    
        let length = await lengthPromise();
    
        let acc = initialValue;
        
        let i = 0;
    
        while (await lessPromise(i, length)) {
            const curr = await getPromise(i);
            acc = await fnPromise(acc, curr, i, array);
            i = await addPromise(i, 1);
        }
    
        cb(acc);
    }
}