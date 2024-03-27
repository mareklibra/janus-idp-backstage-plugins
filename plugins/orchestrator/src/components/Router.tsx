import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  executeWorkflowRouteRef,
  workflowDefinitionsRouteRef,
  workflowInstanceRouteRef,
} from '../routes';
import { ExecuteWorkflowPage } from './ExecuteWorkflowPage/ExecuteWorkflowPage';
import { OrchestratorPage } from './OrchestratorPage';
import { WorkflowDefinitionViewerPage } from './WorkflowDefinitionViewerPage';
import { WorkflowInstancePage } from './WorkflowInstancePage';

console.log('---- Orchestrator top level logging from Router');

export const Router = () => {
  console.log('---- Orchestrator Router compoennt');
  return (
    <Routes>
      <Route path="/*" element={<OrchestratorPage />} />
      <Route
        path={workflowInstanceRouteRef.path}
        element={<WorkflowInstancePage />}
      />
      <Route
        path={workflowDefinitionsRouteRef.path}
        element={<WorkflowDefinitionViewerPage />}
      />
      <Route
        path={executeWorkflowRouteRef.path}
        element={<ExecuteWorkflowPage />}
      />
    </Routes>
  );
};
