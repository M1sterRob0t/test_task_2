import { useEffect, useState } from 'react';
import { Table } from '../../componets/Table';
import { Filter } from '../../componets/UI/Filter';
import { Title } from '../../componets/UI/Title';


import { getTests } from '../../api/tests';
import { Site, Sort, SortType, Test, TestRaw } from '../../types';
import { getSites } from '../../api/sites';
import { NoResults } from '../../componets/UI/NoResults';
import { Loading } from '../../componets/UI/Loading';
import { ErrorMessage } from '../../componets/UI/ErrorMessage';

import './DashboardPage.scss';

const sortTests = (sort: Sort, tests: Test[]): Test[] => {
  return tests.sort((a, b) => {
    switch (sort.value) {
      case 'name': {
        return sort.type === SortType.ASC
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      case 'site': {
        return sort.type === SortType.ASC
          ? a.site.localeCompare(b.site)
          : b.site.localeCompare(a.site);
      }
      case 'status': {
        return sort.type === SortType.ASC
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      case 'type': {
        return sort.type === SortType.ASC
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      }
    }
  });
};

export const DashboardPage = () => {
  const [rawTests, setRawTests] = useState<TestRaw[]>([]);
  const [isTestsLoading, setIsTestsLoading] = useState(true);
  const [isTestsLoaded, setIsTestsLoaded] = useState(false);
  const [testsError, setTestsError] = useState<string | null>(null);

  const [sites, setSites] = useState<Site[]>([]);
  const [isSitesLoading, setIsSitesLoading] = useState(true);
  const [isSitesLoaded, setIsSitesLoaded] = useState(false);
  const [sitesError, setSitesError] = useState<string | null>(null);

  const [tests, setTests] = useState<Test[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [sort, setSort] = useState<Sort | null>(null);

  const filteredTests = !filterValue
    ? tests
    : tests.filter((test) => test.name.toLowerCase().includes(filterValue));

  const processedTests = !sort
    ? filteredTests
    : sortTests(sort, filteredTests);

  const isLoading = isSitesLoading || isTestsLoading;
  const isResults = !!filteredTests.length;
  const error = sitesError ?? testsError;
  const isError = !!error;

  useEffect(() => {
    getSites()
      .then((data) => {
        setSites(data);
        setIsSitesLoaded(true);
      })
      .catch((error: Error) => setSitesError(error.message))
      .finally(() => setIsSitesLoading(false));

    getTests()
      .then((data) => {
        setRawTests(data);
        setIsTestsLoaded(true);
      })
      .catch((error: Error) => setTestsError(error.message))
      .finally(() => setIsTestsLoading(false));
  }, []);

  useEffect(() => {
    if (isSitesLoaded && isTestsLoaded) {
      setTests(
        rawTests.map((el) => ({
          ...el,
          site: sites.find((site) => site.id === el.siteId)?.url ?? '',
        }))
      );
    }
  }, [isSitesLoaded, isTestsLoaded, rawTests, sites]);

  return (
    <section className="dashboard">
      <Title className="dashboard__title">Dashboard</Title>
      <Filter
        className="dashboard__filter"
        callback={setFilterValue}
        resultsTotal={filteredTests.length}
      />
      {isLoading ? (
        <Loading className="dashboard__loading" />
      ) : isError ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : isResults ? (
        <Table tests={processedTests} setSort={setSort} sort={sort} />
      ) : (
        <NoResults />
      )}
    </section>
  );
};
