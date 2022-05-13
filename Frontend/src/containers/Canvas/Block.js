import React, { useEffect, useState } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import SelectedArea from 'components/Canvas/BlockSelect/SelectedArea';
import axios from 'axios';
import { sysLocStore, useStore } from '../../lib/store';

const Block = () => {
  // const [globalLocations, setGlobalLocations] = useState(null);

  const { sysCateLoc, getSysLoc } = sysLocStore();
  const { selCateLoc } = useStore();

  useEffect(() => {
    getSysLoc();
    console.log(sysCateLoc);
    console.log(selCateLoc);
  }, []);

  return (
    <>
      {sysCateLoc && <SelectArea location={sysCateLoc} selLocs={selCateLoc} />}
    </>
  );
};

export default Block;
