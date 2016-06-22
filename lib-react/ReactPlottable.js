'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _main = require('../lib/main');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactPlottable = function (_Component) {
  _inherits(ReactPlottable, _Component);

  function ReactPlottable() {
    _classCallCheck(this, ReactPlottable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactPlottable).call(this));

    _this.state = {
      activeElements: new Set(),
      arePropsValid: false
    };
    _this.onClick = _this.onClick.bind(_this);
    _this.onDrag = _this.onDrag.bind(_this);
    _this.onInteraction = _this.onInteraction.bind(_this);
    return _this;
  }

  _createClass(ReactPlottable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if ((0, _helpers2.default)(this.props)) {
        this.setState({ arePropsValid: true });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var arePropsValid = this.state.arePropsValid;

      if (arePropsValid) {
        var div = d3.select(this.refs.div);
        _main.render.renderChart(this.props, d3.select((0, _jquery2.default)('svg', div[0])[0]), this.onInteraction);
      } else {
        var _props$config = this.props.config;
        var width = _props$config.width;
        var height = _props$config.height;
        // TODO refactor it into a normal tag

        d3.select(this.refs.svg).append('text').text('Something went wrong with the data').attr('x', width / 2).attr('y', height / 2).attr('text-anchor', 'middle').attr('font-size', '30px').attr('fill', '#CCCCCC');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _helpers2.default)(nextProps)) {
        console.warn('Something went wrong with new data');
      }
      var div = d3.select(this.refs.div);
      var svg = d3.select((0, _jquery2.default)('svg', div[0])[0]);
      var _nextProps$config = nextProps.config;
      var width = _nextProps$config.width;
      var height = _nextProps$config.height;

      svg.remove();
      div.append('svg').attr('width', width).attr('height', height);
      _main.render.renderChart(nextProps, d3.select((0, _jquery2.default)('svg', div[0])[0]), this.onInteraction);
      this.setState({
        activeElements: new Set()
      });
    }
  }, {
    key: 'onElementsChange',
    value: function onElementsChange(activeElements) {
      var onSelect = this.props.onSelect;

      this.setState({
        activeElements: activeElements
      }, function () {
        if (onSelect) {
          onSelect(activeElements);
        }
      });
    }
  }, {
    key: 'onClick',
    value: function onClick(element) {
      var activeElements = this.state.activeElements;

      var newElements = new Set(activeElements);
      if (newElements.has(element)) {
        newElements.delete(element);
      } else {
        newElements.add(element);
      }
      this.onElementsChange(newElements);
    }
  }, {
    key: 'onDrag',
    value: function onDrag(elements) {
      var activeElements = new Set(elements);
      this.onElementsChange(activeElements);
    }
  }, {
    key: 'onInteraction',
    value: function onInteraction(selected, type) {
      switch (type) {
        case 'click':
          this.onClick(selected);
          break;
        case 'drag':
          this.onDrag(selected);
          break;
        default:
          throw new Error('The interaction ' + type + ' is not supported');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$config2 = this.props.config;
      var width = _props$config2.width;
      var height = _props$config2.height;

      var svgStyles = { width: width, height: height };
      return _react2.default.createElement(
        'div',
        { ref: 'div' },
        _react2.default.createElement('svg', { style: svgStyles })
      );
    }
  }]);

  return ReactPlottable;
}(_react.Component);

ReactPlottable.propTypes = {
  content: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    data: _react.PropTypes.arrayOf(_react.PropTypes.object),
    type: _react.PropTypes.string,
    config: _react.PropTypes.object,
    defaultSelected: _react.PropTypes.arrayOf(_react.PropTypes.object)
  })),
  config: _react.PropTypes.shape({
    types: _react.PropTypes.arrayOf(_react.PropTypes.string),
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    isPlotGroup: _react.PropTypes.bool
  }),
  onSelect: _react.PropTypes.func
};

ReactPlottable.defaultProps = {
  config: {
    width: 600,
    height: 600
  },
  onSelect: function onSelect(selected) {
    console.log(selected);
  }
};

exports.default = ReactPlottable;