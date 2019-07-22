# copyreplaste

A cli tool thay makes repeatative copy-paste tasks easier.

Also exists as [VS Code extension](https://marketplace.visualstudio.com/items?itemName=smnbbrv.vscode-copyreplaste) ([github project](https://github.com/smnbbrv/vscode-copyreplaste)).

## Installation

Ensure you have node.js >= v10.

```sh
npm i -g copyreplaste
```

## How it works

It copies a given directory, its subdirectories and files and performs replacement across all contents **and** file / directory names.

```sh
copyreplaste --from test/test-name --to test --replace names,name --with bunnies,bunny --force
```

The replacements are massive. All the values are transformed to the

- dasherized case
- camelized case
- classified case
- underscored case
- capitalized case

and then replacing the matching values.

## Arguments

```sh
copyreplaste -h
Usage: copyreplaste [options]

Options:
  -V, --version        output the version number
  --from <from>        The directory to copy
  --to <to>            The parent directory that will contain the copied one
  --replace <replace>  The comma-separated list of words to replace
  --with <with>        One-by one comma-separated list of replacements for "replace"
  --force              Overwrite existing target folder (if present)
  -h, --help           output usage information
```

## License

MIT
