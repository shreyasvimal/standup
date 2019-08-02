import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from './Header/Header';
import { StateProvider } from './State/state';
import { GlobalState } from './Utility/models';

const AdminComponent = React.lazy(() => import('./Admin/Admin'));
const AdminViewComponent = React.lazy(() => import('./Admin/View/View'));
const MemberViewComponent = React.lazy(() => import('./Member/View/View'));

const initialState = {
  email: '',
  slackChannel: '',
  questions: [
    'What did I work on yesterday/previous work day?',
    'What will I work on today?',
    'What are my blockers, if any?',
    'Any callouts the team needs to know, if any?'
  ],
  slackHandles: '',
  slackWebhookToken: ''
} as GlobalState;

const reducer = (state: GlobalState, action: any) => {
  switch (action.type) {
    case 'author_email_update':
      return {
        ...state,
        email: action.email
      };
    case 'author_slack_update':
        return {
          ...state,
          slackChannel: action.slackChannel
        };
    case 'questions_update':
        return {
          ...state,
          questions: action.questions
        };
      
    case 'team_slack_update':
        return {
          ...state,
          slackHandles: action.slackHandles
        };
    
    case 'slack_webhook_update':
        return {
          ...state,
          slackWebhookToken: action.slackWebhookToken
        };
    
    case 'standup_response':
      return {
        ...state,
        standUpResponse: action.standUpResponse
      }
      
    default:
      return state;
  }
};

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Header/>
          <Container maxWidth="sm">
            <Router>
              <Route exact path="/standup/admin/create" component={() => (
                <React.Suspense fallback={<div>Loading</div>}>
                  <AdminComponent/>
                </React.Suspense>
              )}/>
              <Route exact path="/standup/admin/view" component={() => (
                <React.Suspense fallback={<div>Loading</div>}>
                  <AdminViewComponent/>
                </React.Suspense>
              )}/>
              <Route exact path="/standup/team/view/:name/:member" component={() => (
                <React.Suspense fallback={<div>Loading</div>}>
                  <MemberViewComponent/>
                </React.Suspense>
              )}/>
            </Router>
          </Container>
        </StateProvider>
      </div>
    );
  }
}

export default App;
