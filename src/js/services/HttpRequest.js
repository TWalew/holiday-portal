export function DoHttpRequest (opts) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(opts.method, opts.url);
        xhr.onload = function () {
            console.log('LOAD', this);
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            console.log('ERROR', this);
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        if (opts.headers) {
            Object.keys(opts.headers).forEach(function (key) {
                xhr.setRequestHeader(key, opts.headers[key]);
            });
        }
        let params = opts.params;
        if (params && typeof params === 'object') {
            params = Object.keys(params).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
        }

        console.log('DO', xhr, params);
        xhr.send(params);
    });
}