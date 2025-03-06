import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Title } from '../../componets/UI/Title';
import { TestRaw, UrlParams } from '../../types';
import { Loading } from '../../componets/UI/Loading';
import { ErrorMessage } from '../../componets/UI/ErrorMessage';
import { Text } from '../../componets/UI/Text';
import { getTest } from '../../api/tests';

import './FinalizePage.scss'


export const FinalizePage = () => {
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
      <section className='finilize-page__title'>
        <Title className='finilize-page__title'>Finilize</Title>
        {isLoading && <Loading className='finilize-page__loading' />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {test && <Text>{test.name}</Text>}
      </section>
    );
};
