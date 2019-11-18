//import React from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './addProduct.css';
import {
  Form,
  Select,
  InputNumber,
  Input,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
} from 'antd';

const FormItem= Form.Item;
const { Option } = Select;

class addProduct extends React.Component {
    dummyRequest({ file, onSuccess }) {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }
    
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
    <div className="product-container">
        <h2 className="page-title"> Add a Product </h2>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
                label="Product">
                <Input 
                    name="product"
                    size="large"
                    type="text" 
                    autocomplete="off"
                    placeholder="product name"
                    onChange={this.handleIDChange} maxLength="20"/>
            </FormItem>
            <FormItem
                label="Product description">
                <Input 
                    name="description"
                    size="large"
                    type="text" 
                    autocomplete="off"
                    placeholder="description"
                    onChange={this.handleIDChange} maxLength="50"/>
            </FormItem>
            <FormItem
                label="Price">
                <Input 
                    name="price"
                    size="large"
                    type="Integer" 
                    autocomplete="off"
                    placeholder="0.00"
                    onChange={this.handleIDChange} maxLength="5"/>
            </FormItem>

            <FormItem label="Upload">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(addProduct);
ReactDOM.render(<addProduct />, document.getElementById('root'));        
export default WrappedDemo;


//const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);
/*ReactDOM.render(
    <AddProduct/>,
    document.getElementById('root')
  );
export default AddProduct;
*/
