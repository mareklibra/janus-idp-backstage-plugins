import React from 'react';
import { Link } from 'react-router-dom';

import { Content, InfoCard } from '@backstage/core-components';
import { AboutField } from '@backstage/plugin-catalog';

import { Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';

import {
  ProcessInstance,
  WorkflowCategory,
} from '@janus-idp/backstage-plugin-orchestrator-common';

import { ProcessInstanceStatus } from './ProcessInstanceStatus';
import { firstLetterCapital } from './utils';

export type WorkflowRunDetail = {
  id: string;
  name: string;
  workflow: string;
  status: string;
  started: string;
  duration: string;
  component?: string;
  category?: string;
  parentInstanceId?: string;
  description?: string;
};

export const mapProcessInstanceToDetails = (
  instance: ProcessInstance,
): WorkflowRunDetail => {
  const start = moment(instance.start?.toString());
  const end = moment(instance.end?.toString());
  const duration = moment.duration(start.diff(end));
  const name = instance.processName || instance.processId;

  const row: WorkflowRunDetail = {
    id: instance.id,
    name,
    workflow: instance.processName || instance.processId,
    started: start.format('MMMM DD, YYYY'),
    duration: duration.humanize(),
    category: instance.category,
    status: instance.state,
    component: instance.source /* TODO(mlibra): is that correct? */,
    description: instance.description,
    parentInstanceId: instance.parentProcessInstance?.id,
  };

  return row;
};

const useStyles = makeStyles(_ => ({
  card: {
    height: '100%',
  },
  link: {
    color: '-webkit-link',
  },
}));

export const WorkflowInstancePageContent = ({
  processInstance,
}: {
  processInstance?: ProcessInstance;
}) => {
  const styles = useStyles();

  if (!processInstance) {
    return <Skeleton />;
  }

  const details = mapProcessInstanceToDetails(processInstance);

  const detailLabelValues = [
    {
      label: 'Type',
      value: firstLetterCapital(details.category),
    },
    {
      label: 'Status',
      value: <ProcessInstanceStatus status={details.status} />,
    },
    { label: 'Duration', value: details.duration },
    { label: 'Started', value: details.started },
    { label: 'Component', value: details.component },
    { label: 'Description', value: details.description },
  ];

  const nextWorkflows: { title: string; link: string }[] = [
    // TODO(mlibra): get data - for assessment workflows only
  ];

  return (
    <Content noPadding>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InfoCard title="Details" divider={false} className={styles.card}>
            <Grid container spacing={3}>
              {detailLabelValues.map(item => (
                <Grid item xs={4} key={item.label}>
                  <AboutField label={item.label} value={item.value as string} />
                </Grid>
              ))}
            </Grid>
          </InfoCard>
        </Grid>

        {details.category === WorkflowCategory.ASSESSMENT && (
          <Grid item xs={6}>
            <InfoCard
              title="Assessment Results"
              subheader="Select your next workflow"
              divider={false}
              className={styles.card}
            >
              <Grid container spacing={3}>
                {nextWorkflows.map(item => (
                  <Grid item xs={4} key={item.title}>
                    <Link to={item.link} className={styles.link}>
                      {item.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </InfoCard>
          </Grid>
        )}

        <Grid item xs={12}>
          <InfoCard title="Status" divider={false}>
            TODO: status as timeline
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  );
};
