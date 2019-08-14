import { ChartBuilder } from '../src/ChartBuilder.js'


const view = {
  resources: [
    {
      name: 'test'
    }
  ]
}

const dataViewBuilderAction = (view) => {
  alert(JSON.stringify(view))
}

export default {
  component: ChartBuilder,
  props: {view, dataViewBuilderAction}
};
