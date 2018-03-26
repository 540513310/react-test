import * as React from 'react';
import UniTable, { TableColumnConfig, ToolbarButtonDecorator } from '../../common/UniTable';
import { TestState, apiActions, apis } from '../../../models/system/test';
import { updatePane } from '../../../models/common/sidebar';
import { injectApi, ApiComponentProps } from '../../util';

export interface TestProps extends ApiComponentProps<TestState> {

}

class Test extends React.Component<TestProps, any> {
  render() {
    const { data, dispatch } = this.props;

    const columns: TableColumnConfig<any>[] = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
    }, {
      title: '操作',
      dataIndex: 'actions',
      render: (text, record, index) => {
        return (
          <div
            className="action-container"
          >
            <a
              onClick={() => {
                updatePane(dispatch, {
                  componentName: 'EditRole',
                }, {
                  id: record.id,
                  roleName: record.roleName,
                });
              }}
            >
              编辑
            </a>
          </div>
        );
      },
    }];

    const toolbarButtons: ToolbarButtonDecorator[] = [{
      key: 'plus',
      type: 'primary',
      onClick: () => {
        updatePane(dispatch, {
          componentName: 'EditRole',
        });
      },
      enableForAll: true,
      text: '添加角色',
    }];

    return (
      <UniTable
        columns={columns}
        apiAction={apiActions.getName}
        tableState={data as any}
        toolbarButtons={toolbarButtons}
        hasToolbar={true}
      />
    );
  }
}

export default injectApi(Test, {
  data: 'test',
});
