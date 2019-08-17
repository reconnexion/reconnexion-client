const reducer = (state = { queries: [] }, action) => {
  switch (action.type) {
    case 'QUERY_TRIGGER': {
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.endpoint]: {
            data: null,
            loading: true,
            error: null
          }
        }
      };
    }

    case 'QUERY_SUCCESS': {
      if (action.data.type === 'OrderedCollection') {
        let entities;
        const itemsIds = action.data.orderedItems
          ? action.data.orderedItems.map(item => {
              entities = { ...entities, [item.id]: { data: item, loading: false, error: null } };
              return item.id;
            })
          : null;
        return {
          ...state,
          queries: {
            ...state.queries,
            ...entities,
            [action.endpoint]: {
              data: itemsIds,
              loading: false,
              error: null
            }
          }
        };
      } else {
        return {
          ...state,
          queries: {
            ...state.queries,
            [action.endpoint]: {
              data: action.data,
              loading: false,
              error: null
            }
          }
        };
      }
    }

    case 'QUERY_FAILURE': {
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.endpoint]: {
            data: null,
            loading: false,
            error: action.error
          }
        }
      };
    }

    default:
      return state;
  }
};

export default reducer;
