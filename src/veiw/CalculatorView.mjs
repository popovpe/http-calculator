import * as fs from 'node:fs'
const FONT_SIZE_PROPERTY_NAME = 'fontSize';
const TEXT_ALIGN_PROPERTY_NAME = 'textAlign';
const ERROR_COLOR_PROPERTY_NAME = 'errorColor';
const RESULT_COLOR_PROPERTY_NAME = 'resultColor';

export default class CalculatorView {
    #properties = new Map([
        [FONT_SIZE_PROPERTY_NAME, '40px'],
        [TEXT_ALIGN_PROPERTY_NAME, 'center'],
        [ERROR_COLOR_PROPERTY_NAME, 'red'],
        [RESULT_COLOR_PROPERTY_NAME, 'green'],
    ]);
    constructor(config_json) {
        try {
            const data = fs.readFileSync(config_json,'utf8');
            const jsonData = JSON.parse(data);
            this.#properties.forEach((value,property_name, map)=>map.set(property_name,jsonData[property_name] ?? value));
        } catch (error) {
            console.error("Error reading and parsing view config file", error.message);
        }
    }
    getHtml(res, isError) {
        return `<label style="font-size:${this.#properties.get(FONT_SIZE_PROPERTY_NAME)}; 
                    display:block; 
                    text-align:${this.#properties.get(TEXT_ALIGN_PROPERTY_NAME)}; 
                    color:${isError ? this.#properties.get(ERROR_COLOR_PROPERTY_NAME) : this.#properties.get(RESULT_COLOR_PROPERTY_NAME)}">${res}</label>`
    }
}