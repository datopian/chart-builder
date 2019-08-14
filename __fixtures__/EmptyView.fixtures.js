import { ChartBuilder } from '../src/ChartBuilder.js'


const view = {}

const dataViewBuilderAction = (view) => {
  alert(JSON.stringify(view))
}

export default {
  component: ChartBuilder,
  props: {view, dataViewBuilderAction}
};
