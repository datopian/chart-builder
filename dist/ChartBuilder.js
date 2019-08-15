"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

require("./css/tailwind.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartBuilder = function ChartBuilder(props) {
  // Make a copy of passed view so that we don't mutate it:
  var view = JSON.parse(JSON.stringify(props.view));

  if (!view.resources) {
    return _react.default.createElement("div", null, "ChartBuilder requires resource to be compiled into view.");
  } else if (!view.resources[0] || !view.resources[0].schema) {
    return _react.default.createElement("div", null, "ChartBuilder requires resource schema.");
  } // TODO: make it work with multiple resources


  var fields = view.resources[0].schema ? view.resources[0].schema.fields : [];
  var chartTypes = ['line', 'bar'];

  function handleSubmit(values) {
    // Prep an updated view:
    view.specType = 'simple';
    view.spec = {
      type: values.chartType,
      group: values.xAxis,
      series: values.yAxis // Call Redux action with updated `view`:

    };
    props.dataViewBuilderAction(view);
  }

  return _react.default.createElement("div", {
    className: "text-center w-full max-w-lg"
  }, _react.default.createElement(_formik.Formik, {
    initialValues: {
      xAxis: fields[0].name,
      yAxis: [fields[0].name],
      chartType: chartTypes[0]
    },
    onSubmit: function onSubmit(values) {
      return handleSubmit(values);
    },
    render: function render(_ref) {
      var values = _ref.values,
          setFieldValue = _ref.setFieldValue;
      return _react.default.createElement(_formik.Form, {
        className: "bg-white"
      }, _react.default.createElement("div", {
        className: "flex flex-wrap -mx-3 mb-2"
      }, _react.default.createElement("div", {
        className: "w-full md:w-1/3 px-3 mb-6 md:mb-0"
      }, _react.default.createElement("label", {
        htmlFor: "chartType",
        className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      }, "Chart type"), _react.default.createElement("div", {
        className: "relative"
      }, _react.default.createElement(_formik.Field, {
        name: "chartType",
        component: "select",
        placeholder: "Chart type",
        required: true,
        className: "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      }, chartTypes.map(function (type, index) {
        return _react.default.createElement("option", {
          value: type,
          key: "chartType".concat(index)
        }, type);
      })), _react.default.createElement("div", {
        className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      }, _react.default.createElement("svg", {
        className: "fill-current h-4 w-4",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20"
      }, _react.default.createElement("path", {
        d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
      }))))), _react.default.createElement("div", {
        className: "w-full md:w-1/3 px-3 mb-6 md:mb-0"
      }, _react.default.createElement("label", {
        htmlFor: "xAxis",
        className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      }, "Group column"), _react.default.createElement("div", {
        className: "relative"
      }, _react.default.createElement(_formik.Field, {
        name: "xAxis",
        component: "select",
        placeholder: "Field for X axis",
        required: true,
        className: "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      }, fields.map(function (field, index) {
        return _react.default.createElement("option", {
          value: field.name,
          key: "field".concat(index)
        }, field.name);
      })), _react.default.createElement("div", {
        className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      }, _react.default.createElement("svg", {
        className: "fill-current h-4 w-4",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20"
      }, _react.default.createElement("path", {
        d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
      }))))), _react.default.createElement("div", {
        className: "w-full md:w-1/3 px-3 mb-6 md:mb-0"
      }, _react.default.createElement("label", {
        htmlFor: "yAxis",
        className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      }, "Series"), _react.default.createElement(_formik.Field, {
        name: "yAxis",
        placeholder: "Field for Y axis",
        className: "mb-4 mr-4"
      }, function (_ref2) {
        var field = _ref2.field,
            form = _ref2.form;
        return fields.map(function (field, index) {
          return _react.default.createElement("label", {
            key: "yAxis".concat(index),
            className: "block text-gray-500 font-bold"
          }, _react.default.createElement("input", {
            type: "checkbox",
            name: "yAxis",
            value: field.name,
            checked: values.yAxis.includes(field.name),
            onChange: function onChange() {
              if (values.yAxis.includes(field.name)) {
                var nextValue = values.yAxis.filter(function (value) {
                  return value !== field.name;
                });
                setFieldValue('yAxis', nextValue);
              } else {
                var _nextValue = values.yAxis.concat(field.name);

                setFieldValue('yAxis', _nextValue);
              }
            },
            className: "mr-2 leading-tight"
          }), _react.default.createElement("span", {
            className: "text-sm"
          }, field.name));
        });
      }))), _react.default.createElement("div", {
        className: "flex items-center"
      }, _react.default.createElement("div", {
        className: "w-1/3"
      }), _react.default.createElement("div", {
        className: "w-1/3"
      }, _react.default.createElement("button", {
        type: "submit",
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      }, "Add view")), _react.default.createElement("div", {
        className: "md:w-1/3"
      })));
    }
  }));
};

exports.ChartBuilder = ChartBuilder;