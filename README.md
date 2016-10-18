# milkcocoa-tool
milkcocoa-tool

## How To Install

```
sudo npm i milkcocoa-tool -g
```

## How To Use

apikey and apisecret are optional.

export datastore as CSV.

```
milkcocoa-tool export-csv --app_id your-app-id --host your-app-id.mlkcca.com --ds data-store-name --apikey your-apikey --apisecret ayour-pisecret
```


### Other Options

- size
- output

```
milkcocoa-tool export-csv --app_id your-app-id --host your-app-id.mlkcca.com --ds data-store-name --apikey your-apikey --apisecret ayour-pisecret --size 10 --output ./test.csv
```
