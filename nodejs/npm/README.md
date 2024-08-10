# npm


## npm config (.npmrc)

* Proxy

```bash
$ npm config set cafile [cafile-path]
$ npm config set proxy http://[]
$ npm config set https-proxy https:/[]
$ npm config set strict-ssl false
$ npm config set registry http://registry.npmjs.org/ # optional
```

```bash
# List configurations
$ npm config list
```