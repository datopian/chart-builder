import React from 'react';
import { Formik, Form, Field } from 'formik';
import './ChartBuilder.css';


export const ChartBuilder = (props) => {
  // Make a copy of passed datapackage so that we don't mutate it:
  const datapackage = JSON.parse(JSON.stringify(props.datapackage))
  // TODO: make it work with multiple resources
  const fields = datapackage.resources[0].schema
    ? datapackage.resources[0].schema.fields
    : []
  const chartTypes = ['line', 'bar']

  function handleSubmit(values) {
    // Prep a new view:
    const view = {
      resources: [datapackage.resources[0]],
      specType: 'simple',
      spec: {
        type: values.chartType,
        group: values.xAxis,
        series: [values.yAxis]
      }
    }

    // Add it to `views` array so that it comes first (eg, renders above table):
    const views = JSON.parse(JSON.stringify(props.datapackage.views))
    views.unshift(view)
    // Call Redux action with updated `views` array:
    props.dataViewBuilderAction(views)
  }

  return (
    <div className="ChartBuilder">
      <Formik
        initialValues={{ xAxis: fields[0].name, yAxis: [fields[0].name], chartType: chartTypes[0] }}
        onSubmit={values => handleSubmit(values)}
        render={({ values, setFieldValue }) => (
          <Form>
            <Field name="xAxis" component="select" placeholder="Field for X axis" required>
              {fields.map((field, index) => {
                return <option value={field.name} key={`field${index}`}>{field.name}</option>
              })}
            </Field>

            <Field name="yAxis" placeholder="Field for Y axis">
              {({ field, form }) => (
                fields.map((field, index) => {
                  return (
                    <label key={`yAxis${index}`}>
                      <input
                        type="checkbox"
                        name="yAxis"
                        value={field.name}
                        checked={values.yAxis.includes(field.name)}
                        onChange={() => {
                          if (values.yAxis.includes(field.name)) {
                            const nextValue = values.yAxis.filter(
                              value => value !== field.name
                            )
                            setFieldValue('yAxis', nextValue)
                          } else {
                            const nextValue = values.yAxis.concat(field.name);
                            setFieldValue('yAxis', nextValue);
                          }
                        }}
                      />
                      {field.name}
                    </label>
                  )
                })
              )}
            </Field>

            <Field name="chartType" component="select" placeholder="Chart type" required>
              {chartTypes.map((type, index) => {
                return <option value={type} key={`chartType${index}`}>{type}</option>
              })}
            </Field>

            <button type="submit">Add view</button>
          </Form>
        )}
      />
    </div>
  );
}
