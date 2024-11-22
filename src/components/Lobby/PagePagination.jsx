import { useCallback, useEffect, useState } from "react";
import { PagePaginationStyled } from "./Styled";
import { Icon } from "../../assets/icon";
import createArray from "./components/CreateArrayFromN";

const PagePagination = (p) => {
  const { pagination } = p
  const [maxPages, setMaxPages] = useState(() => createArray(pagination.totalPages + 1));

  const onNextPage = useCallback(() => {
    pagination.setPage(prevState => prevState < pagination.totalPages ? prevState + 1 : prevState);
  }, [pagination]);

  const onPrevPage = useCallback(() => {
    pagination.setPage(prevState => prevState > 0 ? prevState - 1 : prevState);
  }, [pagination]);

  const onPageChange = useCallback(index => {
    pagination.setPage(index);
  }, [pagination]);

  useEffect(() => {
    setMaxPages(() => createArray(pagination.totalPages + 1));
  }, [pagination]);

  return (
    <PagePaginationStyled>
      <div className='button previousButton' onClick={onPrevPage} >
        <Icon.leftarrow disabled={pagination.page <= 0}></Icon.leftarrow>
      </div>
      {maxPages.map((value, index) => (
        <div
          key={index}
          className='pageNumber'
          style={pagination.page === index ? { backgroundColor: "blue", color: "white" } : {}}
          onClick={() => {
            onPageChange(index)
          }}
        >
          {value}
        </div>
      ))}
      <div className='button nextButton' onClick={onNextPage} >
        <Icon.rightarrow disabled={pagination.page === pagination.totalPages}></Icon.rightarrow>
      </div>
    </PagePaginationStyled>
  );
};

export default PagePagination;
