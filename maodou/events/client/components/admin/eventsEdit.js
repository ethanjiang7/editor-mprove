import React from 'react';

export default class EventAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unit: '$' };
    this.changeUnit = this.changeUnit.bind(this);
  }
  changeUnit() {
    if (this.state.unit === '$') {
      this.setState({ unit: '¥' });
    } else {
      this.setState({ unit: '$' });
    }
  }
  render() {
    const { beginUpload, fileUploaded } = this.props.state;
    const { dispatch, updateEvent, coverUrl, event } = this.props;
    const url = coverUrl ? coverUrl : event.coverUrl;
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>编辑活动</h1>
          <form onSubmit={(e) => dispatch(updateEvent(e, event._id, url))}>
            <div id="upload-container">
              <a className="btn btn-success" id="pickfiles" href="#">更换封面</a>
            </div>
            <div className="post-coverImg">
              { beginUpload ? <p>正在上传，请稍候...</p> : <span /> }
              { fileUploaded ? <p>图片上传完成．</p> : <span /> }
              { coverUrl ?
                <img src={`${coverUrl}?imageView2/2/w/600/h/300/interlace/0/q/100`} alt="post cover" />
                : <img className="responsive-img" src={`${event.coverUrl}?imageView2/2/w/600/h/300/interlace/0/q/100`} alt="post cover" />
              }
            </div>
            <div className="form-group">
              <label>活动名称</label>
              <input className="form-control" type="text" defaultValue={event.title} name="title" />
            </div>
            <div className="form-group">
              <label>日期</label>
              <input className="form-control" type="date" name="time" />
            </div>
            <div className="form-group">
              <label>地点</label>
              <input className="form-control" type="text" defaultValue={event.location} name="location" />
            </div>
            <div className="form-group">
              <label>人数限制</label>
              <input className="form-control" type="text" defaultValue={event.limit} name="limit" />
            </div>
            <div className="row">
              <div className="col-xs-5">
                <div className="form-group">
                  <label>付款单位</label>
                  <select defaultValue="dollar" onChange={this.changeUnit} className="form-control" name="unit">
                    <option value="dollar">美金</option>
                    <option value="rmb">RMB</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-7">
                <div className="form-group">
                  <label>费用</label>
                  <div className="input-group m-b">
                    <span className="input-group-addon">{this.state.unit}</span>
                    <input type="text" name="fee" className="form-control" defaultValue={event.fee}/>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <label>活动描述</label>
            <div id="editor">
              <div dangerouslySetInnerHTML={{ __html: event.desc }}></div>
            </div>
            <button className="btn btn-success" type="submit">发布</button>
          </form>
        </div>
      </div>
    );
  }
}
