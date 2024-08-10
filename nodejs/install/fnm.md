# [fnm](https://github.com/Schniz/fnm)

Fast and simple Node.js version manager, built in Rust

* [Download Node.js®](https://nodejs.org/en/download/package-manager/current)

## Install fnm

Using Chocolatey (Windows) (Powershell 관리자)
```bash
choco install fnm
```

or

Using winget
```bash
winget install Schniz.fnm
```

## Install Node.js


```bash
fnm ls-remote
fnm install [version]
fnm use [version]
```


```bash
# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm use --install-if-missing 18.20.4
node -v
npm -v 
```

# Links
* [Chocolatey](https://github.com/milouyah/tools/blob/main/package-manager/chocolatey.md)
* [윈도우에서 fnm 설치하기](https://velog.io/@jungsangu/%EC%9C%88%EB%8F%84%EC%9A%B0%EC%97%90%EC%84%9C-fnm-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)


# Trouble shooting
* fnm env
We can't find the necessary environment variables to replace the Node version. 
You should setup your shell profile to evaluate `fnm env`, see https://github.com/Schniz/fnm#shell-setup on how to do this
Check out our documentation for more information: https://fnm.vercel.app