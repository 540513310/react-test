import * as React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
import CardEx from '../../common/CardEx';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TestFormState, apiActions, apis, actions, keys } from '../../../models/system/testForm';
import { connect } from 'react-redux';
import { FORMITEMLAYOUT, FORMITEMLAYOUT_WIDTHOUTLABEL } from '../../../util/constants';
import { Field } from '../../../util/baseDecorator';
import Back from '../../common/Back';

export interface TestFormOwnProps {
  options: {
    groupId: number;
  };
}

export interface TestFormProps extends TestFormOwnProps {
  form?: WrappedFormUtils;
  token: any;
  data: TestFormState;
  dispatch: any;
}

const formFields = {
  groupName: new Field('groupName', '分组名称'),
  groupOldName: new Field('groupOldName', '分组旧名称'),
  groupNewName: new Field('groupNewName', '分组新名称'),
};

class TestForm extends React.Component<TestFormProps, any> {
  static defaultProps = {
    options: {
      groupId: null
    },
  };

  componentWillMount() {
    const { dispatch, options } = this.props;
    dispatch(apiActions[apis.getRoleList]({
      ...options,
    }));
  }

  handleSubmit = () => {
    const { form, dispatch, token, options, data } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      // console.log('values',values);
      // console.log('token',token)
      let payload = {
        ...token,
        ...values,
      };
      // console.log('payload',payload)
      dispatch(apiActions[apis.login](payload))
      // if (options.groupId) {
      //   payload = {
      //     ...payload,
      //     groupId: options.groupId,
      //   };
      //   dispatch(apiActions[apis.editGroup](payload));
      // }else {
      //   dispatch(apiActions[apis.addGroup](payload));
      // }
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
          componentName="RoleList"
        />
        <div>{this.props.data.operatorId}</div>
        <Row>
          <Col span={14} offset={6}>
            <Form layout="horizontal">
              <FormItem
                label={'分组名称'}
                {...FORMITEMLAYOUT}
              >
                {getFieldDecorator('groupName', {
                  rules: [{
                    message: '请输入',
                  }],
                })(
                  <Input style={inputStyle} />
                )}
              </FormItem>
              <FormItem
                label={'分组旧名称'}
                {...FORMITEMLAYOUT}
              >
                {getFieldDecorator('groupOldName', {
                  rules: [{
                    message: '请输入',
                  }],
                })(
                  <Input style={inputStyle} />
                )}
              </FormItem>
              <FormItem
                label={'分组名称'}
                {...FORMITEMLAYOUT}
              >
                {getFieldDecorator('groupNewName', {
                  rules: [{
                    message: '请输入',
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
  const { token, testForm } = state;
  console.log('state',state);
  return {
    token,
    data: testForm,
  };
};

const mapPropsToFields = (props: TestFormProps) => {
  let data = props.data;
  return {
    [formFields.groupName.name]: {value: data.groupName},
    [formFields.groupOldName.name]: {value: data.groupOldName},
    [formFields.groupNewName.name]: {value: data.groupNewName},
  };
};

const onValuesChange = (props: TestFormProps, values) => {
  const { dispatch } = props;
  dispatch(actions[keys.setValues](values));
};

export default connect<any, any,  TestFormOwnProps>(mapState2Props)(
  Form.create({mapPropsToFields, onValuesChange})(TestForm)
);

