const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

class Database {
    constructor(name = 'database') {
      
        name = name.endsWith(".json") ? name.split(".").shift() : name;
        name = name + ".json";
        let basePath = `${process.cwd()}\\database`;
        if(fs.existsSync(basePath + "\\" + name) == false) {
            fs.writeFileSync(basePath + "\\" + name,"{}");
        }
        this.path = basePath + "\\" + name;
    }

    set(key, value) {
        let jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        // jsonData[key]= value;
        jsonData = lodash.set(jsonData, key, value);
        fs.writeFileSync(this.path, JSON.stringify(jsonData, null, 4))
    }

    delete(key) {
        if(key == (null || undefined || "")) return console.log("Geçersiz anahtar (database)");
        let jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        jsonData = this.toJSON(jsonData);
        lodash.unset(jsonData, key);
        fs. writeFileSync(this.path, JSON.stringify(jsonData, null, 4));
    }
    get(key) {
        if(key == (null || undefined || "")) return console.log("Geçersiz anahtar (database)");
        let jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        let data = lodash.get(jsonData, key);
        return data;
    }
    all() {
        const jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        const arr = [];
        for (const key in jsonData) {
            arr.push({
                ID: key,
                data: jsonData[key]
            });
        }

        return arr;
    }
    fetch(key) {
        return this.get(key);
    }
    fetchAll() {
        return this.all();
    }
    exists(key) {
        if(key == (null || undefined || "")) return console.log("Geçersiz anahtar (database)");
        let jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        return lodash.has(jsonData, key)
    }
    has(key) {
        return this.exists(key);
    }
    deleteAll() {
        fs.writeFileSync(this.path, "{}");
    }
    /**
     * Math 
     * Original: https://github.com/wioenena-q/wio.db/blob/404a04036143356417f2e2ab2b5eed493a219548/src/JsonProvider.js#L344
     */
    math(key, operator, value, goToNegative) {
        let data = this.get(key);
        if (!data) {
            return this.set(key, value);
        }
        data = Number(data);
        switch (operator) {
            case "+":
                // @ts-ignore
                data += value;
                break;
            case "-":
                // @ts-ignore
                data -= value;
                // @ts-ignore
                if (!goToNegative && data < 1) data = 0;
                break;
            case "*":
                // @ts-ignore
                data *= value;
                break;
            case "/":
                // @ts-ignore
                data /= value;
                break;
            case "%":
                // @ts-ignore
                data %= value;
                break;
        }
        return this.set(key, data);
    } 
    add(key, value) {
        return this.math(key, "+", value, false);
    }
    subtract(key, value) {
        return this.math(key, "-", value, false);
    }
}

module.exports = { Database };