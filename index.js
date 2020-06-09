this.registry = {}

const valueChange = (store, detail) => {
    let {key, newValue, prevValue} = detail;
    store.onValueChange(key, newValue, prevValue)
    // any code that should happen on all changes
    // console.log(`${key} has changed to ${newValue} from ${prevValue}`);
}


// const onValueChange = (cb) => {
//     this.current.onValueChange = cb;
// }

const open = (name, cache) => {
    if (!this.registry[name]) {
        this.registry[name] = new Store(name)
        document.addEventListener('registry-update', (e) => {
            valueChange(this.registry[name], e.detail);
        })
    }

    // only expose the storage methods once a store is opened
    return this.registry[name]
}

// const set = (key, value) => {
//     console.log(this)
//     if (this.current) {
//         let detail = {key: key, prevValue: this.current.data[key], newValue: value}
//         this.current.data[key] = value
//
//         if (detail.prevValue) {
//             let e = new CustomEvent('registry-update', {detail: detail})
//             document.dispatchEvent(e)
//         }
//
//     } else {
//         // how did you even get here?!
//         throw new Error('No registry open. Run registry.open first');
//     }
// }
//


class Store {
    data = {};
    name;
    onValueChange = () => {};

    constructor(name) {
        this.name = name;
    }

    get(key) {
        if (this.data[key]) {
            return this.data[key]
        } else {
            return undefined
        }
    }

    set(key, value) {
        let detail = {key: key, prevValue: this.data[key], newValue: value}
        this.data[key] = value

        // if (detail.prevValue) {
            let e = new CustomEvent('registry-update', {detail: detail})
            document.dispatchEvent(e)
        // }
    }
}


// for debugging only
exports.registry = this.registry

exports.open = open;
