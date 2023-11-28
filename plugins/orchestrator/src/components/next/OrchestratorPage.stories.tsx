import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { TestApiProvider, wrapInTestApp } from '@backstage/test-utils';

import { Meta, StoryObj } from '@storybook/react';

import { fakeProcessInstance } from '../../__fixtures__/fakeProcessInstance';
import { fakeWorkflowItem } from '../../__fixtures__/fakeWorkflowItem';
import { orchestratorApiRef } from '../../api';
import { MockOrchestratorClient } from '../../api/MockOrchestratorClient';
import { orchestratorRootRouteRef } from '../../routes';
import { OrchestratorPage } from './OrchestratorPage';

const meta = {
  title: 'Orchestrator/next',
  component: OrchestratorPage,
} satisfies Meta<typeof OrchestratorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This component is used in order to correctly render nested components using the `TabbedLayout.Route` component. */
const TestRouter: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <Routes>
    <Route path="/*" element={<>{children}</>} />
  </Routes>
);

export const OrchestratorPageStory: Story = {
  name: 'OrchestratorPage',
  render: args =>
    wrapInTestApp(
      <TestRouter>
        <TestApiProvider
          apis={[
            [
              orchestratorApiRef,
              new MockOrchestratorClient({
                getInstancesResponse: Promise.resolve([fakeProcessInstance]),
                listWorkflowsResponse: Promise.resolve({
                  limit: 0,
                  offset: 0,
                  totalCount: 0,
                  items: [fakeWorkflowItem],
                }),
              }),
            ],
          ]}
        >
          <OrchestratorPage {...args} />
        </TestApiProvider>
      </TestRouter>,
      {
        mountedRoutes: {
          '/orchestrator': orchestratorRootRouteRef,
        },
      },
    ),
};
