import { styled } from '@adminjs/design-system/styled-components';
import JWPaginate from 'jw-paginate';
import React from 'react';
import { Box } from '@adminjs/design-system';
import { ChevronLeft, ChevronRight } from 'react-feather';

const PaginationLink = styled('button')`
  min-width: 28px;
  height: 28px;
  line-height: 12px;
  padding: 3px 6px;
  text-align: center;
`;

const PaginationWrapper = styled(Box)`
  display: inline-block;
  padding: 2px;
  border: 1px solid ${({ theme }): string => theme.colors.grey20};
  & > :first-child {
    width: 56px;
    border-right: 1px solid ${({ theme }): string => theme.colors.grey20};
  }
  & > :nth-child(2) {
    padding-left: 16px;
  }
  & > :last-child {
    width: 56px;
    border-left: 1px solid ${({ theme }): string => theme.colors.grey20};
  }
  & > :nth-last-child(2) {
    padding-right: 16px;
  }
`;

const Pagination = ({ total, page, perPage, onChange }) => {
  console.log({
    total,
    page,
    perPage,
  });
  const currentPage = page || 1;
  const paginate = JWPaginate(total, currentPage, perPage);
  const isFirstPage = currentPage === paginate.startPage;
  const isLastPage = currentPage === paginate.endPage;
  const prevPage = isFirstPage ? currentPage : currentPage - 1;
  const nextPage = isLastPage ? currentPage : currentPage + 1;
  if (paginate.totalPages === 1 || total === 0) {
    return null;
  }
  return (
    <PaginationWrapper>
      <PaginationLink
        data-testid="previous"
        disabled={isFirstPage}
        onClick={(): void => (!isFirstPage ? onChange(prevPage) : undefined)}
      >
        <ChevronLeft />
      </PaginationLink>
      {paginate.pages.map((p) => (
        <PaginationLink
          key={p}
          onClick={(): void => onChange(p)}
          variant={p === currentPage ? 'primary' : 'text'}
          className={p === currentPage ? 'current' : ''}
          data-testid={`page-${p}`}
        >
          {p}
        </PaginationLink>
      ))}
      <PaginationLink
        data-testid="next"
        onClick={(): void => (!isLastPage ? onChange(nextPage) : undefined)}
        disabled={isLastPage}
      >
        <ChevronRight />
      </PaginationLink>
    </PaginationWrapper>
  );
};

export default Pagination;
