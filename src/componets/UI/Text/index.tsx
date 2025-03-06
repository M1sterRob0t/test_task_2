import classNames from 'classnames';
import './Text.scss';

interface TextProps {
  children: string;
  className?: string;
}
export const Text = ({ children, className }: TextProps) => {
  return <p className={classNames('text', className)}>{children}</p>;
};
