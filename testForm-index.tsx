import * as React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
import CardEx from '../../common/CardEx';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TestForm2State, apiActions, apis, actions, keys } from '../../../models/system/testForm2';
import { connect } from 'react-redux';
import { FORMITEMLAYOUT, FORMITEMLAYOUT_WIDTHOUTLABEL } from '../../../util/constants';
import { Field } from '../../../util/baseDecorator';
import Back from '../../common/Back';

export interface TestForm2OwnProps {
  options: {
    groupId: number;
    groupName: string;
  };
}

export interface TestForm2Props extends TestForm2OwnProps {
  form?: WrappedFormUtils;
  token: any;
  data: TestForm2State;
  dispatch: any;
}

const formFields = {
  groupName: new Field('groupName', '分组名称'),
};

class TestForm2 extends React.Component<TestForm2Props, any> {
  static defaultProps = {
    options: {
      groupId: null,
      groupName: undefined,
    },
  };

  componentWillMount() {
    const { dispatch, options } = this.props;
    dispatch(actions[keys.setTestForm2]({
      ...options,
    }));
  }

  handleSubmit = () => {
    const { form, dispatch, token, options } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      let payload = {
        ...token,
        ...values,
      };
      if (options.groupId) {
        payload = {
          ...payload,
          groupId: options.groupId,
        };
        dispatch(apiActions[apis.editGroup](payload));
      }else {
        dispatch(apiActions[apis.addGroup](payload));
      }
    });
  }

  render() {
    const { form, data, options } = this.props;
    const { getFieldDecorator } = form;
    const inputStyle: React.CSSProperties = {
      width: '300px',
    };

    let isEdit = options.groupId !== null;

    return (
      <CardEx>
        <Back
          componentName="getGroupList"
        />
        <Row>
          <Col span={14} offset={6}>
            <Form layout="horizontal">
              <FormItem
                label={formFields.groupName.text}
                {...FORMITEMLAYOUT}
              >
                {getFieldDecorator(formFields.groupName.name, {
                  rules: [{
                    required: true,
                    message: formFields.groupName.message(),
                  }],
                })(
                  <Input style={inputStyle} />
                )}
              </FormItem>
              <FormItem
                {...FORMITEMLAYOUT_WIDTHOUTLABEL}
              >
                <Button
                  onClick={this.handleSubmit}
                  type="primary"
                  loading={data.loading}>
                  {isEdit ? '修改' : '创建'}
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </CardEx>
    );
  }
}

const mapState2Props = state => {
  const { token, testForm2 } = state;
  return {
    token,
    data: testForm2,
  };
};

const mapPropsToFields = (props: TestForm2Props) => {
  let data = props.data;
  return {
    [formFields.groupName.name]: {value: data.groupName},
  };
};

const onValuesChange = (props: TestForm2Props, values) => {
  const { dispatch } = props;
  dispatch(actions[keys.setValues](values));
};

export default connect<any, any,  TestForm2OwnProps>(mapState2Props)(
  Form.create({mapPropsToFields, onValuesChange})( TestForm2)
);
