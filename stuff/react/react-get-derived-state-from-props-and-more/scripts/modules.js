const modules = {
    __modules__: {},

    export(name, module) {
        this.__modules__[name] = module
    },

    import(name) {
        const module = this.__modules__[name]
        
        if (module) return module

        throw Error(`module ${name} not found`)
    }
}