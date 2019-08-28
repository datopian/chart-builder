import React from 'react';
import { Formik, Form, Field } from 'formik';
import './css/tailwind.css';


export const ChartBuilder = (props) => {
  // Make a copy of passed view so that we don't mutate it:
  const view = JSON.parse(JSON.stringify(props.view))
  if (!view.resources) {
    return (<div>ChartBuilder requires resource to be compiled into view.</div>)
  } else if (!view.resources[0] || !view.resources[0].schema) {
    return (<div>ChartBuilder requires resource schema.</div>)
  }
  // TODO: make it work with multiple resources
  const fields = view.resources[0].schema
    ? view.resources[0].schema.fields
    : []
  const chartTypes = ['line', 'bar']

  function handleSubmit(values) {
    // Prep an updated view:
    view.specType = 'simple'
    view.spec = {
      type: values.chartType,
      group: values.xAxis,
      series: values.yAxis
    }
    // Call Redux action with updated `view`:
    props.dataViewBuilderAction(view)
  }

  return (
    <div className="">
      <Formik
        initialValues={{ xAxis: fields[0].name, yAxis: [fields[0].name], chartType: chartTypes[0] }}
        onSubmit={values => handleSubmit(values)}
        render={({ values, setFieldValue }) => (
          <Form className="bg-white bg-white text-xsm p-3 text-left">
            <div className="flex flex-wrap ">
              <div className="w-full mb-3">
                <label htmlFor="chartType" className="text-xsm font-bold uppercase text-gray-700">Chart type</label>
                <div className="relative">
                  <Field name="chartType" component="select" placeholder="Chart type" required className="block appearance-none w-full mt-1 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {chartTypes.map((type, index) => {
                      return <option value={type} key={`chartType${index}`}>{type}</option>
                    })}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <label htmlFor="xAxis" className="text-xsm font-bold uppercase text-gray-700">Group column</label>
                <div className="relative">
                  <Field name="xAxis" component="select" placeholder="Field for X axis" required className="block appearance-none w-full mt-1 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {fields.map((field, index) => {
                      return <option value={field.name} key={`field${index}`}>{field.name}</option>
                    })}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <label htmlFor="yAxis" className="text-xsm font-bold uppercase text-gray-700">Series</label>
                <Field name="yAxis" placeholder="Field for Y axis" className="mb-4 mr-4">
                  {({ field, form }) => (
                    fields.map((field, index) => {
                      return (
                        <label key={`yAxis${index}`} className="block text-gray-500 font-bold ">
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
                            className="mr-2 leading-tight"
                          />
                          <span className="text-xsm">
                            {field.name}
                          </span>
                        </label>
                      )
                    })
                  )}
                </Field>
              </div>

            </div>

            <div className="w-full mt-2 mb-3">
              <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Add view
                </button>
              </div>
            </div>
          </Form>
          
        )}
      />
      </div>
  );
}
