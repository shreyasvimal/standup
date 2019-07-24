import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from './Header/Header';
import { StateProvider } from './State/state';

const AdminComponent = React.lazy(() => import('./Admin/Admin'));

export interface GlobalState {
  email: string;
  slackHandle: string;
  questions: string[];
  slackHandles: string;
}

const initialState = {
  email: '',
  slackHandle: '',
  questions: [
    'What did I work on yesterday/previous work day?',
    'What will I work on today?',
    'What are my blockers, if any?',
    'Any callouts the team needs to know, if any?'
  ],
  slackHandles: ''
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
          slackHandle: action.slackHandle
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
              <Route exact path="/standup/create" component={() => (
                <React.Suspense fallback={<div>Loading</div>}>
                  <AdminComponent/>
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
