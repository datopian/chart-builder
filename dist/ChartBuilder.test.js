"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@testing-library/react");

var _ChartBuilder = require("./ChartBuilder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = {
  resources: [{
    name: 'test',
    schema: {
      fields: [{
        name: 'a',
        type: 'string'
      }, {
        name: 'b',
        type: 'string'
      }, {
        name: 'c',
        type: 'string'
      }]
    }
  }]
};
it('renders UI', function () {
  var _render = (0, _react2.render)(_react.default.createElement(_ChartBuilder.ChartBuilder, {
    view: view,
    dataViewBuilderAction: function dataViewBuilderAction() {}
  })),
      container = _render.container;

  expect(container).toMatchSnapshot();
});
it('shows error message for non-compiled view', function () {
  var view = {};

  var _render2 = (0, _react2.render)(_react.default.createElement(_ChartBuilder.ChartBuilder, {
    view: view,
    dataViewBuilderAction: function dataViewBuilderAction() {}
  })),
      container = _render2.container;

  expect(container).toMatchSnapshot();
});
it('shows error message if no schema', function () {
  var view = {
    resources: [{
      name: 'no-schema'
    }]
  };

  var _render3 = (0, _react2.render)(_react.default.createElement(_ChartBuilder.ChartBuilder, {
    view: view,
    dataViewBuilderAction: function dataViewBuilderAction() {}
  })),
      container = _render3.container;

  expect(container).toMatchSnapshot();
});