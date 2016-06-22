import React, { PropTypes, Component } from 'react';
import { render } from './src/main';
import $ from 'jquery';
import arePropsValid from './helpers';

class ReactPlottable extends Component {

  constructor() {
    super();
    this.state = {
      activeElements: new Set(),
      arePropsValid: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
  }

  componentWillMount() {
    if (arePropsValid(this.props)) {
      this.setState({ arePropsValid: true });
    }
  }

  componentDidMount() {
    const { arePropsValid } = this.state;
    if (arePropsValid) {
      const div = d3.select(this.refs.div);
      render.renderChart(
        this.props,
        d3.select($('svg', div[0])[0]),
        this.onInteraction
      );
    } else {
      const { width, height } = this.props.config;
      // TODO refactor it into a normal tag
      d3.select(this.refs.svg).append('text')
        .text('Something went wrong with the data')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '30px')
        .attr('fill', '#CCCCCC');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!arePropsValid(nextProps)) {
      console.warn('Something went wrong with new data');
    }
    const div = d3.select(this.refs.div);
    const svg = d3.select($('svg', div[0])[0]);
    const { width, height } = nextProps.config;
    svg.remove();
    div.append('svg')
      .attr('width', width)
      .attr('height', height);
    render.renderChart(
      nextProps,
      d3.select($('svg', div[0])[0]),
      this.onInteraction
    );
    this.setState({
      activeElements: new Set(),
    });
  }

  onElementsChange(activeElements) {
    const { onSelect } = this.props;
    this.setState({
      activeElements,
    }, () => {
      if (onSelect) {
        onSelect(activeElements);
      }
    });
  }

  onClick(element) {
    const { activeElements } = this.state;
    const newElements = new Set(activeElements);
    if (newElements.has(element)) {
      newElements.delete(element);
    } else {
      newElements.add(element);
    }
    this.onElementsChange(newElements);
  }

  onDrag(elements) {
    const activeElements = new Set(elements);
    this.onElementsChange(activeElements);
  }

  onInteraction(selected, type) {
    switch (type) {
      case 'click':
        this.onClick(selected);
        break;
      case 'drag':
        this.onDrag(selected);
        break;
      default:
        throw new Error(`The interaction ${type} is not supported`);
    }
  }

  render() {
    const { width, height } = this.props.config;
    const svgStyles = { width, height };
    return (
      <div ref="div">
        <svg style={svgStyles} />
      </div>
    );
  }
}

ReactPlottable.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
    config: PropTypes.object,
    defaultSelected: PropTypes.arrayOf(PropTypes.object),
  })),
  config: PropTypes.shape({
    types: PropTypes.arrayOf(PropTypes.string),
    width: PropTypes.number,
    height: PropTypes.number,
    isPlotGroup: PropTypes.bool,
  }),
  onSelect: PropTypes.func,
};

ReactPlottable.defaultProps = {
  config: {
    width: 600,
    height: 600,
  },
  onSelect: selected => {
    console.log(selected);
  },
};

export default ReactPlottable;
