import React from 'react';
import { Text, View, FlatList } from 'react-native';

import Page from '../components/Page';
import ObjectPreview from '../components/ObjectPreview';
import { PageTitle } from '../elements/text';
import { Loader } from '../elements/ui';
import useQuery from '../hooks/useQuery';
import useSparqlQuery from '../hooks/useSparqlQuery';
import { SERVER_URL, MAIN_ACTOR, APP_NAME } from '../constants';
import { getActionsByGroup } from '../queries';
import UserConnection from '../components/UserConnection';
import useLoggedUser from '../hooks/useLoggedUser';
import UserDataLoader from '../components/UserDataLoader';

const PageHeader = ({ selectedTag }) => (
  <View style={{ paddingTop: 10, paddingLeft: 15, paddingBottom: 3 }}>
    <PageTitle center>{selectedTag ? `"${selectedTag}"` : APP_NAME}</PageTitle>
    <Text style={{ fontStyle: 'italic', fontSize: 12, textAlign: 'center', color: 'grey' }}>
      <UserConnection />
    </Text>
  </View>
);

const ListScreen = ({ navigation }) => {
  const data = useSparqlQuery(getActionsByGroup({ groupId: '60-pays-creillois' }));
  // const { data, loading, error } = useQuery(SERVER_URL + MAIN_ACTOR);
  const { user } = useLoggedUser();
  const selectedTag = navigation.getParam('tag');
  return (
    <Page noScroll>
      {user && <UserDataLoader user={user} />}
      {/*{loading && <Loader fullScreen>Chargement des données...</Loader>}*/}
      {/*{error && <Text>{error.message}</Text>}*/}
      {data && (
        <FlatList
          data={data}
          renderItem={({ item: object }) => <ObjectPreview object={object} />}
          ListHeaderComponent={() => <PageHeader selectedTag={selectedTag} />}
          keyExtractor={objectId => objectId.id}
        />
      )}
    </Page>
  );
};

export default ListScreen;
