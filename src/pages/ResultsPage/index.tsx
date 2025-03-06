import { useParams } from 'react-router-dom';
import { Title } from '../../componets/UI/Title';
import { TestRaw, UrlParams } from '../../types';
import { useEffect, useState } from 'react';
import { getTest } from '../../api/tests';
import { Loading } from '../../componets/UI/Loading';
import { Text } from '../../componets/UI/Text';
import { ErrorMessage } from '../../componets/UI/ErrorMessage';

import './ResultsPage.scss';

export const ResultsPage = () => {
  const params = useParams<UrlParams>();
  const [test, setTest] = useState<TestRaw | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getTest(params.id)
        .then((data) => setTest(data))
        .catch((error: Error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [params]);

  return (
    <section className='results-page'>
      <Title className='results-page__title'>Results</Title>
      {isLoading && <Loading className='results-page__loading'/>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {test && <Text>{test.name}</Text>}
    </section>
  );
};
