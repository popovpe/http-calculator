export default class CalculatorService {
    constructor(emitter, operations) {
        operations.forEach((implementation, operationName) => {
            emitter.on(operationName, (operands, response, view) => {
                const res = implementation(operands);
                response.end(view.getHtml(res, false))
            })
        });
    }
}