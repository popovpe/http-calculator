import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
import http from 'node:http';
import CalculatorService from './service/CalculatorService.mjs';
import operations from './config/operations.mjs';
import CalculatorView from './veiw/CalculatorView.mjs';

const server = http.createServer();
const PORT = 3500;
const VIEW_CONFIG_PATH = 'config/view.json';
server.listen(PORT, () => console.log(`server is listening on port ${server.address().port}`));
new CalculatorService(server, operations);
const BASE_DIR = dirname(fileURLToPath(import.meta.url));
const view = new CalculatorView( join(BASE_DIR,VIEW_CONFIG_PATH) );
server.on("request", requestHandler);

function requestHandler(req, res) {
    res.setHeader('content-type', 'text/html');
    const urlTokens = req.url.split('/');
    try {
        if (!this.emit(urlTokens[1], getOperands(urlTokens), res, view)) {
            throw new Error(`method ${urlTokens[1]} unsupported`);
        }
    } catch (error) {
        let html = view.getHtml(error.message, true);
        res.end(html)
    }

}

function getOperands(args) {
    let result = args.slice(2).map(e => +e);
    if ( result.length > 1 && !result.some(e => isNaN(e))) { 
        return result;
    } else {
        throw new Error(`wrong operands`);
    }
}