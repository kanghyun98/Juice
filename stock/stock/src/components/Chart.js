import React, { PureComponent,useState,useEffect} from 'react';
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


export default function Example (props){

  let  [initialData,setinitialData] = useState([...props.chartdata
  ]);
  
  let [initialState,setinitialState] = useState({
    data: initialData,
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true,
  });

  // useEffect(()=>{
  //   setinitialData([...props.chartdata])
  // },[]);
  

  function getAxisYDomain (from, to, ref, offset) {
    const refData = initialData.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
  
    return [(bottom | 0) - offset, (top | 0) + offset];
  };


  function zoom() {
    let refAreaLeft = initialState.refAreaLeft;
    let refAreaRight = initialState.refAreaRight;
    const { data } = {...initialData};


    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setinitialState({
        refAreaLeft: '',
        refAreaRight: '',
        data: initialData.data,
        left: initialData.left,
        right: initialData.right,
        bottom :0,
        top:0,
        bottom2:0,
        top:0,
        animation: true,
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'changepct', 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'news', 50);

    setinitialState({
      refAreaLeft: '',
      refAreaRight: '',
      data: props.chartdata.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom :bottom,
      top :top,
      bottom2 :bottom2,
      top2 :top2,
      animation: true,
    });
  }

  function zoomOut() {
    const { data } = {...initialData};
    setinitialState({
      data: props.chartdata.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
      animation: true,
    });
  }

    const data = initialState.data;
    const left = initialState.left;
    const right = initialState.right;
    const refAreaLeft = initialState.refAreaLeft;
    const refAreaRight = initialState.refAreaRight;
    const bottom = initialState.bottom;
    const bottom2 = initialState.bottom2;
    const top = initialState.top;
    const top2 = initialState.top2;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
        <button type="button" className="btn update" onClick={zoomOut()}>
          Zoom Out
        </button>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            data={data}
            // { refAreaLeft: e.activeLabel }
            onMouseDown={(e) => setinitialState(
              {refAreaLeft : initialData.refAreaLeft,
              refAreaRight: e.activeLabel,
              data: initialData.data,
              left: initialData.left,
              right: initialData.right,
              bottom,
              top,
              bottom2,
              top2,
              animation: true,}
            )}
            onMouseMove={(e) => initialState.refAreaLeft &&  setinitialState(
              {refAreaLeft : initialData.refAreaLeft,
              refAreaRight: e.activeLabel,
              data: initialData.data,
              left: initialData.left,
              right: initialData.right,
              bottom,
              top,
              bottom2,
              top2,
              animation: true,}
            )}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={zoom()}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="date" domain={[left, right]} type="number" />
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip />
            <Line yAxisId="1" type="natural" dataKey="changepct" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="news" stroke="#82ca9d" animationDuration={8000} />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}
