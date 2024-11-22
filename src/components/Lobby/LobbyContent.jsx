import { Fragment } from "react";
import { WrapTable } from "./Styled";
import LobbyUIList from "./components/LobbyUIList";

import LobbiesAdd from "./LobbiesAdd";

const LobbyContent = (p) => {
  const { isModalAdd } = p

  return (
      <Fragment>
        <WrapTable>
          <LobbyUIList />
          {/* <PagePagination pagination={pagination} /> */}
        </WrapTable>

        {isModalAdd &&
          <LobbiesAdd />}
          
      </Fragment>
  );
};

export default LobbyContent;
