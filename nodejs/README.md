# [Node.js](https://nodejs.org)

## Installation


### [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)

```bash
# 0.40.0에서는 nodejs list가 안나옴. 추후 업데이트 필요
# $ curl -o- https://raw.githubsuercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

$ curl -o- https://raw.githubsuercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
$ . ~/.bashrc
$ nvm ls-remote
```
or 

```bash
wget -q0- https://raw.githubsuercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

. ~/.bashrc
```


### [Download Node.js](https://nodejs.org/en/download/package-manager)
* using `nvm`

```bash
nvm install 20
node -v
npm -v
```


* using `Docker`

#### Trouble shooting
*[Getting GLIBC_2.28 not found](https://stackoverflow.com/questions/72921215/getting-glibc-2-28-not-found)

