import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { FC, useState, MouseEventHandler } from 'react';

import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
  HiPlus
} from 'react-icons/hi';

import { useLocalStorage } from '@/hooks';
import { Button, Input, Toggle } from '../Forms';

interface ITableProps {
  id: string;
  columns: any;
  data: any;
  onAddClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
}

export const Table: FC<ITableProps> = ({ columns, data, onAddClick, id, title }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [compact, setCompact] = useLocalStorage(id, false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false
  });

  const handleCompactToogle = () => {
    setCompact(!compact);
  };

  return (
    <div id={id} className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <Toggle
          id="toggle-compact"
          name="toggle-compact"
          inputType="default"
          onChange={handleCompactToogle}
          value={compact}
        />
        <div className="flex items-center">
          <span className="text-lg">{title}</span>
        </div>

        <div className="flex space-x-4">
          {onAddClick && (
            <div data-tip="Create" className="tooltip">
              <Button
                onClick={onAddClick}
                className={`bg-medium-blue hover:bg-gray-700 !rounded-full p-2`}>
                <HiPlus className={`w-5 h-5`} />
                Добавить нового работника
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto mt-4 rounded">
        <table
          className={`w-full table relative text-sm text-left text-dark-blue dark:text-dark-blue`}>
          <thead
            className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-light-blue dark:text-gray-400`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      className={`${compact ? 'py-2 px-2' : 'py-3 px-6'}`}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize()
                      }}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center'
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <HiChevronUp className="ml-2" />,
                            desc: <HiChevronDown className="ml-2" />
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-light-blue-800 dark:border-gray-300">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize()
                        }}
                        className={`whitespace-pre-wrap ${compact ? 'py-2 px-2' : 'py-4 px-6'}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-center items-center space-x-4 my-4">
          <div className="flex space-x-2">
            <div data-tip="First Page" className="tooltip">
              <Button
                className="rounded-full w-5 h-5 items-center flex justify-center"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <HiChevronDoubleLeft />
              </Button>
            </div>
            <div data-tip="Previous Page" className="tooltip">
              <Button
                className="rounded-full w-5 h-5 items-center flex justify-center"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <HiChevronLeft />
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`mr-8 flex-shrink-0 hidden md:block`}>
              Страница{' '}
              <span className="font-bold">{table.getState().pagination.pageIndex + 1}</span> из{' '}
              <span className="font-bold">{table.getPageCount()}</span>
            </div>
            <div className={`flex-shrink-0 hidden lg:block mr-2`}>Перейти на:</div>
            <Input
              id="go-to-input"
              inputType="default"
              type="number"
              min={1}
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            <div className="flex-shrink-0 ml-4">Показать:</div>{' '}
            <select
              className="select select-bordered ml-2 "
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(parseInt(e.target.value));
              }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <div data-tip="Next Page" className="tooltip">
              <Button
                className="rounded-full w-5 h-5 items-center flex justify-center"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <HiChevronRight />
              </Button>
            </div>
            <div data-tip="Last Page" className="tooltip">
              <Button
                className="rounded-full w-5 h-5 items-center flex justify-center"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <HiChevronDoubleRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
