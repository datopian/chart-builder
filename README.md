This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick start

Install:

```
yarn add @datopian/chart-builder
```

Usage:

```javascript
import { ChartBuilder } from '@datopian/chart-builder'

function App() {
  // Define `datapackage`
  // Define `action`

  return (
    <ChartBuilder datapackage={datapackage} dataViewBuilderAction={action} />
  )
}
```

## Dev

We use `cosmos` to do dev:

```
yarn cosmos
```

Checkout `__fixtures__` dir for details.
