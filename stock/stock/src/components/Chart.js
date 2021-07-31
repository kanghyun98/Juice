import React, { PureComponent } from 'react';
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { RESERVED_EVENTS } from 'socket.io/dist/socket';

export default class Example extends PureComponent {
  // static initialData =[];
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+20',
      bottom2: 'dataMin-20',
      animation: true,
    };
  }
  
   getAxisYDomain = (from, to, ref, offset) => {
    let temp = this.state.data.slice();
    let refData =temp.slice(from-1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  componentWillMount(props){
    axios.post('/stock_year', encodeURIComponent(this.props.search))
    .then((res)=>{
      this.setState({data : [...res.data]});
    })
    .catch((err)=>{
        console.log("회사 정보가 없어요. 다시 체크해주세요!");
    })
    console.log("willmount");
  }
  
  componentDidMount(props){
    axios.post('/stock_year', encodeURIComponent(this.props.search))
    .then((res)=>{
      this.setState({data : [...res.data]});
    })
    .catch((err)=>{
        console.log("회사 정보가 없어요. 다시 체크해주세요!");
    })
    console.log("didmount");
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    console.log(refAreaLeft)
    console.log(refAreaRight)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // yAxis domain
    const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'abspct', 1);
    const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'news', 10);
    console.log(bottom)
    console.log(bottom2)
    console.log("sssssssssssssssssss")
    this.setState(() => ({
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
      refAreaLeft: '',
      refAreaRight: '',
    }));

    console.log(this.state.left)
    console.log(this.state.right)
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb")
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
    }));
  }

  render() {
    {console.log("렌더링렌더링렌더링렌더링렌더링렌더링렌더링렌더링렌더링렌더링렌더링렌더링렌더링")}
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;
    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            data={data}
            onMouseDown={(e) => this.setState({ refAreaLeft: e.activeTooltipIndex })}
            onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeTooltipIndex })}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {console.log("도메인1111111111111")}
            {console.log(data[left])}
            {console.log(data[right])}
            <XAxis  dataKey="date" domain={[data[left],data[right]]} />

            <YAxis allowDataOverflow domain={[bottom, top]} yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} yAxisId="2" />
            <Tooltip />
            <Line yAxisId="1" type="natural" dataKey="abspct" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="news" stroke="#82ca9d" animationDuration={300} />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>

        <button type="button" className="btn update" onClick={this.zoomOut.bind(this)}>
          Zoom Out
        </button>
      </div>
    );
  }
}
  