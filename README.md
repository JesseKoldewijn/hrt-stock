<h1 align="center">Welcome to HRT-Stock 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/JesseKoldewijn/hrt-stock/main">
</p>

> A stock overview & management tool build using my some of my favorite tools.

## Install

```sh
pnpm install
```

## Usage

First of, you'll need to create a kv database on vercel. You can do this using the vercel dashboard under the option `"storage"`.
Second, you'll need a mysql database. This database has to be named hrt-countries due to the current setup.

Then, create a .env file in the root of the project and add the following variables:

```sh
DATABASE_URL='mysql://[username]:[password]@[host]:[port]/hrt-countries' # mysql connection string

KV_URL="redis://default:[password]@[kv-db-name].kv.vercel-storage.com:46986" # vercel kv db connection string
KV_REST_API_URL="https://[kv-db-name].kv.vercel-storage.com" # vercel kv db endpoint
KV_REST_API_TOKEN="[token]" # vercel kv rest token
KV_REST_API_READ_ONLY_TOKEN="[readonly-token]" # vercel kv rest readonly token
```

Finally, you can run the project using the following command:

```sh
pnpm run dev
```

## Run tests

```sh
pnpm lint
```

## Author

👤 **Jesse Koldewijn**

- Website: https://jkinsight.nl
- Github: [@JesseKoldewijn](https://github.com/JesseKoldewijn)

## Show your support

Give a ⭐️ if this project helped you!
