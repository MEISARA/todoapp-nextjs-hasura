import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation AddTodo(
    $title: String!
    $description: String!
    $priority: String!
    $status: String!
  ) {
    insert_todos_one(
      object: {
        title: $title
        description: $description
        priority: $priority
        status: $status
      }
    ) {
      id
      title
      description
      priority
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: Int!
    $title: String!
    $description: String!
    $priority: String!
    $status: String!
  ) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        description: $description
        priority: $priority
        status: $status
      }
    ) {
      id
      title
      description
      priority
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

export const TOGGLE_TODO_STATUS = gql`
  mutation ToggleTodoStatus($id: Int!, $status: String!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
      title
      description
      priority
      status
    }
  }
`;
