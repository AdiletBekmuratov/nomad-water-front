import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

export const Card: FC<Props> = (props) => {
  return (
    <div>
      <span className="relative block rounded-xl border border-gray-200 p-8 shadow-xl bg-white w-full">
        <div className="mt-4 text-gray-500">{props.children}</div>
      </span>
    </div>
  );
};
