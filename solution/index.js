module.exports = function (Homework) {
    function promisify(f) {
        return function (...args) { 
          return new Promise((resolve) => {
            args.push((res) => {resolve(res)});
            f.apply(this, args);
          })
        }
    }

    return (asyncArray, fn, initialValue, cb) => {
        const lengthPromise = promisify(asyncArray.length);
        const fnPromise = promisify(fn);
        const getPromise = promisify(asyncArray.get);
        const addPromise = promisify(Homework.add);
        const lessPromise = promisify(Homework.less);
    
        let length = await lengthPromise();
    
        let acc = initialValue;
        
        let i = 0;
    
        while (await lessPromise(i, length)) {
            const curr = await getPromise(i);
            acc = await fnPromise(acc, curr, i, asyncArray);
            i = await addPromise(i, 1);
        }
    
        cb(res);
    }
}