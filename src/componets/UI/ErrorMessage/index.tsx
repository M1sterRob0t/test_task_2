import classNames from 'classnames';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  children: string;
  className?: string;
}
export const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  return <p className={classNames('error-message', className)}>{children}</p>;
};
