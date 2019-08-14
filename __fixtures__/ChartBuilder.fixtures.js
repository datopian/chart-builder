import { ChartBuilder } from '../src/ChartBuilder.js'


const datapackage = {
  name: 'test',
  resources: [
    {
      name: 'test',
      schema: {
        fields: [
          {
            name: 'a',
            type: 'string'
          },
          {
            name: 'b',
            type: 'string'
          },
          {
            name: 'c',
            type: 'string'
          }
        ]
      }
    }
  ],
  views: []
}

const dataViewBuilderAction = (views) => {
  alert(JSON.stringify(views))
}

export default {
  component: ChartBuilder,
  props: {datapackage, dataViewBuilderAction}
};
