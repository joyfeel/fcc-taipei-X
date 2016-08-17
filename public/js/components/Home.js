import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import "../../css/base/aa.css";
import style from "../../css/main.css";



class Home extends Component {
  render() {
    return (
      <div styleName='container'>
        <div className='aa'>aaaaaaaaa</div>
        <div styleName='row'>
          <div className="col-sm">
            <h3>Heading</h3>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
              mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
              mollis euismod. Donec sed odio dui.</p>
            <a href="#" role="button">View details</a>
          </div>
          <div className="col-sm">
            <h3>Heading</h3>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
              mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
              mollis euismod. Donec sed odio dui.</p>
            <a href="#" role="button">View details</a>
          </div>
          <div className="col-sm">
            <h3>Heading</h3>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
              mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
              mollis euismod. Donec sed odio dui.</p>
            <a href="#" role="button">View details</a>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Home, style)
