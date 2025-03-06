import classNames from 'classnames';

import './Loading.scss';

interface LoadpingProps {
  className?: string;
}
export const Loading = ({ className }: LoadpingProps) => {
  return <div className={classNames(className, 'loading')}>Loading...</div>;
};
